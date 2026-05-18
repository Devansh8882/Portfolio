import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, [role="button"], .cursor-pointer, input, textarea, select');
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      {/* Outer Glow */}
      <motion.div
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        className="fixed pointer-events-none z-[9999] hidden md:block"
      >
        <motion.div
          animate={{
            scale: isHovered ? 2.5 : (isClicked ? 0.8 : 1),
            backgroundColor: isHovered ? "rgba(0, 245, 255, 0.15)" : "rgba(189, 92, 255, 0.05)",
            borderColor: isHovered ? "rgba(0, 245, 255, 0.5)" : "rgba(189, 92, 255, 0.2)",
          }}
          className="w-10 h-10 rounded-full border-2 transition-colors duration-200"
        />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        className="fixed pointer-events-none z-[9999] hidden md:block"
      >
        <motion.div
          animate={{
            scale: isHovered ? 0.4 : (isClicked ? 1.5 : 1),
            backgroundColor: isHovered ? "#bd5cff" : "#00f5ff",
          }}
          className="w-2.5 h-2.5 rounded-full transition-colors duration-200 shadow-[0_0_8px_currentColor]"
        />
      </motion.div>
    </>
  );
};
