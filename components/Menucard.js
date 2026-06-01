// components/MenuCard.js
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  FaWhatsapp, 
  FaRupeeSign, 
  FaFire, 
  FaLeaf, 
  FaStar, 
  FaClock,
  FaInfoCircle,
  FaHeart,
  FaShare
} from 'react-icons/fa';

export default function MenuCard({ dish, index, onClick, onInquiry }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const getCategoryBadge = (category) => {
    if (category === 'Non-Veg') {
      return { color: 'bg-red-600', icon: FaFire, text: 'Non-Veg' };
    }
    return { color: 'bg-green-600', icon: FaLeaf, text: 'Veg' };
  };

  const categoryBadge = getCategoryBadge(dish.category);

  const getDifficultyLevel = (prepTime) => {
    if (prepTime <= 30) return 'Easy';
    if (prepTime <= 60) return 'Medium';
    return 'Expert';
  };

  const handleInquiry = (e) => {
    e.stopPropagation();
    const message = `Hi Siva Catering, I'm interested in ordering ${dish.name} (${dish.price}). Please share more details.`;
    window.open(`https://wa.me/919944948699?text=${encodeURIComponent(message)}`, '_blank');
    if (onInquiry) onInquiry(dish);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: dish.name,
          text: `Check out ${dish.name} from Siva Catering! ${dish.description}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`${dish.name} - ${dish.description}`);
      alert('Dish details copied!');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => {
          if (onClick) onClick(dish);
          setShowDetails(true);
        }}
        className="glass-card rounded-2xl overflow-hidden cursor-pointer group relative"
      >
        {/* Premium Badge for Signature Dishes */}
        {dish.isSignature && (
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <div className="bg-gradient-to-r from-gold to-gold-light text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <FaStar className="text-sm" />
              Signature
            </div>
          </div>
        )}

        {/* Discount Badge */}
        {dish.discount && (
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
              {dish.discount}% OFF
            </div>
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Category Badge */}
          <div className={`absolute top-4 right-4 ${categoryBadge.color} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg`}>
            <categoryBadge.icon className="text-xs" />
            {categoryBadge.text}
          </div>

          {/* Quick Actions Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button
              onClick={handleLike}
              className="bg-black/50 backdrop-blur-sm hover:bg-gold text-white hover:text-black p-2 rounded-full transition-all duration-300"
            >
              <FaHeart className={isLiked ? 'text-red-500 fill-red-500' : ''} />
            </button>
            <button
              onClick={handleShare}
              className="bg-black/50 backdrop-blur-sm hover:bg-gold text-white hover:text-black p-2 rounded-full transition-all duration-300"
            >
              <FaShare />
            </button>
            <button
              onClick={handleInquiry}
              className="bg-black/50 backdrop-blur-sm hover:bg-gold text-white hover:text-black p-2 rounded-full transition-all duration-300"
            >
              <FaWhatsapp />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-serif golden-text group-hover:text-gold-light transition-colors line-clamp-1">
              {dish.name}
            </h3>
            <div className="flex items-center gap-1 text-gold font-bold">
              <FaRupeeSign size={14} />
              <span className="text-lg">{dish.price}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {dish.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 mb-4 text-xs">
            {dish.prepTime && (
              <div className="flex items-center gap-1 text-gray-500">
                <FaClock className="text-gold" />
                <span>{dish.prepTime} mins</span>
              </div>
            )}
            {dish.calories && (
              <div className="flex items-center gap-1 text-gray-500">
                <span className="text-gold">🔥</span>
                <span>{dish.calories} cal</span>
              </div>
            )}
            {dish.rating && (
              <div className="flex items-center gap-1 text-gray-500">
                <FaStar className="text-yellow-500" />
                <span>{dish.rating}</span>
              </div>
            )}
            {dish.spiceLevel && (
              <div className="flex items-center gap-1 text-gray-500">
                <span className="text-red-500">🌶️</span>
                <span>{dish.spiceLevel}/5</span>
              </div>
            )}
          </div>

          {/* Ingredients Preview */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {dish.ingredients.slice(0, 3).map((ing, i) => (
                  <span key={i} className="text-xs bg-gold/10 text-gray-400 px-2 py-0.5 rounded-full">
                    {ing}
                  </span>
                ))}
                {dish.ingredients.length > 3 && (
                  <span className="text-xs text-gold">+{dish.ingredients.length - 3} more</span>
                )}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleInquiry}
              className="flex-1 bg-gold/20 hover:bg-gold text-gold hover:text-black border border-gold/50 hover:border-gold rounded-lg py-2.5 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <FaWhatsapp className="group-hover/btn:scale-110 transition-transform" />
              <span className="text-sm font-medium">Inquire Now</span>
            </button>
            <button
              onClick={() => setShowDetails(true)}
              className="px-4 bg-black/50 hover:bg-gold/20 text-gold border border-gold/30 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <FaInfoCircle />
            </button>
          </div>
        </div>

        {/* Hover Border Effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold via-gold-light to-gold"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Details Modal */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowDetails(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Image */}
            <div className="relative h-64">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
              >
                ×
              </button>
              {dish.isSignature && (
                <div className="absolute top-4 left-4 bg-gold text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <FaStar /> Signature Dish
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-serif golden-text">{dish.name}</h2>
                <span className="text-gold font-bold text-2xl flex items-center gap-1">
                  <FaRupeeSign size={20} />
                  {dish.price}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-gold/20">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${dish.category === 'Non-Veg' ? 'bg-red-600' : 'bg-green-600'} text-white`}>
                  {dish.category === 'Non-Veg' ? <FaFire /> : <FaLeaf />}
                  {dish.category}
                </div>
                {dish.prepTime && (
                  <div className="flex items-center gap-1 text-gray-400">
                    <FaClock />
                    <span>{dish.prepTime} mins preparation</span>
                  </div>
                )}
                {dish.calories && (
                  <div className="flex items-center gap-1 text-gray-400">
                    <span>🔥</span>
                    <span>{dish.calories} calories</span>
                  </div>
                )}
                {dish.spiceLevel && (
                  <div className="flex items-center gap-1 text-gray-400">
                    <span>🌶️</span>
                    <span>Spice Level: {dish.spiceLevel}/5</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-gold text-lg font-serif mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{dish.description}</p>
              </div>

              {dish.ingredients && dish.ingredients.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-gold text-lg font-serif mb-2">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {dish.ingredients.map((ing, i) => (
                      <span key={i} className="bg-gold/10 text-gray-300 px-3 py-1 rounded-full text-sm">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {dish.nutrition && (
                <div className="mb-6">
                  <h3 className="text-gold text-lg font-serif mb-2">Nutritional Info</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(dish.nutrition).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-gold/10 py-2">
                        <span className="text-gray-400 capitalize">{key}</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleInquiry}
                  className="flex-1 bg-gold text-black py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gold-light transition-colors"
                >
                  <FaWhatsapp />
                  Order via WhatsApp
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-6 border border-gold text-gold rounded-lg hover:bg-gold hover:text-black transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}