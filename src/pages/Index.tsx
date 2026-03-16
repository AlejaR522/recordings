import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import HeaderCard from "@/components/HeaderCard";
import TaskList from "@/components/TaskList";
import MoodTracker from "@/components/MoodTracker";
import type { MoodKey } from "@/components/MoodTracker";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Priority = "alta" | "media" | "baja";

interface Task {
  id: string;
  text: string;
  done: boolean;
  date: string;
  time: string;
  priority: Priority;
  day: string;
}

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const Index = () => {
  const [mood, setMood] = useState<MoodKey | null>(null);
  const [selectedDay, setSelectedDay] = useState(() => {
    const d = new Date().getDay();
    return days[d === 0 ? 6 : d - 1];
  });
  const [tasksByDay, setTasksByDay] = useState<Record<string, Task[]>>(() => {
    const initial: Record<string, Task[]> = {};
    days.forEach((day) => { initial[day] = []; });
    return initial;
  });

  const notifiedTasksRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const checkDueTasks = () => {
      const now = new Date();
      Object.values(tasksByDay)
        .flat()
        .forEach((task) => {
          if (task.done) return;
          if (!task.date || !task.time) return;
          if (notifiedTasksRef.current.has(task.id)) return;

          const taskDate = new Date(`${task.date}T${task.time}`);
          if (Number.isNaN(taskDate.getTime())) return;

          if (taskDate <= now) {
            toast(`Tarea con fecha ${task.date} ${task.time} está vencida: ${task.text}`, {
              duration: 5000,
            });
            notifiedTasksRef.current.add(task.id);
          }
        });
    };

    checkDueTasks();
    const intervalId = window.setInterval(checkDueTasks, 30_000);
    return () => window.clearInterval(intervalId);
  }, [tasksByDay]);

  useEffect(() => {
    const loadTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error loading tasks:", error);
        return;
      }

      const grouped: Record<string, Task[]> = {};
      days.forEach((day) => { grouped[day] = []; });
      data?.forEach((t) => {
        const day = t.day_of_week;
        if (grouped[day]) {
          grouped[day].push({
            id: t.id,
            text: t.text,
            done: t.done,
            date: t.task_date || "",
            time: t.task_time || "",
            priority: (t.priority as Priority) || "media",            day,          });
        }
      });
      setTasksByDay(grouped);
    };

    loadTasks();
  }, []);

  const tasks = tasksByDay[selectedDay] || [];

  const toggleTask = useCallback(async (id: string) => {
    const task = tasksByDay[selectedDay].find((t) => t.id === id);
    if (!task) return;
    const newDone = !task.done;
    setTasksByDay((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay].map((t) => (t.id === id ? { ...t, done: newDone } : t)),
    }));
    const { error } = await supabase.from("tasks").update({ done: newDone }).eq("id", id);
    if (error) toast.error("Error al actualizar tarea");
  }, [selectedDay, tasksByDay]);

  const addTask = useCallback(async (text: string, date: string, time: string, priority: Priority) => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert({
        user_id: userId,
        text,
        done: false,
        day_of_week: selectedDay,
        task_date: date,
        task_time: time,
        priority,
      })
      .select()
      .single();

    if (error) {
      toast.error("Error al agregar tarea");
      return;
    }

    setTasksByDay((prev) => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], {
        id: data.id,
        text: data.text,
        done: data.done,
        date: data.task_date || "",
        time: data.task_time || "",
        priority: (data.priority as Priority) || "media",
        day: selectedDay,
      }],
    }));
  }, [selectedDay]);

  const deleteTask = useCallback(async (id: string) => {
    setTasksByDay((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay].filter((t) => t.id !== id),
    }));
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) toast.error("Error al eliminar tarea");
  }, [selectedDay]);

  const editTask = useCallback(async (
    id: string,
    text: string,
    date: string,
    time: string,
    priority: Priority,
    day: string
  ) => {
    console.log("Index editTask", { id, text, date, time, priority, day });
    setTasksByDay((prev) => {
      const newTasks = { ...prev };
      if (day === selectedDay) {
        newTasks[selectedDay] = prev[selectedDay].map((t) =>
          t.id === id ? { ...t, text, date, time, priority, day } : t
        );
      } else {
        const existing = prev[selectedDay].find((t) => t.id === id);
        if (!existing) return prev;

        newTasks[selectedDay] = prev[selectedDay].filter((t) => t.id !== id);
        newTasks[day] = [...prev[day], { ...existing, text, date, time, priority, day }];
      }
      return newTasks;
    });

    const { error } = await supabase
      .from("tasks")
      .update({ text, task_date: date, task_time: time, priority, day_of_week: day })
      .eq("id", id);
    if (error) toast.error("Error al editar tarea");
  }, [selectedDay]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen gradient-bg py-6 px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-lg mx-auto space-y-4"
      >
        <motion.div variants={item} className="flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted/50 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Salir
          </button>
        </motion.div>

        <motion.div variants={item}>
          <HeaderCard mood={mood} />
        </motion.div>

        <motion.div variants={item}>
          <MoodTracker onMoodChange={setMood} />
        </motion.div>

        <motion.div variants={item}>
          <div className="glass-card rounded-2xl p-4 mb-4">
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedDay === day
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
          <TaskList
            title={`📋 Tareas - ${selectedDay}`}
            tasks={tasks}
            days={days}
            selectedDay={selectedDay}
            onToggle={toggleTask}
            onAdd={addTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
