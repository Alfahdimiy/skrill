import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-skrill-purple flex flex-col items-center justify-center z-[100] overflow-hidden">
      {/* Concentric Diamond Background Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 4, opacity: [0, 0.1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
            className="absolute w-64 h-64 border-[40px] border-white/20 rotate-45"
          />
        ))}
      </div>

      {/* Logo Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="flex items-center space-x-2">
          <div className="flex flex-col -space-y-1">
            <div className="w-4 h-4 bg-white rotate-45 transform origin-center translate-y-1"></div>
            <div className="w-4 h-4 bg-white rotate-45 transform origin-center -translate-y-1"></div>
          </div>
          <h1 className="text-white text-6xl font-bold tracking-tighter">Skrill</h1>
        </div>
      </motion.div>

      {/* Bottom Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center space-y-1"
      >
        <p className="text-white/60 text-[10px] uppercase tracking-widest">Powered by</p>
        <div className="flex items-center space-x-1">
          <div className="flex flex-col -space-y-0.5">
            <div className="w-2 h-2 bg-white rotate-45"></div>
            <div className="w-2 h-2 bg-white rotate-45"></div>
          </div>
          <span className="text-white font-bold text-lg">Paysafe</span>
        </div>
      </motion.div>
    </div>
  );
};
