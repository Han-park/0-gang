'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '/image/carousel/img-0.jpg',
  '/image/carousel/img-1.jpg',
  '/image/carousel/img-2.jpg',
  '/image/carousel/img-3.jpg',
  '/image/carousel/img-4.jpg',
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Carousel image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

    </div>
  );
}
