'use client';
import { motion } from 'framer-motion';

export default function LuxuryVideoSection() {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif golden-text mb-4">Experience Luxury Catering</h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Experience the art of fine dining with Siva Catering
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden group relative"
        >
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=500&fit=crop"
            alt="Luxury Catering"
            className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end pb-16">
            <h3 className="text-2xl md:text-3xl font-serif golden-text mb-2">Premium Catering Experience</h3>
            <p className="text-gray-300 text-center px-4">From grand weddings to corporate galas, we make every event special</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}