"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const SentenceAnimation = () => {
  const sentences = [
    "Poland / 2024",
    "20 SAR / month - 4 payments",
    "Finally, the third sentence!",
  ];

  const logoSources = [
    "/images/product_info/tabby.png",
    "/images/product_info/tamara.png",
    "/images/product_info/mispay.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showLogos, setShowLogos] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        if (!showLogos) {
          const nextIndex = (currentIndex + 1) % sentences.length;
          setCurrentIndex(nextIndex);

          // When we complete the last sentence, switch to logos
          if (nextIndex === sentences.length - 1) {
            setShowLogos(true);
          }
        } else {
          // After showing logos, reset to first sentence
          setShowLogos(false);
          setCurrentIndex(0);
        }

        setIsVisible(true);
      }, 500); // Hide for 500ms before switching
    }, 3000); // 2 seconds visible + 0.5 second hidden

    return () => clearInterval(timer); // Cleanup interval
  }, [currentIndex, showLogos]);

  return (
    <div className="flex items-center   sm:hidden  h-6">
      {!showLogos ? (
        <div
          style={{
            fontSize: "14px",
            textAlign: "center",
            transition: "opacity 0.5s",
            opacity: isVisible ? 1 : 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {sentences[currentIndex]}
        </div>
      ) : (
        <div className="flex justify-center gap-2">
          {logoSources.map((src, index) => (
            <Image
              key={src}
              src={src}
              width={56}
              height={56}
              className="w-12 h-12 object-contain"
              alt={`logo-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SentenceAnimation;
