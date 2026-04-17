/* js/materials.js – shared phonics data used by activity pages */
'use strict';

const PHONICS_DATA = {
  alphabet: [
    { l:'A', word:'Apple',    emoji:'🍎', sound:'aah',  vowel:true  },
    { l:'B', word:'Ball',     emoji:'⚽', sound:'buh',  vowel:false, phoneme:'/b/',  ttsHint:'b'  },
    { l:'C', word:'Cat',      emoji:'🐱', sound:'kuh',  vowel:false, phoneme:'/k/',  ttsHint:'k'  },
    { l:'D', word:'Dog',      emoji:'🐶', sound:'duh',  vowel:false, phoneme:'/d/',  ttsHint:'d'  },
    { l:'E', word:'Elephant', emoji:'🐘', sound:'eh',   vowel:true  },
    { l:'F', word:'Fish',     emoji:'🐟', sound:'fuh',  vowel:false, phoneme:'/f/',  ttsHint:'f'  },
    { l:'G', word:'Gorilla',  emoji:'🦍', sound:'guh',  vowel:false, phoneme:'/g/',  ttsHint:'g'  },
    { l:'H', word:'Hat',      emoji:'🎩', sound:'huh',  vowel:false, phoneme:'/h/',  ttsHint:'h'  },
    { l:'I', word:'Igloo',    emoji:'🏔️', sound:'ih',   vowel:true  },
    { l:'J', word:'Jet',      emoji:'✈️', sound:'juh',  vowel:false, phoneme:'/dʒ/', ttsHint:'j'  },
    { l:'K', word:'Kite',     emoji:'🪁', sound:'kuh',  vowel:false, phoneme:'/k/',  ttsHint:'k'  },
    { l:'L', word:'Lion',     emoji:'🦁', sound:'luh',  vowel:false, phoneme:'/l/',  ttsHint:'l'  },
    { l:'M', word:'Moon',     emoji:'🌙', sound:'muh',  vowel:false, phoneme:'/m/',  ttsHint:'m'  },
    { l:'N', word:'Net',      emoji:'🥅', sound:'nuh',  vowel:false, phoneme:'/n/',  ttsHint:'n'  },
    { l:'O', word:'Orange',   emoji:'🍊', sound:'oh',   vowel:true  },
    { l:'P', word:'Pig',      emoji:'🐷', sound:'puh',  vowel:false, phoneme:'/p/',  ttsHint:'p'  },
    { l:'Q', word:'Queen',    emoji:'👑', sound:'kwuh', vowel:false, phoneme:'/kw/', ttsHint:'kw' },
    { l:'R', word:'Rabbit',   emoji:'🐰', sound:'ruh',  vowel:false, phoneme:'/r/',  ttsHint:'r'  },
    { l:'S', word:'Sun',      emoji:'☀️', sound:'sss',  vowel:false, phoneme:'/s/',  ttsHint:'s'  },
    { l:'T', word:'Tiger',    emoji:'🐯', sound:'tuh',  vowel:false, phoneme:'/t/',  ttsHint:'t'  },
    { l:'U', word:'Umbrella', emoji:'☂️', sound:'uh',   vowel:true  },
    { l:'V', word:'Van',      emoji:'🚐', sound:'vuh',  vowel:false, phoneme:'/v/',  ttsHint:'v'  },
    { l:'W', word:'Whale',    emoji:'🐋', sound:'wuh',  vowel:false, phoneme:'/w/',  ttsHint:'w'  },
    { l:'X', word:'X-ray',    emoji:'🩻', sound:'ksss', vowel:false, phoneme:'/ks/', ttsHint:'ks' },
    { l:'Y', word:'Yak',      emoji:'🐃', sound:'yuh',  vowel:false, phoneme:'/j/',  ttsHint:'y'  },
    { l:'Z', word:'Zebra',    emoji:'🦓', sound:'zzz',  vowel:false, phoneme:'/z/',  ttsHint:'z'  },
  ],

  digraphs: [
    { pair:'SH', word:'Shark',   emoji:'🦈', example:'sh-ark', sound:'shh'  },
    { pair:'CH', word:'Cheese',  emoji:'🧀', example:'ch-eese',sound:'ch'   },
    { pair:'TH', word:'Thumb',   emoji:'👍', example:'th-umb', sound:'th'   },
    { pair:'WH', word:'Whale',   emoji:'🐳', example:'wh-ale', sound:'wh'   },
    { pair:'PH', word:'Phone',   emoji:'📱', example:'ph-one', sound:'fuh'  },
    { pair:'CK', word:'Clock',   emoji:'🕐', example:'cl-ock', sound:'kuh'  },
    { pair:'NG', word:'Ring',    emoji:'💍', example:'ri-ng',  sound:'ng'   },
    { pair:'QU', word:'Queen',   emoji:'👑', example:'qu-een', sound:'kwuh' },
    { pair:'KN', word:'Knee',    emoji:'🦵', example:'k-nee',  sound:'nuh'  },
    { pair:'WR', word:'Wrist',   emoji:'🤚', example:'wr-ist', sound:'r'    },
  ],

  cvc: [
    { word:'cat', emoji:'🐱' }, { word:'dog', emoji:'🐶' }, { word:'hat', emoji:'🎩' },
    { word:'bug', emoji:'🐛' }, { word:'sun', emoji:'☀️' }, { word:'cup', emoji:'☕' },
    { word:'pen', emoji:'🖊️' }, { word:'pin', emoji:'📌' }, { word:'hop', emoji:'🐸' },
    { word:'bit', emoji:'🦷' }, { word:'red', emoji:'🔴' }, { word:'wet', emoji:'💧' },
    { word:'lip', emoji:'💋' }, { word:'log', emoji:'🪵' }, { word:'mud', emoji:'🟤' },
    { word:'nut', emoji:'🌰' }, { word:'rob', emoji:'👨' }, { word:'tip', emoji:'💡' },
    { word:'jam', emoji:'🍓' }, { word:'fox', emoji:'🦊' }, { word:'bed', emoji:'🛏️' },
    { word:'mix', emoji:'🧪' }, { word:'yak', emoji:'🐂' }, { word:'zip', emoji:'📦' },
    { word:'cab', emoji:'🚕' }, { word:'jar', emoji:'🍯' }, { word:'sap', emoji:'🌲' },
  ],

  sightWords: [
    'the','and','a','to','is','in','it','you','of','that',
    'he','was','for','on','are','as','with','his','they','at',
    'be','this','from','or','one','had','by','but','not','what',
    'all','were','we','when','your','can','said','there','use','an',
    'each','which','she','do','how','their','if','will','up','other',
    'about','out','many','then','them','these','so','some','her','would',
    'who','when','where','why','all','very','more','most','been','get',
  ],

  vowels: [
    { letter:'A', short:{ word:'apple',  emoji:'🍎', sound:'aah' }, long:{ word:'ape',   emoji:'🦍', sound:'ay'  } },
    { letter:'E', short:{ word:'egg',    emoji:'🥚', sound:'eh'  }, long:{ word:'eel',   emoji:'🐍', sound:'ee'  } },
    { letter:'I', short:{ word:'igloo',  emoji:'🏔️', sound:'ih'  }, long:{ word:'ice',   emoji:'🧊', sound:'eye' } },
    { letter:'O', short:{ word:'octopus',emoji:'🐙', sound:'oh'  }, long:{ word:'oak',   emoji:'🌳', sound:'oh'  } },
    { letter:'U', short:{ word:'umbrella',emoji:'☂️',sound:'uh'  }, long:{ word:'unicorn',emoji:'🦄',sound:'you' } },
  ],

  consonantBlends: [
    { blend:'bl', word:'blue',  emoji:'🔵' }, { blend:'br', word:'bread',  emoji:'🍞' },
    { blend:'cl', word:'cloud', emoji:'☁️' }, { blend:'cr', word:'crown',  emoji:'👑' },
    { blend:'dr', word:'drum',  emoji:'🥁' }, { blend:'fl', word:'flag',   emoji:'🚩' },
    { blend:'fr', word:'frog',  emoji:'🐸' }, { blend:'gl', word:'globe',  emoji:'🌎' },
    { blend:'gr', word:'grapes',emoji:'🍇' }, { blend:'pl', word:'plane',  emoji:'✈️' },
    { blend:'pr', word:'prince',emoji:'🤴' }, { blend:'sc', word:'scarf',  emoji:'🧣' },
    { blend:'sk', word:'skip',  emoji:'⏩' }, { blend:'sl', word:'sled',   emoji:'🛷' },
    { blend:'sm', word:'smile', emoji:'😊' }, { blend:'sn', word:'snail',  emoji:'🐌' },
    { blend:'sp', word:'spoon', emoji:'🥄' }, { blend:'st', word:'star',   emoji:'⭐' },
    { blend:'sw', word:'swan',  emoji:'🦢' }, { blend:'tr', word:'train',  emoji:'🚂' },
    { blend:'tw', word:'twins', emoji:'👥' }, { blend:'wr', word:'wrist',  emoji:'🤚' },
  ],

  magicE: [
    { cvc:'cap', magic:'cape', emoji1:'🧢', emoji2:'🦸' },
    { cvc:'kit', magic:'kite', emoji1:'🧰', emoji2:'🪁' },
    { cvc:'hop', magic:'hope', emoji1:'🐸', emoji2:'🤞' },
    { cvc:'cub', magic:'cube', emoji1:'🐻', emoji2:'🎲' },
    { cvc:'pin', magic:'pine', emoji1:'📌', emoji2:'🌲' },
    { cvc:'man', magic:'mane', emoji1:'👨', emoji2:'🦁' },
    { cvc:'rid', magic:'ride', emoji1:'😤', emoji2:'🚲' },
    { cvc:'fad', magic:'fade', emoji1:'😐', emoji2:'🌅' },
    { cvc:'tap', magic:'tape', emoji1:'🛠️', emoji2:'🏷️' },
    { cvc:'mad', magic:'made', emoji1:'😡', emoji2:'✅' },
    { cvc:'pan', magic:'pane', emoji1:'🍳', emoji2:'🪟' },
    { cvc:'nod', magic:'node', emoji1:'🤏', emoji2:'🔗' },
  ],

  rhymes: [
    { family:'at', words:['cat','bat','hat','mat','rat','sat','fat','pat'] },
    { family:'an', words:['can','fan','man','pan','ran','tan','van','ban'] },
    { family:'in', words:['bin','fin','pin','sin','tin','win','kin','gin'] },
    { family:'og', words:['bog','dog','fog','hog','log','cog','tog','frog'] },
    { family:'un', words:['bun','fun','gun','nun','pun','run','sun','nun'] },
    { family:'ip', words:['dip','hip','lip','nip','rip','sip','tip','zip'] },
    { family:'ake', words:['cake','lake','make','rake','sake','take','wake','fake'] },
    { family:'op', words:['hop','mop','pop','top','cop','shop','stop'] },
  ],

  diphthongs: [],

  vowelVariants: [],

  syllables: [
    { word:'cat',      type:'closed',    syllables:1, emoji:'🐱', breakdown:'cat' },
    { word:'go',       type:'open',      syllables:1, emoji:'🚀', breakdown:'go' },
    { word:'cake',     type:'silent-e',  syllables:1, emoji:'🎂', breakdown:'cake' },
    { word:'team',     type:'vowel-team',syllables:1, emoji:'⚽', breakdown:'team' },
    { word:'napkin',   type:'closed',    syllables:2, emoji:'🧻', breakdown:'nap·kin' },
    { word:'paper',    type:'open',      syllables:2, emoji:'📄', breakdown:'pa·per' },
    { word:'gentle',   type:'silent-e',  syllables:2, emoji:'💚', breakdown:'gen·tle' },
    { word:'ocean',    type:'vowel-team',syllables:2, emoji:'🌊', breakdown:'o·cean' },
    { word:'rabbit',   type:'closed',    syllables:2, emoji:'🐰', breakdown:'rab·bit' },
    { word:'table',    type:'open',      syllables:2, emoji:'🪑', breakdown:'ta·ble' },
    { word:'banana',   type:'open',      syllables:3, emoji:'🍌', breakdown:'ba·na·na' },
    { word:'elephant', type:'closed',    syllables:3, emoji:'🐘', breakdown:'el·e·phant' },
    { word:'chocolate',type:'closed',    syllables:3, emoji:'🍫', breakdown:'choc·o·late' },
  ],

  vowelDigraphs: [
    { pair:'ea', word:'bread',   emoji:'🍞', sound:'short-eh', sounds:['short-eh','long-ay'] },
    { pair:'ea', word:'leaf',    emoji:'🍃', sound:'long-ay', sounds:['short-eh','long-ay'] },
    { pair:'ea', word:'head',    emoji:'🦴', sound:'short-eh', sounds:['short-eh','long-ay'] },
    { pair:'ea', word:'read',    emoji:'📖', sound:'long-ay', sounds:['short-eh','long-ay'] },
    { pair:'oo', word:'book',    emoji:'📕', sound:'short-oo', sounds:['short-oo','long-oo'] },
    { pair:'oo', word:'moon',    emoji:'🌙', sound:'long-oo', sounds:['short-oo','long-oo'] },
    { pair:'oo', word:'foot',    emoji:'🦶', sound:'short-oo', sounds:['short-oo','long-oo'] },
    { pair:'oo', word:'food',    emoji:'🍕', sound:'long-oo', sounds:['short-oo','long-oo'] },
    { pair:'ai', word:'rain',    emoji:'🌧️', sound:'long-ay', sounds:['long-ay'] },
    { pair:'ay', word:'play',    emoji:'🎮', sound:'long-ay', sounds:['long-ay'] },
    { pair:'ee', word:'bee',     emoji:'🐝', sound:'long-ee', sounds:['long-ee'] },
    { pair:'ie', word:'pie',     emoji:'🥧', sound:'long-eye', sounds:['long-eye'] },
    { pair:'oa', word:'boat',    emoji:'⛵', sound:'long-oh', sounds:['long-oh'] },
    { pair:'ue', word:'blue',    emoji:'🔵', sound:'long-oo', sounds:['long-oo'] },
    { pair:'igh', word:'light',  emoji:'💡', sound:'long-eye', sounds:['long-eye'] },
    { pair:'aw', word:'saw',     emoji:'🪓', sound:'aw', sounds:['aw'] },
    { pair:'au', word:'haul',    emoji:'🚛', sound:'aw', sounds:['aw'] },
    { pair:'ew', word:'new',     emoji:'🆕', sound:'long-oo', sounds:['long-oo'] },
    { pair:'oi', word:'coin',    emoji:'🪙', sound:'oy-sound', sounds:['oy-sound'] },
    { pair:'oi', word:'boil',    emoji:'💧', sound:'oy-sound', sounds:['oy-sound'] },
    { pair:'oi', word:'foil',    emoji:'🌿', sound:'oy-sound', sounds:['oy-sound'] },
    { pair:'oy', word:'toy',     emoji:'🧸', sound:'oy-sound', sounds:['oy-sound'] },
    { pair:'oy', word:'boy',     emoji:'👦', sound:'oy-sound', sounds:['oy-sound'] },
    { pair:'oy', word:'joy',     emoji:'😊', sound:'oy-sound', sounds:['oy-sound'] },
    { pair:'ou', word:'house',   emoji:'🏠', sound:'ow-sound', sounds:['ow-sound'] },
    { pair:'ou', word:'mouse',   emoji:'🐭', sound:'ow-sound', sounds:['ow-sound'] },
    { pair:'ou', word:'cloud',   emoji:'☁️', sound:'ow-sound', sounds:['ow-sound'] },
    { pair:'ow', word:'cow',     emoji:'🐄', sound:'ow-sound', sounds:['ow-sound'] },
    { pair:'ow', word:'owl',     emoji:'🦉', sound:'ow-sound', sounds:['ow-sound'] },
    { pair:'ow', word:'bow',     emoji:'🏹', sound:'ow-sound', sounds:['ow-sound'] },
  ],

  // Activities metadata used by the curriculum UI and activity-gating
  activities: [
    { id:'letter-recognition', title:'Alphabet: Letter Recognition', description:'Recognize letters and hear their sounds', file:'alphabet.html', emoji:'🔤', stageIndex:0, premium:false, difficulty:'easy', ttsHint:'letters' },
    { id:'sound-matching', title:'Sound Matching', description:'Match sounds to letters and words', file:'listen-choose.html', emoji:'🎧', stageIndex:0, premium:false, difficulty:'easy' },
    { id:'alphabet-balloon', title:'Alphabet Balloon Pop', description:'Pop balloons to identify letters', file:'alphabet-ballon-pop.html', emoji:'🎈', stageIndex:0, premium:true, difficulty:'easy' },
    { id:'blending-intro', title:'Intro to Blending', description:'Blend sounds to form simple words', file:'phonic-set1.html', emoji:'🧩', stageIndex:0, premium:false, difficulty:'easy' },

    { id:'cvc-words', title:'CVC Word Blending', description:'Blend consonant-vowel-consonant words', file:'cvc.html', emoji:'🐱', stageIndex:1, premium:true, difficulty:'easy' },
    { id:'progress-tracker', title:'Progress Tracker', description:'Track learning progress and achievements', file:'trace.html', emoji:'📈', stageIndex:1, premium:true, difficulty:'n/a', parentFacing:true },
    { id:'silent-e-words', title:'Magic E (Silent-e)', description:'Change short vowels to long with Magic E', file:'magic-e.html', emoji:'🪄', stageIndex:1, premium:true, difficulty:'medium' },
    { id:'syllables', title:'Syllable Types', description:'Identify syllable types and break words apart', file:'syllables.html', emoji:'🔡', stageIndex:1, premium:true, difficulty:'medium' },

    { id:'digraph-practice', title:'Digraph Practice', description:'Practice digraphs like SH, CH, TH', file:'digraphs.html', emoji:'🦈', stageIndex:2, premium:true, difficulty:'medium' },
    { id:'vowel-digraphs', title:'Vowel Digraphs', description:'Explore vowel pairs like EA, OO, and vowel sounds (oi/oy, ou/ow)', file:'digraph_fill.html', emoji:'🍞', stageIndex:2, premium:true, difficulty:'medium' },
    { id:'vowel-teams', title:'Vowel Teams', description:'Learn vowel team sounds (ea, ai, oa)', file:'vowels.html', emoji:'🍃', stageIndex:2, premium:true, difficulty:'medium' },
    { id:'sight-words', title:'Sight Words', description:'Recognize high-frequency sight words', file:'sight-words.html', emoji:'✨', stageIndex:2, premium:true, difficulty:'easy' },
    { id:'word-families', title:'Word Families (Rhymes)', description:'Practice rhyming families and word patterns', file:'rhyme.html', emoji:'🎵', stageIndex:2, premium:true, difficulty:'easy' },

    { id:'story-time', title:'Story Time', description:'Listen to simple stories and answer questions', file:'story.html', emoji:'📚', stageIndex:3, premium:true, difficulty:'medium' },
    { id:'consonant-blends', title:'Consonant Blends', description:'Practice blends like bl, st, tr', file:'consonant-blend.html', emoji:'🥁', stageIndex:3, premium:true, difficulty:'medium' },
    { id:'sentence-reading', title:'Sentence Reading', description:'Read and comprehend short sentences', file:'read.html', emoji:'📝', stageIndex:3, premium:true, difficulty:'medium' },
    { id:'phonics-review', title:'Phonics Review', description:'Mixed practice across phonics skills', file:'phkids.html', emoji:'🔁', stageIndex:3, premium:true, difficulty:'varied' },
    { id:'assessment-level-1', title:'Assessment Level 1', description:'Adaptive assessment for core skills', file:'word-match.html', emoji:'🧾', stageIndex:3, premium:true, difficulty:'assessment' },
    { id:'assessment-level-2', title:'Assessment Level 2', description:'Extended assessment with open tasks', file:'word-explore.html', emoji:'🔎', stageIndex:3, premium:true, difficulty:'assessment' },
    { id:'parent-dashboard', title:'Parent Dashboard', description:'Parent tools and printable resources', file:'parent-dashboard.html', emoji:'👨‍👩‍👧', stageIndex:3, premium:true, difficulty:'n/a', parentFacing:true },
    { id:'ai-reading-tutor', title:'AI Reading Tutor', description:'Interactive AI-guided fluency practice and phonics coach', file:'pages/ai-reading-tutor.html', emoji:'🦉', stageIndex:3, premium:true, difficulty:'medium' },
  ],

  // Simple runtime validator to ensure CurriculumManager.STAGES activities are present here.
  validateActivities: function() {
    if (typeof window === 'undefined' || !window.CurriculumManager) {
      console.warn('PHONICS_DATA.validateActivities: CurriculumManager not available yet. Run after page load.');
      return;
    }
    const known = (PHONICS_DATA.activities || []).map(a => a.id);
    const missing = [];
    window.CurriculumManager.STAGES.forEach((s, idx) => {
      (s.activities || []).forEach(id => { if (!known.includes(id)) missing.push({ id, stage: idx, stageName: s.name }); });
    });
    if (missing.length) console.warn('PHONICS_DATA: missing activity metadata for:', missing);
    else console.log('PHONICS_DATA: all curriculum activities present.');
  },
};
