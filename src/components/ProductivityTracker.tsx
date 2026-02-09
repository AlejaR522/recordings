import { useState } from "react";
import { Star } from "lucide-react";

const ProductivityTracker = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-lg font-bold text-foreground mb-3">⭐ Productividad</h3>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-7 h-7 ${
                star <= rating
                  ? "fill-warning text-warning"
                  : "text-muted-foreground/30"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductivityTracker;
