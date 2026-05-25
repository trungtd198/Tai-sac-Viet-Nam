"use client";

import { useEffect, useRef } from "react";

export function GoldDustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle class
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedY: number = 0;
      speedX: number = 0;
      opacity: number = 0;
      fadeSpeed: number = 0;

      constructor() {
        this.reset(true);
      }

      reset(initY = false) {
        this.x = Math.random() * width;
        this.y = initY ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.2 + 0.5; // fine gold dust
        this.speedY = -(Math.random() * 0.5 + 0.2); // float upwards
        this.speedX = Math.random() * 0.4 - 0.2; // slight drift
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        // Fade out slightly as they go higher
        if (this.y < height * 0.2) {
          this.opacity -= this.fadeSpeed;
        }
        // Reset when out of bounds or invisible
        if (this.y < -10 || this.x < -10 || this.x > width + 10 || this.opacity <= 0) {
          this.reset(false);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Gold color palette: #D4AF37, #bf953f, #fcf6ba
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = "rgba(212, 175, 55, 0.6)";
        ctx.fill();
      }
    }

    // Initialize particles
    const particleCount = Math.min(60, Math.floor((width * height) / 15000));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      // Disable shadow blur for performance if not drawing
      ctx.shadowBlur = 0;
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none h-full w-full z-[5]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
