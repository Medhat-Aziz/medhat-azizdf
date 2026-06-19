export interface VocabularyCard {
  id: string;
  word: string;
  wordAr: string;
  category: 'animals' | 'food' | 'colors' | 'family';
  phonetic: string;
  emoji: string;
  example: string;
  exampleAr: string;
}

export const VOCABULARY_DATA: VocabularyCard[] = [
  // === ANIMALS (100 Animals) ===
  {
    id: 'lion',
    word: 'Lion',
    wordAr: 'أسد',
    category: 'animals',
    phonetic: 'LAH-yuhn',
    emoji: '🦁',
    example: 'The lion is the brave king of the jungle.',
    exampleAr: 'الأسد هو ملك الغابة الشجاع.'
  },
  {
    id: 'rabbit',
    word: 'Rabbit',
    wordAr: 'أرنب',
    category: 'animals',
    phonetic: 'RAB-it',
    emoji: '🐰',
    example: 'The white rabbit hops fast in the garden.',
    exampleAr: 'الأرنب الأبيض يقفز بسرعة في الحديقة.'
  },
  {
    id: 'elephant',
    word: 'Elephant',
    wordAr: 'فيل',
    category: 'animals',
    phonetic: 'EL-uh-fuhnt',
    emoji: '🐘',
    example: 'The grey elephant has a very long trunk.',
    exampleAr: 'الفيل الرمادي لديه خرطوم طويل جداً.'
  },
  {
    id: 'cat',
    word: 'Cat',
    wordAr: 'قطة',
    category: 'animals',
    phonetic: 'kat',
    emoji: '🐱',
    example: 'My cat meows when it wanted milk.',
    exampleAr: 'قطتي تموء عندما تريد الحليب.'
  },
  {
    id: 'dog',
    word: 'Dog',
    wordAr: 'كلب',
    category: 'animals',
    phonetic: 'dawg',
    emoji: '🐶',
    example: 'The happy dog barks and runs around.',
    exampleAr: 'الكلب السعيد ينبح ويجري في الأرجاء.'
  },
  {
    id: 'monkey',
    word: 'Monkey',
    wordAr: 'قرد',
    category: 'animals',
    phonetic: 'MUN-kee',
    emoji: '🐵',
    example: 'The funny monkey climbs the green trees.',
    exampleAr: 'القرد المضحك يتسلق الأشجار الخضراء.'
  },
  {
    id: 'giraffe',
    word: 'Giraffe',
    wordAr: 'زرافة',
    category: 'animals',
    phonetic: 'juh-RAF',
    emoji: '🦒',
    example: 'The tall giraffe eats high sweet leaves.',
    exampleAr: 'الزرافة الطويلة تأكل الأوراق المرتفعة الحلوة.'
  },
  {
    id: 'tiger',
    word: 'Tiger',
    wordAr: 'نمر',
    category: 'animals',
    phonetic: 'TAH-ger',
    emoji: '🐯',
    example: 'The wild tiger has handsome orange stripes.',
    exampleAr: 'النمر البري لديه خطوط برتقالية جميلة.'
  },
  {
    id: 'bear',
    word: 'Bear',
    wordAr: 'دب',
    category: 'animals',
    phonetic: 'bair',
    emoji: '🐻',
    example: 'The brown bear loves sweet yellow honey.',
    exampleAr: 'الدب البني يحب العسل الأصفر الحلو.'
  },
  {
    id: 'fox',
    word: 'Fox',
    wordAr: 'ثعلب',
    category: 'animals',
    phonetic: 'foks',
    emoji: '🦊',
    example: 'The clever fox rests under the tree.',
    exampleAr: 'الثعلب الذكي يستريح تحت الشجرة.'
  },
  {
    id: 'wolf',
    word: 'Wolf',
    wordAr: 'ذئب',
    category: 'animals',
    phonetic: 'woolf',
    emoji: '🐺',
    example: 'The wild wolf howls at the bright moon.',
    exampleAr: 'الذئب البري يعوي على القمر الساطع.'
  },
  {
    id: 'zebra',
    word: 'Zebra',
    wordAr: 'حمار وحشي',
    category: 'animals',
    phonetic: 'ZEE-bruh',
    emoji: '🦓',
    example: 'The zebra has black and white stripes.',
    exampleAr: 'الحمار الوحشي لديه خطوط سوداء وبيضاء.'
  },
  {
    id: 'kangaroo',
    word: 'Kangaroo',
    wordAr: 'كانغر',
    category: 'animals',
    phonetic: 'kang-guh-ROO',
    emoji: '🦘',
    example: 'The kangaroo hops high with its baby pocket.',
    exampleAr: 'الكانغر يقفز عالياً مع جيب طفله دافئاً.'
  },
  {
    id: 'koala',
    word: 'Koala',
    wordAr: 'كوالا',
    category: 'animals',
    phonetic: 'koh-AH-luh',
    emoji: '🐨',
    example: 'The koala sleeps on the eucalyptus branch.',
    exampleAr: 'الكوالا ينام على غصن شجرة الأوكالبتوس.'
  },
  {
    id: 'panda',
    word: 'Panda',
    wordAr: 'باندا',
    category: 'animals',
    phonetic: 'PAN-duh',
    emoji: '🐼',
    example: 'The fluffy panda eats fresh green bamboo.',
    exampleAr: 'الباندا المنفوشة تأكل الخيزران الأخضر الطازج.'
  },
  {
    id: 'penguin',
    word: 'Penguin',
    wordAr: 'بطريق',
    category: 'animals',
    phonetic: 'PENG-gwin',
    emoji: '🐧',
    example: 'The penguin waddles slowly on the white ice.',
    exampleAr: 'البطريق يمشي ببطء وتمايل على الجليد الأبيض.'
  },
  {
    id: 'dolphin',
    word: 'Dolphin',
    wordAr: 'دولفين',
    category: 'animals',
    phonetic: 'DOL-fin',
    emoji: '🐬',
    example: 'The friendly dolphin plays in the blue ocean.',
    exampleAr: 'الدولفين الودود يلعب في المحيط الأزرق.'
  },
  {
    id: 'whale',
    word: 'Whale',
    wordAr: 'حوت',
    category: 'animals',
    phonetic: 'wayl',
    emoji: '🐳',
    example: 'The giant whale swims in deep ocean waters.',
    exampleAr: 'الحوت العملاق يسبح في مياه المحيط العميقة.'
  },
  {
    id: 'shark',
    word: 'Shark',
    wordAr: 'قرش',
    category: 'animals',
    phonetic: 'shahrk',
    emoji: '🦈',
    example: 'The sharp shark swims very fast.',
    exampleAr: 'القرش السريع يسبح بسرعة كبيرة.'
  },
  {
    id: 'octopus',
    word: 'Octopus',
    wordAr: 'أخطبوط',
    category: 'animals',
    phonetic: 'OK-tuh-puhs',
    emoji: '🐙',
    example: 'The octopus has eight long wavy arms.',
    exampleAr: 'الأخطبوط لديه ثمانية أذرع طويلة متموجة.'
  },
  {
    id: 'crab',
    word: 'Crab',
    wordAr: 'سلطعون',
    category: 'animals',
    phonetic: 'krab',
    emoji: '🦀',
    example: 'The crab walks sideways on warm sand.',
    exampleAr: 'السلطعون يمشي بشكل جانبي على الرمال الدافئة.'
  },
  {
    id: 'turtle',
    word: 'Turtle',
    wordAr: 'سلحفاة',
    category: 'animals',
    phonetic: 'TUR-tuhl',
    emoji: '🐢',
    example: 'The slow turtle carries its home everywhere.',
    exampleAr: 'السلحفاة البطيئة تحمل بيتها في كل مكان.'
  },
  {
    id: 'frog',
    word: 'Frog',
    wordAr: 'ضفدع',
    category: 'animals',
    phonetic: 'frog',
    emoji: '🐸',
    example: 'The green frog jumps into the quiet pond.',
    exampleAr: 'الضفدع الأخضر يقفز في البركة الهادئة.'
  },
  {
    id: 'crocodile',
    word: 'Crocodile',
    wordAr: 'تمساح',
    category: 'animals',
    phonetic: 'KROK-uh-dahyl',
    emoji: '🐊',
    example: 'The crocodile has a strong scaly tail.',
    exampleAr: 'التمساح لديه ذيل قوي مليء بالحراشف.'
  },
  {
    id: 'snake',
    word: 'Snake',
    wordAr: 'ثعبان',
    category: 'animals',
    phonetic: 'snayk',
    emoji: '🐍',
    example: 'The snake slides quietly on the path.',
    exampleAr: 'الثعبان ينزلق بهدوء على الطريق.'
  },
  {
    id: 'lizard',
    word: 'Lizard',
    wordAr: 'سحلية',
    category: 'animals',
    phonetic: 'LIZ-urd',
    emoji: '🦎',
    example: 'The tiny lizard basks on the warm stone.',
    exampleAr: 'السحلية الصغيرة تتشمس على الحجر الدافئ.'
  },
  {
    id: 'horse',
    word: 'Horse',
    wordAr: 'حصان',
    category: 'animals',
    phonetic: 'hors',
    emoji: '🐴',
    example: 'The black horse gallops across the field.',
    exampleAr: 'الحصان الأسود يجري بسرعة في الحقل.'
  },
  {
    id: 'donkey',
    word: 'Donkey',
    wordAr: 'حمار',
    category: 'animals',
    phonetic: 'DONG-kee',
    emoji: '🫏',
    example: 'The friendly donkey carries the fresh hay.',
    exampleAr: 'الحمار اللطيف يحمل القش الطازج.'
  },
  {
    id: 'cow',
    word: 'Cow',
    wordAr: 'بقرة',
    category: 'animals',
    phonetic: 'kow',
    emoji: '🐮',
    example: 'The brown cow yields fresh white milk.',
    exampleAr: 'البقرة البنية تعطي حليباً أبيض طازجاً.'
  },
  {
    id: 'sheep',
    word: 'Sheep',
    wordAr: 'خروف',
    category: 'animals',
    phonetic: 'shuyp',
    emoji: '🐑',
    example: 'The fluffy sheep has warm thick wool.',
    exampleAr: 'الخروف المنفوش لديه صوف سميك دافئ.'
  },
  {
    id: 'goat',
    word: 'Goat',
    wordAr: 'ماعز',
    category: 'animals',
    phonetic: 'goht',
    emoji: '🐐',
    example: 'The energetic goat climbs high mountain rocks.',
    exampleAr: 'الماعز النشيط يتسلق صخور الجبل العالية.'
  },
  {
    id: 'pig',
    word: 'Pig',
    wordAr: 'خنزير',
    category: 'animals',
    phonetic: 'pig',
    emoji: '🐷',
    example: 'The pink pig rolls in the cool mud.',
    exampleAr: 'الخنزير الوردي يتدحرج في الطين البارد.'
  },
  {
    id: 'chicken',
    word: 'Chicken',
    wordAr: 'دجاجة',
    category: 'animals',
    phonetic: 'CHIK-uhn',
    emoji: '🐔',
    example: 'The chicken lays fresh eggs every morning.',
    exampleAr: 'الدجاجة تضع بيضاً طازجاً كل صباح.'
  },
  {
    id: 'rooster',
    word: 'Rooster',
    wordAr: 'ديك',
    category: 'animals',
    phonetic: 'ROOS-tur',
    emoji: '🐓',
    example: 'The proud rooster crows at early sunrise.',
    exampleAr: 'الديك الفخور يصيح عند شروق الشمس الباكر.'
  },
  {
    id: 'duck',
    word: 'Duck',
    wordAr: 'بطة',
    category: 'animals',
    phonetic: 'duk',
    emoji: '🦆',
    example: 'The yellow duck splashes in the blue lake.',
    exampleAr: 'البطة الصفراء ترش الماء في البحيرة الزرقاء.'
  },
  {
    id: 'owl',
    word: 'Owl',
    wordAr: 'بومة',
    category: 'animals',
    phonetic: 'owl',
    emoji: '🦉',
    example: 'The wise owl stays awake at dark night.',
    exampleAr: 'البومة الحكيمة تسهر في الليل المظلم.'
  },
  {
    id: 'eagle',
    word: 'Eagle',
    wordAr: 'نسر',
    category: 'animals',
    phonetic: 'EE-guhl',
    emoji: '🦅',
    example: 'The golden eagle flies high in the sky.',
    exampleAr: 'النسر الذهبي يطير عالياً في السماء.'
  },
  {
    id: 'parrot',
    word: 'Parrot',
    wordAr: 'ببغاء',
    category: 'animals',
    phonetic: 'PAR-uht',
    emoji: '🦜',
    example: 'The sweet parrot repeats beautiful words.',
    exampleAr: 'الببغاء اللطيف يكرر الكلمات الجميلة.'
  },
  {
    id: 'butterfly',
    word: 'Butterfly',
    wordAr: 'فراشة',
    category: 'animals',
    phonetic: 'BUT-er-fly',
    emoji: '🦋',
    example: 'The butterfly flutters sweet wings on flowers.',
    exampleAr: 'الفراشة ترفرف بأجنحتها الجميلة على الزهور.'
  },
  {
    id: 'bee',
    word: 'Bee',
    wordAr: 'نحلة',
    category: 'animals',
    phonetic: 'bee',
    emoji: '🐝',
    example: 'The busy bee makes sweet yellow honey.',
    exampleAr: 'النحلة النشيطة تصنع العسل الأصفر الحلو.'
  },
  {
    id: 'spider',
    word: 'Spider',
    wordAr: 'عنكبوت',
    category: 'animals',
    phonetic: 'SPAH-der',
    emoji: '🕷️',
    example: 'The spider spins a silky round web.',
    exampleAr: 'العنكبوت يغزل شبكة حريرية مستديرة.'
  },
  {
    id: 'ladybug',
    word: 'Ladybug',
    wordAr: 'دعسوقة',
    category: 'animals',
    phonetic: 'LAY-dee-bug',
    emoji: '🐞',
    example: 'The ladybug has tiny black spots.',
    exampleAr: 'الدعسوقة لديها بقع سوداء صغيرة.'
  },
  {
    id: 'ant',
    word: 'Ant',
    wordAr: 'نملة',
    category: 'animals',
    phonetic: 'ant',
    emoji: '🐜',
    example: 'The tiny ant works hard to carry cookies.',
    exampleAr: 'النملة الصغيرة تعمل بجد لحمل البسكويت.'
  },
  {
    id: 'snail',
    word: 'Snail',
    wordAr: 'حلزون',
    category: 'animals',
    phonetic: 'snayl',
    emoji: '🐌',
    example: 'The slow snail crawls along the garden.',
    exampleAr: 'الحلزون البطيء يزحف على طول الحديقة.'
  },
  {
    id: 'camel',
    word: 'Camel',
    wordAr: 'جمل',
    category: 'animals',
    phonetic: 'KAM-uhl',
    emoji: '🐫',
    example: 'The camel patient walks in the sandy desert.',
    exampleAr: 'الجمل الصبور يمشي في الصحراء الرملية.'
  },
  {
    id: 'deer',
    word: 'Deer',
    wordAr: 'غزال',
    category: 'animals',
    phonetic: 'deer',
    emoji: '🦌',
    example: 'The gentle deer runs gracefully in the meadow.',
    exampleAr: 'الغزال الرقيق يجري بنعومة في المرج.'
  },
  {
    id: 'squirrel',
    word: 'Squirrel',
    wordAr: 'سنجاب',
    category: 'animals',
    phonetic: 'SKWUR-uhl',
    emoji: '🐿️',
    example: 'The playful squirrel collects crisp brown nuts.',
    exampleAr: 'السنجاب اللعوب يجمع البندق البني المقرمش.'
  },
  {
    id: 'mouse',
    word: 'Mouse',
    wordAr: 'فأر',
    category: 'animals',
    phonetic: 'mows',
    emoji: '🐭',
    example: 'The little mouse loves eating yellow cheese.',
    exampleAr: 'الفأر الصغير يحب أكل الجبن الأصفر.'
  },
  {
    id: 'lobster',
    word: 'Lobster',
    wordAr: 'سرطان البحر',
    category: 'animals',
    phonetic: 'LOB-stur',
    emoji: '🦞',
    example: 'The red lobster crawls underwater.',
    exampleAr: 'سرطان البحر الأحمر يزحف تحت الماء.'
  },
  {
    id: 'fish',
    word: 'Fish',
    wordAr: 'سمكة',
    category: 'animals',
    phonetic: 'fish',
    emoji: '🐟',
    example: 'The simple fish swims in the clear water.',
    exampleAr: 'السمكة البسيطة تسبح في الماء الصافي.'
  },
  {
    id: 'hippo',
    word: 'Hippo',
    wordAr: 'فرس النهر',
    category: 'animals',
    phonetic: 'HIP-oh',
    emoji: '🦛',
    example: 'The big hippo splashes in the warm river.',
    exampleAr: 'فرس النهر الضخم يرش الماء في النهر الدافئ.'
  },
  {
    id: 'rhino',
    word: 'Rhino',
    wordAr: 'وحيد القرن',
    category: 'animals',
    phonetic: 'RY-noh',
    emoji: '🦏',
    example: 'The strong rhino has a thick protective horn.',
    exampleAr: 'وحيد القرن القوي لديه قرن سميك يحميه.'
  },
  {
    id: 'cheetah',
    word: 'Cheetah',
    wordAr: 'فهد',
    category: 'animals',
    phonetic: 'CHEE-tuh',
    emoji: '🐆',
    example: 'The cheetah runs faster than any other land animal.',
    exampleAr: 'الفهد يجري بسرعة أكبر من أي حيوان بري آخر على الأرض.'
  },
  {
    id: 'shrimp',
    word: 'Shrimp',
    wordAr: 'جمبري',
    category: 'animals',
    phonetic: 'shrimp',
    emoji: '🦐',
    example: 'The pink shrimp swims in warm tropical water.',
    exampleAr: 'الجمبري الوردي يسبح في مياه استوائية دافئة.'
  },
  {
    id: 'squid',
    word: 'Squid',
    wordAr: 'حبار',
    category: 'animals',
    phonetic: 'skwid',
    emoji: '🦑',
    example: 'The fast squid sprays blue ink to hide.',
    exampleAr: 'الحبار السريع يطلق حبراً أزرق ليختبئ.'
  },
  {
    id: 'jellyfish',
    word: 'Jellyfish',
    wordAr: 'قنديل البحر',
    category: 'animals',
    phonetic: 'JEL-ee-fish',
    emoji: '🪼',
    example: 'The jellyfish floats like a glowing umbrella.',
    exampleAr: 'قنديل البحر يطفو كالمظلة اللامعة.'
  },
  {
    id: 'chameleon',
    word: 'Chameleon',
    wordAr: 'حرباء',
    category: 'animals',
    phonetic: 'kuh-MEEL-yuhn',
    emoji: '🦎',
    example: 'The chameleon changes skin colors to stay hidden.',
    exampleAr: 'الحرباء تغير لون جلدها لتبقى مختبئة.'
  },
  {
    id: 'falcon',
    word: 'Falcon',
    wordAr: 'صقر',
    category: 'animals',
    phonetic: 'FAL-kuhn',
    emoji: '🦅',
    example: 'The swift falcon flies gracefully in sky.',
    exampleAr: 'الصقر السريع يطير بأناقة في السماء.'
  },
  {
    id: 'ostrich',
    word: 'Ostrich',
    wordAr: 'نعامة',
    category: 'animals',
    phonetic: 'OS-trich',
    emoji: '🦤',
    example: 'The giant ostrich has very long strong legs.',
    exampleAr: 'النعامة الضخمة لديها أرجل طويلة وقوية جداً.'
  },
  {
    id: 'peacock',
    word: 'Peacock',
    wordAr: 'طاووس',
    category: 'animals',
    phonetic: 'PEE-kok',
    emoji: '🦚',
    example: 'The beautiful peacock opens its colorful feathers.',
    exampleAr: 'الطاووس الجميل يفتح ريشه الزاهي الملون.'
  },
  {
    id: 'flamingo',
    word: 'Flamingo',
    wordAr: 'فلامنجو',
    category: 'animals',
    phonetic: 'fluh-MING-goh',
    emoji: '🦩',
    example: 'The pink flamingo stands gracefully in water.',
    exampleAr: 'الفلامنجو الوردي يقف برشاقة في الماء.'
  },
  {
    id: 'swan',
    word: 'Swan',
    wordAr: 'بجعة',
    category: 'animals',
    phonetic: 'swon',
    emoji: '🦢',
    example: 'The elegant white swan floats on quiet lakes.',
    exampleAr: 'البجعة البيضاء الأنيقة تسبح في البحيرات الهادئة.'
  },
  {
    id: 'dove',
    word: 'Dove',
    wordAr: 'حمامة',
    category: 'animals',
    phonetic: 'duhv',
    emoji: '🕊️',
    example: 'The gentle white dove brings words of peace.',
    exampleAr: 'الحمامة البيضاء الرقيقة تجلب رسائل السلام.'
  },
  {
    id: 'seal',
    word: 'Seal',
    wordAr: 'فقمة',
    category: 'animals',
    phonetic: 'seel',
    emoji: '🦭',
    example: 'The playful seal barks and balances are happy.',
    exampleAr: 'الفقمة اللعوب تصيح وتتوازن بسعادة.'
  },
  {
    id: 'sea_lion',
    word: 'Sea Lion',
    wordAr: 'أسد البحر',
    category: 'animals',
    phonetic: 'SEE-ly-uhn',
    emoji: '🦭',
    example: 'The sea lion plays on the tropical rocks.',
    exampleAr: 'أسد البحر يلعب على الصخور الاستوائية.'
  },
  {
    id: 'badger',
    word: 'Badger',
    wordAr: 'غرير',
    category: 'animals',
    phonetic: 'BA-jur',
    emoji: '🦡',
    example: 'The badger digs its cosy den underground.',
    exampleAr: 'حيوان الغرير يحفر جحره المريح تحت الأرض.'
  },
  {
    id: 'beaver',
    word: 'Beaver',
    wordAr: 'قندس',
    category: 'animals',
    phonetic: 'BEE-vur',
    emoji: '🦫',
    example: 'The clever beaver builds wooden river dams.',
    exampleAr: 'القندس الذكي يبني السدود الخشبية في النهر.'
  },
  {
    id: 'woodpecker',
    word: 'Woodpecker',
    wordAr: 'نقار الخشب',
    category: 'animals',
    phonetic: 'WOOD-pek-ur',
    emoji: '🐦',
    example: 'The industrious woodpecker taps on tree barks.',
    exampleAr: 'نقار الخشب المجتهد ينقر على جذوع الأشجار.'
  },
  {
    id: 'squirrel_monkey',
    word: 'Squirrel Monkey',
    wordAr: 'سنجاب القرد',
    category: 'animals',
    phonetic: 'SKWUR-uhl-MUN-kee',
    emoji: '🐒',
    example: 'The small monkey swings quickly from branch to branch.',
    exampleAr: 'القرد الصغير يتأرجح بسرعة من غصن إلى غصن.'
  },
  {
    id: 'meerkat',
    word: 'Meerkat',
    wordAr: 'ميركات',
    category: 'animals',
    phonetic: 'MEER-kat',
    emoji: '🦡',
    example: 'The curious meerkat stands tall to watch around.',
    exampleAr: 'حيوان الميركات الفضولي يقف مستقيماً ليراقب المكان.'
  },
  {
    id: 'slug',
    word: 'Slug',
    wordAr: 'بزاقة',
    category: 'animals',
    phonetic: 'slug',
    emoji: '🐌',
    example: 'The soft slug loves cool wet leaves.',
    exampleAr: 'البزاقة الناعمة تحب الأوراق الرطبة الباردة.'
  },
  {
    id: 'caterpillar_creeper',
    word: 'Caterpillar',
    wordAr: 'يرقة',
    category: 'animals',
    phonetic: 'KAT-er-pil-ur',
    emoji: '🐛',
    example: 'The hungry caterpillar crawls slowly under foliage.',
    exampleAr: 'اليرقة الجائعة تزحف ببطء تحت أوراق الشجر.'
  },
  {
    id: 'dragonfly',
    word: 'Dragonfly',
    wordAr: 'يعسوب',
    category: 'animals',
    phonetic: 'DRAG-uhn-fly',
    emoji: '🪰',
    example: 'The colorful dragonfly hovers above ponds.',
    exampleAr: 'اليعسوب الملون يحوم فوق البرك والبحيرات.'
  },
  {
    id: 'starfish',
    word: 'Starfish',
    wordAr: 'نجم البحر',
    category: 'animals',
    phonetic: 'STAHR-fish',
    emoji: '⭐️',
    example: 'The starfish gets shaped like a sky star.',
    exampleAr: 'نجم البحر يأخذ شكل نجمة في السماء.'
  },
  {
    id: 'seahorse',
    word: 'Seahorse',
    wordAr: 'حصان البحر',
    category: 'animals',
    phonetic: 'SEE-hors',
    emoji: '🧜‍♀️',
    example: 'The little seahorse floats in the coral reefs.',
    exampleAr: 'حصان البحر الصغير يطفو في الشعاب المرجانية.'
  },
  {
    id: 'cricket_bug',
    word: 'Cricket',
    wordAr: 'صرصار الليل',
    category: 'animals',
    phonetic: 'KRIK-it',
    emoji: '🦗',
    example: 'The cricket chirps a sweet night lullaby.',
    exampleAr: 'صرصار الليل يغني لحناً جميلاً في المساء.'
  },
  {
    id: 'grasshopper_leap',
    word: 'Grasshopper',
    wordAr: 'جراد',
    category: 'animals',
    phonetic: 'GRAS-hop-ur',
    emoji: '🦗',
    example: 'The grasshopper hops extremely high in deep grass.',
    exampleAr: 'الجراد يقفز عالياً جداً في العشب الكثيف.'
  },
  {
    id: 'mosquito_buzz',
    word: 'Mosquito',
    wordAr: 'بعوضة',
    category: 'animals',
    phonetic: 'muhs-KEE-toh',
    emoji: '🦟',
    example: 'The mosquito flies around with loud buzz.',
    exampleAr: 'البعوضة تطير في الأرجاء مع طنين مرتفع.'
  },
  {
    id: 'beetle_bug',
    word: 'Beetle',
    wordAr: 'خنفساء',
    category: 'animals',
    phonetic: 'BEE-tuhl',
    emoji: '🪲',
    example: 'The shiny black beetle has hard wing covers.',
    exampleAr: 'الخنفساء السوداء اللامعة لديها غطاء أجنحة صلب.'
  },
  {
    id: 'worm_creeper',
    word: 'Worm',
    wordAr: 'دودة الأرض',
    category: 'animals',
    phonetic: 'wurm',
    emoji: '🪱',
    example: 'The pink worm crawls inside the fresh rich soil.',
    exampleAr: 'دودة الأرض الوردية تزحف داخل التربة الطازجة الغنية.'
  },
  {
    id: 'chick',
    word: 'Chick',
    wordAr: 'كتكوت',
    category: 'animals',
    phonetic: 'chik',
    emoji: '🐥',
    example: 'The baby chick says cheep cheep and finds seeds.',
    exampleAr: 'الكتكوت الصغير يقول صو صو ويبحث عن البذور.'
  },
  {
    id: 'rooster_crow',
    word: 'Rooster',
    wordAr: 'ديك المزرعة',
    category: 'animals',
    phonetic: 'ROOS-tur',
    emoji: '🐓',
    example: 'The loud rooster sings to wake up the farm.',
    exampleAr: 'الديك المرتفع الصوت يغني ليوقظ المزرعة كلها.'
  },
  {
    id: 'buffalo_heavy',
    word: 'Buffalo',
    wordAr: 'جاموس',
    category: 'animals',
    phonetic: 'BUF-uh-loh',
    emoji: '🦬',
    example: 'The heavy buffalo rests under cool shadows.',
    exampleAr: 'الجاموس الثقيل يستريح تحت الظلال الباردة.'
  },
  {
    id: 'ram',
    word: 'Ram',
    wordAr: 'كبش',
    category: 'animals',
    phonetic: 'ram',
    emoji: '🐏',
    example: 'The male ram has impressive circular horns.',
    exampleAr: 'الكبش لديه قرون دائرية رائعة.'
  },
  {
    id: 'bull_horn',
    word: 'Bull',
    wordAr: 'ثور',
    category: 'animals',
    phonetic: 'bool',
    emoji: '🐂',
    example: 'The heavy bull pulls farm tools with ease.',
    exampleAr: 'الثور الثقيل يجر أدوات المزرعة بسهولة.'
  },
  {
    id: 'donkey_gray',
    word: 'Donkey',
    wordAr: 'حمار رمادي',
    category: 'animals',
    phonetic: 'DONG-kee',
    emoji: '𫡏',
    example: 'The grey donkey sits comfortably on hay.',
    exampleAr: 'الحمار الرمادي يجلس براحة على القش.'
  },
  {
    id: 'llama_alpaca',
    word: 'Llama',
    wordAr: 'لاما',
    category: 'animals',
    phonetic: 'LAH-muh',
    emoji: '🦙',
    example: 'The woolly llama spits if it meets danger.',
    exampleAr: 'اللاما الصوفية تبصق إذا واجهت الخطر.'
  },
  {
    id: 'hedgehog_tiny',
    word: 'Hedgehog',
    wordAr: 'قنفذ صغير',
    category: 'animals',
    phonetic: 'HEJ-hog',
    emoji: '🦔',
    example: 'The tiny hedgehog curls inside its spiky ball.',
    exampleAr: 'القنفذ الصغير يلتف داخل كرته الشوكية.'
  },
  {
    id: 'otter_splash',
    word: 'Otter',
    wordAr: 'قضاعة مائية',
    category: 'animals',
    phonetic: 'OT-ur',
    emoji: '🦦',
    example: 'The sweet river otter loves to slide on ice.',
    exampleAr: 'قضاعة النهر اللطيفة تحب التزحلق على الجليد.'
  },
  {
    id: 'beaver_log',
    word: 'Beaver',
    wordAr: 'قندس مائي',
    category: 'animals',
    phonetic: 'BEE-vur',
    emoji: '🦫',
    example: 'The beaver cuts high tree branches with teeth.',
    exampleAr: 'القندس يقطع أغصان الشجر المرتفعة بأسنانه.'
  },
  {
    id: 'badger_dig',
    word: 'Badger',
    wordAr: 'غرير بري',
    category: 'animals',
    phonetic: 'BA-jur',
    emoji: '🦡',
    example: 'The wild forest badger sleeps during day hours.',
    exampleAr: 'غرير الغابة البري ينام خلال ساعات النهار.'
  },
  {
    id: 'sloth_sleep',
    word: 'Sloth',
    wordAr: 'كسلان هادئ',
    category: 'animals',
    phonetic: 'sloth',
    emoji: '🦥',
    example: 'The resting sloth climbs down very rarely.',
    exampleAr: 'الكسلان المستريح ينزل نادراً جداً من الشجر.'
  },
  {
    id: 'chimpanzee_play',
    word: 'Chimpanzee',
    wordAr: 'شمبانزي مرح',
    category: 'animals',
    phonetic: 'CHIM-pan-zee',
    emoji: '🦧',
    example: 'The smart chimpanzee solves food matching puzzles.',
    exampleAr: 'الشمبانزي الذكي يحل ألغاز مطابقة الطعام.'
  },
  {
    id: 'gorilla_leader',
    word: 'Gorilla',
    wordAr: 'غوريلا ضخمة',
    category: 'animals',
    phonetic: 'guh-RIL-uh',
    emoji: '🦍',
    example: 'The gorilla is very caring to its babies.',
    exampleAr: 'الغوريلا حنونة ورقيقة جداً مع أطفالها.'
  },
  {
    id: 'polar_bear_snow',
    word: 'Polar Bear',
    wordAr: 'دب قطبي',
    category: 'animals',
    phonetic: 'POH-ler-bair',
    emoji: '🐻',
    example: 'The polar bear swims well in arctic water.',
    exampleAr: 'الدب القطبي يسبح بشكل ممتاز في المياه القطبية.'
  },
  {
    id: 'koala_leaf',
    word: 'Koala',
    wordAr: 'كوالا صغير',
    category: 'animals',
    phonetic: 'koh-AH-luh',
    emoji: '🐨',
    example: 'The baby koala rides on its mother’s back.',
    exampleAr: 'الكوالا الصغير يركب على ظهر أمه.'
  },
  {
    id: 'kangaroo_jump',
    word: 'Kangaroo',
    wordAr: 'كانغر بري',
    category: 'animals',
    phonetic: 'kang-guh-ROO',
    emoji: '🦘',
    example: 'The wild kangaroo jumps rapidly in grasslands.',
    exampleAr: 'الكانغر البري يقفز بسرعة في البراري المعشبة.'
  },
  {
    id: 'panda_bear',
    word: 'Panda',
    wordAr: 'باندا عملاقة',
    category: 'animals',
    phonetic: 'PAN-duh',
    emoji: '🐼',
    example: 'The panda bear has soft black and white fur.',
    exampleAr: 'الباندا العملاقة لديها فرو ناعم أسود وأبيض.'
  },
  {
    id: 'cheetah_speed',
    word: 'Cheetah',
    wordAr: 'فهد سريع',
    category: 'animals',
    phonetic: 'CHEE-tuh',
    emoji: '🐆',
    example: 'The quick cheetah runs at extreme speeds.',
    exampleAr: 'الفهد السريع يجري بسرعات مذهلة.'
  },
  {
    id: 'lion_king',
    word: 'Lion',
    wordAr: 'أسد الأسود',
    category: 'animals',
    phonetic: 'LAH-yuhn',
    emoji: '🦁',
    example: 'The proud lion roars loudly to greet Leo.',
    exampleAr: 'الأسد الفخور يزأر بصوت مرتفع ليرحب بـ ليو.'
  },

  // === FOOD (4 Items) ===
  {
    id: 'apple',
    word: 'Apple',
    wordAr: 'تفاح',
    category: 'food',
    phonetic: 'AP-uhl',
    emoji: '🍎',
    example: 'I eat a sweet red apple.',
    exampleAr: 'أنا آكل تفاحة حمراء حلوة.'
  },
  {
    id: 'banana',
    word: 'Banana',
    wordAr: 'موز',
    category: 'food',
    phonetic: 'buh-NAN-uh',
    emoji: '🍌',
    example: 'Monkeys love sweet bananas.',
    exampleAr: 'القردة تحب الموز الحلو.'
  },
  {
    id: 'orange',
    word: 'Orange',
    wordAr: 'برتقال',
    category: 'food',
    phonetic: 'OR-inj',
    emoji: '🍊',
    example: 'Orange juice is delicious!',
    exampleAr: 'عصير البرتقال لذيذ!'
  },
  {
    id: 'milk',
    word: 'Milk',
    wordAr: 'حليب',
    category: 'food',
    phonetic: 'milk',
    emoji: '🥛',
    example: 'Drink your milk to be strong.',
    exampleAr: 'اشرب حليبك العذب لتكون قوياً.'
  },

  // === COLORS (4 Items) ===
  {
    id: 'red',
    word: 'Red',
    wordAr: 'أحمر',
    category: 'colors',
    phonetic: 'red',
    emoji: '🔴',
    example: 'The fire truck is red.',
    exampleAr: 'سيارة الإطفاء لونها أحمر.'
  },
  {
    id: 'blue',
    word: 'Blue',
    wordAr: 'أزرق',
    category: 'colors',
    phonetic: 'bloo',
    emoji: '🔵',
    example: 'The sky is clear blue today.',
    exampleAr: 'السماء زرقاء صافية اليوم.'
  },
  {
    id: 'yellow',
    word: 'Yellow',
    wordAr: 'أصفر',
    category: 'colors',
    phonetic: 'YEL-oh',
    emoji: '🟡',
    example: 'The sun shines bright yellow!',
    exampleAr: 'الشمس تلمع بلون أصفر ساطع!'
  },
  {
    id: 'green',
    word: 'Green',
    wordAr: 'أخضر',
    category: 'colors',
    phonetic: 'green',
    emoji: '🟢',
    example: 'The grass in the park is green.',
    exampleAr: 'العشب في الحديقة أخضر جميل.'
  },

  // === FAMILY (4 Items) ===
  {
    id: 'mother',
    word: 'Mother',
    wordAr: 'أم',
    category: 'family',
    phonetic: 'MUH-ther',
    emoji: '👩‍👦',
    example: 'I love my mother very much!',
    exampleAr: 'أنا أحب أمي كثيراً جداً!'
  },
  {
    id: 'father',
    word: 'Father',
    wordAr: 'أب',
    category: 'family',
    phonetic: 'FAH-ther',
    emoji: '👨‍👦',
    example: 'My father plays football with me.',
    exampleAr: 'يلعب أبي كرة القدم معي.'
  },
  {
    id: 'brother',
    word: 'Brother',
    wordAr: 'أخ',
    category: 'family',
    phonetic: 'BRUH-ther',
    emoji: '👦',
    example: 'My big brother helps me read.',
    exampleAr: 'أخي الكبير يساعدني في القراءة.'
  },
  {
    id: 'sister',
    word: 'Sister',
    wordAr: 'أخت',
    category: 'family',
    phonetic: 'SIS-ter',
    emoji: '👧',
    example: 'My sister has a yellow doll.',
    exampleAr: 'أختي لديها دمية صفراء.'
  }
];
