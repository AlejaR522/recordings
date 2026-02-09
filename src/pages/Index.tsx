import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HeaderCard from "@/components/HeaderCard";
import TaskList from "@/components/TaskList";
import MoodTracker from "@/components/MoodTracker";
import type { MoodKey } from "@/components/MoodTracker";

interface Task {
  id: string;
  text: string;
  done: boolean;
  date?: string;
  time?: string;
}

const Index = () => {
  const [mood, setMood] = useState<MoodKey | null>(null);

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const [selectedDay, setSelectedDay] = useState(() => {
    const d = new Date().getDay();
    return days[d === 0 ? 6 : d - 1];
  });

  const [tasksByDay, setTasksByDay] = useState<Record<string, Task[]>>(() => {
    const initial: Record<string, Task[]> = {};
    days.forEach((day) => { initial[day] = []; });
    return initial;
  });

  const tasks = tasksByDay[selectedDay] || [];

  const toggleTask = useCallback((id: string) => {
    setTasksByDay((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay].map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }));
  }, [selectedDay]);

  const addTask = useCallback((text: string, date?: string, time?: string) => {
    setTasksByDay((prev) => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], { id: Date.now().toString(), text, done: false, date, time }],
    }));
  }, [selectedDay]);

  const deleteTask = useCallback((id: string) => {
    setTasksByDay((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay].filter((t) => t.id !== id),
    }));
  }, [selectedDay]);

  const editTask = useCallback((id: string, text: string) => {
    setTasksByDay((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay].map((t) => (t.id === id ? { ...t, text } : t)),
    }));
  }, [selectedDay]);

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
