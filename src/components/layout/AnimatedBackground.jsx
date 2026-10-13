
import { motion, useReducedMotion } from "framer-motion";

function AnimatedBackground() {
  const reduceMotion = useReducedMotion();

  const orbs = [
    {
      className: "ambient-orb ambient-orb-purple",
      size: 330,
      x: ["-5%", "8%", "-5%"],
      y: ["0%", "10%", "0%"],
      duration: 18,
    },
    {
      className: "ambient-orb ambient-orb-blue",
      size: 380,
      x: ["0%", "-10%", "0%"],
      y: ["-5%", "8%", "-5%"],
      duration: 22,
    },
    {
      className: "ambient-orb ambient-orb-pink",
      size: 300,
      x: ["5%", "-8%", "5%"],
      y: ["0%", "-12%", "0%"],
      duration: 20,
    },
    {
      className: "ambient-orb ambient-orb-mint",
      size: 240,
      x: ["0%", "12%", "0%"],
      y: ["5%", "-8%", "5%"],
      duration: 16,
    },
  ];

  return (
    <div className="animated-background" aria-hidden="true">
      {orbs.map((orb, index) => (
        <motion.div
          key={orb.className}
          className={orb.className}
          style={{
            width: orb.size,
            height: orb.size,
          }}
          initial={{ opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0.35 }
              : {
                  opacity: [0.3, 0.65, 0.3],
                  x: orb.x,
                  y: orb.y,
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: orb.duration,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
            delay: index * 0.8,
          }}
        />
      ))}

      <div className="ambient-grid" />
    </div>
  );
}
export default AnimatedBackground;
