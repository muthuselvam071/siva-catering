// components/ImageLightbox.js
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  FaTimes, 
  FaChevronLeft, 
  FaChevronRight, 
  FaDownload, 
  FaShare, 
  FaHeart,
  FaExpand,
  FaCompress,
  FaPlay
} from 'react-icons/fa';

export default function ImageLightbox({ 
  items, 
  initialIndex = 0, 
  isOpen, 
  onClose 
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [likedItems, setLikedItems] = useState([]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const currentItem = items[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          navigatePrev();
          break;
        case 'ArrowRight':
          navigateNext();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scroll when lightbox is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex]);

  const navigatePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    setIsZoomed(false);
  };

  const navigateNext = () => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - next
      navigateNext();
    }
    if (touchStart - touchEnd < -50) {
      // Swipe right - prev
      navigatePrev();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleLike = () => {
    if (likedItems.includes(currentIndex)) {
      setLikedItems(likedItems.filter(i => i !== currentIndex));
    } else {
      setLikedItems([...likedItems, currentIndex]);
    }
  };

  const handleDownload = async () => {
    if (currentItem.type === 'image') {
      try {
        const response = await fetch(currentItem.src);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `siva-catering-${currentItem.title || 'image'}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
        window.open(currentItem.src, '_blank');
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentItem.title,
          text: `Check out this amazing ${currentItem.category} event by Siva Catering!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 text-white hover:text-gold transition-colors p-2"
      >
        <FaTimes size={28} />
      </button>

      {/* Navigation Buttons */}
      {items.length > 1 && (
        <>
          <button
            onClick={navigatePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-gold text-white hover:text-black w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={navigateNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-gold text-white hover:text-black w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          >
            <FaChevronRight size={24} />
          </button>
        </>
      )}

      {/* Counter */}
      <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
        <span className="text-gold font-semibold">{currentIndex + 1}</span>
        <span className="text-white"> / {items.length}</span>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
        <button
          onClick={handleLike}
          className="text-white hover:text-gold transition-colors p-2"
        >
          <FaHeart 
            size={20} 
            className={likedItems.includes(currentIndex) ? 'text-red-500 fill-red-500' : ''}
          />
        </button>
        <button
          onClick={handleDownload}
          className="text-white hover:text-gold transition-colors p-2"
        >
          <FaDownload size={20} />
        </button>
        <button
          onClick={handleShare}
          className="text-white hover:text-gold transition-colors p-2"
        >
          <FaShare size={20} />
        </button>
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="text-white hover:text-gold transition-colors p-2"
        >
          {isZoomed ? <FaCompress size={20} /> : <FaExpand size={20} />}
        </button>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative max-w-7xl w-full max-h-[85vh] mx-4"
      >
        {currentItem.type === 'video' ? (
          <div className="relative">
            <video
              src={currentItem.src}
              controls
              autoPlay
              className="w-full h-auto max-h-[85vh] rounded-2xl"
              poster={currentItem.thumbnail}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                <FaPlay className="text-gold text-3xl ml-1" />
              </div>
            </div>
          </div>
        ) : (
          <div 
            className={`flex items-center justify-center transition-transform duration-300 ${
              isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <Image
              src={currentItem.src}
              alt={currentItem.title || 'Gallery Image'}
              width={1200}
              height={800}
              className={`w-auto h-auto max-h-[85vh] rounded-2xl transition-transform duration-300 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent rounded-b-2xl">
          <h3 className="text-2xl font-serif golden-text mb-1">
            {currentItem.title}
          </h3>
          <p className="text-gold-light text-sm mb-2">{currentItem.category}</p>
          {currentItem.description && (
            <p className="text-gray-300 text-sm max-w-2xl">{currentItem.description}</p>
          )}
          {currentItem.date && (
            <p className="text-gray-400 text-xs mt-2">{currentItem.date}</p>
          )}
        </div>
      </motion.div>

      {/* Thumbnail Strip */}
      {items.length > 1 && (
        <div className="absolute bottom-20 left-0 right-0 z-20 overflow-x-auto pb-4">
          <div className="flex gap-2 justify-center px-4">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsZoomed(false);
                }}
                className={`relative flex-shrink-0 transition-all duration-300 ${
                  idx === currentIndex
                    ? 'ring-2 ring-gold scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  {item.type === 'video' ? (
                    <div className="relative w-full h-full bg-black/50 flex items-center justify-center">
                      <FaPlay className="text-white text-sm" />
                    </div>
                  ) : (
                    <Image
                      src={item.src}
                      alt={`Thumbnail ${idx + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}