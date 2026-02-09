import { useState } from "react";
import { Check } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ChecklistCardProps {
  title: string;
  items: ChecklistItem[];
  onToggle: (id: string) => void;
  emoji?: string;
}

const ChecklistCard = ({ title, items, onToggle, emoji }: ChecklistCardProps) => {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-lg font-bold text-foreground mb-3">
        {emoji && <span className="mr-2">{emoji}</span>}
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onToggle(item.id)}
            className="flex items-center gap-3 w-full text-left group"
          >
            <div
              className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                item.checked
                  ? "bg-primary border-primary"
                  : "border-muted-foreground/40 group-hover:border-primary"
              }`}
            >
              {item.checked && <Check className="w-3 h-3 text-primary-foreground" />}
            </div>
            <span
              className={`text-sm transition-all ${
                item.checked ? "line-through text-muted-foreground" : "text-foreground"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChecklistCard;
