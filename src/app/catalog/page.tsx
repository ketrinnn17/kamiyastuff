"use client";
import { useState, useEffect, useMemo } from 'react';

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/category/womens-bags');
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    const saved = localStorage.getItem('kamiya_favs');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const newFavs = favorites.includes(id) 
      ? favorites.filter(favId => favId !== id) 
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('kamiya_favs', JSON.stringify(newFavs));
  };

  const filtered = useMemo(() => {
    return products.filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-pink-100 border-t-brand-primary rounded-full animate-spin mb-4"></div>
        <p className="text-brand-primary font-black tracking-widest animate-pulse uppercase text-xs">Loading Kamiya...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-2 text-gray-900">Katalog Tas</h2>
          <p className="text-gray-400 italic text-sm font-medium">Temukan koleksi eksklusif KamiyaStuff.</p>
        </div>
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Cari sling bag, tote bag..." 
            className="w-full px-8 py-4 rounded-3xl border border-gray-100 focus:border-brand-primary outline-none transition-all shadow-sm bg-gray-50/50"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map(product => (
          <div 
            key={product.id} 
            onClick={() => setSelectedProduct(product)}
            className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50"
          >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <button 
                onClick={(e) => toggleFavorite(e, product.id)}
                className="absolute top-5 right-5 w-12 h-12 rounded-full glass-effect flex items-center justify-center text-brand-primary shadow-lg border border-white/40 hover:scale-110 transition"
              >
                <span className="material-icons-outlined text-xl">
                  {favorites.includes(product.id) ? 'favorite' : 'favorite_border'}
                </span>
              </button>
            </div>
            <div className="p-8 text-center">
              <span className="text-brand-primary font-black text-[10px] uppercase tracking-[0.3em] mb-3 block opacity-60">{product.brand || 'KamiyaStuff'}</span>
              <h3 className="font-bold text-xl mb-2 text-gray-900 truncate tracking-tight">{product.title}</h3>
              <p className="text-gray-900 font-black text-lg tracking-tighter">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail dengan Banyak Marketplaces */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl animate-fade-in flex flex-col md:flex-row max-h-[90vh]">
            
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-lg border border-white/20">
              <span className="material-icons-outlined">close</span>
            </button>

            <div className="md:w-1/2 h-80 md:h-auto overflow-hidden bg-gray-50 flex items-center justify-center">
              <img src={selectedProduct.images[0]} className="w-full h-full object-cover" alt={selectedProduct.title} />
            </div>

            <div className="md:w-1/2 p-8 md:p-14 overflow-y-auto bg-white">
              <div className="mb-8">
                <h2 className="text-4xl font-black mb-4 tracking-tighter text-gray-900 leading-tight">{selectedProduct.title}</h2>
                <div className="flex items-center gap-4">
                    <p className="text-3xl font-light text-brand-primary">${selectedProduct.price}</p>
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase">Ready Stock</span>
                </div>
              </div>

              <div className="mb-10 p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                <h4 className="font-bold text-xs uppercase mb-3 text-gray-400 tracking-widest flex items-center gap-2">
                    <span className="material-icons-outlined text-sm">description</span> Product Info
                </h4>
                <p className="text-gray-600 leading-relaxed text-md">{selectedProduct.description}</p>
              </div>

              {/* MARKETPLACE LINKS GRID */}
              <div>
                <h4 className="font-bold text-xs uppercase mb-6 text-gray-900 tracking-widest text-center">Available On Marketplaces</h4>
                <div className="grid grid-cols-2 gap-4">
                    {/* WhatsApp */}
                    <a href={`https://wa.me/628987035252?text=Halo%20KamiyaStuff,%20saya%20mau%20tanya%20produk%20${encodeURIComponent(selectedProduct.title)}`} 
        target="_blank" className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-2xl border border-green-100 hover:scale-105 transition-transform group">
                        <span className="material-icons-outlined text-green-500 mb-1">chat</span>
                        <span className="text-[10px] font-bold text-green-700">WhatsApp</span>
                    </a>
                    {/* Shopee */}
                    <a href={`https://shopee.co.id/search?keyword=${encodeURIComponent(selectedProduct.title)}`} 
        target="_blank" className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-2xl border border-orange-100 hover:scale-105 transition-transform">
                        <span className="text-orange-600 font-black text-sm mb-1 italic">S</span>
                        <span className="text-[10px] font-bold text-orange-700">Shopee</span>
                    </a>
                    {/* Tokopedia */}
                    <a href={`https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(selectedProduct.title)}`} 
        target="_blank" className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-2xl border border-green-100 hover:scale-105 transition-transform">
                        <span className="text-green-600 font-black text-sm mb-1 italic">T</span>
                        <span className="text-[10px] font-bold text-green-700">Tokopedia</span>
                    </a>
                    {/* TikTok Shop */}
                    <a href={`https://www.tiktok.com/search?q=${encodeURIComponent(selectedProduct.title)}`} 
        target="_blank" className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:scale-105 transition-transform">
                        <span className="material-icons-outlined text-gray-900 mb-1">music_note</span>
                        <span className="text-[10px] font-bold text-gray-900">TikTok Shop</span>
                    </a>
                </div>
                
                <button className="w-full mt-8 bg-gray-900 text-white py-5 rounded-3xl font-bold uppercase tracking-widest text-xs hover:bg-brand-primary transition-all shadow-xl shadow-pink-100">
                    Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}