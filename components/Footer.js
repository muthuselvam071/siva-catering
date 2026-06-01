'use client';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black/90 border-t border-gold/20 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-serif golden-text mb-4">Siva Catering</h3>
            <p className="text-gray-400 text-sm mb-4">
              Delivering luxury catering experiences with authentic South Indian flavors since 2010.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><FaYoutube size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-gold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-gold transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-gold transition-colors">Services</Link></li>
              <li><Link href="/menu" className="text-gray-400 hover:text-gold transition-colors">Menu</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-gold transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaPhone className="text-gold" />
                <span>+91 99766 02700</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaPhone className="text-gold" />
                <span>+91 99449 48699 (WhatsApp)</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaEnvelope className="text-gold" />
                <span>info@sivacatering.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-gold" />
                <span>Jambai, Erode District, Tamil Nadu</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-lg mb-4">Business Hours</h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-gray-400 text-sm">
                <span>Monday - sunday:</span>
                <span>24 hours</span>
              </li>
             
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Siva Catering. All rights reserved. | Luxury Catering Services in Erode
          </p>
        </div>
      </div>
    </footer>
  );
}