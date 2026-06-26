"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

/* ── Data ─────────────────────────────────────────────── */
const WA_BASE = "https://wa.me/6285176718017?text=";
const wa = (msg: string) => `${WA_BASE}${encodeURIComponent(msg)}`;

const services = [
  { icon: "🖥️", title: "Landing Page", desc: "Halaman tunggal powerful untuk promosi. Dioptimasi untuk konversi.", tag: "7 hari kerja" },
  { icon: "🏢", title: "Company Profile", desc: "Website multi-halaman profesional — profil, layanan, kontak.", tag: "5-10 Halaman" },
  { icon: "🛒", title: "Toko Online", desc: "Jual produk lewat website. Katalog + order via WhatsApp.", tag: "Siap berjualan" },
  { icon: "💻", title: "Aplikasi Web Custom", desc: "Sistem khusus — manajemen data, laporan, integrasi API.", tag: "Sesuai kebutuhan" },
];

const processes = [
  { n: "01", t: "Konsultasi", d: "Ceritakan kebutuhan bisnis via WhatsApp. Gratis." },
  { n: "02", t: "Penawaran", d: "Kami kirim proposal & estimasi harga dalam 2×24 jam." },
  { n: "03", t: "Pengerjaan", d: "Tim kami mulai membangun web sesuai paket yang dipilih." },
  { n: "04", t: "Selesai", d: "Web jadi, domain & hosting aktif, bisa langsung pakai." },
];

const portfolios = [
  { name: "FirstCar", year: "2025", tag: "Marketplace", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600&h=400&fit=crop", beforeImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop", gradient: "from-blue-500 to-blue-700", url: "#" },
  { name: "LokerMJL", year: "2026", tag: "Dashboard Admin", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop", beforeImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", gradient: "from-indigo-500 to-indigo-700", url: "https://lokermjl.com" },
  { name: "Sambal Jubleg", year: "2026", tag: "POS System", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop", beforeImg: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop", gradient: "from-red-500 to-orange-500", url: "https://sambaljubleg.com" },
];

const pricing = [
  { name: "Starter", price: "Rp 2.000.000", pop: false, desc: "Kehadiran online pertama kali", f: ["Landing page 1 halaman", "Kontak & lokasi maps", "Mobile-friendly", "Domain .com (1 thn)", "Hosting (1 thn)", "7 hari kerja"] },
  { name: "Bisnis", price: "Rp 3.500.000", pop: true, desc: "Tampil lebih profesional", f: ["Company profile 5 halaman", "Katalog produk", "Form kontak & WA button", "Domain .com & .id (1 thn)", "Hosting (1 thn)", "14 hari kerja"] },
  { name: "Pro", price: "Rp 6.000.000", pop: false, desc: "Sistem lebih lengkap", f: ["Website 5-10 halaman", "Toko online / katalog", "Blog / artikel", "Domain by request (1 thn)", "Hosting (1 thn)", "Basic SEO", "21 hari kerja", "1 bulan free revisi"] },
];

const whyUs = [
  { icon: "⚡", title: "Response < 24 Jam", desc: "Konsultasi & proposal dikirim cepat. Gak nunggu seminggu." },
  { icon: "🔄", title: "Revisi Gratis", desc: "Starter & Bisnis dapat 2× revisi. Pro dapat 1 bulan free revisi." },
  { icon: "🛡️", title: "Garansi 1 Tahun", desc: "Domain & hosting termasuk. Bug fixing gratis selama garansi." },
  { icon: "🤝", title: "Support After-Launch", desc: "Bantuan teknis setelah web jadi. WA langsung, gak perlu ticket." },
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
  { q: "Bisa request revisi?", a: "Bisa. Starter & Bisnis 2× revisi, Pro revisi minor gratis 1 bulan." },
  { q: "Sistem pembayaran?", a: "DP 50% di awal, pelunasan 50% setelah selesai." },
  { q: "Konsultasi dulu?", a: "Gratis! Konsultasi awal via WhatsApp." },
];

/* ── Hooks ────────────────────────────────────────────── */
function useFadeIn(t = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); o.unobserve(el); }
    }, { threshold: t });
    o.observe(el);
    return () => o.disconnect();
  }, [t]);
  return { ref, v };
}

function useCountUp(end: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, end, duration]);

  return count;
}

/* ── Components ───────────────────────────────────────── */
function F({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, v } = useFadeIn();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
      filter: v ? "blur(0px)" : "blur(4px)",
      transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms, filter .7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

function FAQ({ q, a, isDark }: { q: string; a: string; isDark: boolean }) {
  const [o, setO] = useState(false);
  return (
    <div className={`border-b last:border-0 ${isDark ? "border-white/5" : "border-gray-200"}`}>
      <button onClick={() => setO(!o)} className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group">
        <span className={`font-semibold text-base transition-colors ${isDark ? "text-white group-hover:text-blue-400" : "text-gray-900 group-hover:text-blue-600"}`}>{q}</span>
        <span className={`text-xl flex-shrink-0 transition-transform duration-300 ${isDark ? "text-gray-500" : "text-gray-400"}`} style={{ transform: o ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: o ? "200px" : "0" }}>
        <p className={`text-sm leading-relaxed pb-5 pr-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{a}</p>
      </div>
    </div>
  );
}

function CountUpStat({ end, suffix = "", label, duration = 2000, isDark }: { end: number; suffix?: string; label: string; duration?: number; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStart(true); obs.unobserve(el); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(end, duration, start);

  return (
    <div ref={ref} className="text-center">
      <div className={`font-bold text-2xl ${isDark ? "text-white" : "text-gray-900"}`}>{count}{suffix}</div>
      <div className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>{label}</div>
    </div>
  );
}

function Hamburger({ open, onClick, isDark }: { open: boolean; onClick: () => void; isDark: boolean }) {
  return (
    <button onClick={onClick} className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 cursor-pointer" aria-label="Menu">
      <span className={`block w-6 h-0.5 transition-all duration-300 ${isDark ? "bg-white" : "bg-gray-900"} ${open ? "rotate-45 translate-y-2" : ""}`} />
      <span className={`block w-6 h-0.5 transition-all duration-300 ${isDark ? "bg-white" : "bg-gray-900"} ${open ? "opacity-0" : ""}`} />
      <span className={`block w-6 h-0.5 transition-all duration-300 ${isDark ? "bg-white" : "bg-gray-900"} ${open ? "-rotate-45 -translate-y-2" : ""}`} />
    </button>
  );
}

function DarkModeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-9 h-9 rounded-full flex items-center justify-center text-lg cursor-pointer transition-all duration-300 hover:scale-110"
      aria-label="Toggle dark mode"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

function FloatingWA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <a
      href={wa("Halo LM Studio, saya tertarik dengan layanan web Anda.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110 animate-fadeIn"
      aria-label="Chat WhatsApp"
    >
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  );
}

function BackToTop({ isDark }: { isDark: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 animate-fadeIn ${isDark ? "bg-white/10 hover:bg-white/20 shadow-black/30" : "bg-gray-900/10 hover:bg-gray-900/20 shadow-gray-400/30"}`}
      aria-label="Back to top"
    >
      <span className={`text-2xl ${isDark ? "text-white" : "text-gray-900"}`}>↑</span>
    </button>
  );
}

const marqueeClients = ["Hendra Motor", "Bu Siti", "CV Maju Jaya", "Toko Batik Yanti", "FirstCar", "LokerMJL", "Sambal Jubleg", "Warung Teh Ani"];

/* ── Particles ───────────────────────────────────────── */
function Particles({ isDark }: { isDark: boolean }) {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.5 ? "w-1.5 h-1.5" : "w-1 h-1",
      duration: `${10 + Math.random() * 10}s`,
      delay: `${Math.random() * 10}s`,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.size} ${isDark ? "bg-blue-400/30" : "bg-blue-500/20"}`}
          style={{
            top: p.top,
            left: p.left,
            animation: `particleFloat ${p.duration} linear ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* Page loader */
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowLoader(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  /* Portfolio before/after toggle */
  const [showBefore, setShowBefore] = useState<Set<number>>(new Set());
  const toggleBefore = useCallback((idx: number) => {
    setShowBefore(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  /* Dark mode */
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  /* Scroll progress */
  const [scrollPct, setScrollPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollPct(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Typing effect */
  const fullLine1 = "Automate Your Business";
  const fullLine2 = "with Modern Web";
  const [line1Text, setLine1Text] = useState("");
  const [line2Text, setLine2Text] = useState("");
  const [cursor, setCursor] = useState(true);
  const [typingDone, setTypingDone] = useState(false);
  const [phase, setPhase] = useState<"line1" | "pause1" | "line2" | "done">("line1");

  useEffect(() => {
    const blink = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    if (phase === "line1") {
      if (line1Text.length < fullLine1.length) {
        const t = setTimeout(() => setLine1Text(fullLine1.slice(0, line1Text.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pause1"), 800);
        return () => clearTimeout(t);
      }
    } else if (phase === "pause1") {
      const t = setTimeout(() => setPhase("line2"), 100);
      return () => clearTimeout(t);
    } else if (phase === "line2") {
      if (line2Text.length < fullLine2.length) {
        const t = setTimeout(() => setLine2Text(fullLine2.slice(0, line2Text.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => { setPhase("done"); setTypingDone(true); }, 600);
        return () => clearTimeout(t);
      }
    }
  }, [phase, line1Text, line2Text]);
  /* Testimonial carousel */
  const [currentTesti, setCurrentTesti] = useState(0);
  const testiInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startInterval = () => {
      testiInterval.current = setInterval(() => {
        setCurrentTesti(prev => (prev + 1) % testi.length);
      }, 4000);
    };
    startInterval();
    return () => { if (testiInterval.current) clearInterval(testiInterval.current); };
  }, []);

  const handleTestiHover = () => {
    if (testiInterval.current) clearInterval(testiInterval.current);
  };

  const handleTestiLeave = () => {
    if (testiInterval.current) clearInterval(testiInterval.current);
    testiInterval.current = setInterval(() => {
      setCurrentTesti(prev => (prev + 1) % testi.length);
    }, 4000);
  };


  return (
    <>
    {showLoader && (
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-300"
        style={{
          backgroundColor: "#0a0a0f",
          opacity: isLoading ? 1 : 0,
          pointerEvents: isLoading ? "auto" : "none",
        }}
      >
        <span className="text-3xl font-bold text-blue-500 mb-6" style={{ animation: "loaderPulse 1.5s ease-in-out infinite" }}>LM Studio</span>
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ animation: "loaderBar 1.5s ease-in-out forwards" }} />
        </div>
      </div>
    )}
    <main className={`transition-colors duration-300 antialiased ${isDark ? "bg-[#0a0a0f] text-white" : "bg-white text-gray-900"}`}>

      {/* Animated gradient keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes loaderBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes loaderPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.03); }
        }
        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes rotateGradient {
          to { --angle: 360deg; }
        }
      `}} />

      {/* ── NAV ─────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isDark ? "bg-[#0a0a0f]/80 backdrop-blur-2xl border-b border-white/5" : "bg-white/80 backdrop-blur-2xl border-b border-gray-200"}`}>
        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-150" style={{ width: `${scrollPct}%` }} />

        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="text-xl font-bold text-blue-500">LM Studio</span>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#layanan" className={`transition ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}>Layanan</a>
            <a href="#proses" className={`transition ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}>Proses</a>
            <a href="#portfolio" className={`transition ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}>Portfolio</a>
            <a href="#harga" className={`transition ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}>Harga</a>
            <a href={wa("Halo LM Studio, saya ingin konsultasi.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-[2px] rounded-xl font-semibold text-white transition" style={{ background: "conic-gradient(from var(--angle, 0deg), #2563eb, #7c3aed, #ec4899, #2563eb)", animation: "rotateGradient 3s linear infinite" }}>
              <span className="px-5 py-2 bg-[#0a0a0f] rounded-[10px] text-sm font-bold text-white hover:bg-[#12121a] transition">Konsultasi Gratis</span>
            </a>
          </div>

          {/* Mobile: dark toggle + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <DarkModeToggle isDark={isDark} onToggle={toggleDark} />
            <Hamburger open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} isDark={isDark} />
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80" : "max-h-0"}`}>
          <div className={`px-6 py-4 flex flex-col gap-4 text-sm border-t ${isDark ? "border-white/5 text-gray-400" : "border-gray-200 text-gray-500"}`}>
            <a href="#layanan" onClick={closeMenu} className={`transition py-2 ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}>Layanan</a>
            <a href="#proses" onClick={closeMenu} className={`transition py-2 ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}>Proses</a>
            <a href="#portfolio" onClick={closeMenu} className={`transition py-2 ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}>Portfolio</a>
            <a href="#harga" onClick={closeMenu} className={`transition py-2 ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}>Harga</a>
            <a href={wa("Halo LM Studio, saya ingin konsultasi.")} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="inline-flex items-center justify-center p-[2px] rounded-xl font-semibold text-white transition w-full" style={{ background: "conic-gradient(from var(--angle, 0deg), #2563eb, #7c3aed, #ec4899, #2563eb)", animation: "rotateGradient 3s linear infinite" }}>
              <span className="px-5 py-2.5 bg-[#0a0a0f] rounded-[10px] text-sm font-bold text-white text-center flex-1">Konsultasi Gratis</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────── */}
      <section className={`relative min-h-screen flex items-center overflow-hidden scroll-mt-20 ${isDark ? "" : ""}`}>
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              background: "linear-gradient(-45deg, #2563eb, #0ea5e9, #6366f1, #3b82f6)",
              backgroundSize: "400% 400%",
              animation: "gradientShift 18s ease infinite",
            }}
          />
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px]" />
        </div>
        <Particles isDark={isDark} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
          <F>
            <div className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 mb-8 ${isDark ? "bg-blue-500/10 border border-blue-500/20" : "bg-blue-50 border border-blue-200"}`}>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className={`text-sm font-medium ${isDark ? "text-blue-300" : "text-blue-600"}`}>Layanan Web untuk UMKM Ciayumajakuning</span>
            </div>
          </F>
          <F delay={100}>
            <h1 className={`font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-4xl ${isDark ? "text-white" : "text-gray-900"}`}>
              {line1Text}
              {!typingDone && <span className={`inline-block w-[3px] h-[0.85em] ml-1 align-middle ${isDark ? "bg-white" : "bg-gray-900"} ${cursor ? "opacity-100" : "opacity-0"}`} />}
              {line2Text.length > 0 && (<><br />{line2Text}{phase !== "done" && <span className={`inline-block w-[3px] h-[0.85em] ml-1 align-middle ${isDark ? "bg-white" : "bg-gray-900"} ${cursor ? "opacity-100" : "opacity-0"}`} />}</>)}
            </h1>
          </F>
          <F delay={200}>
            <p className={`text-lg md:text-xl max-w-2xl mb-10 leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Kami bantu UMKM dan bisnis lokal punya website yang rapi, cepat, dan siap dipakai — tanpa ribet.
            </p>
          </F>
          <F delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a href="#harga" className="inline-flex items-center justify-center p-[2px] rounded-xl font-bold transition" style={{ background: "conic-gradient(from var(--angle, 0deg), #2563eb, #7c3aed, #ec4899, #2563eb)", animation: "rotateGradient 3s linear infinite" }}>
                <span className="px-8 py-4 bg-[#0a0a0f] rounded-[10px] text-white text-base font-bold hover:bg-[#12121a] transition text-center">Lihat Paket</span>
              </a>
              <a href={wa("Halo LM Studio, saya ingin konsultasi.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-[2px] rounded-xl font-bold transition" style={{ background: "conic-gradient(from var(--angle, 0deg), #2563eb, #7c3aed, #ec4899, #2563eb)", animation: "rotateGradient 3s linear infinite" }}>
                <span className={`px-8 py-4 rounded-[10px] text-base font-bold transition text-center ${isDark ? "bg-[#0a0a0f] text-white hover:bg-[#12121a]" : "bg-[#0a0a0f] text-white hover:bg-[#12121a]"}`}>Konsultasi via WhatsApp</span>
              </a>
            </div>
          </F>
          <F delay={400}>
            <div className="flex items-center gap-8">
              <CountUpStat end={50} suffix="+" label="Followers" isDark={isDark} />
              <div className={`w-px h-8 ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
              <CountUpStat end={10} suffix="+" label="Klien" isDark={isDark} />
              <div className={`w-px h-8 ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
              <CountUpStat end={2024} label="Berdiri" isDark={isDark} />
            </div>
          </F>
        </div>
      </section>



      {/* ── CLIENT MARQUEE ──────────────────────────── */}
      <section className={`py-16 ${isDark ? "bg-[#111827]" : "bg-gray-50"}`}>
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <p className={`text-center text-sm font-semibold uppercase tracking-wider ${isDark ? "text-gray-500" : "text-gray-400"}`}>DIPERCAYA OLEH</p>
        </div>
        <div className="overflow-hidden">
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
            {[...marqueeClients, ...marqueeClients].map((name, i) => (
              <span key={`${name}-${i}`} className={`inline-flex items-center mx-4 px-6 py-3 rounded-lg border text-sm font-semibold transition-colors duration-300 shrink-0 ${isDark ? "border-white/10 text-gray-400 hover:text-white hover:border-white/30 bg-white/[0.02]" : "border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-400 bg-white"}`}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>



      {/* ── LAYANAN ─────────────────────────────────── */}
      <section id="layanan" className={`py-24 relative scroll-mt-20`}>
        <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" : "bg-gradient-to-b from-white via-gray-50 to-white"}`} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Layanan</span></F>
            <F delay={50}><h2 className={`text-4xl font-bold mt-3 ${isDark ? "text-white" : "text-gray-900"}`}>Apa yang kami kerjakan</h2></F>
            <F delay={100}><p className={`mt-3 text-lg ${isDark ? "text-gray-500" : "text-gray-400"}`}>Dari landing page sederhana sampai sistem web kompleks.</p></F>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <F key={s.title} delay={i * 100}>
                <div className={`p-8 rounded-2xl h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group ${isDark ? "bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.04]" : "bg-gray-50 border border-gray-200 hover:border-blue-300 hover:bg-white hover:shadow-blue-100"}`}>
                  <div className="text-3xl mb-5">{s.icon}</div>
                  <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{s.title}</h3>
                  <p className={`text-sm leading-relaxed mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{s.desc}</p>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{s.tag}</span>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROSES ──────────────────────────────────── */}
      <section id="proses" className="py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Proses Kerja</span></F>
            <F delay={50}><h2 className={`text-4xl font-bold mt-3 ${isDark ? "text-white" : "text-gray-900"}`}>Cara kami bekerja</h2></F>
            <F delay={100}><p className={`mt-3 text-lg ${isDark ? "text-gray-500" : "text-gray-400"}`}>Simpel dan transparan.</p></F>
          </div>
          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-6 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-600" />
              <div className="flex justify-between">
                {processes.map((p, i) => (
                  <F key={p.n} delay={i * 200}>
                    <div className="relative flex flex-col items-center" style={{ width: '180px' }}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold z-10 ${i === 3 ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "bg-blue-600 text-white shadow-lg shadow-blue-600/30"}`}>{p.n}</div>
                      <h3 className={`font-bold text-base mt-4 mb-2 text-center ${isDark ? "text-white" : "text-gray-900"}`}>{p.t}</h3>
                      <p className={`text-xs text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>{p.d}</p>
                    </div>
                  </F>
                ))}
              </div>
            </div>
          </div>
          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden">
            <div className="relative pl-10">
              <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 to-blue-600" />
              <div className="flex flex-col gap-8">
                {processes.map((p, i) => (
                  <F key={p.n} delay={i * 200}>
                    <div className="relative">
                      <div className={`absolute -left-10 top-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i === 3 ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "bg-blue-600 text-white shadow-lg shadow-blue-600/30"}`}>{p.n}</div>
                      <h3 className={`font-bold text-lg mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{p.t}</h3>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{p.d}</p>
                    </div>
                  </F>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ───────────────────────────────── */}
      <section id="portfolio" className="py-24 relative scroll-mt-20">
        <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" : "bg-gradient-to-b from-white via-gray-50 to-white"}`} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Portfolio</span></F>
            <F delay={50}><h2 className={`text-4xl font-bold mt-3 ${isDark ? "text-white" : "text-gray-900"}`}>Project yang kami kerjakan</h2></F>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolios.map((p, i) => (
              <F key={p.name} delay={i * 100}>
                <div className={`rounded-2xl overflow-hidden transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl ${isDark ? "bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30" : "bg-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-blue-100"}`}>
                  <div className={`h-48 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                    {/* After image (default) */}
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showBefore.has(i) ? "opacity-0" : "opacity-100"} ${!showBefore.has(i) ? "group-hover:scale-110" : ""} ${!showBefore.has(i) ? "transition-transform duration-700" : ""}`}
                    />
                    {/* Before image */}
                    {p.beforeImg && (
                      <img
                        src={p.beforeImg}
                        alt={`${p.name} before`}
                        loading="lazy"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showBefore.has(i) ? "opacity-100" : "opacity-0"}`}
                      />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center z-[2]">
                      <h3 className="text-white font-bold text-xl mb-1">{p.name}</h3>
                      <span className="text-blue-300 text-sm font-semibold mb-3">{p.tag}</span>
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-lg border border-white/20 group-hover:bg-white/20 transition">Lihat Live →</a>
                    </div>
                    {/* Year badge */}
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full text-white z-[2]">{p.year}</div>
                    {/* Before/After toggle */}
                    {p.beforeImg && (
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleBefore(i); }}
                        className="absolute top-4 left-4 z-[2] bg-black/40 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full text-white border border-white/20 hover:bg-white/20 transition cursor-pointer"
                      >
                        {showBefore.has(i) ? 'After' : 'Before'}
                      </button>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className={`font-bold text-lg mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{p.name}</h3>
                    <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{p.tag}</span>
                  </div>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* ── KENAPA PILIH KAMI ───────────────────────── */}
      <section className="py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Keunggulan</span></F>
            <F delay={50}><h2 className={`text-4xl font-bold mt-3 ${isDark ? "text-white" : "text-gray-900"}`}>Kenapa pilih LM Studio?</h2></F>
            <F delay={100}><p className={`mt-3 text-lg ${isDark ? "text-gray-500" : "text-gray-400"}`}>Bukan cuma bikin website — kami jaga hubungan jangka panjang.</p></F>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w, i) => (
              <F key={w.title} delay={i * 100}>
                <div className={`p-8 rounded-2xl h-full text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${isDark ? "bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.04]" : "bg-gray-50 border border-gray-200 hover:border-blue-300 hover:bg-white"}`}>
                  <div className="text-3xl mb-5">{w.icon}</div>
                  <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{w.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>{w.desc}</p>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ──────────────────────────────── */}
      <section className="py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Technology</span></F>
            <F delay={50}><h2 className={`text-4xl font-bold mt-3 ${isDark ? "text-white" : "text-gray-900"}`}>Teknologi modern yang kami gunakan</h2></F>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { emoji: "⚛️", name: "React" },
              { emoji: "▲", name: "Next.js" },
              { emoji: "🎨", name: "Tailwind CSS" },
              { emoji: "🟢", name: "Node.js" },
              { emoji: "🗄️", name: "PostgreSQL" },
              { emoji: "☁️", name: "Vercel" },
              { emoji: "🐙", name: "GitHub" },
              { emoji: "📱", name: "Responsive" },
            ].map((tech, i) => (
              <F key={tech.name} delay={i * 100}>
                <div className={`p-6 rounded-2xl text-center transition-all duration-500 hover:scale-110 cursor-default grayscale hover:grayscale-0 ${isDark ? "bg-white/[0.02] text-gray-400 hover:text-white border border-white/[0.06] hover:border-blue-500/30" : "bg-gray-50 text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-blue-300"}`}>
                  <div className="text-4xl mb-3">{tech.emoji}</div>
                  <div className="text-sm font-semibold">{tech.name}</div>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* ── HARGA ───────────────────────────────────── */}
      <section id="harga" className="py-24 relative scroll-mt-20">
        <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" : "bg-gradient-to-b from-white via-gray-50 to-white"}`} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Harga</span></F>
            <F delay={50}><h2 className={`text-4xl font-bold mt-3 ${isDark ? "text-white" : "text-gray-900"}`}>Pilih Paket</h2></F>
            <F delay={100}><p className={`mt-3 text-lg ${isDark ? "text-gray-500" : "text-gray-400"}`}>Transparan, tanpa biaya tersembunyi</p></F>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {pricing.map((p, i) => (
              <F key={p.name} delay={i * 100}>
                {p.pop ? (
                  <div className="relative p-[2px] rounded-2xl scale-[1.02] shadow-2xl shadow-blue-600/20" style={{ background: "conic-gradient(from var(--angle, 0deg), #2563eb, #7c3aed, #ec4899, #2563eb)", animation: "rotateGradient 3s linear infinite" }}>
                    <div className="p-8 rounded-[14px] backdrop-blur-xl border border-white/10 bg-gradient-to-b from-blue-600/90 to-blue-800/90">
                      <div className="text-xs font-bold text-white bg-emerald-500 px-3 py-1 rounded-full inline-block mb-4">Terpopuler</div>
                      <h3 className="font-bold text-xl mb-2 text-white">{p.name}</h3>
                      <div className="text-3xl font-extrabold mb-1 text-white">{p.price}</div>
                      <p className="text-sm mb-6 text-blue-200">{p.desc}</p>
                      <ul className="space-y-3 text-sm mb-8">
                        {p.f.map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <span className="text-emerald-300">✓</span>
                            <span className="text-blue-100">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <a href={wa(`Halo LM Studio, saya tertarik paket ${p.name}.`)} target="_blank" rel="noopener noreferrer" className="block text-center py-3 font-semibold rounded-lg transition bg-white text-blue-700 hover:shadow-xl">Pesan Sekarang</a>
                    </div>
                  </div>
                ) : (
                  <div className={`p-8 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 ${isDark ? "bg-white/[0.03] border-white/10 hover:border-blue-500/30" : "bg-white/80 border-white/10 hover:border-blue-500/30 hover:shadow-blue-500/10"}`}>
                    <h3 className={`font-bold text-xl mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{p.name}</h3>
                    <div className={`text-3xl font-extrabold mb-1 text-blue-400`}>{p.price}</div>
                    <p className={`text-sm mb-6 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{p.desc}</p>
                    <ul className="space-y-3 text-sm mb-8">
                      {p.f.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span className={isDark ? "text-gray-300" : "text-gray-600"}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={wa(`Halo LM Studio, saya tertarik paket ${p.name}.`)} target="_blank" rel="noopener noreferrer" className={`block text-center py-3 font-semibold rounded-lg transition ${isDark ? "border border-white/10 text-white hover:bg-white/5" : "border border-gray-300 text-gray-900 hover:bg-gray-100"}`}>Pesan Sekarang</a>
                  </div>
                )}
              </F>
            ))}
          </div>
          <F delay={300}>
            <div className={`mt-6 p-8 rounded-2xl border border-dashed text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${isDark ? "bg-white/[0.02] border-white/10" : "bg-gray-50 border-gray-300"}`}>
              <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Aplikasi Web Custom</h3>
              <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Mulai Rp 5.000.000</p>
              <p className={`text-sm mb-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Butuh sistem khusus? Diskusi dulu — scope &amp; harga menyesuaikan.</p>
              <a href={wa("Halo LM Studio, saya butuh aplikasi web custom.")} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Diskusi via WhatsApp</a>
            </div>
          </F>
        </div>
      </section>

      {/* ── TESTIMONI ───────────────────────────────── */}
      <section className="py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Testimoni</span></F>
            <F delay={50}><h2 className={`text-4xl font-bold mt-3 ${isDark ? "text-white" : "text-gray-900"}`}>Kata mereka yang sudah percaya</h2></F>
          </div>
          <div className="overflow-hidden" onMouseEnter={handleTestiHover} onMouseLeave={handleTestiLeave}>
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTesti * 100}%)` }}>
              {testi.map((t, i) => (
                <div key={t.name} className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-3">
                  <div className={`p-6 rounded-2xl h-full transition-all duration-300 ${isDark ? "bg-white/[0.02] border border-white/[0.06]" : "bg-gray-50 border border-gray-200"}`}>
                    <div className="text-amber-400 text-sm mb-3">★★★★★</div>
                    <p className={`text-sm mb-4 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>&quot;{t.t}&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ backgroundColor: t.c + "30", color: t.c }}>{t.i}</div>
                      <div><div className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{t.name}</div><div className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{t.role}</div></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Carousel dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testi.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTesti(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentTesti ? (isDark ? "bg-blue-500" : "bg-blue-500") : (isDark ? "bg-gray-600" : "bg-gray-300")}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="py-24 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <F><span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">FAQ</span></F>
            <F delay={50}><h2 className={`text-4xl font-bold mt-3 ${isDark ? "text-white" : "text-gray-900"}`}>Pertanyaan yang Sering Ditanyakan</h2></F>
          </div>
          <F delay={100}>
            <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-white/[0.02] border-white/[0.06]" : "bg-gray-50 border-gray-200"}`}>
              {faqs.map((f) => <FAQ key={f.q} q={f.q} a={f.a} isDark={isDark} />)}
            </div>
          </F>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <F><h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Siap Punya Website Profesional?</h2></F>
          <F delay={100}><p className="text-white/70 text-lg mb-8">Konsultasi gratis, tanpa komitmen. Kami bantu dari awal sampai selesai.</p></F>
          <F delay={200}>
            <a href={wa("Halo LM Studio, saya siap mulai bikin website.")} target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-white text-blue-700 font-bold rounded-lg text-lg hover:shadow-2xl hover:shadow-white/20 transition">
              Mulai Sekarang via WhatsApp
            </a>
          </F>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className={`border-t py-12 ${isDark ? "border-white/5" : "border-gray-200"}`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xl font-bold text-blue-500">LM Studio</span>
            <p className={`text-sm mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Bagian dari ekosistem lokermjl.com</p>
          </div>
          <div className={`flex items-center gap-6 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            <a href="https://instagram.com/lokermjl" target="_blank" rel="noopener noreferrer" className={`transition ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}>Instagram</a>
            <a href="https://lokermjl.com" target="_blank" rel="noopener noreferrer" className={`transition ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}>lokermjl.com</a>
          </div>
          <div className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>© 2026 LM Studio. All rights reserved.</div>
        </div>
      </footer>

      {/* ── FLOATING BUTTONS ─────────────────────── */}
      <FloatingWA />
      <BackToTop isDark={isDark} />
    </main>
    </>
  );
}
