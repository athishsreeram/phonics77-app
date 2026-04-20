/* js/curriculum.js — Curriculum Sequence Engine */
'use strict';

const CURRICULUM_CONFIG = {
  STORAGE_KEY: 'ph_stage_progress',
  OPEN_CELEBRATION_PAGE: true,
};

const CurriculumManager = (() => {
  // RESTRUCTURED STAGES — removed diphthongs, vowel-variants, read-advanced
  const STAGES = [
    {
      name: 'Sound Awareness',
      description: 'Letter sounds, matching and basic blending — free for everyone',
      activities: ['letter-recognition','sound-matching','alphabet-balloon','blending-intro'],
      requiredCompletions: 2,
      premium: false
    },
    {
      name: 'First Words',
      description: 'CVC words, sight words, word families and matching games',
      activities: ['cvc-words','sight-words','word-families','word-match','word-explore','alphabet-trace','syllables'],
      requiredCompletions: 3,
      premium: false
    },
    {
      name: 'Patterns',
      description: 'Digraphs, vowel teams, Magic E and R-controlled vowels',
      activities: ['digraph-practice','vowel-digraphs','vowel-teams','silent-e-words','r-controlled-vowels'],
      requiredCompletions: 3,
      premium: true
    },
    {
      name: 'Reading Fluency',
      description: 'Consonant blends, sentence reading, stories and full review',
      activities: ['consonant-blends','phonics-review','sentence-reading','story-time','ai-reading-tutor','parent-dashboard'],
      requiredCompletions: 3,
      premium: true
    },
  ];

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
    try { localStorage.setItem(CURRICULUM_CONFIG.STORAGE_KEY, JSON.stringify(s)); } catch (e) {}
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
    if (store.completed[id]) return;
    store.completed[id] = true;
    writeStore(store);

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
          window.dispatchEvent(new CustomEvent('ph:stage-unlocked', { detail: { stageIndex: next } }));
          if (CURRICULUM_CONFIG.OPEN_CELEBRATION_PAGE) {
            try { window.open('pages/celebrate.html', '_blank'); } catch(e) {}
          } else {
            window.dispatchEvent(new CustomEvent('ph:celebrate', { detail: { stageIndex: next } }));
          }
        }
      } else {
        window.dispatchEvent(new CustomEvent('ph:curriculum-complete', { detail: { stageIndex } }));
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

try { window.CurriculumManager = CurriculumManager; } catch(e) {}
