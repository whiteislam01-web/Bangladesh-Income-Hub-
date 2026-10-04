/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Simple, high-end Web Audio API Synthesizer for UI interactions
class CustomSynthEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazy initialize to bypass browser autoplay policies
    if (typeof window !== 'undefined') {
      const storedMute = localStorage.getItem('bih_audio_muted');
      this.isMuted = storedMute === 'true';
    }
  }

  private initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    localStorage.setItem('bih_audio_muted', String(muted));
  }

  public getMutedStatus(): boolean {
    return this.isMuted;
  }

  /**
   * Premium micro-sound: Gentle high-frequency warm tick on hovering buttons
   */
  public playHoverTick() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Extremely quick high frequency decay
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      
      gain.gain.setValueAtTime(0.015, now); // Extremely quiet
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      // Ignore silent browser restrictions
    }
  }

  /**
   * Cinematic select/click: Dual-oscillator rich tone to represent luxury lock access
   */
  public playPremiumClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const oscSub = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);
      
      oscSub.type = 'sine';
      oscSub.frequency.setValueAtTime(130, now);
      oscSub.frequency.exponentialRampToValueAtTime(80, now + 0.15);
      
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      
      osc.connect(gain);
      oscSub.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      oscSub.start(now);
      
      osc.stop(now + 0.15);
      oscSub.stop(now + 0.15);
    } catch (e) {
      // Safe fallback
    }
  }

  /**
   * Soft whoosh sound: For transitions and drawer actions
   */
  public playTransitionSwoosh() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.35);
      
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      // Safe catch
    }
  }
}

export const bihAudio = new CustomSynthEngine();
