'use client';
import { motion } from 'framer-motion';
import { FaStar, FaFire, FaLeaf } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const dishes = [
  { name: 'Mutton Chukka', isSignature: true, category: 'Non-Veg' },
  { name: 'Chicken Chukka', isSignature: true, category: 'Non-Veg' },
  { name: 'Pepper Chicken', isSignature: true, category: 'Non-Veg' },
  { name: 'Briyani Specials', isSignature: true, category: 'Non-Veg' },
  { name: 'BBQ Chicken', isSignature: false, category: 'Non-Veg' },
  { name: 'South Indian Meals', isSignature: false, category: 'Veg' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function FeaturedDishes() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif golden-text mb-4">Signature Dishes</h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Experience our most celebrated creations, crafted with premium ingredients and traditional recipes
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {dishes.map((dish, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Colored Top Bar */}
              <div className={`h-2 w-full ${dish.category === 'Non-Veg' ? 'bg-red-600' : 'bg-green-600'}`}></div>
              
              {/* Content - No Image */}
              <div className="p-8 text-center">
                {/* Category Icon */}
                <div className="flex justify-center mb-4">
                  {dish.category === 'Non-Veg' ? (
                    <FaFire className="text-red-500 text-3xl" />
                  ) : (
                    <FaLeaf className="text-green-500 text-3xl" />
                  )}
                </div>
                
                {/* Signature Badge */}
                {dish.isSignature && (
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-gold to-gold-light text-black px-3 py-1 rounded-full text-xs font-bold mb-4">
                    <FaStar className="text-sm" />
                    Signature Dish
                  </div>
                )}
                
                {/* Dish Name */}
                <h3 className="text-2xl font-serif golden-text group-hover:text-gold-light transition-colors">
                  {dish.name}
                </h3>
                
                {/* Golden Underline */}
                <div className="w-12 h-0.5 bg-gold/50 mx-auto mt-4 group-hover:w-24 transition-all duration-300"></div>
                
                {/* Category Label */}
                <p className="text-gray-500 text-xs mt-4">
                  {dish.category}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Full Menu Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => window.location.href = '/menu'}
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium border-2 border-gold rounded-full shadow-2xl"
          >
            <span className="relative text-gold group-hover:text-black transition-colors duration-300">
              View Full Menu
            </span>
            <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-10"></span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}