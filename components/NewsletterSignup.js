'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-black to-gold/10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif golden-text mb-4">Join Our Culinary Journey</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to receive exclusive offers, new menu announcements, and catering tips
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-gold/30 rounded-full pl-10 pr-4 py-3 text-white focus:border-gold focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gold text-black px-8 py-3 rounded-full font-semibold hover:bg-gold-light transition-colors"
            >
              Subscribe
            </button>
          </form>
          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-500 mt-4"
            >
              Thank you for subscribing!
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}