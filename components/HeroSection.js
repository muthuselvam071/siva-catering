'use client';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaCalendarAlt } from 'react-icons/fa';
import AnimatedButton from './AnimatedButton';

export default function HeroSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=80')" }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
            Siva Catering
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-4"
        >
          Luxury Non-Veg Catering Experience in Jambai, Erode District
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg text-gold-light mb-8"
        >
          Authentic Taste • Hygienic Cooking • Premium Event Catering
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <AnimatedButton href="/booking" variant="primary" icon={FaCalendarAlt}>
            Book Event
          </AnimatedButton>
          <AnimatedButton 
            href="https://wa.me/919944948699" 
            variant="whatsapp" 
            icon={FaWhatsapp}
            external
          >
            WhatsApp Booking
          </AnimatedButton>
        </motion.div>
      </div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  );
}