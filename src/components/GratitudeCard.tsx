import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Check } from "lucide-react";

const GratitudeCard = () => {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (text.trim()) setSaved(true);
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-lg font-bold text-foreground mb-3">
        🙏 Cosas que agradezco hoy
      </h3>
      {saved ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-muted/50 rounded-xl p-3 text-sm text-foreground relative group"
        >
          <p className="whitespace-pre-wrap">{text}</p>
          <button
            onClick={() => setSaved(false)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-muted transition-all"
          >
            <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </motion.div>
      ) : (
        <div className="space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe aquí lo que agradeces hoy..."
            rows={3}
            className="w-full bg-muted/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary resize-none"
          />
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity"
          >
            <Check className="w-3.5 h-3.5" /> Guardar
          </button>
        </div>
      )}
    </div>
  );
};

export default GratitudeCard;
