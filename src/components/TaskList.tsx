import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Pencil, Check } from "lucide-react";

interface Task {
  id: string;
  text: string;
  done: boolean;
}

interface TaskListProps {
  title: string;
  tasks: Task[];
  onToggle: (id: string) => void;
  onAdd: (text: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const TaskList = ({ title, tasks, onToggle, onAdd, onDelete, onEdit }: TaskListProps) => {
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (newTask.trim()) {
      onAdd(newTask.trim());
      setNewTask("");
    }
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      onEdit(editingId, editText.trim());
      setEditingId(null);
      setEditText("");
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group"
          >
            <button
              onClick={() => onToggle(task.id)}
              className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                task.done
                  ? "bg-primary border-primary"
                  : "border-muted-foreground/40 hover:border-primary"
              }`}
            >
              {task.done && <Check className="w-3 h-3 text-primary-foreground" />}
            </button>

            {editingId === task.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                onBlur={saveEdit}
                autoFocus
                className="flex-1 bg-muted/50 rounded-lg px-2 py-1 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
              />
            ) : (
              <span
                className={`flex-1 text-sm transition-all ${
                  task.done ? "line-through text-muted-foreground" : "text-foreground"
                }`}
              >
                {task.text}
              </span>
            )}

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => startEdit(task)}
                className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Agregar tarea..."
          className="flex-1 bg-muted/50 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={handleAdd}
          className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskList;
