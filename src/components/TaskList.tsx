import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Pencil, Check, CalendarDays, Clock, Flag } from "lucide-react";

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

interface TaskListProps {
  title: string;
  tasks: Task[];
  days: string[];
  selectedDay: string;
  onToggle: (id: string) => void;
  onAdd: (text: string, date: string, time: string, priority: Priority) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, date: string, time: string, priority: Priority, day: string) => void;
}

const priorityConfig: Record<Priority, { label: string; color: string; bg: string }> = {
  alta: { label: "Alta", color: "text-red-600", bg: "bg-red-100 text-red-700 border-red-200" },
  media: { label: "Media", color: "text-amber-600", bg: "bg-amber-100 text-amber-700 border-amber-200" },
  baja: { label: "Baja", color: "text-emerald-600", bg: "bg-emerald-100 text-emerald-700 border-emerald-200" },
};

const TaskList = ({ title, tasks, days, selectedDay, onToggle, onAdd, onDelete, onEdit }: TaskListProps) => {
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("media");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editPriority, setEditPriority] = useState<Priority>("media");
  const [editDay, setEditDay] = useState<string>("");

  const handleAdd = () => {
    if (newTask.trim() && newDate && newTime) {
      onAdd(newTask.trim(), newDate, newTime, newPriority);
      setNewTask("");
      setNewDate("");
      setNewTime("");
      setNewPriority("media");
    }
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditDate(task.date);
    setEditTime(task.time);
    setEditPriority(task.priority);
    setEditDay(task.day || selectedDay || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditDate("");
    setEditTime("");
    setEditPriority("media");
    setEditDay("");
  };

  const saveEdit = () => {
    if (editingId && editText.trim() && editDate && editTime && editDay) {
      console.log("TaskList saveEdit", { id: editingId, text: editText, date: editDate, time: editTime, priority: editPriority, day: editDay });
      onEdit(editingId, editText.trim(), editDate, editTime, editPriority, editDay);
      cancelEdit();
    } else {
      console.log("TaskList saveEdit skipped", { editingId, editText, editDate, editTime, editPriority, editDay });
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
                <div className="space-y-2 w-full">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-muted/50 rounded-lg px-2 py-1 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
                    autoFocus
                  />

                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="flex-1 bg-muted/50 rounded-lg px-2 py-1.5 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="time"
                      value={editTime}
                      onChange={(e) => setEditTime(e.target.value)}
                      className="flex-1 bg-muted/50 rounded-lg px-2 py-1.5 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                    />
                    <select
                      value={editDay}
                      onChange={(e) => setEditDay(e.target.value)}
                      className="flex-1 bg-muted/50 rounded-lg px-2 py-1.5 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                    >
                      {days.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-1.5">
                    {(["alta", "media", "baja"] as Priority[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => setEditPriority(p)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                          editPriority === p
                            ? priorityConfig[p].bg + " ring-1 ring-offset-1"
                            : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
                        }`}
                        type="button"
                      >
                        {priorityConfig[p].label}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="px-3 py-1 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                      type="button"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                      type="button"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-sm transition-all ${
                        task.done ? "line-through text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {task.text}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-semibold ${priorityConfig[task.priority].bg}`}>
                      {priorityConfig[task.priority].label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <CalendarDays className="w-3 h-3" />
                      {formatDate(task.date)}
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {task.time}
                    </span>
                  </div>
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
              required
              className="flex-1 bg-muted/50 rounded-lg px-2 py-1.5 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-1 flex-1">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              required
              className="flex-1 bg-muted/50 rounded-lg px-2 py-1.5 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <Flag className="w-3.5 h-3.5 text-muted-foreground" />
          <div className="flex gap-1.5 flex-1">
            {(["alta", "media", "baja"] as Priority[]).map((p) => (
              <button
                key={p}
                onClick={() => setNewPriority(p)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                  newPriority === p
                    ? priorityConfig[p].bg + " ring-1 ring-offset-1"
                    : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
                }`}
              >
                {priorityConfig[p].label}
              </button>
            ))}
          </div>
          <button
            onClick={handleAdd}
            disabled={!newTask.trim() || !newDate || !newTime}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
