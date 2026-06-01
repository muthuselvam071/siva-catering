'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaPlay, FaTimes } from 'react-icons/fa';

const galleryCategories = [
  'All',
  'Weddings',
  'Corporate Events',
  'Birthday Parties',
  'Outdoor Catering',
  'Buffet Setup',
  'VIP Events',
  'Live Cooking',
  'Traditional Events'
];

const galleryItems = [
  { id: 1, category: 'Weddings', type: 'image', src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed', title: 'Grand Wedding Reception' },
  { id: 2, category: 'Weddings', type: 'image', src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6', title: 'Wedding Buffet Setup' },
  { id: 3, category: 'Corporate Events', type: 'image', src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622', title: 'Corporate Gala Dinner' },
  { id: 4, category: 'Live Cooking', type: 'image', src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', title: 'Live BBQ Station' },
  { id: 5, category: 'Buffet Setup', type: 'image', src: 'https://images.unsplash.com/photo-1555244162-803834f70033', title: 'Luxury Buffet Spread' },
  { id: 6, category: 'Traditional Events', type: 'image', src: 'https://images.unsplash.com/photo-1563379091339-03b21dd4a433', title: 'Traditional Banana Leaf Meal' },
  { id: 7, category: 'Birthday Parties', type: 'image', src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3', title: 'Birthday Celebration' },
  { id: 8, category: 'VIP Events', type: 'image', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0', title: 'VIP Dining Experience' },
  { id: 9, category: 'Outdoor Catering', type: 'image', src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a', title: 'Outdoor Catering Setup' },
  { id: 10, category: 'Weddings', type: 'image', src: 'https://images.unsplash.com/photo-1505236275273-5b2064861daa', title: 'Wedding Decor & Food' },
  { id: 11, category: 'Live Cooking', type: 'image', src: 'https://images.unsplash.com/photo-1556911220-bff31c812dba', title: 'Chef at Work' },
  { id: 12, category: 'Buffet Setup', type: 'image', src: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330', title: 'Breakfast Buffet' }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = galleryItems.filter(
    item => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif golden-text mb-4">Our Gallery</h1>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A visual journey through our finest culinary presentations and events
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {galleryCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full transition-all duration-300 text-sm ${
                activeCategory === category
                  ? 'bg-gold text-black font-semibold'
                  : 'bg-gold/20 text-gold hover:bg-gold/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedItem(item)}
                className="relative group cursor-pointer overflow-hidden rounded-2xl break-inside-avoid"
              >
                <div className="relative">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl font-serif">{item.title}</h3>
                      <p className="text-gold text-sm mt-1">{item.category}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 rounded-full bg-gold/80 flex items-center justify-center">
                      <FaPlay className="text-black text-2xl ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 text-white hover:text-gold transition-colors z-10"
              >
                <FaTimes size={24} />
              </button>
              <Image
                src={selectedItem.src}
                alt={selectedItem.title}
                width={1200}
                height={800}
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent rounded-b-2xl">
                <h3 className="text-2xl font-serif golden-text">{selectedItem.title}</h3>
                <p className="text-gray-300">{selectedItem.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}