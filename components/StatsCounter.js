'use client';
import { useInView } from 'react-intersection-observer';
import { FaUsers, FaCalendarAlt, FaSmile, FaTrophy } from 'react-icons/fa';
import CountUp from './CountUp';

export default function StatsCounter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { icon: FaUsers, value: 50000, label: 'Happy Guests', suffix: '+' },
    { icon: FaCalendarAlt, value: 1000, label: 'Events Catered', suffix: '+' },
    { icon: FaSmile, value: 98, label: 'Satisfaction Rate', suffix: '%' },
    { icon: FaTrophy, value: 15, label: 'Awards Won', suffix: '' },
  ];

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-b from-black to-gold/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center glass-card p-8 rounded-2xl">
              <stat.icon className="text-5xl text-gold mx-auto mb-4" />
              <div className="text-4xl md:text-5xl font-serif golden-text mb-2">
                {inView ? <CountUp end={stat.value} suffix={stat.suffix} /> : `0${stat.suffix}`}
              </div>
              <p className="text-gray-400 uppercase tracking-wider text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}