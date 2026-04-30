'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1280px',
        paddingBottom: '56.25%',
        borderRadius: '16px',
        boxShadow: '0px 30px 60px -20px rgba(28, 58, 18, 0.35)',
        cursor: isDragging ? 'ew-resize' : 'default',
        overflow: 'hidden',
        userSelect: 'none',
        alignSelf: 'stretch',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After image (full background) */}
      <Image
        src={afterImage}
        alt="After"
        fill
        sizes="(max-width: 1280px) 100vw, 1280px"
        style={{ objectFit: 'cover' }}
        draggable={false}
      />

      {/* Before image - clipped to show only left portion */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <Image
          src={beforeImage}
          alt="Before"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          style={{ objectFit: 'cover' }}
          draggable={false}
        />
      </div>

      {/* Divider line + handle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          width: '2px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          transform: 'translateX(-50%)',
          cursor: 'ew-resize',
          zIndex: 10,
          boxShadow: '0 0 4px rgba(0,0,0,0.2)',
        }}
      >
        {/* Circular handle */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '44px',
            height: '44px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 0 3px var(--sage-light), 0 4px 16px rgba(0,0,0,0.2)',
            cursor: 'ew-resize',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4L2 8L6 12"
              stroke="#1C3A12"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 4L14 8L10 12"
              stroke="#1C3A12"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Before label */}
      <span
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          backgroundColor: 'rgba(0,0,0,0.4)',
          color: '#fff',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '6px 12px',
          borderRadius: '6px',
          backdropFilter: 'blur(4px)',
          zIndex: 5,
        }}
      >
        {beforeLabel}
      </span>

      {/* After label */}
      <span
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          backgroundColor: 'var(--sage)',
          color: '#fff',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '6px 12px',
          borderRadius: '6px',
          zIndex: 5,
        }}
      >
        {afterLabel}
      </span>
    </div>
  );
}
