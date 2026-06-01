'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { FaAward, FaUtensils, FaHeart, FaLeaf, FaUsers, FaChefHat, FaMedal, FaStar, FaClock } from 'react-icons/fa';
import AnimatedButton from '@/components/AnimatedButton';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function AboutPage() {
  const ref = useRef(null);

  const timelineEvents = [
    { year: '2010', title: 'Humble Beginnings', description: 'Started as a small family kitchen in Jambai, serving authentic South Indian cuisine' },
    { year: '2013', title: 'First Major Event', description: 'Catered our first 500-guest wedding ceremony with overwhelming appreciation' },
    { year: '2016', title: 'Luxury Expansion', description: 'Launched premium catering services for high-end weddings and corporate events' },
    { year: '2019', title: 'Culinary Excellence Award', description: 'Recognized as the Best Caterer in Erode District' },
    { year: '2022', title: 'State Recognition', description: 'Expanded operations across Tamil Nadu with 50+ team members' },
    { year: '2024', title: 'Present Day', description: 'Leading luxury caterer with 1000+ successful events' }
  ];

  const certifications = [
    { icon: FaMedal, title: 'FSSAI Certified', description: 'Highest food safety standards' },
    { icon: FaAward, title: 'Best Caterer 2023', description: 'Erode District Excellence Award' },
    { icon: FaStar, title: '5-Star Rated', description: '100+ 5-star customer reviews' },
    { icon: FaClock, title: '10+ Years', description: 'Of culinary excellence' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 hero-gradient z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555244162-803834f70033')] bg-cover bg-center animate-slow-zoom"></div>
        <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif mb-6 golden-text">Our Story</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              A journey of passion, tradition, and culinary excellence
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.1 }}
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif golden-text">Our Philosophy</h2>
            <p className="text-gray-300 leading-relaxed">
              At Siva Catering, we believe that food is not just sustenance—it's an experience, a celebration, and a memory. 
              For over a decade, we've been crafting culinary masterpieces that bring people together and create unforgettable moments.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our journey began in the heart of Jambai, Erode District, where traditional South Indian flavors meet modern 
              culinary techniques. We've grown from a small family kitchen to one of Tamil Nadu's most sought-after luxury 
              catering services, serving over 1000+ successful events.
            </p>
            <AnimatedButton href="/booking" variant="primary">Book Your Event</AnimatedButton>
          </motion.div>
          <motion.div variants={fadeInUp} className="relative h-[400px] rounded-2xl overflow-hidden glass-card">
            <Image 
              src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
              alt="Culinary Excellence"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Certifications */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="glass-card p-6 text-center rounded-xl"
            >
              <cert.icon className="text-4xl text-gold mx-auto mb-4" />
              <h3 className="text-xl font-serif mb-2">{cert.title}</h3>
              <p className="text-gray-400 text-sm">{cert.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div variants={fadeInUp} className="mb-20">
          <h2 className="text-4xl font-serif golden-text text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px w-0.5 h-full bg-gradient-to-b from-gold via-gold-light to-transparent"></div>
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                  <div className="flex-1">
                    <div className="glass-card p-6 rounded-xl">
                      <h3 className="text-2xl font-serif golden-text">{event.title}</h3>
                      <p className="text-gray-400 mt-2">{event.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-black font-bold">
                      {event.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section - Master Chef Siva Kumar (No Photo) */}
        <motion.div variants={fadeInUp}>
          <h2 className="text-4xl font-serif golden-text text-center mb-12">Meet Our Master Chef</h2>
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card rounded-xl overflow-hidden p-8">
              <div className="relative z-20">
                <h3 className="text-3xl font-serif golden-text mb-2">Chef Siva Kumar</h3>
                <p className="text-gold-light text-md mb-3">Master Chef & Founder</p>
                <p className="text-gray-400 text-sm mb-4">15+ Years of Culinary Excellence</p>
                <div className="w-20 h-0.5 bg-gold mx-auto mb-6"></div>
                <p className="text-gray-300 text-md leading-relaxed max-w-xl mx-auto">
                  Master Chef Siva Kumar is the heart and soul behind Siva Catering. With over 15 years of culinary excellence, 
                  he specializes in authentic South Indian non-veg delicacies. His passion for traditional cooking methods and 
                  premium quality ingredients has made Siva Catering a luxury brand in Erode District.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}