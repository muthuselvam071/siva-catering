'use client';
import Image from 'next/image';

export default function OptimizedImage({ src, alt, className }) {
  // Use Unsplash with specific dimensions and quality
  const optimizedSrc = src.includes('unsplash') 
    ? `${src}?w=800&h=600&fit=crop&q=80`
    : src;
    
  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      fill
      className={className}
      loading="lazy"
      quality={75}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}