import { useState } from "react";

export function CarImageGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col lg:flex-row gap-4">

      {/* 🔥 THUMBNAILS */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative h-20 w-24 rounded-xl overflow-hidden border transition-all duration-300
              ${
                activeIndex === index
                  ? "border-violet-500 scale-105"
                  : "border-black/10 dark:border-white/10 opacity-70 hover:opacity-100"
              }`}
          >
            <img
              src={img}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* 🚗 MAIN IMAGE */}
      <div className="flex-1">
        <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[520px] rounded-3xl overflow-hidden bg-black/5 dark:bg-white/5 flex items-center justify-center">

          {/* ✨ BLUR BACKGROUND (PREMIUM LOOK) */}
          <img
            src={activeImage}
            alt="car blur"
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-30"
          />

          {/* 🚘 MAIN IMAGE (NO CROP) */}
          <img
            src={activeImage}
            alt="car"
            className="relative w-full h-full object-contain transition duration-500 ease-in-out"
          />

          {/* 🔄 IMAGE COUNTER */}
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs 
            bg-black/60 text-white backdrop-blur-md border border-white/10">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}