import Link from 'next/link';

// 2a. Teknik Rendering: Server-Side Rendering (SSR)
// 'force-dynamic' memberitahu Next.js untuk merender halaman di server setiap kali diakses
export const dynamic = 'force-dynamic';

async function getReviews() {
  // 3a. Mengambil data dari API publik (DummyJSON - Data User untuk Review)
  const res = await fetch('https://dummyjson.com/users?limit=3', {
    cache: 'no-store' // Syarat wajib SSR: Memastikan data tidak di-cache
  });
  if (!res.ok) throw new Error('Gagal memuat data review');
  return res.json();
}

export default async function AboutPage() {
  // Memanggil data di sisi server
  const data = await getReviews();
  const reviews = data.users;

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      {/* Bagian Atas - Tetap dengan desain KamiyaStuff */}
      <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
        <div className="animate-fade-in">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Our Story</span>
          <h2 className="text-6xl font-black mb-8 tracking-tighter leading-tight text-gray-900">
            KAMIYA <br /><span className="text-brand-primary italic font-light">Adalah Ceritamu.</span>
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed text-lg">
            Berawal dari kecintaan terhadap fashion, KamiyaStuff kini menggunakan teknologi terbaru untuk menghadirkan tas berkualitas. Website ini mengimplementasikan Server-Side Rendering untuk memastikan data yang Anda lihat selalu terbaru.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-pink-50 rounded-3xl border border-pink-100">
              <h4 className="font-black text-2xl text-brand-primary italic">SSR</h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Rendering Technique</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-3xl">
              <h4 className="font-black text-2xl text-white italic">API</h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Real-time Data</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000" 
            alt="KamiyaStuff Studio" 
            className="w-full h-[450px] object-cover rounded-[3rem] shadow-2xl"
          />
        </div>
      </div>

      {/* 3b. Menampilkan data dinamis dari API secara dinamis dalam antarmuka (SSR Section) */}
      <section className="bg-gray-50 rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-black uppercase tracking-widest">Global Customer Reviews</h3>
          <p className="text-gray-400 mt-2 italic text-sm">Data di bawah diambil secara Real-time dari API (Teknik SSR)</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((user: any) => (
            <div key={user.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <img src={user.image} className="w-12 h-12 bg-pink-100 rounded-full" alt={user.firstName} />
                <div>
                  <h5 className="font-bold text-gray-900">{user.firstName} {user.lastName}</h5>
                  <p className="text-[10px] text-brand-primary uppercase font-black">Verified Buyer</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed italic">
                "Kualitas tas KamiyaStuff luar biasa. Proses pemesanan melalui sistem API-nya sangat cepat dan responsif!"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Peta Lokasi (Sesuai keinginan sebelumnya) */}
      <div className="mt-24 text-center">
        <h3 className="text-2xl font-black uppercase mb-8 tracking-widest">Find Us</h3>
        <div className="w-full h-[400px] rounded-[3rem] overflow-hidden shadow-inner border-8 border-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.251257159819!2d108.18934497357027!3d-7.21215277080634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f4f88ee1ce121%3A0x486705d245577662!2skamiya!5e0!3m2!1sen!2sid!4v1771380275902!5m2!1sen!2sid" 
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy"
            className="grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </div>
      </div>
    </div>
  );
}