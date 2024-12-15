import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  endValue: number;
  duration?: number;
  className?: string;
}

const AnimatedCounter = ({
  endValue,
  duration = 2000,
  className = "",
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const animationStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animationStarted.current) {
          setIsInView(true);
          animationStarted.current = true;
        }
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: "50px", // Start animation slightly before the element comes into view
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const progress = (currentTime - startTime) / duration;

      // Add easing function for smoother animation
      const easedProgress = easeOutCubic(Math.min(progress, 1));

      if (progress < 1) {
        const nextCount = Math.floor(endValue * easedProgress);
        setCount(nextCount);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration, isInView]);

  // Easing function for smoother animation
  const easeOutCubic = (x: number): number => {
    return 1 - Math.pow(1 - x, 3);
  };

  return (
    <span ref={counterRef} className={className}>
      {count.toLocaleString()}
    </span>
  );
};

export default AnimatedCounter;
