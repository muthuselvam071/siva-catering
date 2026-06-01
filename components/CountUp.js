'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function CountUp({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const springValue = useSpring(0, { damping: 30, stiffness: 100 });
  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    springValue.set(end);
    const unsubscribe = displayValue.onChange(setCount);
    return () => unsubscribe();
  }, [springValue, displayValue, end]);

  return (
    <motion.span>
      {count.toLocaleString()}{suffix}
    </motion.span>
  );
}