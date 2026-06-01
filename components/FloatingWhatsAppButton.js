'use client';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsAppButton() {
  const handleClick = () => {
    window.open('https://wa.me/919944948699?text=Hi%20Siva%20Catering%2C%20I%20want%20to%20know%20more%20about%20your%20catering%20services.', '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-shadow duration-300"
      style={{ boxShadow: '0 0 20px rgba(37, 211, 102, 0.5)' }}
    >
      <FaWhatsapp size={28} />
    </motion.button>
  );
}