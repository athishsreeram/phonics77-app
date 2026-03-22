/* js/audio.js – AudioManager for all activity pages */
'use strict';

const AudioManager = (() => {
  let currentUtterance = null;
  const ctx = (() => { try { return new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return null; } })();

  const TONES = {
    click:   { freq: 440, dur: 0.08, type: 'sine',    vol: 0.3 },
    correct: { freq: 660, dur: 0.4,  type: 'triangle', vol: 0.4 },
    wrong:   { freq: 220, dur: 0.35, type: 'sawtooth', vol: 0.3 },
    star:    { freq: 880, dur: 0.6,  type: 'sine',     vol: 0.5 },
    pop:     { freq: 520, dur: 0.12, type: 'square',   vol: 0.35 },
  };

  function playTone(name) {
    if (!ctx) return;
    const t = TONES[name] || TONES.click;
    try {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = t.type;
      o.frequency.setValueAtTime(t.freq, ctx.currentTime);
      g.gain.setValueAtTime(t.vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t.dur);
      o.start(); o.stop(ctx.currentTime + t.dur + 0.05);
    } catch(e) {}
  }

  function speak(text, opts = {}) {
    if (!window.speechSynthesis) return;
    stop();
    const u = new SpeechSynthesisUtterance(text);
    u.rate   = opts.rate  ?? 0.85;
    u.pitch  = opts.pitch ?? 1.1;
    u.volume = opts.volume ?? 1;
    if (opts.onEnd) u.onend = opts.onEnd;
    currentUtterance = u;
    speechSynthesis.speak(u);
  }

  function stop() {
    if (window.speechSynthesis) speechSynthesis.cancel();
    currentUtterance = null;
  }

  return { speak, stop, playTone };
})();
