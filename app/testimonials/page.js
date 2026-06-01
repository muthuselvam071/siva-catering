'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaQuoteLeft, FaWhatsapp } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

const testimonials = [
  {
    id: 1,
    name: 'Priya & Karthik',
    event: 'Wedding Reception',
    rating: 5,
    text: 'Siva Catering made our wedding day absolutely perfect! The mutton chukka and briyani were outstanding. Every guest complimented the food quality and presentation. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1519742866993-66d3cfef4bbd',
    date: 'December 2023'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    event: 'Corporate Annual Day',
    rating: 5,
    text: 'Professional, punctual, and delicious! Their team handled our 1000+ guest corporate event flawlessly. The live BBQ station was a huge hit. Will definitely book again.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    date: 'November 2023'
  },
  {
    id: 3,
    name: 'Lakshmi Sundaram',
    event: '60th Birthday',
    rating: 5,
    text: 'The pepper chicken and traditional South Indian meals were authentic and flavorful. Siva Catering exceeded our expectations. The team was very courteous and professional.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    date: 'October 2023'
  },
  {
    id: 4,
    name: 'Anand Srinivasan',
    event: 'Engagement Ceremony',
    rating: 5,
    text: 'Best catering service in Erode district! The food quality, hygiene, and taste are exceptional. Their platinum package is worth every rupee. Thank you Siva Catering!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    date: 'September 2023'
  }
];

const stats = [
  { value: '1000+', label: 'Happy Events' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '50+', label: 'Expert Team' },
  { value: '100+', label: '5-Star Reviews' }
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif golden-text mb-4">What Our Clients Say</h1>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy clients
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center rounded-xl"
            >
              <div className="text-3xl md:text-4xl font-serif golden-text mb-2">{stat.value}</div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="glass-card p-8 rounded-2xl h-full">
                <FaQuoteLeft className="text-gold text-3xl mb-4 opacity-50" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif golden-text">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.event}</p>
                    <p className="text-gray-500 text-xs">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Book Now CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-12 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-serif golden-text mb-4">Ready to Create Memories?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our family of happy clients and experience the finest catering service in Tamil Nadu
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/booking"
                className="bg-gold text-black px-8 py-3 rounded-full font-semibold hover:bg-gold-light transition-colors inline-block"
              >
                Book Your Event
              </a>
              <a
                href="https://wa.me/919944948699"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gold text-gold px-8 py-3 rounded-full font-semibold hover:bg-gold hover:text-black transition-colors inline-flex items-center gap-2"
              >
                <FaWhatsapp />
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}