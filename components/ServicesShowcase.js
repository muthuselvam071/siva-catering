'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaRing, FaBuilding, FaBirthdayCake, FaTree, FaCrown, FaFire } from 'react-icons/fa';
import AnimatedButton from './AnimatedButton';

const services = [
  { icon: FaRing, title: 'Wedding Catering', description: 'Grand wedding feasts with traditional spreads and live counters' },
  { icon: FaBuilding, title: 'Corporate Events', description: 'Professional catering for conferences and galas' },
  { icon: FaBirthdayCake, title: 'Birthday Parties', description: 'Customized menus with special kids\' options' },
  { icon: FaTree, title: 'Outdoor Catering', description: 'Full-service setup at any location' },
  { icon: FaCrown, title: 'VIP Dining', description: 'Exclusive fine dining experience' },
  { icon: FaFire, title: 'Live Cooking Stations', description: 'Interactive live counters with expert chefs' },
];

export default function ServicesShowcase() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 px-6 bg-gradient-to-b from-black to-gold/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif golden-text mb-4">Our Services</h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Comprehensive catering solutions for every occasion
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-card p-8 rounded-2xl text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold transition-colors duration-300">
                <service.icon className="text-3xl text-gold group-hover:text-black transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-serif golden-text mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{service.description}</p>
              <AnimatedButton href="/services" variant="secondary" className="text-sm px-6 py-2">
                Learn More
              </AnimatedButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}