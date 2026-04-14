import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'leather-bag-1',
    name: 'The Medina Tote',
    category: 'cuir',
    price: 280,
    description: 'Hand-stitched in the heart of Fez, this tote uses centuries-old vegetable tanning techniques.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    details: ['100% Full-grain leather', 'Hand-burnished edges', 'Solid brass hardware']
  },
  {
    id: 'leather-pouf-1',
    name: 'Artisan Floor Pouf',
    category: 'cuir',
    price: 150,
    description: 'A classic Moroccan silhouette, hand-embroidered with traditional silk thread.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000&auto=format&fit=crop',
    details: ['Natural vegetable dye', 'Intricate hand-embroidery', 'Durable goat leather']
  },
  {
    id: 'copper-lamp-1',
    name: 'Starry Night Lantern',
    category: 'cuivre',
    price: 320,
    description: 'Hand-pierced copper lantern that casts intricate geometric shadows across any room.',
    image: 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?q=80&w=1000&auto=format&fit=crop',
    details: ['Solid hand-hammered copper', 'Intricate geometric patterns', 'Antique patina finish']
  },
  {
    id: 'copper-tray-1',
    name: 'Royal Tea Service',
    category: 'cuivre',
    price: 190,
    description: 'A masterpiece of metalwork, featuring hand-engraved arabesque motifs.',
    image: 'https://images.unsplash.com/photo-1578912853046-082179bc853b?q=80&w=1000&auto=format&fit=crop',
    details: ['Hand-engraved motifs', 'Polished copper finish', 'Traditional Fez design']
  }
];

export const CATEGORY_IMAGES = {
  cuir: 'https://images.unsplash.com/photo-1524383537042-58f6af275b1d?q=80&w=1200&auto=format&fit=crop',
  cuivre: 'https://images.unsplash.com/photo-1590540179852-211d6b45e630?q=80&w=1200&auto=format&fit=crop'
};
