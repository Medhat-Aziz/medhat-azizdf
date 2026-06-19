import { VocabularyCard } from './data/vocabulary';
export type { VocabularyCard };

export interface SongItem {
  id: string;
  title: string;
  titleAr: string;
  emoji: string;
  themeColor: string;
  duration: string;
  lyrics: {
    en: string;
    ar: string;
  }[];
}

export interface StoryPage {
  textEn: string;
  textAr: string;
  illustrationHint: string; // Describes visual or shows a visual badge
}

export interface StoryItem {
  id: string;
  title: string;
  titleAr: string;
  coverEmoji: string;
  themeColor: string;
  difficulty: 'Beginner (مبتدئ)' | 'Medium (متوسط)' | 'Advanced (متقدم)';
  pages: StoryPage[];
  quiz: {
    question: string;
    questionAr: string;
    options: string[];
    answerIndex: number;
    explanationEn: string;
    explanationAr: string;
  };
}

export interface UserProgress {
  xp: number;
  stars: number;
  streak: number;
  lastActive: string; // ISO string date
  avatar: string; // emoji or id
  name: string;
  age: number;
  completedVocabIds: string[];
  completedSongIds: string[];
  completedStoryIds: string[];
  chatExchangesCount: number;
  unlockedBadges: string[];
  completedLevelIds: number[]; // e.g. [1, 2, 3] to track 100 levels
  lastDailyChallengeDate: string | null; // Track if played today
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isCorrection?: boolean;
  correctionText?: string;
}

export const KNOWN_BADGES = [
  { id: 'alphabet_master', title: 'Alphabet Hero', titleAr: 'بطل الحروف', desc: 'World 1 Finished! (Alphabet, letter sounds & greetings)', descAr: 'أكملت المستوى الأول بنجاح!', icon: '🦁' },
  { id: 'numbers_master', title: 'Numbers Master', titleAr: 'سيد الأرقام', desc: 'World 2 Finished! (Counting & simple math)', descAr: 'أكملت عالم الأرقام والحساب!', icon: '🔢' },
  { id: 'artist_badge', title: 'Artist Badge', titleAr: 'وسام الرسام', desc: 'World 3 Finished! (Colors & shapes)', descAr: 'أتممت مهارات الألوان والأشكال!', icon: '🎨' },
  { id: 'friendship_badge', title: 'Friendship Badge', titleAr: 'وسام الصداقة', desc: 'World 4 Finished! (Family members & feelings)', descAr: 'تعلمت كلمات العائلة والمشاعر!', icon: '🤝' },
  { id: 'explorer_badge', title: 'Explorer Badge', titleAr: 'وسام المستكشف', desc: 'World 5 Finished! (Animals Safari and habitats)', descAr: 'استكشفت عالم الحيوانات البرية والطبيعة!', icon: '🤠' },
  { id: 'student_hero_badge', title: 'Student Hero', titleAr: 'البطل المدرسي', desc: 'World 6 Finished! (School objects & sentences)', descAr: 'أنهيت مستوى الأدوات المدرسية واللغة!', icon: '🎒' },
  { id: 'city_hero_badge', title: 'City Hero', titleAr: 'بطل المدينة', desc: 'World 7 Finished! (Daily routines, food & clothes)', descAr: 'تعلمت الروتين اليومي والملابس والساعات!', icon: '🏙️' },
  { id: 'story_master_badge', title: 'Story Master', titleAr: 'سيد الحكايات', desc: 'World 8 Finished! (Reading, dialogue comprehension)', descAr: 'اكتملت مهارات فهم القصص والاستماع!', icon: '📖' },
  { id: 'speaker_badge', title: 'Speaker Badge', titleAr: 'المتحدث الفصيح', desc: 'World 9 Finished! (English speaking confidence)', descAr: 'مستعد للتحدث بطلاقة مع ليو الأسد!', icon: '🗣️' },
  { id: 'english_champion_trophy', title: 'English Champion', titleAr: 'بطل الإنجليزية الحقيقي', desc: 'World 10 Finished! (Advanced grammar, projects & graduation)', descAr: 'تخرجت بطلاً متوجاً في الإنجليزية!', icon: '👑' },
  { id: 'sing_star', title: 'Karaoke Star', titleAr: 'نجم الغناء', desc: 'Listened and sang a song!', descAr: 'استمعت وغنيت أغنية كاملة!', icon: '🎤' },
  { id: 'story_king', title: 'Story Wizard', titleAr: 'ساحر القصص', desc: 'Completed your first interactive story quiz!', descAr: 'أكملت اختبار قصتك التفاعلية الأولى!', icon: '🧙‍♂️' },
  { id: 'chat_buddy', title: 'Leo’s Friend', titleAr: 'صديق ليو الأنيق', desc: 'Exchanged 3 real-time messages with Leo the Lion!', descAr: 'تبادلت 3 رسائل ذكية مع الأسد ليو العبقري!', icon: '💬' },
  { id: 'xp_champion', title: 'XP Superkid', titleAr: 'بطل النقاط', desc: 'Accumulated over 200 XP points! Awesome!', descAr: 'جمعت أكثر من 200 نقطة تجربة!', icon: '🏆' }
];

import { VOCABULARY_DATA } from './data/vocabulary';
export { VOCABULARY_DATA };

export const SONGS_DATA: SongItem[] = [
  {
    id: 'abc_song',
    title: 'The Alphabet Adventure',
    titleAr: 'مغامرة الحروف الهجائية',
    emoji: '🎶',
    themeColor: 'from-amber-400 to-orange-500',
    duration: '1:10',
    lyrics: [
      { en: "A, B, C, D, in the morning we jump with glee!", ar: "أ، ب، ت، ث، في الصباح نقفز ببهجة وسرور!" },
      { en: "E, F, G, H, let's learn English at dynamic space!", ar: "ج، ح، خ، د، لنتعلم الإنجليزية في هذا الفضاء الرائع!" },
      { en: "I, J, K, L, Leo the Lion sings so well!", ar: "ذ، ر، ز، س، الأسد ليو الطيب يغني بشكل رائع!" },
      { en: "M, N, O, P, fruits are sweet for you and me!", ar: "ش، ص، ض، ط، الفواكه الطازجة لذيذة لي ولك!" },
      { en: "Q, R, S, T, happy friends under the tree!", ar: "ظ، ع، غ، ف، الأصدقاء السعداء يمرحون تحت الشجرة!" },
      { en: "U, V, W, X, Y, Z, English is easy, don't forget!", ar: "ق، ك، ل، م، ن، هـ، و، ي، الإنجليزية سهلة وممتعة، لا تنسى ذلك!" },
      { en: "Now I know my ABC, next time won't you sing with Leo and me!", ar: "الآن أنا أعرف حروفي الإنجليزية، في المرة القادمة غنها برفقة ليو ومعي!" }
    ]
  },
  {
    id: 'color_song',
    title: 'Vibrant Colors of the Forest',
    titleAr: 'ألوان الغابة الزاهية المدهشة',
    emoji: '🌈',
    themeColor: 'from-sky-400 to-indigo-600',
    duration: '0:55',
    lyrics: [
      { en: "Red is the apple, sweet and round! 🍎", ar: "الأحمر هو التفاح، حلو ومستدير!" },
      { en: "Blue is the sky, where clouds are found! ☁️", ar: "الأزرق هو السماء الصافية، حيث توجد السحب البيضاء!" },
      { en: "Yellow is the sun, shining so bright! ☀️", ar: "الأصفر هو لون الشمس الذهبي، يشرق بنور ساطع!" },
      { en: "Green is the grass, a beautiful sight! 🌿", ar: "الأخضر هو لون العشب الناعم، منظر جميل يسر القلوب!" },
      { en: "Mix them together, paint what you see!", ar: "امزجهم معاً في لوحة، وارسم كل ما تراه عيناك!" },
      { en: "English is a rainbow, for you and me! 🌈", ar: "اللغة الإنجليزية مثل قوس قزح البهيج، لي ولك!" }
    ]
  },
  {
    id: 'family_song',
    title: 'The Sweet Family Song',
    titleAr: 'أغنية العائلة اللطيفة السعيدة',
    emoji: '🏠',
    themeColor: 'from-emerald-400 to-teal-600',
    duration: '1:05',
    lyrics: [
      { en: "This is my mother, kind and sweet! 🥰", ar: "هذه هي أمي الحبيبة، الطيبة والودودة!" },
      { en: "This is my father, helping on the street! 👨", ar: "هذا هو أبي البطل الشجاع، يساعد الجميع في الطريق!" },
      { en: "This is my brother, tall and strong! 👦", ar: "هذا هو أخي العزيز، طويل وقوي القامة!" },
      { en: "This is my sister, singing a happy song! 👧", ar: "هذه هي أختي الصغيرة اللطيفة، تغني لحناً سعيداً!" },
      { en: "We are a family, holding hands tight!", ar: "نحن عائلة واحدة مترابطة، نمسك بأيدينا بقوة!" },
      { en: "Our home is happy, full of golden light! 🏠✨", ar: "منزلنا سعيد ومبهج، مليء بالدفء والنور الذهبي!" }
    ]
  }
];

export const STORIES_DATA: StoryItem[] = [
  {
    id: 'magical_balloon',
    title: "Leo's Magical Balloon",
    titleAr: "منطاد ليو السحري العجيب",
    coverEmoji: "🎈",
    themeColor: "from-pink-400 to-rose-600",
    difficulty: "Beginner (مبتدئ)",
    pages: [
      {
        textEn: "Leo the Lion finds a big red balloon in the green garden. It rises slowly!",
        textAr: "الأسد ليو الصغير يجد بالوناً أحمر كبيراً في الحديقة الخضراء. إنه يرتفع ببطء سحري!",
        illustrationHint: "🎈🦁🦁"
      },
      {
        textEn: "The balloon goes up, up, up into the beautiful blue sky! Leo is happy.",
        textAr: "يرتفع البالون عالياً، فوق، فوق في السماء الزرقاء الصافية البديعة! ليو سعيد جداً الآن.",
        illustrationHint: "☁️🎈☁️"
      },
      {
        textEn: "A friendly white bird flies near the balloon. 'Hello Leo!' says the bird.",
        textAr: "طائر أبيض ودود يطير بالقرب من البالون السحري. 'أهلاً يا ليو!' يقول الطائر مغرداً.",
        illustrationHint: "🕊️🎈🦁"
      },
      {
        textEn: "Leo says, 'Look! I can fly with my red balloon!' Together they touch the gold stars.",
        textAr: "يقول ليو بصوت فرح: 'انظروا! يمكنني الطيران مع بالوني الأحمر!' ومعاً يلمسون النجوم الذهبية اللامعة.",
        illustrationHint: "⭐🎈🦁⭐"
      }
    ],
    quiz: {
      question: "What color is Leo's magical balloon in the story?",
      questionAr: "ما هو لون بالون ليو السحري العجيب في القصة؟",
      options: ["Blue (أزرق)", "Red (أحمر)", "Yellow (أصفر)", "Green (أخضر)"],
      answerIndex: 1,
      explanationEn: "Correct! The balloon is big and bright Red (أحمر)!",
      explanationAr: "إجابة صحيحة! البالون كبير ولونه أحمر (Red) زاهٍ!"
    }
  },
  {
    id: 'hungry_rabbit',
    title: "The Hungry Little Rabbit",
    titleAr: "الأرنب الصغير الجائع اللطيف",
    coverEmoji: "🐰",
    themeColor: "from-purple-400 to-indigo-600",
    difficulty: "Medium (متوسط)",
    pages: [
      {
        textEn: "Billy is a furry little rabbit. He is very hungry and wants food.",
        textAr: "بيلي هو أرنب صغير ذو فرو ناعم. إنه جائع جداً ويبحث بجد عن طعام شهي.",
        illustrationHint: "🐰🥕🍂"
      },
      {
        textEn: "He walks under the big apple tree. 'Oh! An orange orange?' No, it is a sweet orange!",
        textAr: "يمشي تحت شجرة التفاح الكبيرة. 'أوه! هل هي برتقالة بلون برتقالي؟' نعم، إنها برتقالة حلوة ورطبة!",
        illustrationHint: "🍊🐰🌲"
      },
      {
        textEn: "Then Billy sees an elephant eating fresh green grass. 'Can I eat grass?' asks Billy.",
        textAr: "ثم يرى بيلي فيلاً ضخماً يأكل العشب الأخضر الطازج. 'هل يمكنني تناول العشب أيضاً؟' يسأل بيلي.",
        illustrationHint: "🐘🐰🌿"
      },
      {
        textEn: "Suddenly, Billy finds a big, delicious orange carrot in the dirt! 'Yum!'",
        textAr: "فجأة، يعثر بيلي على جزرة برتقالية كبيرة ولذيذة جداً تحت التراب! 'يم يم، يالها من لذة!'",
        illustrationHint: "🐰🥕🥕"
      }
    ],
    quiz: {
      question: "What is the favorite food that Billy the rabbit finds at the end?",
      questionAr: "ما هو الطعام المفضل الذي وجده الأرنب بيلي في نهاية رحلته؟",
      options: ["An apple (تفاحة)", "Grass (عشب)", "A carrot (جزرة)", "Milk (حليب)"],
      answerIndex: 2,
      explanationEn: "Excellent! Rabbits love sweet orange carrots (جزر)!",
      explanationAr: "رائع وممتاز! الأرانب تعشق الجزر البرتقالي الحلو (Carrot)!"
    }
  }
];

export interface LearningLevel {
  levelNumber: number;
  worldId: number;
  title: string;
  titleAr: string;
  theme: string;
  lessonEn: string;
  lessonAr: string;
  phonetics: string;
  wordEmoji: string;
  question: string;
  questionAr: string;
  options: string[];
  answerIndex: number;
  explanationEn: string;
  explanationAr: string;
}

export interface LearningWorld {
  id: number;
  name: string;
  nameAr: string;
  levelsRange: [number, number];
  topics: string[];
  rewardBadgeId: string;
  rewardXp: number;
  emoji: string;
  colorClass: string; // Tailwind bg-gradient colors
  borderColor: string;
  textColor: string;
}

export const LEARNING_WORLDS: LearningWorld[] = [
  {
    id: 1,
    name: "ABC Adventure",
    nameAr: "مغامرة الحروف",
    levelsRange: [1, 10],
    topics: ["Alphabet", "Letter Sounds", "Basic Words", "Greetings"],
    rewardBadgeId: "alphabet_master",
    rewardXp: 100,
    emoji: "🦁",
    colorClass: "from-amber-400 to-orange-500",
    borderColor: "border-orange-600",
    textColor: "text-amber-800"
  },
  {
    id: 2,
    name: "Numbers Kingdom",
    nameAr: "مملكة الأرقام",
    levelsRange: [11, 20],
    topics: ["Numbers", "Counting", "Simple Math Vocabulary"],
    rewardBadgeId: "numbers_master",
    rewardXp: 200,
    emoji: "🔢",
    colorClass: "from-sky-400 to-blue-500",
    borderColor: "border-blue-600",
    textColor: "text-blue-800"
  },
  {
    id: 3,
    name: "Colors & Shapes",
    nameAr: "الألوان والأشكال",
    levelsRange: [21, 30],
    topics: ["Colors", "Shapes", "Basic Descriptions"],
    rewardBadgeId: "artist_badge",
    rewardXp: 300,
    emoji: "🎨",
    colorClass: "from-teal-400 to-emerald-500",
    borderColor: "border-emerald-600",
    textColor: "text-emerald-800"
  },
  {
    id: 4,
    name: "My Family & Friends",
    nameAr: "عائلتي وأصدقائي",
    levelsRange: [31, 40],
    topics: ["Family Members", "Emotions", "Introductions"],
    rewardBadgeId: "friendship_badge",
    rewardXp: 400,
    emoji: "🤝",
    colorClass: "from-indigo-400 to-purple-500",
    borderColor: "border-purple-600",
    textColor: "text-purple-800"
  },
  {
    id: 5,
    name: "Animals Safari",
    nameAr: "سفاري الحيوانات",
    levelsRange: [41, 50],
    topics: ["Animals", "Habitats", "Animal Sounds"],
    rewardBadgeId: "explorer_badge",
    rewardXp: 500,
    emoji: "🤠",
    colorClass: "from-yellow-400 to-amber-500",
    borderColor: "border-amber-600",
    textColor: "text-amber-900"
  },
  {
    id: 6,
    name: "School Adventure",
    nameAr: "المغامرة المدرسية",
    levelsRange: [51, 60],
    topics: ["School Objects", "Classroom Language", "Basic Sentences"],
    rewardBadgeId: "student_hero_badge",
    rewardXp: 600,
    emoji: "🎒",
    colorClass: "from-rose-400 to-pink-500",
    borderColor: "border-pink-600",
    textColor: "text-pink-800"
  },
  {
    id: 7,
    name: "Daily Life City",
    nameAr: "مدينة الحياة اليومية",
    levelsRange: [61, 70],
    topics: ["Daily Routines", "Food", "Clothes", "Time"],
    rewardBadgeId: "city_hero_badge",
    rewardXp: 700,
    emoji: "🏙️",
    colorClass: "from-cyan-400 to-sky-500",
    borderColor: "border-sky-600",
    textColor: "text-sky-800"
  },
  {
    id: 8,
    name: "Story Island",
    nameAr: "جزيرة القصص",
    levelsRange: [71, 80],
    topics: ["Reading Stories", "Listening", "Comprehension"],
    rewardBadgeId: "story_master_badge",
    rewardXp: 800,
    emoji: "📖",
    colorClass: "from-violet-400 to-fuchsia-500",
    borderColor: "border-fuchsia-600",
    textColor: "text-fuchsia-800"
  },
  {
    id: 9,
    name: "Speaking Mountain",
    nameAr: "جبل التحدث",
    levelsRange: [81, 90],
    topics: ["Conversations", "Pronunciation", "Speaking Confidence"],
    rewardBadgeId: "speaker_badge",
    rewardXp: 900,
    emoji: "🗣️",
    colorClass: "from-orange-400 to-red-500",
    borderColor: "border-red-600",
    textColor: "text-red-800"
  },
  {
    id: 10,
    name: "English Champions",
    nameAr: "أبطال الإنجليزية",
    levelsRange: [91, 100],
    topics: ["Grammar", "Writing", "Advanced Conversations", "Projects"],
    rewardBadgeId: "english_champion_trophy",
    rewardXp: 1000,
    emoji: "👑",
    colorClass: "from-yellow-400 via-orange-400 to-amber-500",
    borderColor: "border-amber-600",
    textColor: "text-amber-900"
  }
];

// Helper to procedurally generate level content for Levels 1 to 100
export function getLevelContent(levelNum: number): LearningLevel {
  const clampedLevel = Math.max(1, Math.min(100, levelNum));
  const worldId = Math.floor((clampedLevel - 1) / 10) + 1;
  const world = LEARNING_WORLDS[worldId - 1] || LEARNING_WORLDS[0];

  // Procedural topics array per world to keep the levels highly thematic
  let title = `Level ${clampedLevel}`;
  let titleAr = `المستوى ${clampedLevel}`;
  let theme = world.topics[clampedLevel % world.topics.length];
  let lessonEn = "";
  let lessonAr = "";
  let phonetics = "";
  let wordEmoji = "🌟";
  let question = "";
  let questionAr = "";
  let options: string[] = [];
  let answerIndex = 0;
  let explanationEn = "";
  let explanationAr = "";

  switch (worldId) {
    case 1: // ABC Adventure
      if (clampedLevel === 1) {
        title = "Letter A: Apple Action";
        titleAr = "حرف الألف: التفاحة النشيطة";
        wordEmoji = "🍎";
        lessonEn = "The Letter 'A' sounds like 'Ah!'. A is for Apple. Let's make an 'Ah' sound!";
        lessonAr = "حرف (A) ينطق كـ 'آه'. التفاحة تبدأ بحرف (A). لنلفظ الصوت معاً!";
        phonetics = "Aah - Ah-pul";
        question = "What word starts with the Letter 'A'?";
        questionAr = "ما هي الكلمة التي تبدأ بحرف 'A'؟";
        options = ["Banana (موز)", "Apple (تفاح)", "Cat (قطة)", "Dog (كلب)"];
        answerIndex = 1;
        explanationEn = "Correct! Apple starts with A.";
        explanationAr = "أحسنت! كلمة تفاحة (Apple) تبدأ بحرف A.";
      } else if (clampedLevel === 2) {
        title = "Letter B: Friendly Bear";
        titleAr = "حرف الباء: الدب الصديق";
        wordEmoji = "🐻";
        lessonEn = "The Letter 'B' sounds like 'Buh!'. B is for Bear. Say Bear!";
        lessonAr = "حرف (B) ينطق كـ 'بُوه'. الدب يبدأ بحرف (B). قل دب بـالإنجليزية!";
        phonetics = "Buh - Bair";
        question = "Complete the word: '_ear' (starts with B)";
        questionAr = "أكمل الكلمة للتعبير عن الدب: '_ear'";
        options = ["P", "C", "B", "M"];
        answerIndex = 2;
        explanationEn = "Superb! B makes Bear.";
        explanationAr = "رائع! حرف B يكمل الكلمة لتصبح Bear (دب).";
      } else {
        const letters = "CDEFGHIJKLMNOPQRSTUVWXYZ";
        const char = letters[(clampedLevel - 3) % letters.length];
        const index = clampedLevel;
        title = `Letter ${char}: Adventure Quest`;
        titleAr = `مغامرة الحرف: ${char}`;
        wordEmoji = clampedLevel % 2 === 0 ? "🐱" : "🎈";
        lessonEn = `Level ${index} teaches the fabulous sound of the Letter '${char}'. Practice and smile!`;
        lessonAr = `المستوى ${index} يعلمك النطق الجميل والصوت لحرف '${char}'. تمرن بابتسامة!`;
        phonetics = `${char}uh`;
        question = `Which letter are we learning in this adventure Level ${index}?`;
        questionAr = `أي حرف نتعلمه في مغامرة هذا المستوى ${index}؟`;
        options = [`H`, `${char}`, `X`, `Z`];
        answerIndex = 1;
        explanationEn = `Awesome! You mastered the letter ${char}!`;
        explanationAr = `ممتاز! لقد أتقنت نطق الحرف ${char} بنجاح!`;
      }
      break;

    case 2: // Numbers Kingdom
      const numValue = clampedLevel;
      title = `Number ${numValue}: Royal Numbers`;
      titleAr = `الرقم ${numValue}: الأرقام الملكية`;
      wordEmoji = "🔢";
      lessonEn = `Let's count! This is number ${numValue}. Can you count ${numValue} bouncy stars?`;
      lessonAr = `لنعد معاً! هذا هو الرقم ${numValue}. هل تستطيع عد ${numValue} نجمة لامعة؟`;
      phonetics = `${numValue}`;
      question = `How do you write the number ${numValue} in English words?`;
      questionAr = `كيف نكتب الرقم ${numValue} بالكلمات الإنجليزية؟`;
      
      if (clampedLevel === 11) {
        options = ["Ten (١٠)", "Eleven (١١)", "Twelve (١٢)", "Nine (٩)"];
        answerIndex = 1;
      } else if (clampedLevel === 12) {
        options = ["Eleven (١١)", "Twelve (١٢)", "Thirteen (١٣)", "Two (٢)"];
        answerIndex = 1;
      } else {
        options = ["Five (٥)", `Number ${numValue}`, "One (١)", "Zero (٠)"];
        answerIndex = 1;
      }
      explanationEn = `Fantastic counting! You found ${numValue}.`;
      explanationAr = `عدٌّ مذهل! لقد وجدت الرقم الصحيح.`;
      break;

    case 3: // Colors and Shapes
      const isEvenColor = clampedLevel % 2 === 0;
      title = isEvenColor ? `Beautiful Green Color` : `Shining Circle Shape`;
      titleAr = isEvenColor ? `اللون الأخضر الجميل` : `شكل الدائرة اللامعة`;
      wordEmoji = isEvenColor ? "🟢" : "⭕";
      lessonEn = isEvenColor 
        ? "Green is the color of nature! Grass and trees are green." 
        : "A circle is round! It has no corners. It rolls, rolls, rolls!";
      lessonAr = isEvenColor 
        ? "الأخضر هو لون الطبيعة الخلابة! العشب والأشجار خضراء." 
        : "الدائرة شكل مستدير رائع! ليس له زوايا. إنه يتدحرج باستمرار!";
      phonetics = isEvenColor ? "Gree-n" : "Sur-kuhl";
      question = isEvenColor ? "What color is the soft grass?" : "Which shape is round like a ball?";
      questionAr = isEvenColor ? "ما هو لون العشب الناعم؟" : "أي شكل دائري مستدير تماماً كـالكرة؟";
      options = isEvenColor 
        ? ["Blue (أزرق)", "Green (أخضر)", "Red (أحمر)", "Yellow (أصفر)"]
        : ["Square (مربع)", "Triangle (مثلث)", "Circle (دائرة)", "Star (نجمة)"];
      answerIndex = isEvenColor ? 1 : 2;
      explanationEn = "Magnificent! You know your colors and shapes well!";
      explanationAr = "رائع جداً! أنت تعرف الألوان والأشكال بامتياز!";
      break;

    case 4: // My Family and Friends
      title = clampedLevel % 2 === 0 ? "Wonderful Mother" : "Happy Smile Emotion";
      titleAr = clampedLevel % 2 === 0 ? "الأم الرائعة الحنونة" : "شعور الابتسامة السعيدة";
      wordEmoji = clampedLevel % 2 === 0 ? "👩" : "😊";
      lessonEn = clampedLevel % 2 === 0 
        ? "Your mother cares for you and loves you. Say 'Mother'!" 
        : "Feeling happy makes us smile. We laugh when we are happy!";
      lessonAr = clampedLevel % 2 === 0 
        ? "أمك الحبيبة ترعاك وتحبك دائماً. قل مذر (Mother)!" 
        : "إحساس السعادة يجعلنا نبتسم ونضحك بمرح وسرور!";
      phonetics = clampedLevel % 2 === 0 ? "Muh-th-er" : "Hap-pee";
      question = clampedLevel % 2 === 0 ? "Who is 'Mother'?" : "What does 'Happy' mean?";
      questionAr = clampedLevel % 2 === 0 ? "من هي 'Mother' باللغة العربية؟" : "ماذا يعني شعور 'Happy'؟";
      options = clampedLevel % 2 === 0 
        ? ["Father (أب)", "Brother (أخ)", "Mother (أم)", "Sister (أخت)"]
        : ["Sad (حزين)", "Scared (خائف)", "Happy (سعيد)", "Angry (غاضب)"];
      answerIndex = 2;
      explanationEn = "Perfect! Family and feelings keep us strong.";
      explanationAr = "ممتاز! العائلة والمشاعر تمنحنا القوة والسعادة.";
      break;

    case 5: // Animals Safari
      const safariAnimal = clampedLevel % 3 === 0 ? "Zebra (حمار وحشي)" : clampedLevel % 3 === 1 ? "Giraffe (زرافة)" : "Monkey (قرد)";
      title = `Safari: ${safariAnimal}`;
      titleAr = `رحلة سفاري: ${safariAnimal}`;
      wordEmoji = clampedLevel % 3 === 0 ? "🦓" : clampedLevel % 3 === 1 ? "🦒" : "🐒";
      lessonEn = `Welcome to the Safari! We spotlight the lovely ${safariAnimal} living in the nature world.`;
      lessonAr = `مرحباً بك في عالم السفاري! نسلط الضوء على ${safariAnimal} الذي يعيش في الطبيعة الساحرة.`;
      phonetics = "Suh-fah-ree Animal";
      question = `Which wild animal runs fast with black and white stripes?`;
      questionAr = `أي حيوان بري يركض بسرعة ولديه خطوط بيضاء وسوداء مميزة؟`;
      options = ["Lion (أسد)", "Zebra (حمار وحشي)", "Elephant (فيل)", "Rabbit (أرنب)"];
      answerIndex = 1;
      explanationEn = "Spectacular! Zebra has black and white stripes.";
      explanationAr = "مدهش! الحمار الوحشي (Zebra) يتميز بخطوطه البيضاء والسوداء.";
      break;

    case 6: // School Adventure
      title = "My School Pencil";
      titleAr = "قلمي المدرسي الصغير";
      wordEmoji = "✏️";
      lessonEn = "A Pencil is used to draw and write nice stories at school. Practice holding it!";
      lessonAr = "نستخدم القلم الرصاص (Pencil) للرسم وكتابة الحكايات الرائعة في المدرسة!";
      phonetics = "Pen-suhl";
      question = "What do we use to write or sketch on paper?";
      questionAr = "ما هي الأداة التي نستخدمها للكتابة أو الرسم على الورق؟";
      options = ["Apple (تفاحة)", "Pencil (قلم رصاص)", "Cat (قطة)", "Car (سيارة)"];
      answerIndex = 1;
      explanationEn = "Awesome school skills! Pencil is correct.";
      explanationAr = "مهارات مدرسية مذهلة! القلم الرصاص (Pencil) هي الإجابة الصحيحة.";
      break;

    case 7: // Daily Life City
      title = "Delicious Breakfast Food";
      titleAr = "فطور الصباح اللذيذ";
      wordEmoji = "🍳";
      lessonEn = "We eat tasty breakfast in the morning to get energy for playing and learning!";
      lessonAr = "نتناول الفطور اللذيذ والصحي في الصباح لنحصل على طاقة وقوة للعب والدرس!";
      phonetics = "Brek-fuhst";
      question = "Which meal do we eat in the beautiful morning?";
      questionAr = "أي وجبة صحية نتناولها في الصباح الباكر؟";
      options = ["Dinner (عشاء)", "Lunch (غداء)", "Breakfast (فطور)", "Midnight snack"];
      answerIndex = 2;
      explanationEn = "Delicious choice! Breakfast starts our day.";
      explanationAr = "اختيار شهي! وجبة الفطور (Breakfast) تمدنا بالطاقة لليوم.";
      break;

    case 8: // Story Island
      title = "Story Island: Adventure Map";
      titleAr = "جزيرة القصص: خريطة المغامرة";
      wordEmoji = "🏝️";
      lessonEn = "Story Island is full of magical words. Reading books makes your brain big and clever!";
      lessonAr = "جزيرة القصص مليئة بالكلمات السحرية الخيالية. قراءة الكتب تنمي ذكاء عقلك باستمرار!";
      phonetics = "Sto-ree Eye-land";
      question = "Who answers questions when we read an interactive book?";
      questionAr = "من يجيب على الأسئلة والاختبارات عندما نقرأ حكاية تفاعلية ممتعة؟";
      options = ["The Lion", "The Superkid Learner! (أنت البطل!)", "No one", "The computer"];
      answerIndex = 1;
      explanationEn = "Bravo! You are the clever learner builder!";
      explanationAr = "برافو ممتاز! أنت البطل المتعلم والذكي!";
      break;

    case 9: // Speaking Mountain
      title = "Saying Hello & Welcome";
      titleAr = "التحدث: إلقاء التحية والترحيب";
      wordEmoji = "💬";
      lessonEn = "When we meet someone, we say 'Hello! How are you?'. It is kind and friendly.";
      lessonAr = "عندما نقابل شخصاً ما، نلقي التحية ونقول: 'Hello! How are you؟'. هذا لطيف وودود.";
      phonetics = "Heh-loh";
      question = "What do you say to greet a friendly friend?";
      questionAr = "ماذا تقول عندما تريد إلقاء تحية ودية على صديقك؟";
      options = ["Goodbye (مع السلامة)", "Run away", "Hello! (أهلاً!)", "No"];
      answerIndex = 2;
      explanationEn = "Brilliant speaker! Saying Hello sparks friendship.";
      explanationAr = "متحدث رائع وممتاز! قول أهلاً (Hello) ينشر الود والبهجة.";
      break;

    case 10: // English Champions
      title = "The Graduation Crown";
      titleAr = "تاج التخرج والبطولة الكبرى";
      wordEmoji = "👑";
      lessonEn = "You are at the top of Speaking Mountain! You write, speak, and design English dreams beautifully.";
      lessonAr = "لقد وصلت لقمة جبل اللغة وتوجت بطلاً فريداً! أنت الآن تكتب وتتحدث بطلاقة مدهشة!";
      phonetics = "Cham-pee-uhn";
      question = "What are you after reaching Level 100 on the Adventure Map?";
      questionAr = "ما هو لقبك المستحق بعد وصولك للمستوى ١٠٠ في خريطة الإنجليزية؟";
      options = ["A sleepy bear", "An English Champion! (بطل اللغة الإنجليزية!)", "A baby", "A lock"];
      answerIndex = 1;
      explanationEn = "Victory! You are the crowned supreme English Champion!";
      explanationAr = "نصر حقيقي تفتخر به! أنت بطل الإنجليزية المتوج للعام!";
      break;
  }

  return {
    levelNumber: clampedLevel,
    worldId,
    title,
    titleAr,
    theme,
    lessonEn,
    lessonAr,
    phonetics,
    wordEmoji,
    question,
    questionAr,
    options,
    answerIndex,
    explanationEn,
    explanationAr
  };
}

