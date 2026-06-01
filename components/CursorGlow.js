'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 hidden md:block"
      animate={{ x: mousePosition.x - 150, y: mousePosition.y - 150 }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
    >
      <div className="w-72 h-72 rounded-full bg-gold/10 blur-3xl"></div>
    </motion.div>
  );
}