import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import ScrollProgress from '../components/ScrollProgress';
import CursorGlow from '../components/CursorGlow';
import LoadingScreen from '../components/LoadingScreen';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap'
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'swap'
});

export const metadata = {
  title: 'Siva Catering | Luxury Non-Veg Catering Experience',
  description: 'Ultra-premium catering services in Jambai, Erode District.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-black text-white antialiased`}>
        <LoadingScreen />
        <CursorGlow />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}