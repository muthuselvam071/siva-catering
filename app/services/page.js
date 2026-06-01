'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaRing, FaBuilding, FaBirthdayCake, FaTree, FaCrown, FaFire, FaDrumstickBite, FaTruck } from 'react-icons/fa';

const services = [
  {
    icon: FaRing,
    title: 'Wedding Catering',
    description: 'Grand wedding feasts with traditional South Indian spread, live counters, and exquisite presentation.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
  },
  {
    icon: FaBuilding,
    title: 'Corporate Events',
    description: 'Professional catering for conferences, board meetings, and corporate galas with premium menus.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
  },
  {
    icon: FaBirthdayCake,
    title: 'Birthday Parties',
    description: 'Customized menus for birthday celebrations with special kids\' options and dessert bars.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3',
  },
  {
    icon: FaTree,
    title: 'Outdoor Catering',
    description: 'Full-service outdoor catering with complete setup, staff, and equipment for any location.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a',
  },
  {
    icon: FaCrown,
    title: 'VIP Dining',
    description: 'Exclusive fine dining experience with personalized menus and premium service.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
  },
  {
    icon: FaFire,
    title: 'Live Cooking Stations',
    description: 'Interactive live counters with chefs preparing fresh dishes right before your guests.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
  },
 
  {
    icon: FaTruck,
    title: 'Catering Supplier Services',
    description: 'Bulk supply of premium food items for events, restaurants, and businesses.',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif golden-text mb-4">Our Services</h1>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Comprehensive catering solutions for every occasion, delivered with luxury and excellence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card rounded-2xl overflow-hidden group"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 z-10">
                  <service.icon className="text-3xl text-gold" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif golden-text mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-4xl font-serif golden-text mb-8">Why Choose Siva Catering?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Hygienic Food', desc: 'Strict quality & safety standards' },
              { title: 'Premium Ingredients', desc: 'Fresh, high-quality produce' },
              { title: 'Expert Chefs', desc: 'Experienced culinary masters' },
              { title: 'On-Time Delivery', desc: 'Punctual & reliable service' }
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-serif golden-text mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}