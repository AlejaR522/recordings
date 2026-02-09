import { useState } from "react";

const options = ["0-3", "4-6", "7-9", "10-12"];

const SleepTracker = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-lg font-bold text-foreground mb-3">😴 Horas de sueño</h3>
      <div className="flex flex-col gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected === opt
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-foreground hover:bg-muted"
            }`}
          >
            {opt} horas
          </button>
        ))}
      </div>
    </div>
  );
};

export default SleepTracker;
