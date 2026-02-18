import Link from 'next/link';

// 2c. Teknik Rendering: Static Site Generation (SSG)
// Data diambil sekali saat build time dari API Publik
async function getFeaturedProducts() {
  const res = await fetch('https://dummyjson.com/products/category/womens-bags?limit=2', {
    next: { revalidate: 3600 } // Mengambil data baru setiap 1 jam (opsional)
  });
  if (!res.ok) throw new Error('Gagal mengambil data');
  return res.json();
}

export default async function HomePage() {
  const data = await getFeaturedProducts();
  const featured = data.products;

  return (
    <div className="overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center bg-brand-light overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-pink-200 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-white text-brand-primary text-xs font-bold uppercase tracking-[0.3em] mb-6 shadow-sm">
                New Arrival 2026
              </span>
              <h1 className="text-7xl md:text-9xl font-black leading-[0.8] mb-8 tracking-tighter">
                KAMIYA <br />
                <span className="text-brand-primary italic font-light">STUFF.</span>
              </h1>
              <p className="text-xl text-gray-500 mb-10 max-w-sm leading-relaxed">
                Koleksi tas eksklusif yang dikurasi dari data global untuk melengkapi gaya harianmu.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/catalog" className="bg-gray-900 text-white px-12 py-5 rounded-2xl font-bold hover:bg-brand-primary transition-all shadow-2xl">
                  Buka Katalog
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src={featured[0]?.thumbnail || "https://images.unsplash.com/photo-1590744040409-54848a655297?auto=format&fit=crop&q=80&w=800"} 
                className="w-full aspect-square object-cover rounded-[4rem] shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700"
                alt="Featured Bag"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED FROM API (SSG Implementation) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-black uppercase tracking-widest mb-4">Trending Now</h2>
          <p className="text-gray-400 italic">Produk ini dimuat menggunakan teknik SSG (Static Site Generation)</p>
        </div>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-4">
          {featured.map((item: any) => (
            <div key={item.id} className="relative group h-96 rounded-[3rem] overflow-hidden shadow-xl">
              <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10">
                <h4 className="text-white text-2xl font-bold">{item.title}</h4>
                <p className="text-brand-primary font-black mt-2">${item.price}</p>
                <Link href="/catalog" className="mt-4 text-white text-xs font-bold border-b border-white w-fit pb-1">LIHAT DETAIL</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VALUE PROPOSITION */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
            {[
              { icon: 'verified', title: 'Authentic API Data', desc: 'Produk disinkronkan langsung dari DummyJSON API.' },
              { icon: 'bolt', title: 'Fast Rendering', desc: 'Menggunakan Next.js App Router untuk performa maksimal.' },
              { icon: 'devices', title: 'Responsive UI', desc: 'Tampilan yang sempurna di semua ukuran perangkat.' }
            ].map((v, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="material-icons-outlined text-brand-primary text-4xl">{v.icon}</span>
                <div>
                  <h3 className="font-bold mb-2 uppercase text-sm tracking-widest">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}