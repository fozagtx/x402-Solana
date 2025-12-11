"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export function FallingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // Percentage across screen width
        y: -10, // Start above screen
        size: Math.random() * 3 + 1, // 1-4px size
        delay: Math.random() * 5, // 0-5s delay
        duration: Math.random() * 8 + 4, // 4-12s fall duration
        opacity: Math.random() * 0.6 + 0.4, // 0.4-1.0 opacity
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-white via-zinc-200 to-zinc-300 animate-shimmer"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            animationName: 'fall-and-shimmer',
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, 0.8), inset 0 0 ${particle.size}px rgba(255, 255, 255, 0.9)`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes fall-and-shimmer {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0%, 100% {
            background: linear-gradient(45deg, #ffffff, #e4e4e7, #d4d4d8);
          }
          50% {
            background: linear-gradient(45deg, #f8fafc, #ffffff, #f1f5f9);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}