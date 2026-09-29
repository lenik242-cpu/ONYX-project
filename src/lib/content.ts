// Central asset + copy references. Real generated visuals live in /public/assets.

export const ASSETS = {
  heroVideo: '/assets/videos/hero.mp4',
  artist: '/assets/web/artist.jpeg',
  detail: '/assets/web/detail.jpeg',
  tattoos: [
    '/assets/web/tattoo-1.jpeg',
    '/assets/web/tattoo-2.jpeg',
    '/assets/web/tattoo-3.jpeg',
    '/assets/web/tattoo-4.jpeg',
    '/assets/web/tattoo-5.jpeg',
    '/assets/web/tattoo-6.jpeg',
    '/assets/web/tattoo-7.jpeg',
    '/assets/web/tattoo-8.jpeg'
  ]
};

export interface Piece {
  src: string;
  title: string;
  zone: string;
  index: string;
}

export const PORTFOLIO: Piece[] = [
  { src: ASSETS.tattoos[0], title: 'Portrait', zone: 'Avant-bras', index: '01' },
  { src: ASSETS.tattoos[1], title: 'Le Lion', zone: 'Épaule', index: '02' },
  { src: ASSETS.tattoos[2], title: "L'Œil", zone: 'Poignet', index: '03' },
  { src: ASSETS.tattoos[3], title: 'Rose noire', zone: 'Main', index: '04' },
  { src: ASSETS.tattoos[4], title: 'Étude anatomique', zone: 'Cuisse', index: '05' },
  { src: ASSETS.tattoos[5], title: 'Memento Mori', zone: 'Dos', index: '06' },
  { src: ASSETS.tattoos[6], title: 'Le Loup', zone: 'Mollet', index: '07' },
  { src: ASSETS.tattoos[7], title: 'La Statue', zone: 'Torse', index: '08' }
];

export const NAV_ITEMS = ['Accueil', 'Le Studio', 'Portfolio', 'Process', 'Contact'];

export const NAV_TARGETS: Record<string, string> = {
  Accueil: '#hero',
  'Le Studio': '#studio',
  Portfolio: '#portfolio',
  Process: '#process',
  Contact: '#contact'
};

export const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Consultation',
    body: "On se rencontre, on parle de votre projet, de son sens, de son emplacement. Rien n'est laissé au hasard."
  },
  {
    n: '02',
    title: 'Dessin sur-mesure',
    body: 'Chaque pièce est dessinée pour une seule peau. Un projet unique, jamais reproduit, pensé pour vos lignes.'
  },
  {
    n: '03',
    title: 'Séance(s)',
    body: 'Le réalisme demande du temps. Une ou plusieurs séances, dans le calme, pour graver la lumière et l’ombre.'
  },
  {
    n: '04',
    title: 'Suivi & cicatrisation',
    body: "Un accompagnement complet jusqu'à la cicatrisation, pour que l'œuvre traverse le temps intacte."
  }
];

export const INSTAGRAM_URL = 'https://instagram.com';
