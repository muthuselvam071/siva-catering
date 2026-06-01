// components/ReviewSlider.js
'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaQuoteLeft, 
  FaQuoteRight,
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
  FaCalendarAlt,
  FaCheckCircle,
  FaPlay,
  FaPause,
  FaInstagram,
  FaFacebook,
  FaTwitter
} from 'react-icons/fa';

export default function ReviewSlider({ reviews, autoPlay = true, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef(null);

  const totalReviews = reviews.length;

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalReviews);
      }, interval);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isHovered, totalReviews, interval]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-500" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-500" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-600" />);
    }
    return stars;
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    })
  };

  const currentReview = reviews[currentIndex];

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Slider Container */}
      <div className="relative overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative"
          >
            {/* Background Image with Overlay */}
            {currentReview.backgroundImage && (
              <div className="absolute inset-0 z-0">
                <Image
                  src={currentReview.backgroundImage}
                  alt="Background"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90"></div>
              </div>
            )}

            {/* Review Content */}
            <div className="relative z-10 p-8 md:p-12">
              <div className="max-w-5xl mx-auto">
                {/* Quote Icon */}
                <div className="mb-6">
                  <FaQuoteLeft className="text-gold text-4xl md:text-5xl opacity-50" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {renderStars(currentReview.rating)}
                  <span className="text-gray-400 text-sm ml-2">
                    ({currentReview.rating}.0)
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed mb-8 font-serif italic">
                  "{currentReview.text}"
                </p>

                {/* Reviewer Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold">
                    <Image
                      src={currentReview.image}
                      alt={currentReview.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif golden-text">
                      {currentReview.name}
                    </h3>
                    <p className="text-gold-light text-sm">
                      {currentReview.eventType}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-gray-400 text-xs">
                      <FaCalendarAlt size={12} />
                      <span>{currentReview.date}</span>
                      {currentReview.verified && (
                        <>
                          <span className="text-gold">•</span>
                          <FaCheckCircle className="text-green-500" size={12} />
                          <span>Verified Review</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Share Buttons */}
                <div className="flex gap-3">
                  <button className="text-gray-400 hover:text-gold transition-colors">
                    <FaInstagram size={18} />
                  </button>
                  <button className="text-gray-400 hover:text-gold transition-colors">
                    <FaFacebook size={18} />
                  </button>
                  <button className="text-gray-400 hover:text-gold transition-colors">
                    <FaTwitter size={18} />
                  </button>
                  <button className="text-gray-400 hover:text-gold transition-colors">
                    <FaWhatsapp size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-gold text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-gold text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        >
          <FaChevronRight />
        </button>

        {/* Auto-play Toggle */}
        <button
          onClick={toggleAutoPlay}
          className="absolute bottom-4 right-4 z-20 bg-black/50 hover:bg-gold text-white hover:text-black w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        >
          {isAutoPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-2 bg-gold'
                : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-8 overflow-x-auto pb-4">
        <div className="flex gap-3 justify-center min-w-max">
          {reviews.map((review, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-2 ring-gold scale-105'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1 bg-gold rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold text-black">
                {index + 1}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Statistics Badge */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gold text-black px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
        ⭐ {reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length} •{' '}
        {reviews.length}+ Happy Clients
      </div>
    </div>
  );
}

// Helper component for Featured Review Card (for grid layout)
export const FeaturedReviewCard = ({ review, index }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500 text-sm" />);
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-2xl"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={review.image}
            alt={review.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-serif golden-text font-semibold">{review.name}</h4>
          <p className="text-gray-400 text-xs">{review.eventType}</p>
          <div className="flex gap-0.5 mt-1">{renderStars(review.rating)}</div>
        </div>
        <FaQuoteRight className="text-gold/30 text-2xl" />
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{review.text}</p>
      <div className="mt-4 pt-3 border-t border-gold/20 flex justify-between items-center">
        <span className="text-gray-500 text-xs">{review.date}</span>
        {review.verified && (
          <div className="flex items-center gap-1">
            <FaCheckCircle className="text-green-500 text-xs" />
            <span className="text-green-500 text-xs">Verified</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};