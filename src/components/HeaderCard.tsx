import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import type { MoodKey } from "./MoodTracker";

const quotesByMood: Record<MoodKey, string[]> = {
  sad: [
    "Está bien no estar bien. Mañana será un nuevo día 💙",
    "Las lágrimas limpian el alma, permítete sentir 🌧️",
    "Eres valiente por seguir adelante incluso en días difíciles 💪",
  ],
  anxious: [
    "Respira profundo, este momento pasará 🌬️",
    "No tienes que resolverlo todo hoy, un paso a la vez 🌿",
    "La calma está dentro de ti, solo necesitas encontrarla 🧘",
  ],
  neutral: [
    "Cada día es una nueva oportunidad para crecer 🌱",
    "A veces lo neutral es el equilibrio perfecto ⚖️",
    "Hoy es un buen día para ser amable contigo 💫",
  ],
  good: [
    "¡Qué bueno que te sientes bien! Aprovecha la energía 🌟",
    "Tu sonrisa ilumina el mundo, sigue así 😊",
    "Mereces toda la felicidad que sientes hoy 🌻",
  ],
  great: [
    "¡Esa energía es contagiosa! Compártela con el mundo 🎉",
    "Hoy brillas con luz propia, eres increíble ✨",
    "¡Nada puede detenerte hoy! Eres imparable 🚀",
  ],
};

const defaultQuotes = [
  "Cada día es una nueva oportunidad para crecer 🌱",
  "Tu salud mental es una prioridad 💜",
  "Eres más fuerte de lo que crees ✨",
  "Un paso a la vez, vas por buen camino 🌈",
];

interface HeaderCardProps {
  mood?: MoodKey | null;
}

const HeaderCard = ({ mood }: HeaderCardProps) => {
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState(() => defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mood) {
      const moodQuotes = quotesByMood[mood];
      setQuote(moodQuotes[Math.floor(Math.random() * moodQuotes.length)]);
    }
  }, [mood]);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="gradient-header rounded-3xl p-6 text-primary-foreground text-center shadow-xl"
    >
      <h1 className="font-display text-3xl md:text-4xl mb-1">Mi Salud Mental</h1>
      <p className="font-display text-lg opacity-90 mb-4">plantilla de seguimiento</p>

      <div className="flex items-center justify-center gap-6 text-sm opacity-90 mb-4">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {formatDate(time)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {formatTime(time)}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={quote}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-base md:text-lg font-medium italic bg-primary-foreground/15 rounded-xl px-4 py-3"
        >
          {quote}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

export default HeaderCard;
