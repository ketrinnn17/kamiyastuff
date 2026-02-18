"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false); // Sidebar Wishlist
  const [isNavOpen, setIsNavOpen] = useState(false);   // Menu Mobile (Hamburger)
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);

  // 1. Fungsi Load Favorit yang sinkron dengan API
  const loadFavorites = async () => {
    const savedIds = localStorage.getItem('kamiya_favs');
    if (savedIds) {
      const ids = JSON.parse(savedIds);
      
      try {
        // Kita ambil data dari API yang sama dengan Catalog
        const res = await fetch('https://dummyjson.com/products/category/womens-bags');
        const data = await res.json();
        
        // Filter produk API berdasarkan ID yang ada di localStorage
        const filtered = data.products.filter((product: any) => ids.includes(product.id));
        setFavoriteProducts(filtered);
      } catch (error) {
        console.error("Gagal sinkronisasi wishlist:", error);
      }
    } else {
      setFavoriteProducts([]);
    }
  };

  // Load favorit setiap kali sidebar dibuka atau ada perubahan
  useEffect(() => {
    loadFavorites();
  }, [isCartOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="fixed w-full z-[80] bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* LOGO */}
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-black tracking-tighter text-gray-900 group-hover:text-brand-primary transition-colors uppercase">
                KAMIYA<span className="text-brand-primary italic font-light">STUFF.</span>
              </span>
            </Link>

            {/* NAVIGASI DESKTOP */}
            <div className="hidden md:flex space-x-2 text-[10px] font-black uppercase tracking-[0.2em]">
              {['/', '/catalog', '/about'].map((path) => (
                <Link
                  key={path}
                  href={path}
                  className={`relative px-8 py-2.5 transition-all duration-500 rounded-full ${
                    isActive(path) ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {isActive(path) && (
                    <span className="absolute inset-0 bg-brand-primary rounded-full -z-10 shadow-lg shadow-pink-200 animate-fade-in"></span>
                  )}
                  {path === '/' ? 'Home' : path.replace('/', '')}
                </Link>
              ))}
            </div>

            {/* IKON KANAN (WISHLIST & HAMBURGER) */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-3 text-gray-600 hover:text-brand-primary transition relative bg-gray-50 rounded-full"
              >
                <span className="material-icons-outlined">favorite</span>
                {favoriteProducts.length > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-brand-primary text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold animate-bounce">
                    {favoriteProducts.length}
                  </span>
                )}
              </button>

              {/* Tombol Hamburger Mobile */}
              <button 
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="md:hidden p-3 text-gray-900 bg-gray-50 rounded-full"
              >
                <span className="material-icons-outlined">{isNavOpen ? 'close' : 'menu'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* DROPDOWN MENU MOBILE */}
        <div className={`md:hidden bg-white border-b transition-all duration-300 overflow-hidden ${isNavOpen ? 'max-h-64' : 'max-h-0'}`}>
            <div className="flex flex-col p-6 gap-4 font-black uppercase text-xs tracking-widest">
                <Link href="/" onClick={() => setIsNavOpen(false)} className={isActive('/') ? 'text-brand-primary' : ''}>Home</Link>
                <Link href="/catalog" onClick={() => setIsNavOpen(false)} className={isActive('/catalog') ? 'text-brand-primary' : ''}>Catalog</Link>
                <Link href="/about" onClick={() => setIsNavOpen(false)} className={isActive('/about') ? 'text-brand-primary' : ''}>About</Link>
            </div>
        </div>
      </nav>

      {/* SIDEBAR WISHLIST (Sama seperti codingan kamu, tapi datanya dari API) */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isCartOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsCartOpen(false)}
        ></div>
        
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black tracking-tighter">WISHLIST</h2>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Item favorit Anda (API Data)</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full hover:bg-brand-primary hover:text-white transition-all">
                <span className="material-icons-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              {favoriteProducts.length === 0 ? (
                <div className="text-center py-24">
                  <span className="material-icons-outlined text-7xl text-gray-100 mb-6 italic">favorite_border</span>
                  <p className="text-gray-400 text-sm">Wishlistmu kosong.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {favoriteProducts.map((item) => (
                    <div key={item.id} className="flex items-center gap-5 p-4 bg-gray-50 rounded-[2rem] border border-gray-100 group">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm">
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm leading-tight truncate">{item.title}</h4>
                        <p className="text-brand-primary font-black text-sm">${item.price}</p>
                        <Link href="/catalog" onClick={() => setIsCartOpen(false)} className="text-[10px] uppercase font-bold text-gray-400 mt-2 inline-block">Detail →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100">
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold hover:bg-brand-primary transition-all shadow-xl"
              >
                Kembali Belanja
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
