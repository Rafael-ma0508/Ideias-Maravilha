import { useState, useEffect } from "react";

const BASE = "https://ideias-maravilha-madeira-e-epoxi.netlify.app/";
const LOGO = BASE + "img/logo.jpg";

const MADEIRA_CATS = [
  { id: "natal",      label: "Natal",                        folder: "img_Page2",  prefix: "natal",      count: 43, icon: "🎄" },
  { id: "retratos",   label: "Porta Retratos",               folder: "img_Page3",  prefix: "retratos",   count: 13, icon: "🖼️" },
  { id: "luminoso",   label: "Letreiros Luminosos",          folder: "img_Page4",  prefix: "Letreiros",  count: 7,  icon: "💡" },
  { id: "casamentos", label: "Casamento / Batizado / Comunhões", folder: "img_Page5", prefix: "casamento", count: 50, icon: "💍" },
  { id: "chaves",     label: "Porta Chaves",                 folder: "img_Page9",  prefix: "chaves",     count: 27, icon: "🔑" },
  { id: "trofeus",    label: "Troféus e Medalhas",           folder: "img_Page10", prefix: "Trofeus",    count: 28, icon: "🏆" },
  { id: "candeeiros", label: "Candeeiros",                   folder: "img_Page11", prefix: "Candeeiros", count: 22, icon: "🕯️" },
  { id: "pascoa",     label: "Páscoa e Padrinhos",           folder: "Page_12",    prefix: "pascoa",     count: 24, icon: "🐣" },
  { id: "animais",    label: "Animais",                      folder: "Page_13",    prefix: "animais",    count: 30, icon: "🐾" },
  { id: "pais",       label: "Dia do Pai",                   folder: "Page_14",    prefix: "pais",       count: 27, icon: "👨‍👧" },
  { id: "namorados",  label: "Dia dos Namorados",            folder: "Page_15",    prefix: "namorados",  count: 17, icon: "❤️" },
  { id: "escola",     label: "Escola / Finalistas",          folder: "Page_16",    prefix: "escola",     count: 26, icon: "🎓" },
];

const EPOXI_CATS = [
  { id: "cabelo",      label: "Cabelo, Dentinho, Gravidez…",   folder: "Page_17", prefix: "cabelo",    count: 13, icon: "✨" },
  { id: "pascoa2",     label: "Páscoa",                         folder: "Page_18", prefix: "pascoa",    count: 11, icon: "🐣" },
  { id: "joias",       label: "Jóias",                          folder: "Page_19", prefix: "joias",     count: 28, icon: "💎" },
  { id: "chaves2",     label: "Porta Chaves",                   folder: "Page_23", prefix: "porte",     count: 9,  icon: "🔑" },
  { id: "presente",    label: "Presentes Personalizados",        folder: "Page_20", prefix: "presente",  count: 61, icon: "🎁" },
  { id: "pecas",       label: "Peças Únicas",                   folder: "Page_21", prefix: "pecas",     count: 15, icon: "🔮" },
  { id: "casamentos2", label: "Casamento / Batizado / Comunhões", folder: "Page_22", prefix: "casamento", count: 9, icon: "💍" },
];

const HOME_SAMPLE = [
  "img/natal1.jpg","img/natal2.jpg","img/natal3.jpg",
  "img/pascoa1.jpg","img/pascoa2.jpg","img/pascoa3.jpg",
  "img/anos1.jpg","img/anos2.jpg","img/anos3.jpg",
  "img/otros.jpg","img/otros2.jpg","img/otros3.jpg",
].map(p => BASE + p);

function catImages(cat) {
  return Array.from({ length: cat.count }, (_, i) => `${BASE}${cat.folder}/${cat.prefix}${i + 1}.jpg`);
}

// ── Stars ───────────────────────────────────────────────────────────────────
function Stars({ value, onChange, readOnly = false }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 3, cursor: readOnly ? "default" : "pointer" }}>
      {[1,2,3,4,5].map(s => (
        <span
          key={s}
          style={{ fontSize: readOnly ? 18 : 30, color: s <= (hover || value) ? "#FFD700" : "#444", transition: "color .15s" }}
          onMouseEnter={() => !readOnly && setHover(s)}
          onMouseLeave={() => !readOnly && setHover(0)}
          onClick={() => !readOnly && onChange && onChange(s)}
        >★</span>
      ))}
    </div>
  );
}

// ── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const h = e => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, onPrev, onNext]);

  if (index === null) return null;
  const btnBase = {
    position: "absolute", background: "rgba(255,255,255,0.12)", border: "none",
    color: "#fff", borderRadius: "50%", cursor: "pointer", backdropFilter: "blur(6px)",
    lineHeight: 1,
  };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.94)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <button onClick={e=>{e.stopPropagation();onPrev();}} style={{...btnBase,left:20,top:"50%",transform:"translateY(-50%)",fontSize:36,padding:"10px 18px"}}>‹</button>
      <img src={images[index]} alt="" onClick={e=>e.stopPropagation()} style={{ maxWidth:"90vw", maxHeight:"90vh", objectFit:"contain", borderRadius:10, boxShadow:"0 0 80px rgba(0,0,0,0.8)" }} />
      <button onClick={e=>{e.stopPropagation();onNext();}} style={{...btnBase,right:20,top:"50%",transform:"translateY(-50%)",fontSize:36,padding:"10px 18px"}}>›</button>
      <button onClick={onClose} style={{...btnBase,top:20,right:20,fontSize:22,padding:"8px 14px"}}>✕</button>
      <div style={{ position:"absolute", bottom:18, color:"rgba(255,255,255,.5)", fontSize:13 }}>{index+1} / {images.length}</div>
    </div>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ theme, navigate }) {
  const [open, setOpen] = useState(false);
  const isEpoxi = theme === "epoxi";
  const bg = isEpoxi ? "#040D1A" : theme === "madeira" ? "#2C1810" : "rgba(10,6,3,0.75)";
  const border = isEpoxi ? "rgba(0,184,255,.2)" : "rgba(212,168,85,.25)";
  const logoColor = isEpoxi ? "#9EEAF9" : "#D4A855";

  return (
    <nav style={{ position:"sticky", top:0, zIndex:200, background:bg, backdropFilter:"blur(12px)", borderBottom:`1px solid ${border}`, padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
      <div onClick={()=>navigate("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:12, fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:600, color:logoColor, letterSpacing:".05em" }}>
        <img src={LOGO} alt="logo" style={{ width:40, height:40, borderRadius:"50%", objectFit:"cover", border:`2px solid ${logoColor}44` }} />
        Ideias Maravilha
      </div>
      <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
        <button onClick={()=>navigate("madeira")} style={{ background:"rgba(212,168,85,.12)", color:"#D4A855", border:"1px solid rgba(212,168,85,.35)", padding:"7px 15px", borderRadius:20, cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"'Nunito',sans-serif", letterSpacing:".03em" }}>🪵 Madeira</button>
        <button onClick={()=>navigate("epoxi")} style={{ background:"rgba(0,184,255,.1)", color:"#9EEAF9", border:"1px solid rgba(0,184,255,.3)", padding:"7px 15px", borderRadius:20, cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"'Nunito',sans-serif", letterSpacing:".03em" }}>💎 Epóxi</button>
        <button onClick={()=>navigate("reviews")} style={{ background:"rgba(255,215,0,.1)", color:"#FFD700", border:"1px solid rgba(255,215,0,.25)", padding:"7px 15px", borderRadius:20, cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"'Nunito',sans-serif" }}>⭐ Avaliações</button>
        <button onClick={()=>navigate("contact")} style={{ background:"rgba(255,255,255,.06)", color:"rgba(245,232,215,.8)", border:"1px solid rgba(255,255,255,.1)", padding:"7px 15px", borderRadius:20, cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"'Nunito',sans-serif" }}>📞 Contacto</button>
      </div>
    </nav>
  );
}

// ── Section divider ──────────────────────────────────────────────────────────
function Divider({ color="#D4A855" }) {
  return <div style={{ width:60, height:2, background:color, margin:"0 auto 48px", opacity:.5 }} />;
}

// ── Contact panel ────────────────────────────────────────────────────────────
function ContactSection({ theme }) {
  const isEpoxi = theme === "epoxi";
  const isMadeira = theme === "madeira";
  // On the madeira hub the background is light (#F5E8D7), so use dark text
  const border = isEpoxi ? "rgba(0,184,255,.15)" : isMadeira ? "rgba(100,60,20,.2)" : "rgba(212,168,85,.2)";
  const cardBg = isEpoxi ? "rgba(255,255,255,.04)" : isMadeira ? "rgba(100,60,20,.07)" : "rgba(255,255,255,.04)";
  const textColor = isMadeira ? "#1A0A04" : "rgba(245,232,215,.75)";
  const textColorHover_wood = "#6B3D2E";
  const lnk = { display:"flex", alignItems:"center", gap:10, color:textColor, textDecoration:"none", fontSize:15, padding:"10px 0", borderBottom:`1px solid ${border}`, transition:"color .2s" };

  return (
    <div id="contact" style={{ padding:"80px 24px", borderTop:`1px solid ${border}`, background: isEpoxi ? "rgba(255,255,255,.01)" : isMadeira ? "rgba(100,60,20,.04)" : "rgba(0,0,0,.05)" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:44, fontWeight:400, textAlign:"center", marginBottom:16, color: isEpoxi ? "#9EEAF9" : isMadeira ? "#5A2E10" : "#D4A855" }}>Contacto</h2>
        <Divider color={isEpoxi ? "#9EEAF9" : "#8B5E3C"} />
        <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
          {/* Madeira */}
          <div style={{ flex:"1 1 280px", background:cardBg, border:`1px solid ${isMadeira ? "rgba(100,60,20,.2)" : "rgba(212,168,85,.25)"}`, borderRadius:16, padding:28, backdropFilter:"blur(8px)" }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, color: isMadeira ? "#5A2E10" : "#D4A855", marginBottom:20 }}>🪵 Madeira</h3>
            {[
              { href:"https://www.facebook.com/IdeiasMaravilha", icon:"📘", text:"Facebook — Ideias Maravilha" },
              { href:"https://instagram.com/marcomaravilh?igsh=NWUza.J2NHF0ando", icon:"📸", text:"Instagram — @marcomaravilh" },
              { href:"tel:+351916943697", icon:"📞", text:"+351 91 69 43 697", last:true },
            ].map(({ href, icon, text, last }) => (
              <a key={href} href={href} target={href.startsWith("tel") ? undefined : "_blank"} rel="noopener"
                style={{ ...lnk, ...(last ? { borderBottom:"none" } : {}) }}
                onMouseEnter={e => e.currentTarget.style.color = isMadeira ? textColorHover_wood : "#D4A855"}
                onMouseLeave={e => e.currentTarget.style.color = textColor}
              ><span style={{ fontSize:20 }}>{icon}</span>{text}</a>
            ))}
          </div>
          {/* Epóxi */}
          <div style={{ flex:"1 1 280px", background:cardBg, border:`1px solid ${isMadeira ? "rgba(100,60,20,.2)" : "rgba(0,184,255,.2)"}`, borderRadius:16, padding:28, backdropFilter:"blur(8px)" }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, ...(isEpoxi ? { background:"linear-gradient(135deg,#9EEAF9,#7B2FBE)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" } : { color: isMadeira ? "#5A2E10" : "#D4A855" }), marginBottom:20 }}>💎 Epóxi</h3>
            {[
              { href:"https://www.facebook.com/share/1ABJTywnqe/", icon:"📘", text:"Facebook — Epoxi_by_Gi" },
              { href:"https://www.instagram.com/epoxiebarbantebygi?igsh=MTdpdjh6anRvcngxbg==", icon:"📸", text:"Instagram — @epoxiebarbantebygi" },
              { href:"tel:+351916943697", icon:"📞", text:"+351 91 69 43 697", last:true },
            ].map(({ href, icon, text, last }) => (
              <a key={href} href={href} target={href.startsWith("tel") ? undefined : "_blank"} rel="noopener"
                style={{ ...lnk, ...(last ? { borderBottom:"none" } : {}) }}
                onMouseEnter={e => e.currentTarget.style.color = isMadeira ? textColorHover_wood : "#9EEAF9"}
                onMouseLeave={e => e.currentTarget.style.color = textColor}
              ><span style={{ fontSize:20 }}>{icon}</span>{text}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer({ theme }) {
  const isEpoxi = theme === "epoxi";
  return (
    <footer style={{ textAlign:"center", padding:"22px 24px", borderTop:`1px solid ${isEpoxi ? "rgba(0,184,255,.1)" : "rgba(212,168,85,.1)"}`, color:"rgba(245,232,215,.3)", fontSize:13, fontFamily:"'Nunito',sans-serif" }}>
      © Ideias Maravilha · Desenvolvido por Rafael Maia (+33 6 51 61 65 36)
    </footer>
  );
}

// ── Reviews section ──────────────────────────────────────────────────────────
function ReviewsSection({ theme, reviews, onSubmit }) {
  const [form, setForm] = useState({ name:"", comment:"", rating:0 });
  const [submitted, setSubmitted] = useState(false);
  const isEpoxi = theme === "epoxi";
  const accent = isEpoxi ? "#9EEAF9" : "#D4A855";
  const border = isEpoxi ? "rgba(0,184,255,.15)" : "rgba(212,168,85,.2)";
  const cardBg = "rgba(255,255,255,.04)";
  const inputStyle = { width:"100%", padding:"12px 16px", borderRadius:8, background:"rgba(255,255,255,.06)", border:`1px solid ${border}`, color:"#F5E8D7", fontSize:15, boxSizing:"border-box", outline:"none", fontFamily:"'Nunito',sans-serif" };
  const labelStyle = { display:"block", fontSize:12, color:"rgba(245,232,215,.5)", marginBottom:8, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase" };

  const doSubmit = () => {
    if (!form.name.trim() || !form.comment.trim() || !form.rating) return;
    onSubmit({ ...form, date: new Date().toLocaleDateString("pt-PT"), id: Date.now() });
    setForm({ name:"", comment:"", rating:0 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div id="reviews" style={{ padding:"80px 24px", borderTop:`1px solid ${border}` }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:44, fontWeight:400, textAlign:"center", marginBottom:16, color:accent }}>Avaliações</h2>
        <Divider color={accent} />

        {/* Form */}
        <div style={{ background:cardBg, border:`1px solid ${border}`, borderRadius:16, padding:32, marginBottom:40, backdropFilter:"blur(8px)" }}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, color:accent, marginBottom:24 }}>Deixe a sua avaliação</h3>
          <div style={{ marginBottom:16 }}>
            <label style={labelStyle}>Nome e Apelido</label>
            <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="O seu nome…" style={inputStyle} />
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={labelStyle}>Nota</label>
            <Stars value={form.rating} onChange={v=>setForm(f=>({...f,rating:v}))} />
          </div>
          <div style={{ marginBottom:24 }}>
            <label style={labelStyle}>Comentário</label>
            <textarea value={form.comment} onChange={e=>setForm(f=>({...f,comment:e.target.value}))} placeholder="Partilhe a sua experiência…" rows={4} style={{...inputStyle,resize:"vertical"}} />
          </div>
          <button onClick={doSubmit} style={{ background: isEpoxi ? "linear-gradient(135deg,#0055BB,#7B2FBE)" : "linear-gradient(135deg,#7B4A2D,#D4A855)", color:"#fff", border:"none", padding:"13px 32px", borderRadius:30, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'Nunito',sans-serif", letterSpacing:".04em", transition:"opacity .2s" }}
            onMouseEnter={e=>e.target.style.opacity=".82"} onMouseLeave={e=>e.target.style.opacity="1"}>
            ✓ Publicar Avaliação
          </button>
          {submitted && <p style={{ color:"#4CAF50", marginTop:12, fontSize:15 }}>✓ Avaliação publicada com sucesso!</p>}
        </div>

        {/* List */}
        {reviews.length === 0
          ? <p style={{ textAlign:"center", color:"rgba(245,232,215,.35)", fontSize:16 }}>Ainda não há avaliações. Seja o primeiro!</p>
          : <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {reviews.map(r => (
                <div key={r.id} style={{ background:cardBg, border:`1px solid ${border}`, borderRadius:12, padding:"18px 24px", backdropFilter:"blur(8px)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6, flexWrap:"wrap", gap:6 }}>
                    <div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:accent, marginBottom:4 }}>{r.name}</div>
                      <Stars value={r.rating} readOnly />
                    </div>
                    <span style={{ color:"rgba(245,232,215,.35)", fontSize:13 }}>{r.date}</span>
                  </div>
                  <p style={{ color:"rgba(245,232,215,.8)", fontSize:15, lineHeight:1.75, margin:0, marginTop:10 }}>{r.comment}</p>
                </div>
              ))}
            </div>
        }
      </div>
    </div>
  );
}

// ── Category card ─────────────────────────────────────────────────────────────
function CatCard({ cat, navigate, theme, index }) {
  const isEpoxi = theme === "epoxi";
  const [hov, setHov] = useState(false);
  const coverSrc = `${BASE}${cat.folder}/${cat.prefix}1.jpg`;
  return (
    <div
      onClick={() => navigate(cat.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius:16, overflow:"hidden", cursor:"pointer",
        background: isEpoxi ? "rgba(255,255,255,.04)" : "#fff",
        border: isEpoxi ? "1px solid rgba(0,184,255,.15)" : "1px solid rgba(139,90,43,.15)",
        boxShadow: hov
          ? (isEpoxi ? "0 18px 50px rgba(0,120,200,.3)" : "0 18px 50px rgba(100,60,20,.22)")
          : (isEpoxi ? "0 4px 20px rgba(0,0,0,.5)" : "0 4px 20px rgba(100,60,20,.1)"),
        transform: hov ? "translateY(-6px)" : "none",
        transition: "all .3s ease",
        animation: `fadeUp .4s ease ${Math.min(index*0.06, .5)}s both`,
        backdropFilter: isEpoxi ? "blur(8px)" : "none",
      }}
    >
      <div style={{ height:200, overflow:"hidden", position:"relative" }}>
        <img src={coverSrc} alt={cat.label} style={{ width:"100%", height:"100%", objectFit:"cover", transform: hov ? "scale(1.07)" : "scale(1)", transition:"transform .4s ease", opacity: isEpoxi ? .85 : 1 }} />
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom,transparent 40%,${isEpoxi?"rgba(4,13,26,.8)":"rgba(44,24,16,.55)"})` }} />
        {isEpoxi && <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(123,47,190,.2),rgba(0,184,255,.15),transparent)", backgroundSize:"400% 400%", animation:"epoxiFlow 6s ease infinite" }} />}
        <div style={{ position:"absolute", bottom:12, left:14, fontSize:28 }}>{cat.icon}</div>
      </div>
      <div style={{ padding:"16px 20px 22px" }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color: isEpoxi ? "#E0F0FF" : "#2C1810", marginBottom:6 }}>{cat.label}</h3>
        <p style={{ fontSize:13, color: isEpoxi ? "rgba(158,234,249,.5)" : "#8B6040", marginBottom:12 }}>{cat.count} criações</p>
        <span style={{ display:"inline-block", background: isEpoxi ? "rgba(0,184,255,.1)" : "#F5E8D7", color: isEpoxi ? "#9EEAF9" : "#6B3D2E", border: isEpoxi ? "1px solid rgba(0,184,255,.3)" : "1px solid rgba(139,90,43,.3)", padding:"6px 14px", borderRadius:20, fontSize:13, fontWeight:700 }}>Ver galeria →</span>
      </div>
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ isEpoxi, title, subtitle, backLabel, onBack }) {
  return (
    <div style={{ padding:"52px 24px", textAlign:"center", background: isEpoxi ? "linear-gradient(135deg,#040D1A,#0A1535,#040D1A)" : "linear-gradient(135deg,#2C1810,#4A2510,#3D1F0A)", position:"relative", overflow:"hidden" }}>
      {isEpoxi
        ? <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(123,47,190,.22),rgba(0,100,200,.2),rgba(0,184,255,.15),rgba(123,47,190,.22))", backgroundSize:"400% 400%", animation:"epoxiFlow 8s ease infinite" }} />
        : <div style={{ position:"absolute", inset:0, opacity:.07, backgroundImage:"repeating-linear-gradient(93deg,transparent 0,transparent 2px,rgba(212,168,85,1) 2px,rgba(212,168,85,1) 3px)" }} />
      }
      <div style={{ position:"relative", zIndex:1 }}>
        <button onClick={onBack} style={{ background:"transparent", border:`1px solid ${isEpoxi?"rgba(0,184,255,.3)":"rgba(212,168,85,.4)"}`, color: isEpoxi?"#9EEAF9":"#D4A855", padding:"8px 18px", borderRadius:20, cursor:"pointer", marginBottom:24, fontSize:14, fontFamily:"'Nunito',sans-serif" }}>← {backLabel}</button>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(40px,6vw,72px)", fontWeight:400, letterSpacing:".05em", marginBottom:10, ...(isEpoxi ? { background:"linear-gradient(135deg,#9EEAF9,#7B2FBE,#00B8CC)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" } : { color:"#F5E8D7" }) }}>{title}</h1>
        {subtitle && <p style={{ fontSize:17, color: isEpoxi?"rgba(158,234,249,.6)":"rgba(245,232,215,.6)" }}>{subtitle}</p>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [lb, setLb] = useState({ images:[], index:null });
  const [reviews, setReviews] = useState([]);

  // Load font + reviews
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Nunito:wght@300;400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    (async () => {
      try {
        const r = await window.storage.get("imreviews");
        if (r?.value) setReviews(JSON.parse(r.value));
      } catch {}
    })();
    return () => document.head.removeChild(link);
  }, []);

  const navigate = p => { setPage(p); window.scrollTo(0, 0); };
  const openLb = (images, index) => setLb({ images, index });
  const closeLb = () => setLb({ images:[], index:null });
  const prevImg = () => setLb(l => ({...l, index:(l.index-1+l.images.length)%l.images.length}));
  const nextImg = () => setLb(l => ({...l, index:(l.index+1)%l.images.length}));

  const addReview = async (r) => {
    const next = [r, ...reviews];
    setReviews(next);
    try { await window.storage.set("imreviews", JSON.stringify(next)); } catch {}
  };

  const currentMCat = MADEIRA_CATS.find(c => c.id === page);
  const currentECat = EPOXI_CATS.find(c => c.id === page);
  const currentCat = currentMCat || currentECat;
  const isEpoxiPage = page === "epoxi" || !!currentECat;
  const theme = page === "epoxi" || currentECat ? "epoxi" : "madeira";

  const globalStyle = {
    fontFamily:"'Nunito',sans-serif",
    color:"#F5E8D7",
    background: isEpoxiPage ? "#040D1A" : (page === "home" || page === "reviews" || page === "contact") ? "#1A0E07" : "#F5E8D7",
    minHeight:"100vh",
  };

  // ── Styles tag ───────────────────────────────────────────────────────────────
  const css = `
    *{box-sizing:border-box;margin:0;padding:0}
    @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
    @keyframes epoxiFlow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes pulseGlow{0%,100%{opacity:.5}50%{opacity:1}}
    img{display:block}
    a{transition:color .2s}
  `;

  // ── HOME ─────────────────────────────────────────────────────────────────────
  if (page === "home") return (
    <div style={globalStyle}>
      <style>{css}</style>
      <Navbar theme="home" navigate={navigate} />

      {/* HERO */}
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"60px 24px", background:"radial-gradient(ellipse at 30% 60%,rgba(100,60,20,.45) 0%,transparent 60%),radial-gradient(ellipse at 70% 40%,rgba(50,10,100,.25) 0%,transparent 55%),#1A0E07", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, opacity:.06, backgroundImage:"repeating-linear-gradient(94deg,transparent 0,transparent 2px,rgba(212,168,85,1) 2px,rgba(212,168,85,1) 3px),repeating-linear-gradient(180deg,transparent 0,transparent 22px,rgba(212,168,85,.5) 22px,rgba(212,168,85,.5) 23px)" }} />
        <div style={{ textAlign:"center", animation:"fadeUp .9s ease both", position:"relative", zIndex:1 }}>
          <img src={LOGO} alt="Ideias Maravilha" style={{ width:130, height:130, borderRadius:"50%", objectFit:"cover", marginBottom:28, boxShadow:"0 0 50px rgba(212,168,85,.4),0 8px 40px rgba(0,0,0,.6)", border:"3px solid rgba(212,168,85,.45)" }} />
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(52px,9vw,100px)", fontWeight:300, letterSpacing:".08em", background:"linear-gradient(135deg,#A0752A,#F5E8D7,#D4A855,#8B5A14)", backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"shimmer 4s linear infinite", marginBottom:10, lineHeight:1.05 }}>
            Ideias Maravilha
          </h1>
          <p style={{ color:"rgba(245,232,215,.55)", fontSize:18, letterSpacing:".2em", textTransform:"uppercase", fontWeight:300, marginBottom:64 }}>Artesanato em Madeira & Resina de Epóxi</p>
        </div>

        {/* Choice cards */}
        <div style={{ display:"flex", gap:28, flexWrap:"wrap", justifyContent:"center", zIndex:1, animation:"fadeUp .9s ease .25s both" }}>
          {/* Madeira */}
          <ChoiceCard
            theme="madeira"
            title="Madeira"
            icon="🪵"
            coverSrc={`${BASE}img/maquina1.jpg`}
            desc="Peças únicas esculpidas à mão com a beleza natural da madeira"
            onClick={() => navigate("madeira")}
          />
          {/* Epóxi */}
          <ChoiceCard
            theme="epoxi"
            title="Epóxi"
            icon="💎"
            coverSrc={`${BASE}Page_19/joias1.jpg`}
            desc="Jóias e peças deslumbrantes em resina translúcida de epóxi"
            onClick={() => navigate("epoxi")}
          />
        </div>
      </div>

      {/* SOBRE NÓS */}
      <div style={{ padding:"80px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:46, fontWeight:400, textAlign:"center", marginBottom:16, color:"#D4A855" }}>Sobre Nós</h2>
          <Divider />
          <div style={{ display:"flex", gap:48, flexWrap:"wrap", alignItems:"center" }}>
            <div style={{ flex:"1 1 300px" }}>
              <p style={{ color:"rgba(245,232,215,.85)", fontSize:17, lineHeight:1.9, marginBottom:20 }}>
                A <strong style={{ color:"#D4A855" }}>Ideias Maravilha</strong> é uma empresa artesanal criada com paixão e dedicação ao detalhe. Especializados na criação de peças únicas em <strong style={{ color:"#C4905A" }}>madeira</strong> e <strong style={{ color:"#9EEAF9" }}>resina de epóxi</strong>, cada criação é um reflexo do talento e do amor pelo artesanato.
              </p>
              <p style={{ color:"rgba(245,232,215,.7)", fontSize:16, lineHeight:1.9, marginBottom:20 }}>
                Com anos de experiência, transformamos ideias em objetos que ficam para sempre — presentes personalizados, recordações de momentos especiais, decoração única para a sua casa ou escritório.
              </p>
              <p style={{ color:"rgba(245,232,215,.7)", fontSize:16, lineHeight:1.9 }}>
                A nossa missão é simples: unir criatividade, sustentabilidade e o verdadeiro espírito do artesanato em cada peça, com atenção e cuidado em cada pormenor.
              </p>
            </div>
            <div style={{ flex:"1 1 300px", display:"flex", gap:14 }}>
              {[BASE+"img/maquina1.jpg", BASE+"img/maquina2.jpg"].map((src,i) => (
                <img key={i} src={src} alt="Ateliê" style={{ flex:1, borderRadius:14, objectFit:"cover", height:290, boxShadow:"0 8px 40px rgba(0,0,0,.6)", border:"1px solid rgba(212,168,85,.15)" }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SAMPLE GALLERY */}
      <div style={{ padding:"40px 24px 80px", borderTop:"1px solid rgba(212,168,85,.1)", background:"rgba(255,255,255,.015)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:42, fontWeight:400, textAlign:"center", marginBottom:16, color:"#D4A855" }}>Algumas Criações</h2>
          <Divider />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:12 }}>
            {HOME_SAMPLE.map((src,i) => (
              <GalleryImg key={i} src={src} alt={`Criação ${i+1}`} onClick={() => openLb(HOME_SAMPLE, i)} theme="home" />
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <ReviewsSection theme="home" reviews={reviews} onSubmit={addReview} />

      {/* CONTACT */}
      <ContactSection theme="home" />
      <Footer theme="home" />

      {lb.index !== null && <Lightbox images={lb.images} index={lb.index} onClose={closeLb} onPrev={prevImg} onNext={nextImg} />}
    </div>
  );

  // ── REVIEWS PAGE ─────────────────────────────────────────────────────────────
  if (page === "reviews") return (
    <div style={globalStyle}>
      <style>{css}</style>
      <Navbar theme="home" navigate={navigate} />
      <ReviewsSection theme="home" reviews={reviews} onSubmit={addReview} />
      <Footer theme="home" />
    </div>
  );

  // ── CONTACT PAGE ──────────────────────────────────────────────────────────────
  if (page === "contact") return (
    <div style={globalStyle}>
      <style>{css}</style>
      <Navbar theme="home" navigate={navigate} />
      <ContactSection theme="home" />
      <Footer theme="home" />
    </div>
  );

  // ── MADEIRA HUB ───────────────────────────────────────────────────────────────
  if (page === "madeira") return (
    <div style={{ ...globalStyle, background:"#F5E8D7", color:"#2C1810", backgroundImage:"repeating-linear-gradient(93deg,transparent 0,transparent 3px,rgba(139,90,43,.025) 3px,rgba(139,90,43,.025) 4px),repeating-linear-gradient(178deg,transparent 0,transparent 28px,rgba(100,60,20,.03) 28px,rgba(100,60,20,.03) 29px)" }}>
      <style>{css}</style>
      <Navbar theme="madeira" navigate={navigate} />
      <SectionHeader isEpoxi={false} title="🪵 Madeira" subtitle="Descubra as nossas criações artesanais em madeira" backLabel="Início" onBack={()=>navigate("home")} />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"48px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))", gap:24 }}>
          {MADEIRA_CATS.map((cat,i) => <CatCard key={cat.id} cat={cat} navigate={navigate} theme="madeira" index={i} />)}
        </div>
      </div>
      <ContactSection theme="madeira" />
      <Footer theme="madeira" />
    </div>
  );

  // ── EPÓXI HUB ────────────────────────────────────────────────────────────────
  if (page === "epoxi") return (
    <div style={{ ...globalStyle, background:"#040D1A", color:"#E0F0FF" }}>
      <style>{css}</style>
      <Navbar theme="epoxi" navigate={navigate} />
      <SectionHeader isEpoxi={true} title="💎 Epóxi" subtitle="Criações deslumbrantes em resina translúcida de epóxi" backLabel="Início" onBack={()=>navigate("home")} />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"48px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))", gap:24 }}>
          {EPOXI_CATS.map((cat,i) => <CatCard key={cat.id} cat={cat} navigate={navigate} theme="epoxi" index={i} />)}
        </div>
      </div>
      <ContactSection theme="epoxi" />
      <Footer theme="epoxi" />
    </div>
  );

  // ── CATEGORY PAGE ─────────────────────────────────────────────────────────────
  if (currentCat) {
    const isEpoxi = !!currentECat;
    const images = catImages(currentCat);
    const catTheme = isEpoxi ? "epoxi" : "madeira";
    const pageBg = isEpoxi ? "#040D1A" : "#F5E8D7";
    const pageColor = isEpoxi ? "#E0F0FF" : "#2C1810";
    const woodBg = isEpoxi ? {} : { backgroundImage:"repeating-linear-gradient(93deg,transparent 0,transparent 3px,rgba(139,90,43,.025) 3px,rgba(139,90,43,.025) 4px)" };

    return (
      <div style={{ ...globalStyle, background:pageBg, color:pageColor, ...woodBg }}>
        <style>{css}</style>
        <Navbar theme={catTheme} navigate={navigate} />
        <SectionHeader
          isEpoxi={isEpoxi}
          title={`${currentCat.icon} ${currentCat.label}`}
          subtitle={`${images.length} criações · Clique numa imagem para ver em tamanho grande`}
          backLabel={isEpoxi ? "Epóxi" : "Madeira"}
          onBack={() => navigate(isEpoxi ? "epoxi" : "madeira")}
        />
        <div style={{ maxWidth:1400, margin:"0 auto", padding:"40px 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:12 }}>
            {images.map((src,i) => (
              <GalleryImg key={i} src={src} alt={`${currentCat.label} ${i+1}`} onClick={()=>openLb(images,i)} theme={catTheme} delay={Math.min(i*.018,.35)} />
            ))}
          </div>
        </div>
        <ContactSection theme={catTheme} />
        <Footer theme={catTheme} />
        {lb.index !== null && <Lightbox images={lb.images} index={lb.index} onClose={closeLb} onPrev={prevImg} onNext={nextImg} />}
      </div>
    );
  }

  return null;
}

// ── Choice card (landing) ────────────────────────────────────────────────────
function ChoiceCard({ theme, title, icon, coverSrc, desc, onClick }) {
  const [hov, setHov] = useState(false);
  const isEpoxi = theme === "epoxi";
  return (
    <div
      onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        width:"min(370px,90vw)", borderRadius:22, overflow:"hidden", cursor:"pointer",
        background: isEpoxi ? "linear-gradient(160deg,#040D1A,#0A1535,#0E2355,#040D1A)" : "linear-gradient(160deg,#3D1F0A,#6B3D2E,#8B5E3C,#4A2510)",
        border: isEpoxi ? "1px solid rgba(0,184,255,.2)" : "1px solid rgba(212,168,85,.3)",
        boxShadow: hov ? (isEpoxi?"0 28px 80px rgba(0,120,200,.4)":"0 28px 80px rgba(212,168,85,.3)") : "0 18px 60px rgba(0,0,0,.65)",
        transform: hov ? "translateY(-8px) scale(1.02)" : "none",
        transition:"all .4s ease",
        position:"relative",
      }}
    >
      {isEpoxi && <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(123,47,190,.18),rgba(0,100,200,.18),rgba(0,184,255,.12),rgba(123,47,190,.18))", backgroundSize:"400% 400%", animation:"epoxiFlow 6s ease infinite", zIndex:0 }} />}
      <div style={{ height:230, overflow:"hidden", position:"relative", zIndex:1 }}>
        <img src={coverSrc} alt={title} style={{ width:"100%", height:"100%", objectFit:"cover", opacity: isEpoxi ? .65 : .72, transform: hov ? "scale(1.07)" : "scale(1)", transition:"transform .5s ease" }} />
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom,transparent 35%,${isEpoxi?"#040D1A":"#3D1F0A"})` }} />
      </div>
      <div style={{ padding:"26px 28px 30px", textAlign:"center", position:"relative", zIndex:1 }}>
        <div style={{ fontSize:46, marginBottom:10 }}>{icon}</div>
        <h2 style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:52, fontWeight:500,
          letterSpacing:".04em", marginBottom:10,
          ...(isEpoxi ? { background:"linear-gradient(135deg,#9EEAF9,#7B2FBE,#00B8CC)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" } : { color:"#F5E8D7" })
        }}>{title}</h2>
        <p style={{ color: isEpoxi?"rgba(158,234,249,.7)":"rgba(245,232,215,.7)", fontSize:15, lineHeight:1.65, marginBottom:22 }}>{desc}</p>
        <span style={{ display:"inline-block", background: isEpoxi?"rgba(0,184,255,.12)":"rgba(212,168,85,.18)", color: isEpoxi?"#9EEAF9":"#D4A855", border: isEpoxi?"1px solid rgba(0,184,255,.45)":"1px solid rgba(212,168,85,.5)", padding:"10px 26px", borderRadius:30, fontSize:14, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase" }}>Ver Criações →</span>
      </div>
    </div>
  );
}

// ── Gallery image ─────────────────────────────────────────────────────────────
function GalleryImg({ src, alt, onClick, theme, delay = 0 }) {
  const [hov, setHov] = useState(false);
  const isEpoxi = theme === "epoxi";
  return (
    <img
      src={src} alt={alt}
      onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        width:"100%", aspectRatio:"1", objectFit:"cover",
        borderRadius:10, cursor:"zoom-in", display:"block",
        boxShadow: hov ? (isEpoxi?"0 10px 32px rgba(0,0,0,.7)":"0 10px 32px rgba(100,60,20,.25)") : (isEpoxi?"0 4px 16px rgba(0,0,0,.5)":"0 4px 16px rgba(100,60,20,.12)"),
        border: isEpoxi ? "1px solid rgba(0,184,255,.1)" : "1px solid rgba(139,90,43,.12)",
        transform: hov ? "scale(1.04)" : "none",
        transition:"all .25s ease",
        animation: `fadeUp .35s ease ${delay}s both`,
      }}
    />
  );
}
