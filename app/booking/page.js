'use client';
import BookingForm from '@/components/BookingForm';
import { motion } from 'framer-motion';

export default function BookingPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif golden-text mb-4">Book Your Event</h1>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Let's create an unforgettable culinary experience for your special occasion
          </p>
        </motion.div>
        
        <BookingForm />
      </div>
    </div>
  );
}