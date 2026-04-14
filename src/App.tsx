import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, X, ArrowLeft, Menu, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { PRODUCTS, CATEGORY_IMAGES } from './constants';
import { Category, Product } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [view, setView] = useState<'landing' | 'shop'>('landing');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts = PRODUCTS.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center gap-4">
          {view === 'shop' && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                setView('landing');
                setSelectedCategory(null);
              }}
              className="hover:bg-secondary"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <h1 className="text-xl font-serif font-semibold tracking-widest uppercase">
            Fez <span className="text-primary">Artisanal</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Heritage</a>
            <a href="#" className="hover:text-primary transition-colors">Atelier</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {cart.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="font-serif text-2xl">Votre Panier</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-200px)] py-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                    <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                    <p>Votre panier est vide</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item, idx) => (
                      <div key={`${item.id}-${idx}`} className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.price} €</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(idx)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between text-lg font-serif">
                  <span>Total</span>
                  <span>{total} €</span>
                </div>
                <Button className="w-full py-6 text-lg font-serif tracking-widest uppercase" disabled={cart.length === 0}>
                  Passer à la caisse
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <main className="pt-16 relative">
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div 
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden p-[60px] gap-[40px]"
            >
              {/* Intro Text Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[300px] pointer-events-none z-[30]">
                <p className="font-serif text-lg italic leading-relaxed text-foreground mb-5">
                  A legacy of hands, fire, and sun. Choose your mastercraft.
                </p>
                <div className="w-1 h-1 bg-primary rounded-full mx-auto mb-2.5" />
                <div className="h-[60px] w-px bg-foreground/30 mx-auto" />
              </div>

              {/* Leather Section */}
              <motion.div 
                className="relative flex-1 group cursor-pointer overflow-hidden rounded-sm"
                onClick={() => {
                  setSelectedCategory('cuir');
                  setView('shop');
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10" />
                <div className="pattern-overlay z-20" />
                <div className="leather-texture z-20" />
                <img 
                  src={CATEGORY_IMAGES.cuir} 
                  alt="Le Cuir" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 z-20 flex flex-col items-start justify-end p-10 text-white">
                  <motion.span 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[12px] font-medium uppercase tracking-[3px] mb-2 opacity-90"
                  >
                    The Tanneries of Chouara
                  </motion.span>
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[48px] font-serif italic z-20"
                  >
                    Le Cuir
                  </motion.h2>
                  <div className="absolute bottom-10 right-10 w-[50px] h-px bg-white z-20 after:content-[''] after:absolute after:right-0 after:top-[-4px] after:w-2 after:h-2 after:border-r after:border-t after:border-white after:rotate-45" />
                </div>
              </motion.div>

              {/* Copper Section */}
              <motion.div 
                className="relative flex-1 group cursor-pointer overflow-hidden rounded-sm"
                onClick={() => {
                  setSelectedCategory('cuivre');
                  setView('shop');
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10" />
                <div className="pattern-overlay z-20" />
                <div className="leather-texture z-20" style={{ background: 'radial-gradient(circle at 70% 40%, rgba(184,115,51,0.2) 0%, transparent 60%)' }} />
                <img 
                  src={CATEGORY_IMAGES.cuivre} 
                  alt="Le Cuivre" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 z-20 flex flex-col items-start justify-end p-10 text-white">
                  <motion.span 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[12px] font-medium uppercase tracking-[3px] mb-2 opacity-90"
                  >
                    Hammered by Hand
                  </motion.span>
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-[48px] font-serif italic z-20"
                  >
                    Le Cuivre
                  </motion.h2>
                  <div className="absolute bottom-10 right-10 w-[50px] h-px bg-white z-20 after:content-[''] after:absolute after:right-0 after:top-[-4px] after:w-2 after:h-2 after:border-r after:border-t after:border-white after:rotate-45" />
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="shop"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-6 py-12"
            >
              <header className="mb-16 text-center">
                <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary uppercase tracking-widest text-[10px]">
                  Collection {selectedCategory === 'cuir' ? 'Cuir' : 'Cuivre'}
                </Badge>
                <h2 className="text-4xl md:text-6xl font-serif italic mb-6">
                  {selectedCategory === 'cuir' ? 'L\'Héritage du Cuir' : 'L\'Art du Cuivre'}
                </h2>
                <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
                  Chaque pièce est une œuvre unique, façonnée à la main par nos maîtres artisans dans les ruelles ancestrales de la médina de Fès.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card 
                      className="group border-none bg-transparent cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                          <Button 
                            className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                          >
                            Ajouter au panier
                          </Button>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-serif mb-1">{product.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                          </div>
                          <span className="text-lg font-serif">{product.price} €</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setSelectedProduct(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 z-10 rounded-full bg-background/50 backdrop-blur-md"
                onClick={() => setSelectedProduct(null)}
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="flex-1 h-64 md:h-auto overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                <Badge variant="outline" className="mb-6 uppercase tracking-widest text-[10px]">
                  Artisanat de Fès
                </Badge>
                <h2 className="text-4xl md:text-5xl font-serif italic mb-4">{selectedProduct.name}</h2>
                <p className="text-2xl font-serif mb-8 text-primary">{selectedProduct.price} €</p>
                
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {selectedProduct.description}
                </p>

                <Separator className="mb-8" />

                <div className="space-y-4 mb-12">
                  <h4 className="text-xs font-bold uppercase tracking-widest">Détails de l'Atelier</h4>
                  <ul className="space-y-2">
                    {selectedProduct.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full py-8 text-lg font-serif tracking-widest uppercase rounded-xl"
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  Ajouter au Panier
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-secondary mt-24 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif italic mb-6">Fez Artisanal</h2>
            <p className="text-muted-foreground max-w-md leading-relaxed mb-8">
              Préserver l'excellence du savoir-faire marocain à travers des créations intemporelles, façonnées avec passion et précision.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full border border-border">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full border border-border">
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Collections</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Le Cuir de Fès</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Le Cuivre Martelé</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Éditions Limitées</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sur Mesure</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">L'Atelier</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Notre Histoire</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Les Artisans</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Livraison Monde</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Fez Medina, Morocco — Est. 1924</span>
          <span>Secure Checkout • Global Atelier Shipping</span>
          <span>Follow the Craft — @MaisonDeFez</span>
        </div>
      </footer>
    </div>
  );
}
