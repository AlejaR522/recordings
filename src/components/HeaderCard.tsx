import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

const quotes = [
  "Cada día es una nueva oportunidad para crecer 🌱",
  "Tu salud mental es una prioridad 💜",
  "Eres más fuerte de lo que crees ✨",
  "Un paso a la vez, vas por buen camino 🌈",
  "Respira profundo, todo estará bien 🌸",
  "Mereces paz y felicidad 🦋",
  "Hoy es un buen día para ser amable contigo 💫",
  "Celebra cada pequeño logro 🎉",
  "Tu bienestar importa, cuídate mucho 🌻",
  "Confía en el proceso, confía en ti 🌟",
];

const HeaderCard = () => {
  const [time, setTime] = useState(new Date());
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

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

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-base md:text-lg font-medium italic bg-primary-foreground/15 rounded-xl px-4 py-3"
      >
        {quote}
      </motion.p>
    </motion.div>
  );
};

export default HeaderCard;
