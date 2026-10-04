/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

/**
 * BDIH HOMEPAGE — CINEMATIC ABSTRACT BACKGROUND SYSTEM
 * 
 * - Deep midnight-navy / obsidian base
 * - Large abstract 3D forms positioned partially outside viewport
 * - Restrained studio blue rim lighting & volumetric depth
 * - Subtle flowing data structures and orbital geometry
 * - Dedicated clean negative space behind hero text
 * - Zero text content / zero crypto / zero visual clutter
 * - Silky smooth, calm ambient micro-motion
 * - Auto-pauses when hidden; respects prefers-reduced-motion
 */
export const BackgroundVisuals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;
    let time = 0;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Smooth mouse parallax interpolation
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Smooth scroll interpolation
    let targetScrollY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / (window.innerWidth || 1)) - 0.5;
      targetMouseY = (e.clientY / (window.innerHeight || 1)) - 0.5;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastFrameTime = performance.now();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Particle representation for atmospheric dust / quantum data points
    interface Particle {
      x: number;
      y: number;
      z: number; // 0 = far, 1 = close
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      phase: number;
    }

    const particles: Particle[] = [];

    const initParticles = (count: number) => {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random(),
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -0.1 - Math.random() * 0.15,
          alpha: Math.random() * 0.4 + 0.1,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth || 800;
      height = window.innerHeight || 600;
      
      // Limit DPR to 1.5 for performance while keeping crisp lines
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Adjust particle count according to screen size
      const count = width < 768 ? 20 : width < 1200 ? 35 : 50;
      initParticles(count);
    };

    resize();
    window.addEventListener('resize', resize);

    // ─────────────────────────────────────────────────────────────
    // RENDERING FUNCTIONS
    // ─────────────────────────────────────────────────────────────

    // 1. Deep Base Atmosphere & Volumetric Haze
    const drawBaseAtmosphere = () => {
      // Midnight navy gradient base
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#02040b');
      bgGrad.addColorStop(0.35, '#040918');
      bgGrad.addColorStop(0.7, '#030713');
      bgGrad.addColorStop(1, '#010207');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Volumetric Top-Right Studio Bloom (Atmospheric key light)
      const trX = width * 0.82 + mouseX * 25;
      const trY = height * 0.22 + mouseY * 20;
      const trRadius = Math.max(width * 0.55, 450);
      const trGrad = ctx.createRadialGradient(trX, trY, 0, trX, trY, trRadius);
      trGrad.addColorStop(0, 'rgba(30, 64, 175, 0.16)');
      trGrad.addColorStop(0.4, 'rgba(15, 30, 80, 0.08)');
      trGrad.addColorStop(0.8, 'rgba(4, 9, 24, 0.02)');
      trGrad.addColorStop(1, 'rgba(2, 4, 11, 0)');
      ctx.fillStyle = trGrad;
      ctx.fillRect(0, 0, width, height);

      // Volumetric Bottom-Left Ambient Glow (Fill light)
      const blX = width * 0.12 - mouseX * 20;
      const blY = height * 0.85 - mouseY * 15;
      const blRadius = Math.max(width * 0.45, 380);
      const blGrad = ctx.createRadialGradient(blX, blY, 0, blX, blY, blRadius);
      blGrad.addColorStop(0, 'rgba(37, 99, 235, 0.10)');
      blGrad.addColorStop(0.5, 'rgba(15, 23, 55, 0.04)');
      blGrad.addColorStop(1, 'rgba(1, 2, 7, 0)');
      ctx.fillStyle = blGrad;
      ctx.fillRect(0, 0, width, height);
    };

    // 2. Subtle Flowing Data Streams & Analytical Lines (Midground Depth)
    const drawDataCurves = () => {
      ctx.save();
      const waveCount = width < 768 ? 2 : 4;
      const baseY = height * 0.55;

      for (let i = 0; i < waveCount; i++) {
        const offset = i * 40;
        const waveTime = time * 0.0003 + i * 0.7;
        const alpha = 0.03 + (i * 0.015);

        ctx.beginPath();
        // Start near middle left, swoop gracefully down towards right
        const startX = -50;
        const startY = baseY + Math.sin(waveTime) * 35 + offset;
        const cp1x = width * 0.35 + mouseX * 20;
        const cp1y = baseY - 60 + Math.cos(waveTime * 0.9) * 45 + offset;
        const cp2x = width * 0.7 + mouseX * 30;
        const cp2y = baseY + 80 + Math.sin(waveTime * 1.2) * 40 + offset;
        const endX = width + 60;
        const endY = baseY - 20 + Math.cos(waveTime * 0.8) * 30 + offset;

        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);

        ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Subtle analytical data node along the curve
        const tPos = (time * 0.0002 + i * 0.28) % 1;
        // Cubic bezier point evaluation
        const u = 1 - tPos;
        const nodeX = u * u * u * startX + 3 * u * u * tPos * cp1x + 3 * u * tPos * tPos * cp2x + tPos * tPos * tPos * endX;
        const nodeY = u * u * u * startY + 3 * u * u * tPos * cp1y + 3 * u * tPos * tPos * cp2y + tPos * tPos * tPos * endY;

        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${alpha * 2.5})`;
        ctx.fill();
      }
      ctx.restore();
    };

    // 3. Form A — Grand Midnight Obsidian Sphere (Top-Right Viewport Edge)
    const drawGrandSphere = () => {
      ctx.save();
      // Positioned partially off-screen at top right
      const isMobile = width < 768;
      const baseRadius = isMobile ? Math.min(width * 0.42, 220) : Math.min(width * 0.32, 420);
      
      // Extremely subtle calm breathing motion
      const floatX = Math.sin(time * 0.0004) * 8 + mouseX * 30;
      const floatY = Math.cos(time * 0.00035) * 6 + mouseY * 25 - scrollY * 0.12;

      const cx = width * (isMobile ? 0.95 : 0.88) + floatX;
      const cy = height * (isMobile ? 0.18 : 0.24) + floatY;
      const radius = baseRadius;

      // Soft backglow / rim haze behind sphere
      const haloGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.35);
      haloGrad.addColorStop(0, 'rgba(59, 130, 246, 0.12)');
      haloGrad.addColorStop(0.5, 'rgba(30, 64, 175, 0.05)');
      haloGrad.addColorStop(1, 'rgba(2, 4, 11, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Main 3D Sphere Body with Studio Rim & Specular Shading
      // Light source comes from top-right / back (studio rim light)
      const lightOffsetX = radius * 0.35;
      const lightOffsetY = -radius * 0.35;
      const sphereGrad = ctx.createRadialGradient(
        cx + lightOffsetX, cy + lightOffsetY, radius * 0.05,
        cx, cy, radius
      );
      // Soft, refined studio tones: deep midnight blue to near-black obsidian
      sphereGrad.addColorStop(0, 'rgba(28, 54, 118, 0.85)');
      sphereGrad.addColorStop(0.35, 'rgba(12, 25, 62, 0.92)');
      sphereGrad.addColorStop(0.75, 'rgba(5, 11, 28, 0.98)');
      sphereGrad.addColorStop(1, 'rgba(2, 5, 15, 1)');

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Delicate outer rim lighting (subtle royal/cyan edge, soft falloff)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      const rimGrad = ctx.createRadialGradient(
        cx + lightOffsetX * 1.1, cy + lightOffsetY * 1.1, radius * 0.75,
        cx + lightOffsetX * 1.1, cy + lightOffsetY * 1.1, radius * 1.05
      );
      rimGrad.addColorStop(0, 'rgba(2, 5, 15, 0)');
      rimGrad.addColorStop(0.7, 'rgba(59, 130, 246, 0.12)');
      rimGrad.addColorStop(0.92, 'rgba(96, 165, 250, 0.35)');
      rimGrad.addColorStop(0.98, 'rgba(191, 219, 254, 0.45)');
      rimGrad.addColorStop(1, 'rgba(2, 5, 15, 0)');

      ctx.fillStyle = rimGrad;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      // Subtle geometric latitude / wireframe curvature on the sphere surface
      if (!isMobile) {
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.04)';
        ctx.lineWidth = 1;

        const tilt = 0.35;
        const rings = [-0.6, -0.3, 0, 0.3, 0.6];
        for (const ringY of rings) {
          ctx.beginPath();
          const rY = cy + ringY * radius;
          const chordRadius = Math.sqrt(Math.max(0, radius * radius - (ringY * radius) * (ringY * radius)));
          ctx.ellipse(cx, rY, chordRadius, chordRadius * tilt, -0.2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.restore();

      // Fine 1px subtle boundary stroke
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    // 4. Form B — Abstract Floating Orbital Rings (Intersecting Space)
    const drawOrbitalRings = () => {
      ctx.save();
      const isMobile = width < 768;
      const cx = width * (isMobile ? 0.95 : 0.88) + mouseX * 22;
      const cy = height * (isMobile ? 0.18 : 0.24) + mouseY * 18 - scrollY * 0.1;
      const rX = isMobile ? 240 : 480;
      const rY = isMobile ? 70 : 130;
      const rotation = -0.35 + Math.sin(time * 0.0002) * 0.03;

      // Primary delicate elliptical ring
      ctx.beginPath();
      ctx.ellipse(cx, cy, rX, rY, rotation, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Secondary nested ring
      if (!isMobile) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, rX * 1.15, rY * 1.25, rotation + 0.15, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(96, 165, 250, 0.04)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    };

    // 5. Form C — Organic 3D Curved Wave / Ribbon (Midground Lower-Right)
    const drawCurvedRibbon = () => {
      ctx.save();
      const isMobile = width < 768;
      const startX = width * (isMobile ? 0.65 : 0.72) + mouseX * 25;
      const startY = height * 0.48 + mouseY * 20 - scrollY * 0.18;
      const endX = width * 1.05;
      const endY = height * 0.92 - scrollY * 0.22;

      // Draw volumetric smooth ribbon surface
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(
        width * 0.85, height * 0.52,
        width * 0.92, height * 0.75,
        endX, endY
      );
      ctx.bezierCurveTo(
        width * 0.88, height * 0.82,
        width * 0.80, height * 0.62,
        startX - (isMobile ? 40 : 70), startY + (isMobile ? 35 : 60)
      );
      ctx.closePath();

      const ribbonGrad = ctx.createLinearGradient(startX, startY, endX, endY);
      ribbonGrad.addColorStop(0, 'rgba(30, 64, 175, 0.10)');
      ribbonGrad.addColorStop(0.5, 'rgba(15, 30, 80, 0.06)');
      ribbonGrad.addColorStop(1, 'rgba(2, 5, 15, 0.02)');
      ctx.fillStyle = ribbonGrad;
      ctx.fill();

      // Top highlighted spine edge
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(
        width * 0.85, height * 0.52,
        width * 0.92, height * 0.75,
        endX, endY
      );
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    // 6. Form D — Foreground Soft-Blurred Form (Bottom-Left Viewport Edge)
    const drawForegroundForm = () => {
      ctx.save();
      const isMobile = width < 768;
      const radius = isMobile ? Math.min(width * 0.38, 180) : Math.min(width * 0.26, 320);

      // Parallax moves slightly faster (foreground effect)
      const cx = width * (isMobile ? -0.05 : -0.04) + mouseX * 45;
      const cy = height * (isMobile ? 0.96 : 0.92) + mouseY * 35 - scrollY * 0.25;

      // Soft depth-of-field edge blur via smooth gradient
      const fgGrad = ctx.createRadialGradient(
        cx + radius * 0.35, cy - radius * 0.35, radius * 0.1,
        cx, cy, radius
      );
      fgGrad.addColorStop(0, 'rgba(25, 48, 105, 0.45)');
      fgGrad.addColorStop(0.4, 'rgba(12, 24, 60, 0.35)');
      fgGrad.addColorStop(0.75, 'rgba(4, 9, 24, 0.2)');
      fgGrad.addColorStop(1, 'rgba(1, 2, 7, 0)');

      ctx.fillStyle = fgGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Rim light on upper edge
      ctx.beginPath();
      ctx.arc(cx, cy, radius, -Math.PI * 0.45, Math.PI * 0.15);
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.14)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    // 7. Atmospheric Micro-Particles (Gentle, Slow-Drifting Dust)
    const drawParticles = () => {
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        const pulse = 0.75 + 0.25 * Math.sin(time * 0.001 + p.phase);
        const alpha = p.alpha * pulse * (0.3 + 0.7 * p.z);
        const r = p.radius * (0.8 + 0.3 * p.z);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${alpha})`;
        ctx.fill();
      }
      ctx.restore();
    };

    // 8. Dedicated Hero Negative Space & Contrast Mask
    // Ensures hero heading, descriptions, and CTA buttons are 100% readable
    const drawHeroNegativeSpace = () => {
      ctx.save();
      // Center / Center-Left vignette mask
      const isMobile = width < 768;
      const maskX = width * (isMobile ? 0.5 : 0.42);
      const maskY = height * (isMobile ? 0.42 : 0.46);
      const maskRadius = Math.max(width * (isMobile ? 0.65 : 0.52), 340);

      const maskGrad = ctx.createRadialGradient(
        maskX, maskY, 0,
        maskX, maskY, maskRadius
      );
      // Soft radial darkening over the main content area
      maskGrad.addColorStop(0, 'rgba(2, 4, 11, 0.68)');
      maskGrad.addColorStop(0.5, 'rgba(2, 4, 11, 0.45)');
      maskGrad.addColorStop(0.85, 'rgba(2, 4, 11, 0.15)');
      maskGrad.addColorStop(1, 'rgba(2, 4, 11, 0)');

      ctx.fillStyle = maskGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    };

    // ─────────────────────────────────────────────────────────────
    // ANIMATION LOOP (Optimized, delta-throttled, pauses when hidden)
    // ─────────────────────────────────────────────────────────────
    let lastFrameTime = performance.now();

    const render = (now: number) => {
      animId = requestAnimationFrame(render);

      if (!isVisible) return;

      const delta = Math.min(now - lastFrameTime, 100);
      lastFrameTime = now;

      if (!prefersReducedMotion) {
        time += delta;
      }

      // Smooth interpolation for mouse & scroll parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Layer 1: Base Void & Atmospheric Volumetric Glow
      drawBaseAtmosphere();

      // Layer 2: Subtle Flowing Data Streams & Analytical Nodes
      drawDataCurves();

      // Layer 3: Grand 3D Sphere & Orbital Geometry (Midground / Edges)
      drawOrbitalRings();
      drawGrandSphere();
      drawCurvedRibbon();

      // Layer 4: Foreground Soft-Blurred Form (Bottom-Left)
      drawForegroundForm();

      // Layer 5: Atmospheric Micro-Particles
      drawParticles();

      // Layer 6: Hero Visual Negative Space & Contrast Guarantee
      drawHeroNegativeSpace();
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div 
      id="bdih_cinematic_abstract_background"
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
      />
    </div>
  );
};
