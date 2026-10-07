// ============================================================
// Piksel sanat: palet indeksli dizgelerden sprite üretimi
// (Bölüm 1 paleti: çivit gece, gümüş, yıldız altını, kandil turuncusu — GDD §11.3)
// ============================================================
const PAL = {
  k: '#0a0b1a', // dış çizgi (koyu çivit)
  h: '#2e1c14', // saç
  f: '#e2b088', F: '#b47e5c', // ten
  y: '#c99a52', Y: '#93672f', // Tamar'ın başörtüsü
  m: '#a04c38', M: '#6c2f24', // Tamar'ın tuniği (kökboya)
  l: '#ddd0aa', L: '#a89c7c', // keten
  d: '#5e3c24', D: '#3a2416', // deri, sandalet, kuşak
  c: '#cfc3a2', C: '#9a8e70', // baş örtüsü (erkek)
  a: '#6e4c30', A: '#d2bf98', q: '#f2ead2', // baba: aba, aba çizgisi, püskül
  b: '#3a2a20', B: '#a9a296', // sakal koyu / kır
  n: '#5c6070', N: '#8a8e9a', // Nahum'un abası
  v: '#3f5a8a', V: '#2c4066', // Yoaş'ın tuniği
  p: '#6e3b55', P: '#4a2838', // kadın giysisi
  e: '#d9ceb4', E: '#a69a80', // kadın örtüsü
  w: '#ece6d4', W: '#b4ab98', x: '#4a382c', X: '#2a2018', // yün, yün gölgesi, koyun yüzü
  o: '#f0a040', O: '#fff0b0', r: '#a2603a', R: '#6a3a20', // alev ve pişmiş toprak
  t: '#7a7468', T: '#aaa292', u: '#4e4a44', U: '#33302c', // taş
  g: '#e8c66a', G: '#fff4cc', // yıldız altını, müjde beyaz-altını
  s: '#8e9ab8', S: '#c8d0e0', // gümüş
  z: '#2f4a3c', Z: '#456650', // yaprak
  i: '#26305e', I: '#3a4a85', // çivit
};

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}
function spriteFrom(rows, pal, opts) {
  pal = pal || PAL;
  const h = rows.length, w = Math.max.apply(null, rows.map((r) => r.length));
  const c = makeCanvas(w, h), g = c.getContext('2d');
  for (let y = 0; y < h; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === '.' || ch === ' ') continue;
      const col = pal[ch] || PAL[ch];
      if (!col) continue;
      g.fillStyle = col;
      g.fillRect(x, y, 1, 1);
    }
  }
  if (opts && opts.flip) return flipCanvas(c);
  return c;
}
function flipCanvas(src) {
  const c = makeCanvas(src.width, src.height), g = c.getContext('2d');
  g.translate(src.width, 0); g.scale(-1, 1); g.drawImage(src, 0, 0);
  return c;
}
function swap(rows, map) { return rows.map((r) => r.replace(/./g, (ch) => (map[ch] !== undefined ? map[ch] : ch))); }
// Kenar ışığı (Bakış): opak piksellerin çevresine 1 px dış çizgi
function outlineOf(src, color) {
  const w = src.width + 2, h = src.height + 2;
  const c = makeCanvas(w, h), g = c.getContext('2d');
  const d = src.getContext('2d').getImageData(0, 0, src.width, src.height).data;
  const op = (x, y) => x >= 0 && y >= 0 && x < src.width && y < src.height && d[(y * src.width + x) * 4 + 3] > 0;
  g.fillStyle = color;
  for (let y = -1; y <= src.height; y++)
    for (let x = -1; x <= src.width; x++) {
      if (op(x, y)) continue;
      if (op(x - 1, y) || op(x + 1, y) || op(x, y - 1) || op(x, y + 1)) g.fillRect(x + 1, y + 1, 1, 1);
    }
  return c;
}
function silhouetteOf(src, color) {
  const c = makeCanvas(src.width, src.height), g = c.getContext('2d');
  g.drawImage(src, 0, 0);
  g.globalCompositeOperation = 'source-in';
  g.fillStyle = color; g.fillRect(0, 0, c.width, c.height);
  return c;
}

// ------------------------------------------------------------
// Çocuk Tamar (16×22) — aşağı, yukarı, sağ (sol = ayna; sapma listesinde)
// ------------------------------------------------------------
const TAMAR_TOP = {
  down: [
    '......kkkk......',
    '.....kyyyyk.....',
    '....kyyyyyyk....',
    '....kyhhhhyk....',
    '...kyhffffhyk...',
    '...kyfkffkfyk...',
    '...kyffffffyk...',
    '...kYyfFFfyYk...',
    '....kYyyyyYk....',
    '...kmmYyyYmmk...',
    '..kmmmmmmmmmmk..',
    '..kmMmmmmmmMmk..',
    '..kmMddddddMmk..',
    '..kfkmmmmmmkfk..',
    '...kkmmmmmmkk...',
    '....kmmmmmmk....',
    '....kmMmmMmk....',
    '....kMmmmmMk....',
  ],
  up: [
    '......kkkk......',
    '.....kyyyyk.....',
    '....kyyyyyyk....',
    '....kyyyyyyk....',
    '...kyyYyyYyyk...',
    '...kyyyyyyyyk...',
    '...kYyyyyyyYk...',
    '...kYyyyyyyYk...',
    '....kYyyyyYk....',
    '...kmmYyyYmmk...',
    '..kmmmYyyYmmmk..',
    '..kmMmmYYmmMmk..',
    '..kmMddddddMmk..',
    '..kfkmmmmmmkfk..',
    '...kkmmmmmmkk...',
    '....kmmmmmmk....',
    '....kmMmmMmk....',
    '....kMmmmmMk....',
  ],
  right: [
    '......kkkk......',
    '.....kyyyyk.....',
    '....kyyyyyyk....',
    '....kyyyyhhk....',
    '....kyyyhffk....',
    '....kyyyffkfk...',
    '....kYyyfffffk..',
    '....kYyyyfFfk...',
    '.....kYyyyyk....',
    '....kmmYyymk....',
    '....kmmmmmmk....',
    '....kmmMmmmk....',
    '....kmddddfk....',
    '....kmmmmmfk....',
    '....kmmmmmkk....',
    '....kmmmmmmk....',
    '....kmMmmMmk....',
    '....kMmmmmMk....',
  ],
};
const TAMAR_LEGS = {
  down: [
    ['....kMmmmmMk....', '....kfk..kfk....', '....kdk..kdk....', '....kkk..kkk....'],
    ['....kMmmmmMk....', '....kfk..kfk....', '....kdk..kkk....', '....kkk.........'],
    ['....kMmmmmMk....', '....kfk..kfk....', '....kkk..kdk....', '.........kkk....'],
  ],
  right: [
    ['....kMmmmmMk....', '.....kfffk......', '.....kdddk......', '.....kkkkk......'],
    ['....kMmmmmMk....', '....kfk.kfk.....', '...kdk...kdk....', '...kk.....kk....'],
    ['....kMmmmmMk....', '.....kfkfk......', '.....kdkdk......', '.....kkkkk......'],
  ],
};
TAMAR_LEGS.up = TAMAR_LEGS.down;
const TAMAR_CROUCH = [
  '................', '................', '................', '................', '................',
  '......kkkk......',
  '.....kyyyyk.....',
  '....kyyyyyyk....',
  '....kyyyyyyk....',
  '...kyyYyyYyyk...',
  '...kYyyyyyyYk...',
  '....kYyyyyYk....',
  '...kmmYyyYmmk...',
  '..kmmmYyyYmmmk..',
  '..kmMmmYYmmMmk..',
  '..kmMddddddMmk..',
  '..kmmmmmmmmmmk..',
  '.kmmMmmmmmmmMmk.',
  '.kmmmmmmmmmmmmk.',
  '.kddMmmmmmmmMddk',
  '.kkkkkkkkkkkkkk.',
  '................',
];

// ------------------------------------------------------------
// Yetişkin (16×30): baba, Nahum, Yoaş, köylüler (palet takası)
// ------------------------------------------------------------
const ADULT_TOP = {
  down: [
    '......kkkk......',
    '.....kcccck.....',
    '....kcccccck....',
    '....kchhhhck....',
    '...kcffffffck...',
    '...kcfkffkfck...',
    '...kcffffffck...',
    '...kcbffffbck...',
    '....kbbbbbbk....',
    '....kkbbbbkk....',
    '..kaAallllaAak..',
    '.kaAaallllaaAak.',
    '.kaAaallllaaAak.',
    '.kaAaaddddaaAak.',
    '.kaAaallllaaAak.',
    '.kaAaallllaaAak.',
    '.kfAaallllaaAfk.',
    '.kkAaallllaaAkk.',
    '..kAaallllaaAk..',
    '..kAaallllaaAk..',
    '..kAaallllaaAk..',
    '..kAaallllaaAk..',
    '..kAaallllaaAk..',
    '..kqkkllllkkqk..',
    '...q.kllllk.q...',
  ],
  up: [
    '......kkkk......',
    '.....kcccck.....',
    '....kcccccck....',
    '....kcccccck....',
    '...kccCccCcck...',
    '...kcccccccck...',
    '...kCccccccCk...',
    '...kCccccccCk...',
    '....kCccccCk....',
    '....kkCccCkk....',
    '..kaAaaaaaaAak..',
    '.kaAaaaAAaaaAak.',
    '.kaAaaaAAaaaAak.',
    '.kaAaaaAAaaaAak.',
    '.kaAaaaAAaaaAak.',
    '.kaAaaaAAaaaAak.',
    '.kfAaaaAAaaaAfk.',
    '.kkAaaaAAaaaAkk.',
    '..kAaaaAAaaaAk..',
    '..kAaaaAAaaaAk..',
    '..kAaaaAAaaaAk..',
    '..kAaaaAAaaaAk..',
    '..kAaaaAAaaaAk..',
    '..kqkaaaaaakqk..',
    '...q.kllllk.q...',
  ],
  right: [
    '......kkkk......',
    '.....kcccck.....',
    '....kcccccck....',
    '....kccchhhk....',
    '....kcchfffk....',
    '....kccffkfk....',
    '....kCcfffffk...',
    '....kCcbbffk....',
    '....kCbbbbbk....',
    '.....kkbbbk.....',
    '....kaAallak....',
    '....kaAallak....',
    '....kaAallak....',
    '....kaAddddk....',
    '....kaAallak....',
    '....kaAallfk....',
    '....kaAallfk....',
    '....kaAallkk....',
    '....kaAallak....',
    '....kaAallak....',
    '....kaAallak....',
    '....kaAallak....',
    '....kaAallak....',
    '....kqkllkqk....',
    '....q.kllk.q....',
  ],
};
const ADULT_LEGS = {
  down: [
    ['.....kfkkfk.....', '.....kfkkfk.....', '.....kdkkdk.....', '.....kkkkkk.....'],
    ['.....kfkkfk.....', '.....kfkkfk.....', '.....kdkkkk.....', '.....kkk........'],
    ['.....kfkkfk.....', '.....kfkkfk.....', '.....kkkkdk.....', '........kkk.....'],
  ],
  right: [
    ['......kffk......', '......kffk......', '......kddk......', '......kkkkk.....'],
    ['.....kfk.kfk....', '....kfk...kfk...', '....kdk...kdk...', '....kk.....kk...'],
    ['......kffk......', '......kfkk......', '......kdkdk.....', '......kkkkk.....'],
  ],
};
ADULT_LEGS.up = ADULT_LEGS.down;

// Oturan yetişkin (sırttan) — ateş başı, müjde
const ADULT_SIT_BACK = [
  '................', '................', '................', '................', '................', '................',
  '......kkkk......',
  '.....kcccck.....',
  '....kcccccck....',
  '....kcccccck....',
  '...kccCccCcck...',
  '...kCccccccCk...',
  '....kCccccCk....',
  '....kkCccCkk....',
  '..kaAaaaaaaAak..',
  '.kaAaaaAAaaaAak.',
  '.kaAaaaAAaaaAak.',
  '.kaAaaaAAaaaAak.',
  '.kaAaaaAAaaaAak.',
  'kaAaaaaAAaaaaAak',
  'kaAaaaaAAaaaaAak',
  'kqAaaaaaaaaaaAqk',
  'kkkkkkkkkkkkkkkk',
  '................', '................', '................', '................', '................', '................', '................',
];

const PALS = {
  baba: {},
  nahum: { a: PAL.n, A: PAL.N, c: '#b9b4a6', C: '#8a8678', b: PAL.B, h: '#9a958a' },
  yoas: { a: PAL.v, A: '#6a84b0', c: '#c4a878', C: '#8f7a52', b: PAL.h, q: PAL.v },
  koylu1: { a: '#6a5a42', A: '#9a8a6a', c: '#b8aa88', C: '#8a7c60', b: '#4a3628', q: '#6a5a42' },
  koylu2: { a: '#4e5a46', A: '#7a866e', c: '#cabd9e', C: '#988c70', b: '#2a1e18', q: '#4e5a46' },
  kadin: { a: PAL.p, A: PAL.P, c: PAL.e, C: PAL.E, b: PAL.f, h: PAL.h, q: PAL.p, l: '#c9a98a', d: '#8a5a3a' },
  kadin2: { a: '#4a5a7a', A: '#34405a', c: '#e2d8c0', C: '#b0a488', b: PAL.f, h: PAL.h, q: '#4a5a7a', l: '#b9a07a', d: '#7a4a2a' },
  hulda: { a: '#5a6a4a', A: '#3e4a32', c: '#d8c8a0', C: '#a89870', b: PAL.f, h: PAL.h, q: '#5a6a4a', l: '#c2a27a', d: '#6a4a2a' },
};

function buildCharacter(top, legs, pal) {
  const out = {};
  ['down', 'up', 'right'].forEach((dir) => {
    out[dir] = legs[dir].map((lg) => spriteFrom(top[dir].concat(lg), pal));
  });
  out.left = out.right.map(flipCanvas);
  return out;
}

// ------------------------------------------------------------
// Koyun ve kuzu
// ------------------------------------------------------------
const SHEEP_A = [
  '....kkkkk.......',
  '..kkwwwwwkk.....',
  '.kwwwwwwwwwkkk..',
  'kwwwwwwwwwwkxxk.',
  'kwwwwwwwwwkxxxxk',
  'kwwwwwwwwwkxkxxk',
  'kWwwwwwwwwkkxxk.',
  '.kWWwwwwWWkkkk..',
  '..kWWWWWWWk.....',
  '..kxk..kxk......',
  '..kxk..kxk......',
  '..kk...kk.......',
];
const SHEEP_B = SHEEP_A.slice(0, 9).concat(['...kxk..kxk.....', '..kxk...kxk.....', '..kk.....kk.....']);
const SHEEP_GRAZE = [
  '....kkkkk.......',
  '..kkwwwwwkk.....',
  '.kwwwwwwwwwk....',
  'kwwwwwwwwwwk....',
  'kwwwwwwwwwwkkk..',
  'kwwwwwwwwwkxxxk.',
  'kWwwwwwwwwkxxxxk',
  '.kWWwwwwWWkxkxk.',
  '..kWWWWWWWkkxxk.',
  '..kxk..kxk.kkk..',
  '..kxk..kxk......',
  '..kk...kk.......',
];
// kulakları sese dönmüş (değnek sesi, ışıktaki koyun)
const SHEEP_EARS = [
  '....kkkkk...kk..',
  '..kkwwwwwkkkxk..',
  '.kwwwwwwwwwkkkk.',
  'kwwwwwwwwwwkxxk.',
  'kwwwwwwwwwkxxxxk',
  'kwwwwwwwwwkxkxxk',
  'kWwwwwwwwwkkxxk.',
  '.kWWwwwwWWkkkk..',
  '..kWWWWWWWk.....',
  '..kxk..kxk......',
  '..kxk..kxk......',
  '..kk...kk.......',
];
const LAMB = [
  '...kkkk.....',
  '.kkwwwwkk...',
  'kwwwwwwwwkk.',
  'kwwwwwwwkxxk',
  'kwwwwwwwkxkk',
  '.kWwwwWkkxk.',
  '..kWWWWk.k..',
  '..kxkkxk....',
  '..kk..kk....',
];
const LAMB_B = LAMB.slice(0, 7).concat(['...kxkxk....', '...kk.kk....']);

// Kandil (Hirodes dönemi, kazıma burunlu, pişmiş toprak) ve alev
const LAMP = ['.rrrrR.', 'rrrrrRR', '.RRRRR.'];
const FLAME = [
  ['.o.', 'oOo', '.o.'],
  ['..o', '.Oo', '.o.'],
  ['.o.', 'oOo', 'oo.'],
];

// Durak taşı
const STONE = [
  '...kkkk...',
  '..kTTTtk..',
  '.kTTTtttk.',
  '.kTTtttuk.',
  '.kTttttuk.',
  '.kTtuttuk.',
  '.kTttttuk.',
  '.kTtttuuk.',
  'kTTttttuuk',
  'kttttttuUk',
  '.kkkkkkkk.',
];

// İpucu simgeleri (9×9) — anlam renkle değil biçimle (GDD §13)
const ICONS = {
  hayvan: ['.k.....k.', 'kxk...kxk', '.kxxxxxk.', '.kxwxwxk.', '.kxxxxxk.', '..kxxxk..', '..kxkxk..', '...kkk...', '.........'],
  cark: ['...kkk...', '.kkTTTkk.', '.kTkkkTk.', 'kTk.k.kTk', 'kTkkTkkTk', 'kTk.k.kTk', '.kTkkkTk.', '.kkTTTkk.', '...kkk...'],
  konuk: ['.........', '..kkkkk..', '.kddddddk', '.kdDDDDdk', '.kddddddk', 'kkkkkkkkk', 'kdk...kdk', 'kdk...kdk', 'kkk...kkk'],
  bos: ['kkkkkkkkk', 'kUUUUUUUk', 'kUk...kUk', 'kU.k.k.Uk', 'kU..k..Uk', 'kU.k.k.Uk', 'kUk...kUk', 'kUUUUUUUk', 'kkkkkkkkk'],
  isik: ['....k....', '...kok...', '...kOok..', '..koOOok.', '..koOOok.', '..kooook.', '...kook..', '..kRRRRk.', '.kkkkkkk.'],
  saman_taze: ['.g.g..g..', 'g.g.gg.g.', '.ggg.ggg.', 'g.g.g.g.g', '.ggggggg.', 'ggg.ggggg', '.g.g.g.g.', 'ggggggggg', '.........'],
  saman_eski: ['.........', '.........', '.........', '.........', 'CCCCCCCCC', 'C.C.C.C.C', 'CCCCCCCCC', '.........', '.........'],
  bagli: ['...kkk...', '..kTkTk..', '..kk.kk..', '..kTkTk..', '...kdk...', '...kdk...', '....kd...', '.....kd..', '......kk.'],
  hayvan_ic: ['kkkkkkkkk', 'kdk...kdk', 'kdkx.xkdk', 'kdkxxxkdk', 'kdkwxwkdk', 'kdkxxxkdk', 'kkkkkkkkk', 'kdddddddk', 'kkkkkkkkk'],
  firin: ['.........', '...kkk...', '..kRRRk..', '.kRRRRRk.', 'kRRkkkRRk', 'kRkoOokRk', 'kRkoooRRk', 'kkkkkkkkk', '.........'],
};

// Portreler (24×24): çocuk Tamar, baba, yaşlı Tamar, Sara
const PORTRAITS_SRC = {
  tamar: [
    '........kkkkkkkk........',
    '......kkyyyyyyyykk......',
    '.....kyyyyyyyyyyyyk.....',
    '....kyyyyYYYYYYyyyyk....',
    '...kyyyYhhhhhhhhYyyyk...',
    '...kyyYhhhhhhhhhhYyyk...',
    '..kyyYhhffffffffhhYyyk..',
    '..kyyYhffffffffffhYyyk..',
    '..kyyYffkkffffkkffYyyk..',
    '..kyyYffkSffffkSffYyyk..',
    '..kyyYffffffffffffYyyk..',
    '..kyyYfFfffFFfffFfYyyk..',
    '..kyyyYfffffffffffYyyk..',
    '...kyyYffffkkffffYyyk...',
    '...kyyyYffffffffYyyyk...',
    '....kyyyYYffffYYyyyk....',
    '....kyyyyyYYYYyyyyyk....',
    '...kmmyyyyyyyyyyyymmk...',
    '..kmmmmyyyyyyyyyymmmmk..',
    '.kmmmmmmyyyyyyyymmmmmmk.',
    '.kmmMmmmmmYYYYmmmmmMmmk.',
    'kmmmMmmmmmmmmmmmmmmMmmmk',
    'kmmmMmmmmmmmmmmmmmmMmmmk',
    'kkkkkkkkkkkkkkkkkkkkkkkk',
  ],
  baba: [
    '.......kkkkkkkkkk.......',
    '.....kkcccccccccckk.....',
    '....kcccccccccccccck....',
    '...kccccCCCCCCCCcccck...',
    '...kcccChhhhhhhhCccck...',
    '..kcccChhffffffhhCccck..',
    '..kcccCffffffffffCccck..',
    '..kcccfffkkffkkfffCcck..',
    '..kccCffkSffffkSffCcck..',
    '..kccCffffffffffffCcck..',
    '..kccCfffffFFfffffCcck..',
    '..kccCfbfffFFfffbfCcck..',
    '..kccCfbbffffffbbfCcck..',
    '..kccCbbbbkkkkbbbbCcck..',
    '..kccCbbbbbbbbbbbbCcck..',
    '...kcCbbbbbbbbbbbbCck...',
    '...kcCCbbbbbbbbbbCCck...',
    '...kaAacbbbbbbbbcaAak...',
    '..kaAaaallbbbblllaaAak..',
    '.kaAaaaallllllllaaaAaak.',
    '.kaAaaaallllllllaaaAaak.',
    'kaaAaaaallllllllaaaAaaak',
    'kaaAaaaallllllllaaaAaaak',
    'kkkkkkkkkkkkkkkkkkkkkkkk',
  ],
  yasli: [
    '.......kkkkkkkkkk.......',
    '.....kkeeeeeeeeeekk.....',
    '....keeeeeeeeeeeeeek....',
    '...keeeeEEEEEEEEeeeek...',
    '...keeeEBBBBBBBBEeeek...',
    '..keeeEBBffffffBBEeeek..',
    '..keeeEffffffffffEeeek..',
    '..keeeEfFFffffFFfEeeek..',
    '..keeEffkkffffkkffEeek..',
    '..keeEffkSffffkSffEeek..',
    '..keeEFfffffffffffEeek..',
    '..keeEfFffffFFfffFEeek..',
    '..keeEffFfffffffFfEeek..',
    '..keeeEfffFkkFfffEeeek..',
    '...keeEfFffffffFfEeek...',
    '...keeeEFffffffFEeeek...',
    '....keeeEEFFFFEEeeek....',
    '...kiieeeeeeeeeeeeiik...',
    '..kiiiiieeeeeeeeiiiiik..',
    '.kiiiiiiiieeeeiiiiiiiik.',
    '.kiiIiiiiiiiiiiiiiiIiik.',
    'kiiiIiiiiiiiiiiiiiiIiiik',
    'kiiiIiiiiiiiiiiiiiiIiiik',
    'kkkkkkkkkkkkkkkkkkkkkkkk',
  ],
  sara: [
    '........................',
    '........kkkkkkkk........',
    '......kkhhhhhhhhkk......',
    '.....khhhhhhhhhhhhk.....',
    '....khhhhhhhhhhhhhhk....',
    '....khhhffffffffhhhk....',
    '...khhhffffffffffhhhk...',
    '...khhffffffffffffhhk...',
    '...khhffkkffffkkffhhk...',
    '...khhffkSffffkSffhhk...',
    '...khhffffffffffffhhk...',
    '...khhfFffffffffFfhhk...',
    '...khhhffffkkffffhhhk...',
    '....khhhffffffffhhhk....',
    '....khhhhFFffFFhhhhk....',
    '.....khhhhffffhhhhk.....',
    '......khhkffffkhhk......',
    '.....kllllffffllllk.....',
    '....kllllllllllllllk....',
    '...kllLllllllllllLllk...',
    '..kllLllllllllllllLllk..',
    '.kllLllllllllllllllLllk.',
    '.kllLllllllllllllllLllk.',
    'kkkkkkkkkkkkkkkkkkkkkkkk',
  ],
};

// ------------------------------------------------------------
// Işık sprite'ları: Bayer 4×4 titreşimli (dithered) radyal geçiş
// ------------------------------------------------------------
const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
function makeLightSprite(r, levels, core) {
  const s = r * 2, c = makeCanvas(s, s), g = c.getContext('2d');
  const img = g.createImageData(s, s), d = img.data;
  levels = levels || 5; core = core == null ? 0.45 : core;
  for (let y = 0; y < s; y++)
    for (let x = 0; x < s; x++) {
      const dx = x + 0.5 - r, dy = y + 0.5 - r, t = Math.sqrt(dx * dx + dy * dy) / r;
      if (t >= 1) continue;
      let a = t < core ? 1 : 1 - (t - core) / (1 - core);
      a = Math.max(0, a);
      const q = a * levels, base = Math.floor(q), frac = q - base;
      const th = (BAYER4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
      const lv = (base + (frac > th ? 1 : 0)) / levels;
      const i = (y * s + x) * 4;
      d[i] = 255; d[i + 1] = 255; d[i + 2] = 255; d[i + 3] = Math.round(lv * 255);
    }
  g.putImageData(img, 0, 0);
  return c;
}
function makeGlowSprite(r, color, alpha) {
  const s = r * 2, c = makeCanvas(s, s), g = c.getContext('2d');
  const gr = g.createRadialGradient(r, r, 0, r, r, r);
  gr.addColorStop(0, color); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.globalAlpha = alpha; g.fillStyle = gr; g.fillRect(0, 0, s, s);
  return c;
}

// ------------------------------------------------------------
// Tüm sprite'ları bir kez üret
// ------------------------------------------------------------
const ART = {};
function buildArt() {
  ART.tamar = buildCharacter(TAMAR_TOP, TAMAR_LEGS, {});
  ART.tamarCrouch = spriteFrom(TAMAR_CROUCH);
  ART.people = {};
  Object.keys(PALS).forEach((k) => { ART.people[k] = buildCharacter(ADULT_TOP, ADULT_LEGS, PALS[k]); });
  ART.sitBack = {};
  Object.keys(PALS).forEach((k) => { ART.sitBack[k] = spriteFrom(ADULT_SIT_BACK, Object.assign({}, PAL, PALS[k])); });
  // Not: PALS takası spriteFrom içinde pal[ch] || PAL[ch] ile yapılır
  ART.sheep = {
    a: spriteFrom(SHEEP_A), b: spriteFrom(SHEEP_B), graze: spriteFrom(SHEEP_GRAZE), ears: spriteFrom(SHEEP_EARS),
  };
  ART.sheepL = { a: flipCanvas(ART.sheep.a), b: flipCanvas(ART.sheep.b), graze: flipCanvas(ART.sheep.graze), ears: flipCanvas(ART.sheep.ears) };
  ART.sheepSil = silhouetteOf(ART.sheep.a, '#1a1f3a');
  ART.sheepSilL = flipCanvas(ART.sheepSil);
  ART.lamb = { a: spriteFrom(LAMB), b: spriteFrom(LAMB_B) };
  ART.lambL = { a: flipCanvas(ART.lamb.a), b: flipCanvas(ART.lamb.b) };
  ART.lamp = spriteFrom(LAMP);
  ART.flame = FLAME.map((f) => spriteFrom(f));
  ART.stone = spriteFrom(STONE);
  ART.stoneRim = outlineOf(ART.stone, '#ffe9a8');
  ART.icons = {};
  Object.keys(ICONS).forEach((k) => { ART.icons[k] = spriteFrom(ICONS[k]); });
  ART.portraits = {};
  Object.keys(PORTRAITS_SRC).forEach((k) => { ART.portraits[k] = spriteFrom(PORTRAITS_SRC[k]); });
  ART.light = { r32: makeLightSprite(32, 4, 0.35), r80: makeLightSprite(80, 5, 0.4), r96: makeLightSprite(96, 4, 0.2), r160: makeLightSprite(160, 6, 0.45), r48: makeLightSprite(48, 4, 0.3) };
  ART.glow = { warm: makeGlowSprite(64, 'rgba(255,170,80,1)', 0.55), gold: makeGlowSprite(64, 'rgba(255,240,200,1)', 0.9), cool: makeGlowSprite(64, 'rgba(160,190,255,1)', 0.5) };
  ART.trees = buildTrees();
  ART.bush = buildBush(1);
  ART.bush2 = buildBush(2);
  ART.thorn = buildBush(3);
  ART.rocks = [buildRock(1, 14, 10), buildRock(2, 22, 14), buildRock(3, 12, 8)];
}

// Zeytin ve harnup: gürültülü yaprak kümeleri (prosedürel)
function buildTrees() {
  const out = {};
  function tree(seed, w, h, trunkCol, leafA, leafB, leafC) {
    const c = makeCanvas(w, h), g = c.getContext('2d'), rr = makeRng(seed);
    const cx = w / 2;
    g.fillStyle = PAL.k; g.fillRect(cx - 3, h - 14, 6, 14);
    g.fillStyle = trunkCol; g.fillRect(cx - 2, h - 14, 4, 13);
    g.fillStyle = '#3a2a1e'; g.fillRect(cx - 1, h - 12, 1, 10); g.fillRect(cx + 1, h - 8, 1, 6);
    const blobs = [];
    for (let i = 0; i < 9; i++) blobs.push([cx + (rr() - 0.5) * w * 0.6, (h - 14) * 0.45 + (rr() - 0.5) * h * 0.35, 5 + rr() * 6]);
    const pass = (col, grow, dy) => {
      g.fillStyle = col;
      blobs.forEach(([bx, by, br]) => {
        for (let y = -br - grow; y <= br + grow; y++)
          for (let x = -br - grow; x <= br + grow; x++)
            if (x * x + y * y <= (br + grow) * (br + grow) && rr() > 0.08) g.fillRect(Math.round(bx + x), Math.round(by + y + dy), 1, 1);
      });
    };
    pass(PAL.k, 1, 0);
    pass(leafA, 0, 0);
    pass(leafB, -2, -1);
    g.fillStyle = leafC;
    for (let i = 0; i < 40; i++) { const b = blobs[i % blobs.length]; g.fillRect(Math.round(b[0] + (rr() - 0.5) * b[2] * 1.4), Math.round(b[1] - b[2] * 0.4 + (rr() - 0.5) * b[2]), 1, 1); }
    return c;
  }
  out.olive = tree(11, 34, 36, '#5a4634', '#3c5244', '#5a7462', '#8fa69a');
  out.olive2 = tree(23, 30, 32, '#5a4634', '#3c5244', '#56705c', '#8fa69a');
  out.carob = tree(37, 38, 38, '#4a3426', '#24402e', '#36583e', '#5e8a5e');
  return out;
}
function buildBush(kind) {
  const w = 16, h = 12, c = makeCanvas(w, h), g = c.getContext('2d'), rr = makeRng(kind * 97);
  const cols = kind === 3 ? ['#4a3a2a', '#6a5236', '#8a7046'] : ['#2a3a2e', '#3e5640', '#5f7a5c'];
  for (let pass = 0; pass < 4; pass++)
    for (let i = 0; i < 70; i++) {
      const a = rr() * Math.PI, rad = rr() * (pass === 0 ? 7.5 : 6.5 - pass);
      const x = Math.round(8 + Math.cos(a) * rad * 1.05), y = Math.round(11 - Math.sin(a) * rad * 1.1);
      g.fillStyle = pass === 0 ? PAL.k : cols[Math.min(2, pass - 1)];
      g.fillRect(x, y, 1, 1);
    }
  if (kind === 3) { g.fillStyle = '#c8b890'; for (let i = 0; i < 10; i++) g.fillRect(2 + Math.floor(rr() * 12), 2 + Math.floor(rr() * 8), 1, 1); }
  return c;
}
function buildRock(seed, w, h) {
  const c = makeCanvas(w, h), g = c.getContext('2d'), rr = makeRng(seed * 31);
  const cx = w / 2, cy = h * 0.6;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const dx = (x - cx) / (w / 2), dy = (y - cy) / (h * 0.55);
      const d = dx * dx + dy * dy + (rr() - 0.5) * 0.12;
      if (d > 1) continue;
      let col = d > 0.82 ? PAL.k : (dy < -0.2 ? PAL.T : (dx > 0.3 || dy > 0.4 ? PAL.u : PAL.t));
      if (d <= 0.82 && rr() < 0.08) col = PAL.U;
      g.fillStyle = col; g.fillRect(x, y, 1, 1);
    }
  return c;
}
