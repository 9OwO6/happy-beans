import React from 'react';

export default function WaveDivider() {
  return (
    <div className="relative w-full overflow-hidden leading-none -mb-1">
      {/* 第一层波浪（主色，慢速） */}
      <svg
        className="block w-full h-16 md:h-24 animate-wave"
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}
      >
        <path
          d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
          fill="url(#wave-gradient1)"
          opacity="0.8"
        />
        <defs>
          <linearGradient id="wave-gradient1" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#bae6fd" /> {/* sky-200 */}
            <stop offset="0.5" stopColor="#fef9c3" /> {/* yellow-50 */}
            <stop offset="1" stopColor="#fbc7c7" /> {/* pink-100 */}
          </linearGradient>
        </defs>
      </svg>
      {/* 第二层波浪（淡色，快速） */}
      <svg
        className="block w-full h-16 md:h-24 animate-wave-fast"
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: 0, top: 0, zIndex: 2 }}
      >
        <path
          d="M0,50 C400,90 1040,10 1440,50 L1440,80 L0,80 Z"
          fill="url(#wave-gradient2)"
          opacity="0.5"
        />
        <defs>
          <linearGradient id="wave-gradient2" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fef9c3" /> {/* yellow-50 */}
            <stop offset="1" stopColor="#bae6fd" /> {/* sky-200 */}
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
} 