'use client';
import React, { useState, useRef } from 'react';

interface AnnouncementBannerProps {
  oldPortfolioUrl?: string;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ 
  oldPortfolioUrl = "#" 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't drag when clicking the close button or links
    if ((e.target as HTMLElement).closest('button, a')) return;
    
    setIsDragging(true);
    if (dragRef.current) {
      const rect = dragRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={dragRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        right: 'auto',
        bottom: 'auto',
        zIndex: 30,
      }}
      className="max-w-md sm:max-w-sm md:max-w-md w-11/12 sm:w-auto cursor-grab active:cursor-grabbing"
    >
      <div className="relative rounded-lg sm:rounded-xl border border-amber-400/50 bg-gradient-to-br from-amber-900/40 to-orange-900/30 backdrop-blur-lg px-4 sm:px-5 md:px-6 py-4 sm:py-5 text-white shadow-[0_8px_32px_rgba(0,0,0,0.8)] circuit-card pointer-events-auto">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 text-amber-300/70 hover:text-amber-300 transition-colors text-xl sm:text-2xl leading-none font-bold"
          aria-label="Close announcement"
        >
          ×
        </button>

        {/* Content */}
        <div className="pr-6">
          <p className="text-xs sm:text-sm leading-relaxed font-light tracking-wide mb-3 sm:mb-4">
            This landing page showcases my current design approach{' '}
            <span className="text-amber-300">(built in 2hrs between classes)</span>
            . For my complete portfolio and projects, visit my freshman-year site →
          </p>
          
          <a
            href="https://professional-portfolio-git-main-vharshbs-projects.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-500/70 hover:bg-amber-500/90 text-white font-medium text-xs sm:text-sm tracking-wider rounded-lg transition-all backdrop-blur-sm border border-amber-400/50 mb-3"
          >
            OLD PORTFOLIO
          </a>

          <p className="text-xs leading-relaxed font-light text-amber-100/80 italic">
            Full rebuild coming soon as I invest time in building my brand while 
            juggling academics and finances.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
