import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HeaderCard from "@/components/HeaderCard";
import TaskList from "@/components/TaskList";
import ChecklistCard from "@/components/ChecklistCard";
import HydrationTracker from "@/components/HydrationTracker";
import GratitudeCard from "@/components/GratitudeCard";
import SleepTracker from "@/components/SleepTracker";
import MoodTracker from "@/components/MoodTracker";
import ProductivityTracker from "@/components/ProductivityTracker";

interface Task {
  id: string;
  text: string;
  done: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Meditar 10 minutos", done: false },
    { id: "2", text: "Leer 20 páginas", done: false },
    { id: "3", text: "Hacer ejercicio", done: false },
  ]);

  const [routine, setRoutine] = useState([
    { id: "r1", label: "Meditación", checked: false },
    { id: "r2", label: "Desayuno saludable", checked: false },
    { id: "r3", label: "Vitaminas", checked: false },
    { id: "r4", label: "Ejercicio", checked: false },
  ]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const addTask = useCallback((text: string) => {
    setTasks((prev) => [...prev, { id: Date.now().toString(), text, done: false }]);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const editTask = useCallback((id: string, text: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  }, []);

  const toggleRoutine = useCallback((id: string) => {
    setRoutine((prev) => prev.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r)));
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
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
          <HeaderCard />
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

        <motion.div variants={item} className="grid grid-cols-2 gap-4">
          <ChecklistCard
            title="Rutina matutina"
            emoji="🌅"
            items={routine}
            onToggle={toggleRoutine}
          />
          <HydrationTracker />
        </motion.div>

        <motion.div variants={item}>
          <GratitudeCard />
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-2 gap-4">
          <SleepTracker />
          <div className="space-y-4">
            <ProductivityTracker />
            <MoodTracker />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
