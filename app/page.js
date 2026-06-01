'use client';
import HeroSection from '../components/HeroSection';
import FeaturedDishes from '../components/FeaturedDishes';
import ServicesShowcase from '../components/ServicesShowcase';
import StatsCounter from '../components/StatsCounter';
import LuxuryVideoSection from '../components/LuxuryVideoSection';
import NewsletterSignup from '../components/NewsletterSignup';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeaturedDishes />
      <ServicesShowcase />
      <LuxuryVideoSection />
      <StatsCounter />
      <NewsletterSignup />
    </div>
  );
}