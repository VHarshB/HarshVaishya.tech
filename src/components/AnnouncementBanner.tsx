'use client';
import React, { useState } from 'react';

interface AnnouncementBannerProps {
  oldPortfolioUrl?: string;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ 
  oldPortfolioUrl = "#" 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-30 max-w-md animate-fade-in">
      <div className="relative rounded-xl border border-amber-400/50 bg-gradient-to-br from-amber-900/40 to-orange-900/30 backdrop-blur-lg px-6 py-5 text-white shadow-[0_8px_32px_rgba(0,0,0,0.8)] circuit-card">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-amber-300/70 hover:text-amber-300 transition-colors text-2xl leading-none font-bold"
          aria-label="Close announcement"
        >
          ×
        </button>

        {/* Content */}
        <div className="pr-6">
          <p className="text-sm leading-relaxed font-light tracking-wide mb-4">
            This landing page showcases my current design approach{' '}
            <span className="text-amber-300">(built in 2hrs between classes)</span>
            . For my complete portfolio and projects, visit my freshman-year site →
          </p>
          
          <a
            href="https://professional-portfolio-git-main-vharshbs-projects.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-amber-500/70 hover:bg-amber-500/90 text-white font-medium text-sm tracking-wider rounded-lg transition-all backdrop-blur-sm border border-amber-400/50 mb-3"
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
