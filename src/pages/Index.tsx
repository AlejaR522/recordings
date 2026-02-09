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

  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Meditar 10 minutos", done: false },
    { id: "2", text: "Leer 20 páginas", done: false },
    { id: "3", text: "Hacer ejercicio", done: false },
  ]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const addTask = useCallback((text: string, date?: string, time?: string) => {
    setTasks((prev) => [...prev, { id: Date.now().toString(), text, done: false, date, time }]);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const editTask = useCallback((id: string, text: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  }, []);

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
          <TaskList
            title="📋 Lista de tareas pendientes"
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
