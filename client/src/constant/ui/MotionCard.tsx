import { motion } from "framer-motion";

export const MotionCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="glass-panel rounded-2xl p-6 glow"
    >
      {children}
    </motion.div>
  );
};