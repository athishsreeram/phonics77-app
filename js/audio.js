/* js/audio.js – AudioManager for all activity pages
   SPEC: /audio/phonemes/ folder
   - Place short, isolated consonant recordings here named by letter, lowercase.
     Examples: /audio/phonemes/b.mp3, /audio/phonemes/k.mp3, /audio/phonemes/ks.mp3
   - Files should contain the pure consonant phoneme (no trailing vowel), short duration.
   - AudioManager.speakPhoneme(letter) will first attempt to play that file; if
     playback fails it will fall back to a carefully-configured TTS utterance
     (very slow rate, lowered pitch) as a last resort.
*/
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

  // Speak a single-letter phoneme. Tries pre-recorded audio first, then TTS.
  // letter: single character or letter key present in PHONICS_DATA.alphabet entries.
  async function speakPhoneme(letter) {
    if (!letter) return;
    stop();
    const key = String(letter).toUpperCase();
    const entry = (window.PHONICS_DATA && window.PHONICS_DATA.alphabet || []).find(e => e.l === key);
    const phonemeFileName = (entry && entry.phoneme) ? `${key.toLowerCase()}.mp3` : null;
    if (phonemeFileName) {
      const url = `audio/phonemes/${phonemeFileName}`;
      try {
        await playAudioFile(url);
        return;
      } catch (e) {
        // fall through to TTS fallback
      }
    }

    // TTS fallback: speak a carefully tuned short utterance intended to sound like
    // the consonant without a trailing vowel. Best-effort: low rate and pitch.
    if (!window.speechSynthesis) return;
    const fallbackText = entry && entry.phoneme ? entry.phoneme.replace(/[\/]/g,'') : key; // try raw phoneme text or letter
    const u = new SpeechSynthesisUtterance(fallbackText);
    u.rate = 0.5;
    u.pitch = 0.8;
    u.volume = 1;
    // Some browsers speak single letters as letter-names; speaking the raw phoneme
    // string (eg 'b') may still be imperfect — this is a best-effort fallback.
    currentUtterance = u;
    speechSynthesis.speak(u);
  }

  function stop() {
    if (window.speechSynthesis) speechSynthesis.cancel();
    currentUtterance = null;
  }

  return { speak, stop, playTone, speakPhoneme };
})();

// Helper to play a short audio file and resolve/reject based on playback.
function playAudioFile(src) {
  return new Promise((resolve, reject) => {
    try {
      const a = new Audio(src);
      a.preload = 'auto';
      a.addEventListener('ended', () => resolve());
      a.addEventListener('error', () => reject(new Error('Audio load error')));
      a.play().then(() => {
        // played
      }).catch(err => reject(err));
    } catch (e) { reject(e); }
  });
}
