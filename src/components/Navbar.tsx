"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Data produk harus sama dengan yang ada di Catalog agar bisa dicocokkan
const ALL_PRODUCTS = [
  { id: 1, name: 'Mochi Sling Bag - Nude', price: 'Rp 185.000', img: 'https://images.unsplash.com/photo-1548036239-165f946a3615?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Kyoto Tote Canvas', price: 'Rp 145.000', img: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Haru Backpack Mini', price: 'Rp 210.000', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' },
  { id: 4, name: 'Luna Shoulder Bag', price: 'Rp 195.000', img: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=600' },
  { id: 5, name: 'Yuki Puff Bag', price: 'Rp 160.000', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600' },
  { id: 6, name: 'Rin Satchel Bag', price: 'Rp 225.000', img: 'https://images.unsplash.com/photo-1590739225287-bd26514ca9ba?auto=format&fit=crop&q=80&w=600' }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);

  // Fungsi untuk mengambil data favorit dari localStorage
  const loadFavorites = () => {
    const savedIds = localStorage.getItem('kamiya_favs');
    if (savedIds) {
      const ids = JSON.parse(savedIds);
      // Filter produk dari daftar ALL_PRODUCTS berdasarkan ID yang ada di localStorage
      const filtered = ALL_PRODUCTS.filter(product => ids.includes(product.id));
      setFavoriteProducts(filtered);
    } else {
      setFavoriteProducts([]);
    }
  };

  // Load favorit saat komponen pertama kali muncul dan saat panel dibuka
  useEffect(() => {
    loadFavorites();
  }, [isCartOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="fixed w-full z-50 glass-effect border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* LOGO */}
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-black tracking-tighter text-gray-900 group-hover:text-brand-primary transition-colors">
                KAMIYA<span className="text-brand-primary">STUFF.</span>
              </span>
            </Link>

            {/* NAVIGASI DESKTOP */}
            <div className="hidden md:flex space-x-2 text-xs font-bold uppercase tracking-[0.2em]">
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

            {/* IKON FAVORIT */}
            <div className="flex items-center">
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
            </div>
          </div>
        </div>
      </nav>

      {/* SIDEBAR FAVORIT */}
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
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Item yang Anda sukai</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full hover:bg-brand-primary hover:text-white transition-all">
                <span className="material-icons-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {favoriteProducts.length === 0 ? (
                <div className="text-center py-24">
                  <span className="material-icons-outlined text-7xl text-gray-100 mb-6 italic">favorite_border</span>
                  <p className="text-gray-400 font-medium">Wah, wishlistmu masih kosong.</p>
                  <Link 
                    href="/catalog" 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 inline-block bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-brand-primary transition-all"
                  >
                    Cari Tas Favorit
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {favoriteProducts.map((item) => (
                    <div key={item.id} className="flex items-center gap-5 p-4 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-300">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1">{item.name}</h4>
                        <p className="text-brand-primary font-black text-sm">{item.price}</p>
                        <Link 
                          href="/catalog" 
                          onClick={() => setIsCartOpen(false)}
                          className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-2 inline-block hover:text-brand-primary"
                        >
                          Lihat Detail →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 text-sm italic">Total Item:</span>
                <span className="font-black text-xl text-gray-900">{favoriteProducts.length} Tas</span>
              </div>
              <Link 
                href="/catalog"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-brand-primary text-white py-5 rounded-2xl font-bold hover:brightness-110 transition-all shadow-xl shadow-pink-100 flex items-center justify-center gap-2"
              >
                Lanjutkan Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}