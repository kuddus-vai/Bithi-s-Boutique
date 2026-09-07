import { Product, Review } from '../types';

export const CATEGORIES = [
  'All Collections',
  'Roheenaz Luxury Edition',
  'Morja Vol. 7 by Gulljee',
  'Pure Luxury Lawn',
  'Embroidered Chiffon'
] as const;

export const PRODUCTS: Product[] = [
  // Roheenaz Luxury Edition (10 Designer Sets)
  {
    id: 'roheenaz-outfit-01',
    name: 'Roheenaz Luxury Edition - Embroidered Lawn #01',
    category: 'Roheenaz Luxury Edition',
    price: 5450,
    originalPrice: 6800,
    rating: 4.9,
    reviewsCount: 38,
    image: '/assets/Products/Roheenaz/637850564_1526645636128991_2845010814069378436_n.jpg',
    additionalImages: [
      '/assets/Products/Roheenaz/640961950_1526645582795663_6213097459304207915_n.jpg',
      '/assets/Products/Roheenaz/638432568_1526645696128985_102575858111090569_n.jpg'
    ],
    fabric: 'Pure Luxury Lawn with Resham Threadwork & Organza Border',
    description: 'Exclusive Roheenaz 3-piece luxury ensemble in Terracotta Brick & Antique Gold. Features a heavy embroidered front bodice, intricate resham floral borders, and soft digital printed dupatta.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Terracotta Brick'],
    inStock: true,
    isBestseller: true,
    isNew: true,
    sku: 'RN-LUX-01'
  },
  {
    id: 'roheenaz-outfit-02',
    name: 'Roheenaz Luxury Edition - Embroidered Lawn #02',
    category: 'Roheenaz Luxury Edition',
    price: 5600,
    originalPrice: 6950,
    rating: 4.8,
    reviewsCount: 31,
    image: '/assets/Products/Roheenaz/639621535_1526645752795646_8672467895981638152_n.jpg',
    additionalImages: [
      '/assets/Products/Roheenaz/641712896_1526645796128975_8048995277633902292_n.jpg',
      '/assets/Products/Roheenaz/641420171_1526645839462304_8876214522803117253_n.jpg'
    ],
    fabric: 'Luxury Lawn with Embroidered Neckline & Digital Silk Dupatta',
    description: 'Refined Roheenaz 3-piece suit in Celadon Sage with ivory needlework. Complete with embroidered organza sleeve patti and matching draped dupatta.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Celadon Sage'],
    inStock: true,
    isNew: true,
    sku: 'RN-LUX-02'
  },
  {
    id: 'roheenaz-outfit-03',
    name: 'Roheenaz Luxury Edition - Embroidered Lawn #03',
    category: 'Roheenaz Luxury Edition',
    price: 5800,
    originalPrice: 7200,
    rating: 5.0,
    reviewsCount: 45,
    image: '/assets/Products/Roheenaz/637744179_1526646106128944_7303331457700187441_n.jpg',
    additionalImages: [
      '/assets/Products/Roheenaz/641374830_1526645966128958_6181996827451078139_n.jpg',
      '/assets/Products/Roheenaz/641332460_1526646042795617_8010944002066670914_n.jpg'
    ],
    fabric: 'Heavy Embroidered Lawn Shirt with Chiffon Embroidered Dupatta',
    description: 'Breathtaking Berry Crimson ensemble highlighted by dense resham floral jaal and intricate pallu borders on pure chiffon.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Berry Crimson'],
    inStock: true,
    isBestseller: true,
    sku: 'RN-LUX-03'
  },
  {
    id: 'roheenaz-outfit-04',
    name: 'Roheenaz Luxury Edition - Embroidered Lawn #04',
    category: 'Roheenaz Luxury Edition',
    price: 5950,
    originalPrice: 7400,
    rating: 4.9,
    reviewsCount: 29,
    image: '/assets/Products/Roheenaz/641165863_1526646166128938_9022687412292938589_n.jpg',
    additionalImages: [
      '/assets/Products/Roheenaz/641531156_1526646349462253_2119578585200892394_n.jpg',
      '/assets/Products/Roheenaz/641433622_1526646249462263_3428415272859734312_n.jpg'
    ],
    fabric: 'Luxury Schiffli Embroidered Lawn with Printed Monar Dupatta',
    description: 'Festive Coral Rose piece crafted with heavy schiffli cutwork motifs, embroidered daaman patch, and delicate lightweight drape.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Coral Rose'],
    inStock: true,
    isNew: true,
    sku: 'RN-LUX-04'
  },
  {
    id: 'roheenaz-outfit-05',
    name: 'Roheenaz Luxury Edition - Embroidered Lawn #05',
    category: 'Roheenaz Luxury Edition',
    price: 5700,
    originalPrice: 7100,
    rating: 4.8,
    reviewsCount: 34,
    image: '/assets/Products/Roheenaz/641644479_1526646486128906_6960802430781467013_n.jpg',
    additionalImages: [
      '/assets/Products/Roheenaz/638882484_1526646436128911_8605197924670154863_n.jpg',
      '/assets/Products/Roheenaz/641454623_1526646386128916_3155980305845605096_n.jpg'
    ],
    fabric: 'Embroidered Slub Lawn Front with Hand-Embellished Patti',
    description: 'Subtle Dusty Mauve edition with metallic cord and threadwork detailing along the neckline and hemline.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Dusty Mauve'],
    inStock: true,
    sku: 'RN-LUX-05'
  },
  {
    id: 'roheenaz-outfit-06',
    name: 'Roheenaz Luxury Edition - Embroidered Lawn #06',
    category: 'Roheenaz Luxury Edition',
    price: 6200,
    originalPrice: 7800,
    rating: 5.0,
    reviewsCount: 52,
    image: '/assets/Products/Roheenaz/628517246_1526646586128896_5678513834062661086_n.jpg',
    additionalImages: [
      '/assets/Products/Roheenaz/640889545_1526646632795558_3146183822155383764_n.jpg',
      '/assets/Products/Roheenaz/640055766_1526646546128900_2343995548521529181_n.jpg'
    ],
    fabric: 'Heavy Threadwork Embroidered Lawn with Pure Chiffon Dupatta',
    description: 'Regal Royal Aubergine suit adorned with silver-gold tilla embroidery, cutwork hem borders, and a magnificent pure chiffon dupatta.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Royal Aubergine'],
    inStock: true,
    isBestseller: true,
    sku: 'RN-LUX-06'
  },
  {
    id: 'roheenaz-outfit-07',
    name: 'Roheenaz Luxury Edition - Embroidered Lawn #07',
    category: 'Roheenaz Luxury Edition',
    price: 5850,
    originalPrice: 7300,
    rating: 4.9,
    reviewsCount: 27,
    image: '/assets/Products/Roheenaz/641288000_1526646729462215_6817238229420638054_n.jpg',
    additionalImages: [
      '/assets/Products/Roheenaz/641312148_1526646776128877_6385950814591303123_n.jpg',
      '/assets/Products/Roheenaz/641276951_1526646686128886_4750567835596734259_n.jpg'
    ],
    fabric: 'Pure Swiss Lawn with Organza Cutwork Embroidery & Silk Dupatta',
    description: 'Earthy Warm Taupe palette accented by ivory and caramel threadwork, accompanied by a lavish printed silk dupatta.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Warm Taupe'],
    inStock: true,
    sku: 'RN-LUX-07'
  },
  {
    id: 'roheenaz-outfit-08',
    name: 'Roheenaz Luxury Edition - Embroidered Lawn #08',
    category: 'Roheenaz Luxury Edition',
    price: 6100,
    originalPrice: 7600,
    rating: 4.8,
    reviewsCount: 30,
    image: '/assets/Products/Roheenaz/641381319_1526646866128868_2871410878013077156_n.jpg',
    additionalImages: [
      '/assets/Products/Roheenaz/642763182_1526646909462197_2323167998155503331_n.jpg',
      '/assets/Products/Roheenaz/638251344_1526646822795539_3977827387617535785_n.jpg'
    ],
    fabric: 'Dobby Embroidered Lawn with Zari Borders & Embroidered Net Dupatta',
    description: 'Warm Mocha Bronze lawn with micro zari motifs, embroidered daaman lace, and coordinating four-side bordered dupatta.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Mocha Bronze'],
    inStock: true,
    isBestseller: true,
    sku: 'RN-LUX-08'
  },
  {
    id: 'roheenaz-outfit-09',
    name: 'Roheenaz Luxury Edition - Embroidered Lawn #09',
    category: 'Roheenaz Luxury Edition',
    price: 5900,
    originalPrice: 7350,
    rating: 4.9,
    reviewsCount: 33,
    image: '/assets/Products/Roheenaz/639415167_1526647016128853_6819508224469739608_n.jpg',
    additionalImages: [
      '/assets/Products/Roheenaz/641664512_1526647052795516_1743853058586834393_n.jpg',
      '/assets/Products/Roheenaz/640114197_1526646966128858_9051300974030296962_n.jpg'
    ],
    fabric: 'Pure Lawn with Floral Resham Embroidery & Jacquard Lawn Dupatta',
    description: 'Pastel Pistachio delight featuring delicate leaf embroidery, embroidered sleeves, and a luxury woven jacquard drape.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pastel Pistachio'],
    inStock: true,
    isNew: true,
    sku: 'RN-LUX-09'
  },
  {
    id: 'roheenaz-outfit-10',
    name: 'Roheenaz Luxury Edition - Embroidered Lawn #10',
    category: 'Roheenaz Luxury Edition',
    price: 6400,
    originalPrice: 8000,
    rating: 5.0,
    reviewsCount: 61,
    image: '/assets/Products/Roheenaz/202609062026090620260906640297851_1526647096128845_5300613962650833340_n.jpg',
    additionalImages: [
      '/assets/Products/Roheenaz/202609062026090620260906638984871_1526647146128840_1956849055202230246_n.jpg',
      '/assets/Products/Roheenaz/202609062026090620260906639946799_1526647266128828_6860589942353795909_n.jpg',
      '/assets/Products/Roheenaz/202609062026090620260906639042591_1526647206128834_2396405089537834992_n.jpg'
    ],
    fabric: 'Masterwork Embroidered Luxury Lawn with Intricate Cutwork & Chiffon Dupatta',
    description: 'The crowning jewel of the Roheenaz collection in Vintage Champagne. Features 4 distinct photographic perspectives with 3D embroidery accents and silk-finish dupatta.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Vintage Champagne'],
    inStock: true,
    isBestseller: true,
    isNew: true,
    sku: 'RN-LUX-10'
  },

  // Morja Vol. 7 by Gulljee (7 Signature Sets)
  {
    id: 'morja-outfit-01',
    name: 'Morja Vol. 7 - Designer Lawn Outfit #01',
    category: 'Morja Vol. 7 by Gulljee',
    price: 4500,
    originalPrice: 5700,
    rating: 4.8,
    reviewsCount: 20,
    image: '/assets/Products/Morja, by gulljee volume 7/576250577_1430406579086231_1266473648545594627_n.jpg',
    additionalImages: [
      '/assets/Products/Morja, by gulljee volume 7/576372613_1430406769086212_7668724769763923333_n.jpg',
      '/assets/Products/Morja, by gulljee volume 7/576680360_1430406945752861_8771579035782719322_n.jpg'
    ],
    fabric: 'Pure Lawn Cotton with Heavy Embroidered Front & Matching Dupatta',
    description: 'Exclusive 3-piece luxury lawn outfit from Morja by Gulljee Volume 7 in Crimson Red. Includes front silhouette, intricate embroidery detail shot, and draped dupatta view of the exact same design.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Crimson Red'],
    inStock: true,
    isBestseller: true,
    isNew: true,
    sku: 'MORJA-SET-01'
  },
  {
    id: 'morja-outfit-02',
    name: 'Morja Vol. 7 - Designer Lawn Outfit #02',
    category: 'Morja Vol. 7 by Gulljee',
    price: 4650,
    originalPrice: 5850,
    rating: 4.9,
    reviewsCount: 24,
    image: '/assets/Products/Morja, by gulljee volume 7/576754659_1430406972419525_3748629922017711747_n.jpg',
    additionalImages: [
      '/assets/Products/Morja, by gulljee volume 7/576892746_1430405922419630_2708457680575878834_n.jpg',
      '/assets/Products/Morja, by gulljee volume 7/576898440_1430406082419614_5677066900477198186_n.jpg'
    ],
    fabric: 'Pure Lawn Cotton with Heavy Embroidered Front & Matching Dupatta',
    description: 'Exclusive 3-piece luxury lawn outfit from Morja by Gulljee Volume 7 in Sapphire Blue. Includes front silhouette, intricate embroidery detail shot, and draped dupatta view of the exact same design.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Sapphire Blue'],
    inStock: true,
    sku: 'MORJA-SET-02'
  },
  {
    id: 'morja-outfit-03',
    name: 'Morja Vol. 7 - Designer Lawn Outfit #03',
    category: 'Morja Vol. 7 by Gulljee',
    price: 4800,
    originalPrice: 6000,
    rating: 5.0,
    reviewsCount: 28,
    image: '/assets/Products/Morja, by gulljee volume 7/576913453_1430406415752914_9121092646202775225_n.jpg',
    additionalImages: [
      '/assets/Products/Morja, by gulljee volume 7/576968999_1430405809086308_2672073425542151778_n.jpg',
      '/assets/Products/Morja, by gulljee volume 7/577541252_1430406375752918_2570217263155744915_n.jpg'
    ],
    fabric: 'Pure Lawn Cotton with Heavy Embroidered Front & Matching Dupatta',
    description: 'Exclusive 3-piece luxury lawn outfit from Morja by Gulljee Volume 7 in Mint Green. Includes front silhouette, intricate embroidery detail shot, and draped dupatta view of the exact same design.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Mint Green'],
    inStock: true,
    isBestseller: true,
    sku: 'MORJA-SET-03'
  },
  {
    id: 'morja-outfit-04',
    name: 'Morja Vol. 7 - Designer Lawn Outfit #04',
    category: 'Morja Vol. 7 by Gulljee',
    price: 4950,
    originalPrice: 6150,
    rating: 4.8,
    reviewsCount: 32,
    image: '/assets/Products/Morja, by gulljee volume 7/577838398_1430405885752967_8122208157954843471_n.jpg',
    additionalImages: [
      '/assets/Products/Morja, by gulljee volume 7/577901851_1430406475752908_7451325391285925503_n.jpg',
      '/assets/Products/Morja, by gulljee volume 7/578066838_1430406285752927_1331544240362608750_n.jpg'
    ],
    fabric: 'Pure Lawn Cotton with Heavy Embroidered Front & Matching Dupatta',
    description: 'Exclusive 3-piece luxury lawn outfit from Morja by Gulljee Volume 7 in Sunset Coral. Includes front silhouette, intricate embroidery detail shot, and draped dupatta view of the exact same design.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Sunset Coral'],
    inStock: true,
    isNew: true,
    sku: 'MORJA-SET-04'
  },
  {
    id: 'morja-outfit-05',
    name: 'Morja Vol. 7 - Designer Lawn Outfit #05',
    category: 'Morja Vol. 7 by Gulljee',
    price: 5100,
    originalPrice: 6300,
    rating: 4.9,
    reviewsCount: 36,
    image: '/assets/Products/Morja, by gulljee volume 7/578249958_1430406835752872_8718673179705080913_n.jpg',
    additionalImages: [
      '/assets/Products/Morja, by gulljee volume 7/578256909_1430406525752903_2488433881830397215_n.jpg',
      '/assets/Products/Morja, by gulljee volume 7/578257374_1430406019086287_2799357141396670723_n.jpg'
    ],
    fabric: 'Pure Lawn Cotton with Heavy Embroidered Front & Matching Dupatta',
    description: 'Exclusive 3-piece luxury lawn outfit from Morja by Gulljee Volume 7 in Ivory Gold. Includes front silhouette, intricate embroidery detail shot, and draped dupatta view of the exact same design.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory Gold'],
    inStock: true,
    isBestseller: true,
    sku: 'MORJA-SET-05'
  },
  {
    id: 'morja-outfit-06',
    name: 'Morja Vol. 7 - Designer Lawn Outfit #06',
    category: 'Morja Vol. 7 by Gulljee',
    price: 5250,
    originalPrice: 6450,
    rating: 5.0,
    reviewsCount: 40,
    image: '/assets/Products/Morja, by gulljee volume 7/578259972_1430407019086187_4917633628690097862_n.jpg',
    additionalImages: [
      '/assets/Products/Morja, by gulljee volume 7/578263713_1430406192419603_7036796352109025289_n.jpg',
      '/assets/Products/Morja, by gulljee volume 7/578266446_1430405842419638_7760491068157749151_n.jpg'
    ],
    fabric: 'Pure Lawn Cotton with Heavy Embroidered Front & Matching Dupatta',
    description: 'Exclusive 3-piece luxury lawn outfit from Morja by Gulljee Volume 7 in Mystic Plum. Includes front silhouette, intricate embroidery detail shot, and draped dupatta view of the exact same design.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Mystic Plum'],
    inStock: true,
    sku: 'MORJA-SET-06'
  },
  {
    id: 'morja-outfit-07',
    name: 'Morja Vol. 7 - Designer Lawn Outfit #07',
    category: 'Morja Vol. 7 by Gulljee',
    price: 5400,
    originalPrice: 6600,
    rating: 4.8,
    reviewsCount: 44,
    image: '/assets/Products/Morja, by gulljee volume 7/578267129_1430406059086283_1812564623282664501_n.jpg',
    additionalImages: [
      '/assets/Products/Morja, by gulljee volume 7/578273891_1430406915752864_7156747994795213048_n.jpg',
      '/assets/Products/Morja, by gulljee volume 7/578276362_1430406132419609_4192088856057847622_n.jpg'
    ],
    fabric: 'Pure Lawn Cotton with Heavy Embroidered Front & Matching Dupatta',
    description: 'Exclusive 3-piece luxury lawn outfit from Morja by Gulljee Volume 7 in Golden Mustard. Includes front silhouette, intricate embroidery detail shot, and draped dupatta view of the exact same design.',
    sizes: ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL'],
    colors: ['Golden Mustard'],
    inStock: true,
    isBestseller: true,
    isNew: true,
    sku: 'MORJA-SET-07'
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Tasnim Rahman',
    location: 'Gulshan-2, Dhaka',
    rating: 5,
    date: '2 days ago',
    comment: 'Ordered Roheenaz Outfit #10 and Morja Vol. 7 Outfit #1. Cash on delivery in Dhaka was super fast within 24 hours. The multiple close-up views of the embroidery were 100% true to what arrived!',
    productName: 'Roheenaz Luxury Edition - Embroidered Lawn #10',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Nusrat Jahan Chowdhury',
    location: 'Nasirabad, Chittagong',
    rating: 5,
    date: '1 week ago',
    comment: 'Bithi’s Boutique is genuinely authentic. Every Roheenaz and Gulljee piece is 100% original Pakistani luxury lawn with pristine fabric quality and heavy resham zari work.',
    productName: 'Morja Vol. 7 - Designer Lawn Outfit #02',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Farhana Ahmed',
    location: 'Upashahar, Sylhet',
    rating: 5,
    date: '3 days ago',
    comment: 'The Roheenaz embroidery close-ups and digital silk dupatta are breathtaking. Flawless stitch quality and fast delivery with bKash payment confirmation.',
    productName: 'Roheenaz Luxury Edition - Embroidered Lawn #03',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Samia Faruq',
    location: 'Uttara Sector-7, Dhaka',
    rating: 5,
    date: '5 days ago',
    comment: 'Love the catalog filter by brand! Got both Morja Vol 7 and Roheenaz suits for my cousin’s wedding festivities. Super responsive on WhatsApp helpline.',
    productName: 'Morja Vol. 7 - Designer Lawn Outfit #05',
    verified: true
  }
];

export const LOOKBOOK_IMAGES = [
  {
    url: '/assets/Products/Roheenaz/637850564_1526645636128991_2845010814069378436_n.jpg',
    title: 'Roheenaz Haute Couture',
    subtitle: 'Signature terracotta embroidery on pure crisp lawn'
  },
  {
    url: '/assets/Products/Morja, by gulljee volume 7/576250577_1430406579086231_1266473648545594627_n.jpg',
    title: 'Morja Vol. 7 Edit',
    subtitle: 'Hand-embroidered luxury lawn for grand celebrations'
  },
  {
    url: '/assets/Products/Roheenaz/637744179_1526646106128944_7303331457700187441_n.jpg',
    title: 'Berry Crimson Bloom',
    subtitle: 'Dense resham florals with pure chiffon draping'
  },
  {
    url: '/assets/Products/Morja, by gulljee volume 7/576372613_1430406769086212_7668724769763923333_n.jpg',
    title: 'Gulljee Macro Needlework',
    subtitle: 'Close-up of intricate resham and zari craftsmanship'
  },
  {
    url: '/assets/Products/Roheenaz/628517246_1526646586128896_5678513834062661086_n.jpg',
    title: 'Royal Aubergine Silk',
    subtitle: 'Luxury evening couture with tilla borders'
  },
  {
    url: '/assets/Products/Morja, by gulljee volume 7/576680360_1430406945752861_8771579035782719322_n.jpg',
    title: 'Dupatta Draping Art',
    subtitle: 'Exquisite jacquard and chiffon drapes'
  },
  {
    url: '/assets/Products/Roheenaz/202609062026090620260906640297851_1526647096128845_5300613962650833340_n.jpg',
    title: 'Vintage Champagne Grandeur',
    subtitle: 'Multi-perspective bridal luxury lawn suite'
  },
  {
    url: '/assets/Products/Morja, by gulljee volume 7/576754659_1430406972419525_3748629922017711747_n.jpg',
    title: 'Signature Sapphire Silhouette',
    subtitle: 'Tailored luxury for modern elegance'
  }
];
