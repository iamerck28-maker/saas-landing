"use client";
import { useEffect, useRef, useState } from "react";

const WA = "https://wa.me/6285176718017?text=Halo%20LM%20Studio%2C%20saya%20ingin%20konsultasi";
const services = [
  { icon: "🖥️", title: "Landing Page", desc: "Halaman tunggal powerful untuk promosi. Dioptimasi untuk konversi.", tag: "7 hari kerja" },
  { icon: "🏢", title: "Company Profile", desc: "Website multi-halaman profesional — profil, layanan, kontak.", tag: "5-10 Halaman" },
  { icon: "🛒", title: "Toko Online", desc: "Jual produk lewat website. Katalog + order via WhatsApp.", tag: "Siap berjualan" },
  { icon: "💻", title: "Aplikasi Web Custom", desc: "Sistem khusus — manajemen data, laporan, integrasi API.", tag: "Sesuai kebutuhan" },
];
const processes = [
  { n: "01", t: "Konsultasi", d: "Ceritakan kebutuhan bisnis via WhatsApp. Gratis." },
  { n: "02", t: "Penawaran", d: "Kami kirim proposal & estimasi harga dalam 2x24 jam." },
  { n: "03", t: "Pengerjaan", d: "Tim kami mulai membangun web sesuai paket yang dipilih." },
  { n: "04", t: "Selesai", d: "Web jadi, domain & hosting aktif, bisa langsung pakai." },
];
const portfolios = [
  { name: "FirstCar", year: "2025", tag: "Marketplace", gradient: "from-blue-500 to-blue-700" },
  { name: "LokerMJL", year: "2026", tag: "Dashboard Admin", gradient: "from-indigo-500 to-indigo-700" },
  { name: "Sambal Jubleg", year: "2026", tag: "POS System", gradient: "from-red-500 to-orange-500" },
];
const pricing = [
  { name: "Starter", price: "Rp 2.000.000", pop: false, desc: "Kehadiran online pertama kali", f: ["Landing page 1 halaman", "Kontak & lokasi maps", "Mobile-friendly", "Domain .com (1 thn)", "Hosting (1 thn)", "7 hari kerja"] },
  { name: "Bisnis", price: "Rp 3.500.000", pop: true, desc: "Tampil lebih profesional", f: ["Company profile 5 halaman", "Katalog produk", "Form kontak & WA button", "Domain .com & .id (1 thn)", "Hosting (1 thn)", "14 hari kerja"] },
  { name: "Pro", price: "Rp 6.000.000", pop: false, desc: "Sistem lebih lengkap", f: ["Website 5-10 halaman", "Toko online / katalog", "Blog / artikel", "Domain by request (1 thn)", "Hosting (1 thn)", "Basic SEO", "21 hari kerja", "1 bulan free revisi"] },
];
const testi = [
  { name: "Hendra Gunawan", role: "Bengkel Hendra Motor · Majalengka", i: "HG", c: "#2563eb", t: "Sekarang banyak yang telepon dari Google. Worth it banget!" },
  { name: "Siti Rahmawati", role: "Katering Bu Siti · Cirebon", i: "SR", c: "#7c3aed", t: "Prosesnya cepet, hasilnya rapi. Bantu dari awal sampai jalan." },
  { name: "Dendi Kurniawan", role: "CV Maju Jaya · Kuningan", i: "DK", c: "#2563eb", t: "Company profile jadi lebih profesional. Tim responsif banget." },
  { name: "Yanti Suryani", role: "Toko Batik Yanti · Indramayu", i: "YS", c: "#7c3aed", t: "Bisa nerima order dari luar kota. Harganya terjangkau." },
];
const faqs = [
  { q: "Harga termasuk domain & hosting?", a: "Ya, semua paket termasuk domain & hosting 1 tahun." },
  { q: "Berapa lama pengerjaan?", a: "Starter 7 hari, Bisnis 14 hari, Pro 21 hari kerja." },
  { q: "Bisa request revisi?", a: "Bisa. Starter & Bisnis 2x revisi, Pro revisi minor gratis 1 bulan." },
  { q: "Sistem pembayaran?", a: "DP 50% di awal, pelunasan 50% setelah selesai." },
  { q: "Konsultasi dulu?", a: "Gratis! Konsultasi awal via WhatsApp." },
];

function useFadeIn(t = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: t }); o.observe(el); return () => o.disconnect(); }, [t]);
  return { ref, v };
}

function F({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, v } = useFadeIn();
  return <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms` }}>{children}</div>;
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [o, setO] = useState(false);
  return <div className="border-b border-white/5 last:border-0">
    <button onClick={() => setO(!o)} className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group">
      <span className="font-semibold text-base text-white group-hover:text-blue-400 transition-colors">{q}</span>
      <span className="text-gray-500 text-xl flex-shrink-0 transition-transform duration-300" style={{ transform: o ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
    </button>
    <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: o ? "200px" : "0" }}>
      <p className="text-gray-400 text-sm leading-relaxed pb-5 pr-8">{a}</p>
    </div>
  </div>;
}

export default function Home() {
  return <main className="bg-[#0a0a0f] text-white antialiased">
    {/* NAV */}
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <span className="text-xl font-bold text-blue-500">LM Studio</span>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#layanan" className="hover:text-white transition">Layanan</a>
          <a href="#proses" className="hover:text-white transition">Proses</a>
          <a href="#portofolio" className="hover:text-white transition">Portofolio</a>
          <a href="#harga" className="hover:text-white transition">Harga</a>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Konsultasi Gratis</a>
        </div>
      </div>
    </nav>

    {/* HERO */}
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        <F><div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2 mb-8"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /><span className="text-blue-300 text-sm font-medium">Layanan Web untuk UMKM Ciayumajakuning</span></div></F>
        <F delay={100}><h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 max-w-4xl">Automate Your Business<br/>with Modern Web</h1></F>
        <F delay={200}><p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">Kami bantu UMKM dan bisnis lokal punya website yang rapi, cepat, dan siap dipakai — tanpa ribet.</p></F>
        <F delay={300}><div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a href="#harga" className="px-8 py-4 bg-blue-600 text-white font-bold text-base rounded-lg hover:bg-blue-700 transition text-center">Lihat Paket</a>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-base rounded-lg hover:bg-white/10 transition text-center">Konsultasi via WhatsApp</a>
        </div></F>
        <F delay={400}><div className="flex items-center gap-8">
          <div className="text-center"><div className="font-bold text-2xl text-white">50+</div><div className="text-gray-500 text-sm">Followers</div></div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center"><div className="font-bold text-2xl text-white">10+</div><div className="text-gray-500 text-sm">Klien</div></div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center"><div className="font-bold text-2xl text-white">2024</div><div className="text-gray-500 text-sm">Berdiri</div></div>
        </div></F>
      </div>
    </section>

    {/* LAYANAN */}
    <section id="layanan" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Layanan</span></F>
          <F delay={50}><h2 className="text-4xl font-bold mt-3">Apa yang kami kerjakan</h2></F>
          <F delay={100}><p className="text-gray-500 mt-3 text-lg">Dari landing page sederhana sampai sistem web kompleks.</p></F>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => <F key={s.title} delay={i * 100}>
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300 group h-full">
              <div className="text-3xl mb-5">{s.icon}</div>
              <h3 className="font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{s.tag}</span>
            </div>
          </F>)}
        </div>
      </div>
    </section>

    {/* PROSES */}
    <section id="proses" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Proses Kerja</span></F>
          <F delay={50}><h2 className="text-4xl font-bold mt-3">Cara kami bekerja</h2></F>
          <F delay={100}><p className="text-gray-500 mt-3 text-lg">Simpel dan transparan.</p></F>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {processes.map((p, i) => <F key={p.n} delay={i * 100}>
            <div className="text-center p-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold mx-auto mb-5 ${i === 3 ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white' : 'bg-blue-500/10 text-blue-400'}`}>{p.n}</div>
              <h3 className="font-bold text-lg mb-2">{p.t}</h3>
              <p className="text-gray-400 text-sm">{p.d}</p>
            </div>
          </F>)}
        </div>
      </div>
    </section>

    {/* PORTFOLIO */}
    <section id="portofolio" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Portfolio</span></F>
          <F delay={50}><h2 className="text-4xl font-bold mt-3">Project yang kami kerjakan</h2></F>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {portfolios.map((p, i) => <F key={p.name} delay={i * 100}>
            <div className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 transition-all duration-300 group">
              <div className={`h-48 bg-gradient-to-br ${p.gradient} flex items-center justify-center relative`}>
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full text-white">{p.year}</div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{p.tag}</span>
              </div>
            </div>
          </F>)}
        </div>
      </div>
    </section>

    {/* HARGA */}
    <section id="harga" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Harga</span></F>
          <F delay={50}><h2 className="text-4xl font-bold mt-3">Pilih Paket</h2></F>
          <F delay={100}><p className="text-gray-500 mt-3 text-lg">Transparan, tanpa biaya tersembunyi</p></F>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {pricing.map((p, i) => <F key={p.name} delay={i * 100}>
            <div className={`p-8 rounded-2xl border transition-all duration-300 ${p.pop ? 'bg-gradient-to-b from-blue-600 to-blue-800 border-blue-400/30 shadow-2xl shadow-blue-600/20 scale-[1.02]' : 'bg-white/[0.02] border-white/[0.06] hover:border-blue-500/30'}`}>
              {p.pop && <div className="text-xs font-bold text-white bg-emerald-500 px-3 py-1 rounded-full inline-block mb-4">Terpopuler</div>}
              <h3 className="font-bold text-xl mb-2">{p.name}</h3>
              <div className={`text-3xl font-extrabold mb-1 ${p.pop ? 'text-white' : 'text-blue-400'}`}>{p.price}</div>
              <p className="text-gray-500 text-sm mb-6">{p.desc}</p>
              <ul className="space-y-3 text-sm mb-8">
                {p.f.map((f) => <li key={f} className="flex items-center gap-2"><span className={p.pop ? "text-emerald-300" : "text-emerald-400"}>✓</span><span className="text-gray-300">{f}</span></li>)}
              </ul>
              <a href={`${WA}%20${p.name}`} target="_blank" rel="noopener noreferrer" className={`block text-center py-3 font-semibold rounded-lg transition ${p.pop ? 'bg-white text-blue-700 hover:shadow-xl' : 'border border-white/10 text-white hover:bg-white/5'}`}>Pesan Sekarang</a>
            </div>
          </F>)}
        </div>
        <F delay={300}><div className="mt-6 p-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center">
          <h3 className="font-bold text-lg mb-2">Aplikasi Web Custom</h3>
          <p className="text-gray-400 text-sm mb-1">Mulai Rp 5.000.000</p>
          <p className="text-gray-500 text-sm mb-4">Butuh sistem khusus? Diskusi dulu — scope & harga menyesuaikan.</p>
          <a href={`${WA}%20aplikasi%20web%20custom`} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Diskusi via WhatsApp</a>
        </div></F>
      </div>
    </section>

    {/* TESTIMONI */}
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Testimoni</span></F>
          <F delay={50}><h2 className="text-4xl font-bold mt-3">Kata mereka yang sudah percaya</h2></F>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testi.map((t, i) => <F key={t.name} delay={i * 100}>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/20 transition-all duration-300">
              <div className="text-amber-400 text-sm mb-3">★★★★★</div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">"{t.t}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ backgroundColor: t.c + "30", color: t.c }}>{t.i}</div>
                <div><div className="font-semibold text-sm">{t.name}</div><div className="text-gray-500 text-xs">{t.role}</div></div>
              </div>
            </div>
          </F>)}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">FAQ</span></F>
          <F delay={50}><h2 className="text-4xl font-bold mt-3">Pertanyaan yang Sering Ditanyakan</h2></F>
        </div>
        <F delay={100}><div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
          {faqs.map((f) => <FAQ key={f.q} q={f.q} a={f.a} />)}
        </div></F>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <F><h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Siap Punya Website Profesional?</h2></F>
        <F delay={100}><p className="text-white/70 text-lg mb-8">Konsultasi gratis — ceritakan kebutuhan bisnismu.</p></F>
        <F delay={200}><a href={WA} target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-white text-blue-700 font-bold rounded-lg text-lg hover:shadow-2xl hover:shadow-white/20 transition">Mulai Sekarang via WhatsApp</a></F>
      </div>
    </section>

    {/* FOOTER */}
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xl font-bold text-blue-500">LM Studio</span>
          <p className="text-sm text-gray-500 mt-1">Bagian dari ekosistem lokermjl.com</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href="https://instagram.com/lokermjl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a>
          <a href="https://lokermjl.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">lokermjl.com</a>
        </div>
        <div className="text-xs text-gray-600">© 2026 LM Studio. All rights reserved.</div>
      </div>
    </footer>
  </main>;
}
