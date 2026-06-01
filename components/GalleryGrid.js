// components/GalleryGrid.js
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaPlay, FaTimes, FaExpand, FaHeart, FaShare } from 'react-icons/fa';

export default function GalleryGrid({ items, categories }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [likedItems, setLikedItems] = useState([]);

  const filteredItems = items.filter(
    item => activeCategory === 'All' || item.category === activeCategory
  );

  const handleLike = (itemId, e) => {
    e.stopPropagation();
    if (likedItems.includes(itemId)) {
      setLikedItems(likedItems.filter(id => id !== itemId));
    } else {
      setLikedItems([...likedItems, itemId]);
    }
  };

  const handleShare = async (item, e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Check out this amazing ${item.category} event by Siva Catering!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div>
      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
              activeCategory === category
                ? 'bg-gold text-black shadow-lg shadow-gold/30'
                : 'bg-gold/10 text-gold hover:bg-gold/30 border border-gold/30'
            }`}
          >
            {category}
            {category !== 'All' && (
              <span className="ml-2 text-xs opacity-70">
                ({items.filter(i => i.category === category).length})
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Masonry Grid Layout */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl break-inside-avoid"
              onClick={() => setSelectedItem(item)}
            >
              {/* Image Container */}
              <div className="relative">
                {item.type === 'video' ? (
                  <div className="relative">
                    <video
                      src={item.src}
                      className="w-full h-auto object-cover"
                      poster={item.thumbnail}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center">
                        <FaPlay className="text-black text-xl ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={600}
                    height={item.height || 400}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                )}

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-lg font-serif mb-1">{item.title}</h3>
                    <p className="text-gold text-sm mb-3">{item.category}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => handleLike(item.id, e)}
                        className="flex items-center gap-1 text-white hover:text-gold transition-colors"
                      >
                        <FaHeart className={likedItems.includes(item.id) ? 'text-red-500' : ''} />
                        <span className="text-xs">{(item.likes || 0) + (likedItems.includes(item.id) ? 1 : 0)}</span>
                      </button>
                      <button
                        onClick={(e) => handleShare(item, e)}
                        className="flex items-center gap-1 text-white hover:text-gold transition-colors"
                      >
                        <FaShare className="text-sm" />
                        <span className="text-xs">Share</span>
                      </button>
                      <button className="flex items-center gap-1 text-white hover:text-gold transition-colors ml-auto">
                        <FaExpand className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-gold/90 backdrop-blur-sm rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-black text-xs font-semibold">{item.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-2xl font-serif golden-text mb-2">No Images Found</h3>
          <p className="text-gray-400">Try selecting a different category</p>
        </motion.div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 text-white hover:text-gold transition-colors z-10"
              >
                <FaTimes size={28} />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredItems.findIndex(i => i.id === selectedItem.id);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
                  setSelectedItem(filteredItems[prevIndex]);
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-gold text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
              >
                ←
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredItems.findIndex(i => i.id === selectedItem.id);
                  const nextIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
                  setSelectedItem(filteredItems[nextIndex]);
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-gold text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
              >
                →
              </button>

              {/* Media Display */}
              {selectedItem.type === 'video' ? (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[80vh] rounded-2xl"
                />
              ) : (
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                />
              )}

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent rounded-b-2xl">
                <h3 className="text-2xl font-serif golden-text mb-1">{selectedItem.title}</h3>
                <p className="text-gray-300">{selectedItem.category}</p>
                {selectedItem.description && (
                  <p className="text-gray-400 text-sm mt-2">{selectedItem.description}</p>
                )}
                <div className="flex gap-4 mt-3">
                  <button
                    onClick={(e) => handleLike(selectedItem.id, e)}
                    className="flex items-center gap-2 text-white hover:text-gold transition-colors"
                  >
                    <FaHeart className={likedItems.includes(selectedItem.id) ? 'text-red-500' : ''} size={20} />
                    <span>{(selectedItem.likes || 0) + (likedItems.includes(selectedItem.id) ? 1 : 0)} Likes</span>
                  </button>
                  <button
                    onClick={(e) => handleShare(selectedItem, e)}
                    className="flex items-center gap-2 text-white hover:text-gold transition-colors"
                  >
                    <FaShare size={18} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}