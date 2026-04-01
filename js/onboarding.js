/* js/onboarding.js — simplified, niche-first onboarding
   Flow:
   1) Welcome: niche headline
   2) Pain point: 3-option selector -> routes to appropriate curriculum stage
   3) Child info: collect name + age only
   Immediately launches first activity after setup.
   Email capture is delayed until after first activity completion.
*/
'use strict';

const onboarding = (() => {
  const STORAGE_KEY = 'ph_onboarded';
  let opts = { childName: null, childAge: null, painPoint: null };

  function shouldShow() { return !localStorage.getItem(STORAGE_KEY); }

  function markDone() { localStorage.setItem(STORAGE_KEY, 'true'); }

  function start() { if (!shouldShow()) return; renderWelcome(); }

  function renderWelcome() {
    const existing = document.getElementById('_onboarding'); if (existing) existing.remove();
    const el = document.createElement('div'); el.id = '_onboarding';
    el.style.cssText = 'position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:20px;';
    el.innerHTML = `
      <div style="background:white;border-radius:20px;padding:28px 22px;max-width:520px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.2)">
        <div style="font-size:4rem;margin-bottom:10px">📚</div>
        <h2 style="font-family:'Fredoka One',cursive;font-size:1.8rem;margin-bottom:8px">Does your child know their letters but struggle to read words?</h2>
        <p style="color:#666;margin-bottom:18px">Phonics Hub gets a 5–6 year old from letters to their first words — 15 minutes a day.</p>
        <button id="ob-start" class="btn btn-primary" style="margin-top:6px">Get Started — No Email</button>
        <div style="margin-top:12px"><button id="ob-skip" class="btn btn-secondary">Skip</button></div>
      </div>`;
    document.body.appendChild(el);
    document.getElementById('ob-start').addEventListener('click', () => { renderPainPoint(); });
    document.getElementById('ob-skip').addEventListener('click', () => { markDone(); document.getElementById('_onboarding')?.remove(); });
  }

  function renderPainPoint() {
    const host = document.getElementById('_onboarding'); if (!host) return; host.innerHTML = '';
    host.innerHTML = `
      <div style="background:white;border-radius:20px;padding:28px 22px;max-width:520px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.2)">
        <div style="font-size:3rem;margin-bottom:8px">🎯</div>
        <h3 style="font-family:'Fredoka One',cursive;margin-bottom:8px">Which best describes your child?</h3>
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:12px">
          <button id="pp-1" class="btn btn-secondary">Just starting</button>
          <button id="pp-2" class="btn btn-primary">Knows letters, can't blend</button>
          <button id="pp-3" class="btn btn-secondary">Already blending, wants more</button>
        </div>
      </div>`;
    document.getElementById('pp-1').addEventListener('click', () => { opts.painPoint = 'starting'; renderChildInfo(0); });
    document.getElementById('pp-2').addEventListener('click', () => { opts.painPoint = 'knows_letters_cant_blend'; renderChildInfo(1); });
    document.getElementById('pp-3').addEventListener('click', () => { opts.painPoint = 'already_blending'; renderChildInfo(2); });
  }

  function renderChildInfo(routeHint) {
    const host = document.getElementById('_onboarding'); if (!host) return; host.innerHTML = '';
    host.innerHTML = `
      <div style="background:white;border-radius:20px;padding:22px;max-width:520px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.2)">
        <div style="font-size:3rem;margin-bottom:8px">👶</div>
        <h3 style="font-family:'Fredoka One',cursive;margin-bottom:6px">Tell us your child's first name</h3>
        <input id="ob-name" type="text" placeholder="e.g. Ava" style="width:100%;padding:12px 14px;border-radius:10px;border:2px solid #eee;font-size:1rem;margin-bottom:12px" />
        <div style="display:flex;gap:8px;justify-content:center;margin-bottom:8px">
          <button class="age-btn" data-age="4">4</button>
          <button class="age-btn" data-age="5">5</button>
          <button class="age-btn" data-age="6">6</button>
        </div>
        <div style="display:flex;gap:10px;margin-top:8px">
          <button id="ob-done" class="btn btn-primary">Start Activity</button>
          <button id="ob-back" class="btn btn-secondary">← Back</button>
        </div>
      </div>`;

    document.querySelectorAll('.age-btn').forEach(b => b.addEventListener('click', (e) => {
      document.querySelectorAll('.age-btn').forEach(x => x.style.background='white');
      e.currentTarget.style.background = '#667eea';
      opts.childAge = e.currentTarget.dataset.age;
    }));

    document.getElementById('ob-back').addEventListener('click', () => renderPainPoint());
    document.getElementById('ob-done').addEventListener('click', () => {
      const name = document.getElementById('ob-name').value.trim(); if (name) opts.childName = name;
      // Save profile locally and to analytics (no email yet)
      analytics.updateProfile({ childName: opts.childName, childAge: opts.childAge });
      markDone();
      document.getElementById('_onboarding')?.remove();
      // Route to appropriate curriculum stage and launch first activity
      routeToFirstActivity(routeHint);
    });
  }

  function routeToFirstActivity(routeHint) {
    // Map routeHint to stage index (0=starting,1=knows letters can't blend,2=already blending)
    let stageIndex = 0;
    if (routeHint === 0) stageIndex = 0;
    else if (routeHint === 1) stageIndex = 1;
    else stageIndex = 2;

    const stages = CurriculumManager.getStages();
    const stage = stages[Math.min(stageIndex, stages.length - 1)];
    // Open the first activity in that stage
    const firstActivity = stage.activities && stage.activities[0];
    const url = activityIdToUrl(firstActivity);
    if (url) location.href = url;
  }

  function activityIdToUrl(id) {
    const map = {
      'letter-recognition': 'alphabet.html',
      'sound-matching': 'listen-choose.html',
      'cvc-words': 'cvc.html',
      'alphabet-tracing': 'trace.html',
      'digraph-practice': 'digraphs.html',
      'sight-words': 'sight-words.html',
      'word-families': 'rhyme.html',
      'story-time': 'story.html',
      'sentence-reading': 'read.html',
      'consonant-blends': 'consonant-blend.html'
    };
    return map[id] || null;
  }

  // Called by email capture modal (shown after first activity completion).
  // When email is given, register via PhonicsAPI.registerUser.
  function registerWithEmail(email) {
    const profile = analytics.getProfile() || {};
    analytics.updateProfile({ email });
    if (window.PhonicsAPI) {
      window.PhonicsAPI.registerUser(email, profile.childName || null, profile.childAge || null).catch(()=>{});
    }
  }

  return { start, shouldShow, registerWithEmail };
})();