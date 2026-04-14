export type Category = 'cuir' | 'cuivre';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  details: string[];
}
