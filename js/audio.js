'use strict';
const AudioManager = (() => {
  let currentUtterance = null;
  const ctx = (() => { try { return new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return null; } })();
  const TONES = {
    click:   {freq:440,dur:.08,type:'sine',   vol:.3},
    correct: {freq:660,dur:.4, type:'triangle',vol:.4},
    wrong:   {freq:220,dur:.35,type:'sawtooth',vol:.3},
    star:    {freq:880,dur:.6, type:'sine',   vol:.5},
    pop:     {freq:520,dur:.12,type:'square', vol:.35},
  };
  function playTone(name){
    if(!ctx)return; const t=TONES[name]||TONES.click;
    try{const o=ctx.createOscillator();const g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.type=t.type;o.frequency.setValueAtTime(t.freq,ctx.currentTime);g.gain.setValueAtTime(t.vol,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+t.dur);o.start();o.stop(ctx.currentTime+t.dur+.05);}catch(e){}
  }
  function speak(text,opts={}){
    if(!window.speechSynthesis)return; stop();
    const u=new SpeechSynthesisUtterance(text);
    u.rate=opts.rate??0.85;u.pitch=opts.pitch??1.1;u.volume=opts.volume??1;
    if(opts.onEnd)u.onend=opts.onEnd;
    currentUtterance=u;speechSynthesis.speak(u);
  }
  function speakPhoneme(letter){
    if(!window.speechSynthesis||!letter)return;
    const key=String(letter).toUpperCase();
    const entry=(typeof PHONICS_DATA!=='undefined'&&PHONICS_DATA.alphabet)?PHONICS_DATA.alphabet.find(a=>a.l&&a.l.toUpperCase()===key):null;
    const hint=entry&&entry.ttsHint?entry.ttsHint:letter;
    stop();const u=new SpeechSynthesisUtterance(hint);u.rate=.5;u.pitch=1;u.volume=1;currentUtterance=u;speechSynthesis.speak(u);
  }
  function stop(){if(window.speechSynthesis)speechSynthesis.cancel();currentUtterance=null;}
  return {speak,stop,playTone,speakPhoneme};
})();
