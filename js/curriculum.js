/* js/curriculum.js — CurriculumManager: staged learning path
   Stores progress in localStorage under key: ph_curriculum
*/
'use strict';

const CurriculumManager = (() => {
  const STORAGE_KEY = 'ph_curriculum';

  // Define 4 stages with activity ids that map to existing pages
  const STAGES = [
    {
      id: 'stage-1',
      name: 'Sound Awareness',
      description: 'Letter sounds, Sound Matching',
      activities: ['letter-recognition','sound-matching'],
      requiredCompletions: 2, // complete both to unlock next
      free: true
    },
    {
      id: 'stage-2',
      name: 'First Words',
      description: 'CVC blending, Alphabet tracing',
      activities: ['cvc-words','alphabet-tracing'],
      requiredCompletions: 2,
      free: true
    },
    {
      id: 'stage-3',
      name: 'Word Builder',
      description: 'Digraphs, Sight words, Word families',
      activities: ['digraph-practice','sight-words','word-families'],
      requiredCompletions: 2,
      free: false
    },
    {
      id: 'stage-4',
      name: 'Reading Ready',
      description: 'Stories, Fluency, Consonant blends',
      activities: ['story-time','sentence-reading','consonant-blends'],
      requiredCompletions: 2,
      free: false
    }
  ];

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { completed: {}, firstActivityCompleted: false };
      return JSON.parse(raw);
    } catch (e) { return { completed: {}, firstActivityCompleted: false }; }
  }

  function save(state) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

  function getState() { return load(); }

  function getCurrentStage() {
    // Return index of first stage that is not fully completed, or last stage index
    for (let i = 0; i < STAGES.length; i++) {
      const p = getStageProgress(i);
      if (p.completed < p.total) return i;
    }
    return STAGES.length - 1;
  }

  function markActivityComplete(id) {
    const st = load();
    st.completed = st.completed || {};
    const already = !!st.completed[id];
    st.completed[id] = true;
    // track first activity completion for onboarding/email flow
    const wasFirst = !st.firstActivityCompleted && !already;
    if (!st.firstActivityCompleted) st.firstActivityCompleted = true;
    save(st);
    return wasFirst;
  }

  function isActivityComplete(id) {
    const st = load();
    return !!(st.completed && st.completed[id]);
  }

  function isStageUnlocked(stageIndex) {
    if (stageIndex <= 0) return true;
    // unlocked if previous stage has requiredCompletions completed
    const prev = STAGES[stageIndex - 1];
    const progress = getStageProgress(stageIndex - 1);
    return progress.completed >= prev.requiredCompletions;
  }

  function getStageProgress(stageIndex) {
    const stage = STAGES[stageIndex];
    const st = load();
    const completed = (stage.activities || []).filter(id => st.completed && st.completed[id]).length;
    const total = (stage.activities || []).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, percent };
  }

  function getStages() { return STAGES.map((s, i) => ({ ...s, index: i })); }

  return { getStages, getCurrentStage, markActivityComplete, isStageUnlocked, getStageProgress, isActivityComplete, getState };
})();
