import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Pencil, Check, CalendarDays, Clock } from "lucide-react";

interface Task {
  id: string;
  text: string;
  done: boolean;
  date?: string;
  time?: string;
}

interface TaskListProps {
  title: string;
  tasks: Task[];
  onToggle: (id: string) => void;
  onAdd: (text: string, date?: string, time?: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const TaskList = ({ title, tasks, onToggle, onAdd, onDelete, onEdit }: TaskListProps) => {
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (newTask.trim()) {
      onAdd(newTask.trim(), newDate || undefined, newTime || undefined);
      setNewTask("");
      setNewDate("");
      setNewTime("");
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

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
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
            className="flex items-start gap-2 group"
          >
            <button
              onClick={() => onToggle(task.id)}
              className={`w-5 h-5 mt-0.5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                task.done
                  ? "bg-primary border-primary"
                  : "border-muted-foreground/40 hover:border-primary"
              }`}
            >
              {task.done && <Check className="w-3 h-3 text-primary-foreground" />}
            </button>

            <div className="flex-1 min-w-0">
              {editingId === task.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                  onBlur={saveEdit}
                  autoFocus
                  className="w-full bg-muted/50 rounded-lg px-2 py-1 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
                />
              ) : (
                <>
                  <span
                    className={`text-sm transition-all block ${
                      task.done ? "line-through text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {task.text}
                  </span>
                  {(task.date || task.time) && (
                    <div className="flex items-center gap-2 mt-0.5">
                      {task.date && (
                        <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                          <CalendarDays className="w-3 h-3" />
                          {formatDate(task.date)}
                        </span>
                      )}
                      {task.time && (
                        <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {task.time}
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

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

      <div className="mt-3 space-y-2">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Agregar tarea..."
          className="w-full bg-muted/50 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
        />
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1 flex-1">
            <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="flex-1 bg-muted/50 rounded-lg px-2 py-1.5 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-1 flex-1">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="flex-1 bg-muted/50 rounded-lg px-2 py-1.5 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            onClick={handleAdd}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
