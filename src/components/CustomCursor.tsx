/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { bihAudio } from '../utils/audio';

export const CustomCursor: React.FC = () => {
  useEffect(() => {
    let lastHoveredElement: Element | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Capture all clickables, navigation tabs, controls, selects, trading card ids, and glass layouts
      const interactiveEl = target.closest(
        'button, a, select, input[type="radio"], input[type="checkbox"], [role="button"], .cursor-pointer, .glossy-glass, [id*="_card_"], [id*="card"]'
      );

      if (interactiveEl) {
        if (interactiveEl !== lastHoveredElement) {
          lastHoveredElement = interactiveEl;
          // Play high-fidelity synthesized physical haptic tick
          bihAudio.playHoverTick();
        }
      } else {
        lastHoveredElement = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest(
        'button, a, select, [role="button"], .cursor-pointer, .glossy-glass, [id*="_card_"]'
      );

      if (interactiveEl) {
        // Play premium dual-frequency gold-plated chime click
        bihAudio.playPremiumClick();
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
};
