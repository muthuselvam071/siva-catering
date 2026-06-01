// components/ChefCard.js
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaInstagram, FaFacebook, FaTwitter, FaChefHat } from 'react-icons/fa';

export default function ChefCard({ chef, index }) {
  const socialLinks = [
    { icon: FaInstagram, link: '#' },
    { icon: FaFacebook, link: '#' },
    { icon: FaTwitter, link: '#' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="glass-card rounded-2xl overflow-hidden group"
    >
      {/* Chef Image Container */}
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Chef Image */}
        <Image
          src={chef.image}
          alt={chef.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Chef Badge */}
        <div className="absolute top-4 left-4 z-20 bg-gold/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
          <FaChefHat className="text-black text-sm" />
          <span className="text-black text-xs font-semibold">Master Chef</span>
        </div>
        
        {/* Experience Badge */}
        <div className="absolute bottom-4 right-4 z-20 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-gold text-xs font-semibold">{chef.experience}+ Years</span>
        </div>
      </div>
      
      {/* Chef Info */}
      <div className="p-6 text-center">
        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="text-2xl font-serif golden-text mb-1"
        >
          {chef.name}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="text-gold-light text-sm mb-3"
        >
          {chef.role}
        </motion.p>
        
        {/* Speciality Tags */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="flex flex-wrap gap-2 justify-center mb-4"
        >
          {chef.specialities?.map((speciality, i) => (
            <span 
              key={i}
              className="text-xs bg-gold/10 border border-gold/30 rounded-full px-2 py-1 text-gray-300"
            >
              {speciality}
            </span>
          ))}
        </motion.div>
        
        {/* Bio */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="text-gray-400 text-sm mb-4 line-clamp-3"
        >
          {chef.bio}
        </motion.p>
        
        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.6 }}
          className="flex justify-center gap-3"
        >
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.link}
              className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center hover:bg-gold transition-colors duration-300 group"
            >
              <social.icon className="text-gold text-sm group-hover:text-black transition-colors" />
            </a>
          ))}
        </motion.div>
      </div>
      
      {/* Golden Line Animation on Hover */}
      <motion.div 
        className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}