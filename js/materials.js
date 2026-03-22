/* js/materials.js – shared phonics data used by activity pages */
'use strict';

const PHONICS_DATA = {
  alphabet: [
    { l:'A', word:'Apple',    emoji:'🍎', sound:'aah',  vowel:true  },
    { l:'B', word:'Ball',     emoji:'⚽', sound:'buh',  vowel:false },
    { l:'C', word:'Cat',      emoji:'🐱', sound:'kuh',  vowel:false },
    { l:'D', word:'Dog',      emoji:'🐶', sound:'duh',  vowel:false },
    { l:'E', word:'Elephant', emoji:'🐘', sound:'eh',   vowel:true  },
    { l:'F', word:'Fish',     emoji:'🐟', sound:'fuh',  vowel:false },
    { l:'G', word:'Gorilla',  emoji:'🦍', sound:'guh',  vowel:false },
    { l:'H', word:'Hat',      emoji:'🎩', sound:'huh',  vowel:false },
    { l:'I', word:'Igloo',    emoji:'🏔️', sound:'ih',   vowel:true  },
    { l:'J', word:'Jet',      emoji:'✈️', sound:'juh',  vowel:false },
    { l:'K', word:'Kite',     emoji:'🪁', sound:'kuh',  vowel:false },
    { l:'L', word:'Lion',     emoji:'🦁', sound:'luh',  vowel:false },
    { l:'M', word:'Moon',     emoji:'🌙', sound:'muh',  vowel:false },
    { l:'N', word:'Net',      emoji:'🥅', sound:'nuh',  vowel:false },
    { l:'O', word:'Orange',   emoji:'🍊', sound:'oh',   vowel:true  },
    { l:'P', word:'Pig',      emoji:'🐷', sound:'puh',  vowel:false },
    { l:'Q', word:'Queen',    emoji:'👑', sound:'kwuh', vowel:false },
    { l:'R', word:'Rabbit',   emoji:'🐰', sound:'ruh',  vowel:false },
    { l:'S', word:'Sun',      emoji:'☀️', sound:'sss',  vowel:false },
    { l:'T', word:'Tiger',    emoji:'🐯', sound:'tuh',  vowel:false },
    { l:'U', word:'Umbrella', emoji:'☂️', sound:'uh',   vowel:true  },
    { l:'V', word:'Van',      emoji:'🚐', sound:'vuh',  vowel:false },
    { l:'W', word:'Whale',    emoji:'🐋', sound:'wuh',  vowel:false },
    { l:'X', word:'X-ray',    emoji:'🩻', sound:'ksss', vowel:false },
    { l:'Y', word:'Yak',      emoji:'🐃', sound:'yuh',  vowel:false },
    { l:'Z', word:'Zebra',    emoji:'🦓', sound:'zzz',  vowel:false },
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
  ],

  cvc: [
    { word:'cat', emoji:'🐱' }, { word:'dog', emoji:'🐶' }, { word:'hat', emoji:'🎩' },
    { word:'bug', emoji:'🐛' }, { word:'sun', emoji:'☀️' }, { word:'cup', emoji:'☕' },
    { word:'pen', emoji:'🖊️' }, { word:'pin', emoji:'📌' }, { word:'hop', emoji:'🐸' },
    { word:'bit', emoji:'🦷' }, { word:'red', emoji:'🔴' }, { word:'wet', emoji:'💧' },
    { word:'lip', emoji:'💋' }, { word:'log', emoji:'🪵' }, { word:'mud', emoji:'🟤' },
    { word:'nut', emoji:'🌰' }, { word:'rob', emoji:'👨' }, { word:'tip', emoji:'💡' },
  ],

  sightWords: [
    'the','and','a','to','is','in','it','you','of','that',
    'he','was','for','on','are','as','with','his','they','at',
    'be','this','from','or','one','had','by','but','not','what',
    'all','were','we','when','your','can','said','there','use','an',
    'each','which','she','do','how','their','if','will','up','other',
    'about','out','many','then','them','these','so','some','her','would',
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
  ],

  rhymes: [
    { family:'at', words:['cat','bat','hat','mat','rat','sat','fat','pat'] },
    { family:'an', words:['can','fan','man','pan','ran','tan','van','ban'] },
    { family:'in', words:['bin','fin','pin','sin','tin','win','kin','gin'] },
    { family:'og', words:['bog','dog','fog','hog','log','cog','tog','frog'] },
    { family:'un', words:['bun','fun','gun','nun','pun','run','sun','nun'] },
    { family:'ip', words:['dip','hip','lip','nip','rip','sip','tip','zip'] },
  ],
};
