'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*Contact Form Submission*\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/919944948699?text=${encodeURIComponent(message)}`, '_blank');
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    { icon: FaPhone, title: 'Phone', details: '+91 99766 02700', link: 'tel:+919976602700' },
    { icon: FaWhatsapp, title: 'WhatsApp', details: '+91 99449 48699', link: 'https://wa.me/919944948699' },
    { icon: FaEnvelope, title: 'Email', details: 'info@sivacatering.com', link: 'mailto:info@sivacatering.com' },
    { icon: FaMapMarkerAlt, title: 'Address', details: 'Jambai, Erode District, Tamil Nadu - 638311', link: 'https://maps.google.com' }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif golden-text mb-4">Contact Us</h1>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get in touch with us to discuss your catering needs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-serif golden-text mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gold mb-2 text-sm">Your Name *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-black/50 border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gold mb-2 text-sm">Email Address *</label>
                <input
                  type="email"
                  required
                  className="w-full bg-black/50 border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gold mb-2 text-sm">Phone Number</label>
                <input
                  type="tel"
                  className="w-full bg-black/50 border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gold mb-2 text-sm">Your Message *</label>
                <textarea
                  rows="5"
                  required
                  className="w-full bg-black/50 border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your event, guest count, and requirements..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-black py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors"
              >
                Send Message
              </button>
              {submitted && (
                <p className="text-green-500 text-center mt-3">Message sent! We'll contact you shortly.</p>
              )}
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-serif golden-text mb-6">Contact Information</h2>
              <div className="space-y-5">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold transition-colors">
                      <info.icon className="text-gold group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{info.title}</p>
                      <p className="text-white group-hover:text-gold transition-colors">{info.details}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-serif golden-text mb-6">Business Hours</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monday - sunday</span>
                  <span className="text-white">24 HOURS</span>
                </div>
                
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-serif golden-text mb-6">Follow Us</h2>
              <div className="flex gap-4">
                {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center hover:bg-gold transition-colors group"
                  >
                    <Icon className="text-gold group-hover:text-black transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Google Maps */}
            <div className="glass-card p-2 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15671.324567890123!2d77.583333!3d11.283333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f7c5c5c5c5d%3A0x5c5c5c5c5c5c5c5c!2sJambai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}