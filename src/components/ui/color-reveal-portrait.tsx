'use client';

import * as React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface ColorRevealPortraitProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

interface PointerPosition {
  x: number;
  y: number;
}

export function ColorRevealPortrait({
  src,
  alt,
  width,
  height,
  className,
}: ColorRevealPortraitProps) {
  const [position, setPosition] = React.useState<PointerPosition>({ x: 50, y: 48 });
  const [active, setActive] = React.useState(false);

  const updatePosition = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  const revealSize = active ? '23%' : '0%';

  return (
    <div
      className={cn('portrait-reveal group relative isolate cursor-crosshair select-none', className)}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') setActive(true);
      }}
      onPointerMove={updatePosition}
      onPointerLeave={() => setActive(false)}
      onPointerDown={(event) => {
        if (event.pointerType === 'touch') setActive((value) => !value);
      }}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      tabIndex={0}
      aria-label="Portrait interactif : survolez l'image pour révéler ses couleurs"
    >
      <span
        aria-hidden="true"
        className={cn(
          'portrait-glow absolute inset-x-[-12%] bottom-[-18%] -z-10 aspect-square rounded-full transition-opacity duration-700',
          active ? 'opacity-100' : 'opacity-0',
        )}
      />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        sizes="(max-width: 768px) 88vw, 560px"
        className="h-full w-full object-contain object-bottom [filter:grayscale(1)_contrast(1.08)_brightness(1.02)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden transition-[clip-path] duration-500 ease-out"
        style={{ clipPath: `circle(${revealSize} at ${position.x}% ${position.y}%)` }}
      >
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          sizes="(max-width: 768px) 88vw, 560px"
          className="h-full w-full object-contain object-bottom"
        />
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute hidden size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/70 bg-white/10 backdrop-blur-[1px] transition-[opacity,transform] duration-300 md:block',
          active ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
        )}
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
      />
    </div>
  );
}

