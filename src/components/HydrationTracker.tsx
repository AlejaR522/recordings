import { useState } from "react";
import { Droplets } from "lucide-react";

const HydrationTracker = () => {
  const [glasses, setGlasses] = useState(0);
  const max = 8;

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-lg font-bold text-foreground mb-3">
        <Droplets className="w-5 h-5 inline mr-2 text-secondary" />
        Nivel de hidratación
      </h3>
      <div className="flex gap-1.5 flex-wrap">
        {Array.from({ length: max }).map((_, i) => (
          <button
            key={i}
            onClick={() => setGlasses(i + 1 === glasses ? i : i + 1)}
            className={`w-8 h-10 rounded-lg transition-all text-lg ${
              i < glasses
                ? "bg-secondary text-secondary-foreground scale-105"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            💧
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">{glasses}/{max} vasos</p>
    </div>
  );
};

export default HydrationTracker;
