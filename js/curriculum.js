/* js/curriculum.js — Curriculum Sequence Engine */
'use strict';

// Config
const CURRICULUM_CONFIG = {
  STORAGE_KEY: 'ph_stage_progress', // persisted key
  OPEN_CELEBRATION_PAGE: true,      // when true, opens pages/celebrate.html on unlock; otherwise dispatches 'ph:celebrate'
};

/* CurriculumManager
   - Exposed as window.CurriculumManager for compatibility with non-module scripts
   - Persists progress under CURRICULUM_CONFIG.STORAGE_KEY
   - Emits events: 'ph:stage-unlocked' (detail:{stageIndex}), 'ph:celebrate' (detail:{stageIndex}), 'ph:curriculum-complete'
*/
const CurriculumManager = (() => {
  const STAGES = [
    { name: 'Sound Awareness', description: 'Letter sounds and basic sound-matching activities', activities: ['letter-recognition','sound-matching','alphabet-balloon','blending-intro'], requiredCompletions: 2, premium: false },
    { name: 'First Words',     description: 'CVC blending and alphabet tracing to build first words', activities: ['cvc-words','progress-tracker','silent-e-words','syllables'], requiredCompletions: 2, premium: false },
    { name: 'Word Builder',     description: 'Digraphs, sight words and word families', activities: ['digraph-practice','vowel-digraphs','diphthongs','vowel-teams','vowel-variants','sight-words','word-families'], requiredCompletions: 4, premium: true },
    { name: 'Reading Ready',    description: 'Stories, fluency practice and consonant blends', activities: ['story-time','read-advanced','consonant-blends','sentence-reading','phonics-review','assessment-level-1','assessment-level-2','parent-dashboard'], requiredCompletions: 4, premium: true },
  ];

  // Read persisted store, defensive if localStorage unavailable
  function readStore() {
    try {
      const raw = localStorage.getItem(CURRICULUM_CONFIG.STORAGE_KEY);
      if (!raw) return { unlockedStages: [true, true, true, true], completed: {} };
      const parsed = JSON.parse(raw);
      if (!parsed.unlockedStages) parsed.unlockedStages = [true, false, false, false];
      if (!parsed.completed) parsed.completed = {};
      return parsed;
    } catch (e) {
      return { unlockedStages: [true, true, true, true], completed: {} };
    }
  }

  function writeStore(s) {
    try { localStorage.setItem(CURRICULUM_CONFIG.STORAGE_KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
  }

  function getStageIndexForActivity(id) {
    return STAGES.findIndex(s => Array.isArray(s.activities) && s.activities.includes(id));
  }

  function getStageProgress(stageIndex) {
    const store = readStore();
    const stage = STAGES[stageIndex];
    if (!stage) return { completed: 0, total: 0 };
    const total = stage.activities.length;
    const completed = stage.activities.reduce((acc, a) => acc + (store.completed && store.completed[a] ? 1 : 0), 0);
    return { completed, total };
  }

  function isStageUnlocked(stageIndex) {
    const store = readStore();
    return !!(store.unlockedStages && store.unlockedStages[stageIndex]);
  }

  function getCurrentStage() {
    const store = readStore();
    for (let i = STAGES.length - 1; i >= 0; i--) if (store.unlockedStages && store.unlockedStages[i]) return i;
    return 0;
  }

  function markActivityComplete(id) {
    if (!id) return;
    const store = readStore();
    store.completed = store.completed || {};
    if (store.completed[id]) return; // already completed
    store.completed[id] = true;
    writeStore(store);

    // Check if the containing stage is now complete
    const stageIndex = getStageIndexForActivity(id);
    if (stageIndex < 0) return;
    const progress = getStageProgress(stageIndex);
    const stage = STAGES[stageIndex];
    const required = stage.requiredCompletions || stage.activities.length;
    if (progress.completed >= required) {
      const next = stageIndex + 1;
      if (next < STAGES.length) {
        store.unlockedStages = store.unlockedStages || [true, false, false, false];
        if (!store.unlockedStages[next]) {
          store.unlockedStages[next] = true;
          writeStore(store);
          // notify listeners
          window.dispatchEvent(new CustomEvent('ph:stage-unlocked', { detail: { stageIndex: next } }));
          // celebration: open page or dispatch event depending on config
          if (CURRICULUM_CONFIG.OPEN_CELEBRATION_PAGE) {
            try { window.open('pages/celebrate.html', '_blank'); } catch(e) {}
          } else {
            window.dispatchEvent(new CustomEvent('ph:celebrate', { detail: { stageIndex: next } }));
          }
        }
      } else {
        // final stage completed
        window.dispatchEvent(new CustomEvent('ph:curriculum-complete', { detail: { stageIndex } }));
        if (!CURRICULUM_CONFIG.OPEN_CELEBRATION_PAGE) window.dispatchEvent(new CustomEvent('ph:celebrate', { detail: { stageIndex } }));
      }
    }
  }

  return {
    STAGES,
    getCurrentStage,
    markActivityComplete,
    isStageUnlocked,
    getStageProgress,
    getStageIndexForActivity
  };
})();

// expose for non-module usage
try { window.CurriculumManager = CurriculumManager; } catch(e) {}
