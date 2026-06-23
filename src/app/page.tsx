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
  { name: "FirstCar", year: "2025", tag: "Marketplace", img: "/firstcar-cover.jpg" },
  { name: "LokerMJL", year: "2026", tag: "Dashboard Admin", img: "/lokermjl-cover.jpg" },
  { name: "Sambal Jubleg", year: "2026", tag: "POS System", img: "/Sambal-jubleg.png" },
];
const pricing = [
  { name: "Starter", price: "Rp 2.000.000", pop: false, desc: "Kehadiran online pertama kali", f: ["Landing page 1 halaman", "Kontak & lokasi maps", "Mobile-friendly", "Domain .com (1 thn)", "Hosting (1 thn)", "7 hari kerja"] },
  { name: "Bisnis", price: "Rp 3.500.000", pop: true, desc: "Tampil lebih profesional", f: ["Company profile 5 halaman", "Katalog produk", "Form kontak & WA button", "Domain .com & .id (1 thn)", "Hosting (1 thn)", "14 hari kerja"] },
  { name: "Pro", price: "Rp 6.000.000", pop: false, desc: "Sistem lebih lengkap", f: ["Website 5-10 halaman", "Toko online / katalog", "Blog / artikel", "Domain by request (1 thn)", "Hosting (1 thn)", "Basic SEO", "21 hari kerja", "1 bulan free revisi"] },
];
const testi = [
  { name: "Hendra Gunawan", role: "Bengkel Hendra Motor · Majalengka", i: "HG", c: "#0057FF", t: "Sekarang banyak yang telepon dari Google. Worth it banget!" },
  { name: "Siti Rahmawati", role: "Katering Bu Siti · Cirebon", i: "SR", c: "#7C3AED", t: "Prosesnya cepet, hasilnya rapi. Bantu dari awal sampai jalan." },
  { name: "Dendi Kurniawan", role: "CV Maju Jaya · Kuningan", i: "DK", c: "#0057FF", t: "Company profile jadi lebih profesional. Tim responsif banget." },
  { name: "Yanti Suryani", role: "Toko Batik Yanti · Indramayu", i: "YS", c: "#7C3AED", t: "Bisa nerima order dari luar kota. Harganya terjangkau." },
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
  return <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms` }}>{children}</div>;
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [o, setO] = useState(false);
  return <div className="border-b border-gray-100 last:border-0">
    <button onClick={() => setO(!o)} className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group">
      <span className="font-semibold text-base text-gray-900 group-hover:text-[#0057FF] transition-colors">{q}</span>
      <span className="text-gray-400 text-xl flex-shrink-0 transition-transform duration-300" style={{ transform: o ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
    </button>
    <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: o ? "200px" : "0" }}>
      <p className="text-gray-500 text-sm leading-relaxed pb-5 pr-8">{a}</p>
    </div>
  </div>;
}

export default function Home() {
  return <main className="antialiased">
    {/* NAV */}
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <span className="text-xl font-bold" style={{ color: "#0057FF" }}>LM Studio</span>
        <div className="hidden md:flex items-center gap-8">
          <a href="#layanan" className="text-sm font-medium text-gray-600 hover:text-[#0057FF]">Layanan</a>
          <a href="#proses" className="text-sm font-medium text-gray-600 hover:text-[#0057FF]">Proses</a>
          <a href="#portofolio" className="text-sm font-medium text-gray-600 hover:text-[#0057FF]">Portofolio</a>
          <a href="#paket" className="text-sm font-medium text-gray-600 hover:text-[#0057FF]">Harga</a>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#0057FF] text-white hover:bg-[#0045CC]">Konsultasi Gratis</a>
        </div>
      </div>
    </nav>

    {/* HERO */}
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100svh", background: "linear-gradient(135deg, #003DB8 0%, #0057FF 40%, #7C3AED 100%)" }}>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl bg-white pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-15 blur-3xl bg-[#A78BFA] pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-5 pt-28 pb-20 text-center">
        <F><div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 mb-8"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /><span className="text-white/90 text-sm font-medium">Layanan Web untuk UMKM Ciayumajakuning</span></div></F>
        <F delay={100}><h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">Automate Your Business<br/>with Modern Web</h1></F>
        <F delay={200}><p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">Kami bantu UMKM dan bisnis lokal punya website yang rapi, cepat, dan siap dipakai — tanpa ribet.</p></F>
        <F delay={300}><div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#paket" className="px-8 py-4 bg-white font-bold text-base rounded-xl hover:bg-white/90 hover:shadow-xl transition-all" style={{ color: "#0057FF" }}>Lihat Paket</a>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/15 border-2 border-white/50 text-white font-bold text-base rounded-xl hover:bg-white/25 hover:border-white transition-all">Konsultasi via WhatsApp</a>
        </div></F>
        <F delay={400}><div className="flex items-center justify-center gap-8">
          <div className="text-center"><div className="font-bold text-2xl text-white">50+</div><div className="text-white/60 text-sm">Followers</div></div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center"><div className="font-bold text-2xl text-white">10+</div><div className="text-white/60 text-sm">Klien</div></div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center"><div className="font-bold text-2xl text-white">2024</div><div className="text-white/60 text-sm">Berdiri</div></div>
        </div></F>
      </div>
    </section>

    {/* LAYANAN */}
    <section id="layanan" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <F className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: "#EBF1FF", color: "#0057FF" }}>Layanan</span>
          <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">Apa yang kami kerjakan</h2>
          <p className="text-gray-500 text-base max-w-md mx-auto">Dari landing page sederhana sampai sistem web kompleks.</p>
        </F>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => <F key={i} delay={i * 100}>
            <div className="group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#EBF1FF", color: "#0057FF" }}>{s.tag}</span>
            </div>
          </F>)}
        </div>
      </div>
    </section>

    {/* PROSES */}
    <section id="proses" className="py-20" style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #EEF2FF 100%)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <F className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: "#EBF1FF", color: "#0057FF" }}>Proses Kerja</span>
          <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">Cara kami bekerja</h2>
          <p className="text-gray-500 text-base max-w-sm mx-auto">Simpel dan transparan.</p>
        </F>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {processes.map((p, i) => <F key={i} delay={i * 120} className="flex flex-col items-center relative">
            <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-0.5 z-0" style={{ background: "linear-gradient(90deg, #0057FF40, #7C3AED40)" }} />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 shadow-lg" style={{ background: "linear-gradient(135deg, #0057FF, #7C3AED)" }}>
                <span className="text-white text-2xl font-bold">{p.n}</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{p.t}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">{p.d}</p>
            </div>
          </F>)}
        </div>
      </div>
    </section>

    {/* PORTFOLIO */}
    <section id="portofolio" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <F className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: "#EBF1FF", color: "#0057FF" }}>Portfolio</span>
          <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">Project yang kami kerjakan</h2>
        </F>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((p, i) => <F key={i} delay={i * 100}>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-base text-gray-900">{p.name}</h3>
                  <span className="text-xs text-gray-400">{p.year}</span>
                </div>
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#EBF1FF", color: "#0057FF" }}>{p.tag}</span>
              </div>
            </div>
          </F>)}
        </div>
      </div>
    </section>

    {/* PRICING */}
    <section id="paket" className="py-20" style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #EEF2FF 100%)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <F className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: "#EBF1FF", color: "#0057FF" }}>Harga</span>
          <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-3">Pilih Paket</h2>
          <p className="text-gray-400 text-base">Transparan, tanpa biaya tersembunyi</p>
        </F>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {pricing.map((p, i) => <F key={i} delay={i * 100}>
            <div className={`relative flex flex-col rounded-2xl transition-all duration-300 h-full ${p.pop ? "border-2 border-[#0057FF] bg-gradient-to-b from-[#EBF1FF] to-white shadow-lg" : "border border-gray-200 bg-white shadow-sm"}`}>
              {p.pop && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap" style={{ background: "linear-gradient(90deg, #0057FF, #7C3AED)" }}>Terpopuler</div>}
              <div className="p-7 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{p.name}</h3>
                <div className="font-bold text-2xl mb-2" style={{ color: "#0057FF" }}>{p.price}</div>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed min-h-[42px]">{p.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.f.map((f, j) => <li key={j} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs" style={{ background: "#EBF1FF", color: "#0057FF" }}>✓</span>
                    <span className="text-gray-600 text-sm leading-relaxed">{f}</span>
                  </li>)}
                </ul>
                <a href={WA} target="_blank" rel="noopener noreferrer" className={`block text-center py-3.5 rounded-xl font-bold text-sm transition-all ${p.pop ? "text-white" : "border border-[#0057FF] text-[#0057FF] hover:bg-[#0057FF] hover:text-white"}`} style={p.pop ? { background: "linear-gradient(135deg, #0057FF, #7C3AED)" } : {}}>Pesan Sekarang</a>
              </div>
            </div>
          </F>)}
        </div>
        <F delay={300}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-2xl p-7 border-2 border-[#0057FF] bg-[#F5F8FF]">
            <div><h3 className="font-bold text-lg text-gray-900 mb-1">Aplikasi Web Custom</h3><div className="font-bold text-xl mb-2" style={{ color: "#0057FF" }}>Mulai Rp 5.000.000</div><p className="text-gray-500 text-sm">Butuh sistem khusus? Diskusi dulu — scope & harga menyesuaikan.</p></div>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="px-6 py-3.5 rounded-xl font-bold text-sm text-white whitespace-nowrap" style={{ background: "linear-gradient(135deg, #0057FF, #7C3AED)" }}>Diskusi via WhatsApp</a>
          </div>
        </F>
      </div>
    </section>

    {/* TESTIMONI */}
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <F className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: "#EBF1FF", color: "#0057FF" }}>Testimoni</span>
          <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">Kata mereka yang sudah percaya</h2>
        </F>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {testi.map((t, i) => <F key={i} delay={i * 100}>
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex gap-1 mb-4 text-amber-400">★★★★★</div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">"{t.t}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: t.c }}>{t.i}</div>
                <div><div className="font-semibold text-sm text-gray-900">{t.name}</div><div className="text-gray-400 text-xs">{t.role}</div></div>
              </div>
            </div>
          </F>)}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20" style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #EEF2FF 100%)" }}>
      <div className="max-w-2xl mx-auto px-5">
        <F className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: "#EBF1FF", color: "#0057FF" }}>FAQ</span>
          <h2 className="font-bold text-3xl md:text-4xl text-gray-900">Pertanyaan yang Sering Ditanyakan</h2>
        </F>
        <F delay={100}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 md:px-8">
            {faqs.map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
          </div>
        </F>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0045CC 0%, #0057FF 50%, #6D28D9 100%)" }}>
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2 bg-white pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15 blur-3xl translate-x-1/3 translate-y-1/3 bg-[#A78BFA] pointer-events-none" />
      <F className="relative z-10 max-w-2xl mx-auto px-5 text-center">
        <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight">Siap Punya Website Profesional?</h2>
        <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-md mx-auto">Konsultasi gratis, tanpa komitmen. Kami bantu dari awal sampai selesai.</p>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white font-bold text-base px-8 py-4 rounded-xl hover:bg-white/90 hover:shadow-2xl transition-all" style={{ color: "#0057FF" }}>Mulai Sekarang via WhatsApp</a>
      </F>
    </section>

    {/* FOOTER */}
    <footer className="bg-gray-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          <div><div className="text-xl font-bold mb-3" style={{ color: "#0057FF" }}>LM Studio</div><p className="text-gray-400 text-sm">Bagian dari ekosistem lokermjl</p></div>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com/lokermajalengka" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">Instagram</a>
            <a href="https://lokermjl.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">lokermjl.com</a>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8"><p className="text-gray-600 text-xs">© 2026 LM Studio. All rights reserved.</p></div>
      </div>
    </footer>
  </main>;
}
