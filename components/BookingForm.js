'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { FaWhatsapp, FaCheckCircle, FaEnvelope, FaPhone, FaUser, FaCalendar, FaUsers, FaRupeeSign } from 'react-icons/fa';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: new Date(),
    guestCount: '',
    foodType: '',
    additionalServices: [],
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const eventTypes = ['Wedding', 'Corporate Event', 'Birthday Party', 'Anniversary', 'Engagement', 'Other'];
  const foodTypes = ['Pure Non-Veg', 'Veg + Non-Veg', 'Only Veg'];
  
  // Updated: Only Dessert Counter and Welcome Drinks
  const additionalServicesList = ['Welcome Drinks', 'Dessert Counter'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*New Booking Request from Siva Catering Website*\n\n` +
      `*Personal Details:*\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n\n` +
      `*Event Details:*\n` +
      `Event Type: ${formData.eventType}\n` +
      `Event Date: ${formData.eventDate.toLocaleDateString()}\n` +
      `Guest Count: ${formData.guestCount}\n` +
      `Food Type: ${formData.foodType}\n\n` +
      `*Additional Services:*\n` +
      `${formData.additionalServices.length > 0 ? formData.additionalServices.join(', ') : 'None'}\n\n` +
      `*Special Notes:*\n${formData.notes || 'No notes provided'}`;
    
    window.open(`https://wa.me/919944948699?text=${encodeURIComponent(message)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleWhatsAppBooking = () => {
    const message = `Hi Siva Catering, I want to book your catering service for my upcoming event. Please contact me.`;
    window.open(`https://wa.me/919944948699?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card rounded-2xl p-6 md:p-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gold mb-2 text-sm">Full Name *</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      required
                      className="w-full bg-black/50 border border-gold/30 rounded-lg pl-10 pr-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gold mb-2 text-sm">Phone Number *</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="tel"
                      required
                      className="w-full bg-black/50 border border-gold/30 rounded-lg pl-10 pr-4 py-3 text-white focus:border-gold focus:outline-none"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gold mb-2 text-sm">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    className="w-full bg-black/50 border border-gold/30 rounded-lg pl-10 pr-4 py-3 text-white focus:border-gold focus:outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gold mb-2 text-sm">Event Type *</label>
                  <select
                    required
                    className="w-full bg-black/50 border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    value={formData.eventType}
                    onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                  >
                    <option value="">Select Event Type</option>
                    {eventTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gold mb-2 text-sm">Event Date *</label>
                  <div className="relative">
                    <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
                    <DatePicker
                      selected={formData.eventDate}
                      onChange={(date) => setFormData({...formData, eventDate: date})}
                      minDate={new Date()}
                      className="w-full bg-black/50 border border-gold/30 rounded-lg pl-10 pr-4 py-3 text-white focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gold mb-2 text-sm">Guest Count *</label>
                  <div className="relative">
                    <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="number"
                      required
                      className="w-full bg-black/50 border border-gold/30 rounded-lg pl-10 pr-4 py-3 text-white focus:border-gold focus:outline-none"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({...formData, guestCount: e.target.value})}
                      placeholder="Enter number of guests"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gold mb-2 text-sm">Food Type *</label>
                  <select
                    required
                    className="w-full bg-black/50 border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    value={formData.foodType}
                    onChange={(e) => setFormData({...formData, foodType: e.target.value})}
                  >
                    <option value="">Select Food Type</option>
                    {foodTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>

              {/* Updated Additional Services - Only 2 options */}
              <div>
                <label className="block text-gold mb-2 text-sm">Additional Services</label>
                <div className="grid grid-cols-2 gap-3">
                  {additionalServicesList.map(service => (
                    <label key={service} className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-gold transition-colors">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-gold cursor-pointer"
                        value={service}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, additionalServices: [...formData.additionalServices, service]});
                          } else {
                            setFormData({...formData, additionalServices: formData.additionalServices.filter(s => s !== service)});
                          }
                        }}
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
                <p className="text-gray-500 text-xs mt-2">*Additional charges may apply</p>
              </div>

              <div>
                <label className="block text-gold mb-2 text-sm">Special Notes / Requirements</label>
                <textarea
                  rows="4"
                  className="w-full bg-black/50 border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Any dietary restrictions, special requests, or additional information..."
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-gold text-black px-8 py-3 rounded-lg hover:bg-gold-light transition-all duration-300 flex items-center gap-2 font-semibold"
                >
                  <FaWhatsapp size={20} />
                  Book via WhatsApp
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-gold text-xl mb-4">Quick Booking</h3>
              <button
                onClick={handleWhatsAppBooking}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
              >
                <FaWhatsapp className="text-xl" />
                WhatsApp Now
              </button>
              <p className="text-center text-gray-400 text-sm mt-4">
                Or call us directly: <br />
                <span className="text-gold text-lg font-semibold">+91 99766 02700</span>
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-gold text-xl mb-3">What's Included</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center gap-2">✓ Premium Quality Ingredients</li>
                <li className="flex items-center gap-2">✓ Professional Staff & Service</li>
                <li className="flex items-center gap-2">✓ Traditional Cooking Methods</li>
                <li className="flex items-center gap-2">✓ Hygiene Certified Kitchen</li>
                <li className="flex items-center gap-2">✓ Customized Menu Planning</li>
                <li className="flex items-center gap-2">✓ On-time Delivery Guarantee</li>
              </ul>
            </div>

            
          </div>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 z-50"
          >
            <FaCheckCircle />
            <span>Booking request sent! We'll contact you shortly.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}