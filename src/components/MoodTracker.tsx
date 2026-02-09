import { useState } from "react";

const moods = [
  { emoji: "😢", label: "Triste", key: "sad" },
  { emoji: "😟", label: "Ansioso", key: "anxious" },
  { emoji: "😐", label: "Neutral", key: "neutral" },
  { emoji: "🙂", label: "Bien", key: "good" },
  { emoji: "😄", label: "Genial", key: "great" },
] as const;

export type MoodKey = (typeof moods)[number]["key"];

interface MoodTrackerProps {
  onMoodChange?: (mood: MoodKey) => void;
}

const MoodTracker = ({ onMoodChange }: MoodTrackerProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    setSelected(i);
    onMoodChange?.(moods[i].key);
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-lg font-bold text-foreground mb-3">Mi estado de ánimo</h3>
      <div className="flex gap-2 justify-between">
        {moods.map((mood, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              selected === i
                ? "bg-accent scale-110 shadow-md"
                : "hover:bg-muted"
            }`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-[10px] text-muted-foreground">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
