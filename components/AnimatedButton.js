'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnimatedButton({ children, href, variant = 'primary', icon: Icon, external = false, className = '' }) {
  const variants = {
    primary: 'bg-gold text-black hover:bg-gold-light',
    secondary: 'border-2 border-gold text-gold hover:bg-gold hover:text-black',
    whatsapp: 'bg-green-600 text-white hover:bg-green-700',
  };

  const baseClass = `px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${variants[variant]} ${className}`;

  if (external) {
    return (
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        {Icon && <Icon />}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link href={href} className={baseClass}>
        {Icon && <Icon />}
        {children}
      </Link>
    </motion.div>
  );
}