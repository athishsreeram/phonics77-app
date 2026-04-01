/* js/session.js — DailyMission manager: selects 3 activities from current stage
   Stores session state in localStorage under key: ph_daily_mission
*/
'use strict';

const DailyMission = (() => {
  const KEY = 'ph_daily_mission';

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch(e){ return {}; } }
  function save(s) { localStorage.setItem(KEY, JSON.stringify(s)); }

  function pickThreeFromStage(stageIndex) {
    const stages = CurriculumManager.getStages();
    const stage = stages[stageIndex] || stages[0];
    const pool = stage.activities.slice();
    // prefer activities not completed yet
    const state = CurriculumManager.getState();
    pool.sort((a,b) => {
      const ca = state.completed && state.completed[a] ? 1 : 0;
      const cb = state.completed && state.completed[b] ? 1 : 0;
      return ca - cb;
    });
    const pick = pool.slice(0,3);
    return pick;
  }

  function init() {
    const todayKey = new Date().toISOString().slice(0,10);
    const sess = load();
    if (sess.date === todayKey && sess.activities && sess.activities.length) return sess;
    const stageIndex = CurriculumManager.getCurrentStage();
    const activities = pickThreeFromStage(stageIndex);
    const out = { date: todayKey, activities: activities, completed: {} };
    save(out); return out;
  }

  function getMission() { return init(); }

  function markComplete(id) {
    const s = load(); if (!s.activities) return;
    s.completed = s.completed || {};
    s.completed[id] = true;
    save(s);
    // also mark activity complete in curriculum manager and trigger first-win email capture
    try {
      if (window.CurriculumManager) {
        const first = CurriculumManager.markActivityComplete(id);
        if (first && window.analytics && analytics.showEmailCapture) analytics.showEmailCapture('first_win');
      }
    } catch (e) { console.warn('Curriculum mark failed', e); }
    // If all complete, redirect to celebrate
    const all = s.activities.every(a => s.completed && s.completed[a]);
    if (all) {
      // Track streaks
      const streak = incrementStreak();
      setTimeout(() => { location.href = 'pages/celebrate.html'; }, 700);
    }
  }

  function isComplete(id) { const s = load(); return !!(s.completed && s.completed[id]); }

  function renderWidget(containerId) {
    const mount = document.getElementById(containerId); if (!mount) return;
    const mission = init();
    mount.innerHTML = '';
    const wrap = document.createElement('div'); wrap.className = 'daily-mission'; wrap.style = 'background:white;border-radius:16px;padding:12px;box-shadow:var(--shadow-sm);max-width:420px;margin:14px auto';
    wrap.innerHTML = `<div style="font-weight:800;margin-bottom:8px">Today's Mini-Session</div><div style="color:#666;font-size:.95rem;margin-bottom:8px">Complete 3 short activities — done in 15 minutes</div>`;
    const list = document.createElement('div'); list.style = 'display:flex;flex-direction:column;gap:8px';
    mission.activities.forEach(a => {
      const row = document.createElement('div'); row.style = 'display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px;border-radius:10px;background:#fbfbfd';
      const name = document.createElement('div'); name.style = 'font-weight:700'; name.textContent = activityLabel(a);
      const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!mission.completed && !!mission.completed[a];
      cb.addEventListener('change', (e) => { if (e.target.checked) { markComplete(a); UI.showFeedback(true); } });
      row.appendChild(name); row.appendChild(cb); list.appendChild(row);
    });
    wrap.appendChild(list);
    mount.appendChild(wrap);
  }

  function activityLabel(id) {
    const labels = {
      'letter-recognition':'Letter Sounds', 'sound-matching':'Sound Matching', 'cvc-words':'CVC Blending', 'alphabet-tracing':'Alphabet Tracing',
      'digraph-practice':'Digraphs','sight-words':'Sight Words','word-families':'Word Families','story-time':'Stories','sentence-reading':'Fluency','consonant-blends':'Consonant Blends'
    };
    return labels[id] || id;
  }

  function incrementStreak() {
    const key = 'ph_streak';
    let s = parseInt(localStorage.getItem(key) || '0',10) || 0; s++; localStorage.setItem(key, String(s)); return s;
  }

  return { getMission, markComplete, isComplete, renderWidget };
})();
