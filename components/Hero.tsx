'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div
        className={`text-center max-w-4xl mx-auto w-full transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="relative mb-4 sm:mb-6 lg:mb-8 inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-cyan-600 rounded-full blur opacity-20 hover:opacity-30 transition duration-1000"></div>
          <Image
            src="/SmallAvatar.png"
            alt="Pol Hidalgo"
            className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full transition-transform duration-300 hover:scale-105"
            priority
            width={500}
            height={500}
          />
        </div>

        <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 lg:mb-4 tracking-tight leading-tight">
          Janpol Hidalgo
        </h1>

        <h2 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 lg:mb-4 tracking-tight leading-tight">
          Student Developer
        </h2>

        <p className="text-xs xs:text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 lg:mb-8 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto leading-relaxed px-2">
          Filipino, Developer, and Explorer. Building Things That Matter.
        </p>
      </div>
    </div>
  );
}
