import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chart from 'chart.js/auto';
import './AtilimPresentation.css';

const C = {
  accent: '#3B82F6', cyan: '#06B6D4', green: '#10B981',
  amber: '#F59E0B', coral: '#EF4444', purple: '#8B5CF6',
};

/* ============= YARDIMCI BİLEŞENLER ============= */

const Badge = ({ color, children }) => (
  <span
    className="aip-badge"
    style={{
      background: `${color}1A`,
      color,
      border: `1px solid ${color}4D`,
    }}
  >
    {children}
  </span>
);

const Prompt = ({ color = C.amber, children }) => (
  <div
    style={{
      marginTop: 22,
      padding: '14px 22px',
      borderRadius: 10,
      background: `${color}14`,
      border: `1px dashed ${color}66`,
      color,
      fontStyle: 'italic',
      fontSize: 22,
      fontFamily: 'Syne, sans-serif',
    }}
  >
    💬 {children}
  </div>
);

/* Renkli yuvarlak avatar — kişi fotoğrafı yerine baş harf */
const LeaderAvatar = ({ name, color, size = 88, image }) => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: image ? '#0f172a' : `linear-gradient(135deg, ${color}, ${color}66)`,
      border: `3px solid ${color}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Syne, sans-serif', fontSize: size * 0.34, fontWeight: 800, color: '#fff',
      flexShrink: 0,
      boxShadow: `0 6px 20px ${color}55`,
      letterSpacing: '0.02em',
      overflow: 'hidden',
    }}>
      {image
        ? <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'high-quality', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }} />
        : initials}
    </div>
  );
};

/* Marka logosu — gerçek SVG path'leri (simpleicons benzeri, telifsiz stilizasyon) */
const BrandLogo = ({ brand, size = 40 }) => {
  const logos = {
    openai: { color: '#10A37F', path: 'M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.773 3.77a5.985 5.985 0 0 0-3.995 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.05 6.05 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.995-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.142-.08 4.778-2.758a.795.795 0 0 0 .393-.681v-6.737l2.02 1.168a.07.07 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.495 4.493zM3.6 18.514a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.842-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.436zM2.39 8.014a4.47 4.47 0 0 1 2.34-1.967V11.94a.766.766 0 0 0 .388.677l5.815 3.354-2.02 1.169a.076.076 0 0 1-.071 0l-4.83-2.786A4.475 4.475 0 0 1 2.39 8.014zm16.6 3.867L13.158 8.5l2.015-1.165a.076.076 0 0 1 .07 0l4.83 2.788a4.528 4.528 0 0 1-.681 8.012V12.36a.79.79 0 0 0-.402-.679zm2.01-3.023l-.142-.086-4.773-2.782a.776.776 0 0 0-.785 0L9.456 9.46V7.13a.066.066 0 0 1 .028-.062l4.83-2.787a4.522 4.522 0 0 1 6.75 4.68zM8.31 12.91l-2.02-1.164a.08.08 0 0 1-.038-.057V6.08a4.522 4.522 0 0 1 7.415-3.477l-.142.08L8.797 5.44a.795.795 0 0 0-.393.682l-.094 6.788zm1.097-2.366l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z' },
    anthropic: { color: '#D97757', path: 'M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.52zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z' },
    google: { color: '#4285F4', path: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' },
    meta: { color: '#0866FF', path: 'M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303z' },
    deepseek: { color: '#4D6BFE', path: 'M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.351-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.218-.328.141a5.388 5.388 0 0 1-1.668-1.119c-.873-.85-1.738-1.71-2.821-2.366a4.961 4.961 0 0 0-1.071-.567c-.738-.288-1.508-.484-2.296-.5-.43-.012-.86.124-1.286-.066-.262-.12-.464.155-.624.32-.184.197-.18.398.075.555.347.21.706.39 1.058.59-.282.046-.58.062-.882.082a.79.79 0 0 0-.398.097c-.434.288-.46.604-.105.93.16.144.34.276.516.394.86.566 1.792.823 2.788.829.196.001.398-.005.598.012.27.025.532.07.595.418.062.343-.121.51-.395.62-.27.107-.555.183-.829.288-.516.198-.84.567-.913 1.105-.039.286.04.5.293.706.41.34.872.41 1.366.434 1.066.05 2.1-.155 3.075-.55.28-.114.515-.245.745-.428.16-.13.297-.262.262-.515-.027-.197.062-.32.262-.305.262.02.508.014.785.025zm-7.945-3.077c.083.21.218.396.398.547.504.398 1.066.66 1.687.812.348.085.708.155 1.066.232.184.04.348.04.444-.137.097-.18.04-.351-.116-.543-.117-.144-.301-.144-.434-.234-.234-.157-.484-.234-.71-.398-.34-.246-.71-.4-1.114-.484-.246-.05-.484-.05-.726-.025-.184.02-.348.063-.488.184-.07.063-.07.137-.007.046zm.484 4.156c-.36-.012-.576-.2-.832-.358-.156-.09-.301-.176-.398-.328-.078-.121-.137-.246-.04-.39.063-.097.184-.137.282-.137.359 0 .68.144.953.398.156.137.301.317.352.555.05.234-.117.246-.317.26z' },
  };
  const logo = logos[brand];
  if (!logo) return null;
  return (
    <div style={{
      width: size, height: size, borderRadius: 10,
      background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <svg viewBox="0 0 24 24" width={size * 0.65} height={size * 0.65} fill={logo.color}>
        <path d={logo.path} />
      </svg>
    </div>
  );
};

/* Renkli ikonografik kart — emoji yerine SVG */
const IconBadge = ({ children, color, size = 56 }) => (
  <div style={{
    width: size, height: size, borderRadius: 14,
    background: `${color}26`,
    border: `2px solid ${color}66`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
    color,
  }}>
    {children}
  </div>
);

/* ---------------- SLAYT 1 — Açılış ---------------- */
const Slide1 = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, position: 'relative' }}>
    <div className="aip-orb" style={{ width: 900, height: 900, top: -260, right: -180, background: 'rgba(59,130,246,0.25)' }} />
    <div className="aip-orb" style={{ width: 600, height: 600, bottom: -200, left: -200, background: 'rgba(139,92,246,0.18)' }} />

    {/* Arka plan: nöral ağ pattern */}
    <svg style={{ position: 'absolute', top: 0, right: 0, width: 700, height: 700, opacity: 0.12, pointerEvents: 'none' }}
         viewBox="0 0 400 400">
      {[...Array(14)].map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const r = 140;
        const cx = 200 + Math.cos(angle) * r;
        const cy = 200 + Math.sin(angle) * r;
        return (
          <g key={i}>
            <line x1="200" y1="200" x2={cx} y2={cy} stroke={C.accent} strokeWidth="0.7" />
            <circle cx={cx} cy={cy} r="6" fill={C.cyan} />
          </g>
        );
      })}
      <circle cx="200" cy="200" r="14" fill={C.accent} />
    </svg>

    <div className="aip-title-xl" style={{ color: '#fff' }}>YAPAY ZEKANIN</div>
    <div className="aip-title-xl" style={{ color: C.accent }}>ÇAĞINDA OLMAK</div>
    <div style={{ width: 480, height: 3, background: 'rgba(148,163,184,0.3)', margin: '52px 0 36px' }} />
    <div className="aip-body aip-muted" style={{ fontStyle: 'italic', fontSize: 30 }}>
      Tarih, Bugün, Gelecek — Bilgisayar Mühendisleri İçin
    </div>

    {/* Sunucu kartı */}
    <div style={{
      position: 'absolute', bottom: 40, right: 0,
      display: 'flex', alignItems: 'center', gap: 18,
      background: 'rgba(15,29,59,0.7)', backdropFilter: 'blur(12px)',
      padding: '18px 26px', borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <LeaderAvatar name="Alper Bahçekapılı" color={C.accent} size={64} />
      <div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, color: '#fff' }}>Alper Bahçekapılı</div>
        <div className="aip-body aip-muted" style={{ fontSize: 18 }}>Bilgisayar Mühendisi · Nokia </div>
      </div>
    </div>

    <div className="aip-body aip-muted" style={{ marginTop: 70, fontSize: 22 }}>Mayıs 2026</div>
  </div>
);

/* ---------------- SLAYT 2 — Hook + İstatistikler + Adopsiyon Eğrisi ---------------- */
const Slide2 = () => {
  const stats = [
    { val: '900M+', label: 'Haftalık aktif ChatGPT kullanıcısı', color: C.green },
    { val: '15.000×', label: '6 yılda parametre büyümesi (GPT-1 → GPT-5)', color: C.purple },
    { val: '$200B+', label: '2025 küresel AI yatırımı', color: C.cyan },
  ];
  return (
    <>
      <div className="aip-title-lg" style={{ color: '#fff', marginBottom: 28 }}>
        Bu oda 10 yıl sonra nasıl görünecek?
      </div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {/* Sol: Adopsiyon eğrisi */}
        <div className="aip-card" style={{ padding: 28 }}>
          <div className="aip-title-md" style={{ color: C.accent, marginBottom: 14 }}>1 Milyon Kullanıcıya Ulaşma Süresi</div>
          <svg viewBox="0 0 500 280" style={{ width: '100%', height: 'auto' }}>
            {[
              { name: 'Netflix', months: 41, color: '#94a3b8' },
              { name: 'Twitter', months: 24, color: '#94a3b8' },
              { name: 'Facebook', months: 10, color: '#94a3b8' },
              { name: 'Instagram', months: 2.5, color: '#94a3b8' },
              { name: 'ChatGPT', months: 0.17, color: C.coral },
            ].map((s, i) => {
              const w = Math.max(40, (s.months / 41) * 380) * 0.8;
              return (
                <g key={i}>
                  <text x="0" y={28 + i * 48} fill="#cbd5e1" fontSize="16" fontWeight="600">{s.name}</text>
                  <rect x="100" y={14 + i * 48} width={w} height="26" rx="4" fill={s.color} opacity={s.color === C.coral ? 1 : 0.5} />
                  <text x={108 + w} y={32 + i * 48} fill="#fff" fontSize="14" fontWeight="700">
                    {s.months < 1 ? `${Math.round(s.months * 30)} gün` : `${s.months} ay`}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="aip-body" style={{ color: C.coral, fontWeight: 600, marginTop: 8, textAlign: 'center', fontSize: 20 }}>
            ChatGPT: 5 gün 🚀
          </div>
        </div>
        {/* Sağ: 3 stat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {stats.map((s, i) => (
            <div key={i} className="aip-card" style={{ borderLeft: `3px solid ${s.color}`, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="aip-stat-val" style={{ color: s.color, fontSize: 56 }}>{s.val}</div>
              <div className="aip-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <Prompt color={C.amber}>
        Sizce "Yapay Zeka" terimi ilk kez hangi yılda kullanıldı?
      </Prompt>
    </>
  );
};

/* ---------------- SLAYT 3 — AI Tarih Şeridi + İkonlar ---------------- */
const Slide3 = () => {
  const events = [
    { year: '1956', name: 'Dartmouth', desc: '"AI" terimi doğdu', color: C.accent, icon: '🧠' },
    { year: '1969', name: 'Perceptrons', desc: 'Birinci AI Kışı', color: C.coral, icon: '❄️' },
    { year: '1986', name: 'Backprop', desc: 'Sinir ağları geri döndü', color: C.cyan, icon: '🔁' },
    { year: '1997', name: 'Deep Blue', desc: 'Kasparov yenildi', color: C.purple, icon: '♟️' },
    { year: '2012', name: 'AlexNet', desc: 'Deep Learning patlaması', color: C.green, icon: '🖼️' },
    { year: '2017', name: 'Transformer', desc: '"Attention is All You Need"', color: C.amber, icon: '⚡' },
    { year: '2020', name: 'GPT-3', desc: 'Few-shot devrimi', color: C.accent, icon: '📝' },
    { year: '2022', name: 'ChatGPT', desc: 'Halka açıldı', color: C.coral, icon: '💬' },
  ];
  return (
    <>
      <Badge color={C.accent}>Bölüm 1 / Tarih</Badge>
      <div className="aip-title-lg" style={{ marginTop: 14 }}>70 Yıllık Bir Yolculuk</div>
      <div style={{ flex: 1, marginTop: 30, padding: '0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 62, left: 30, right: 30, height: 4,
          background: `linear-gradient(90deg, ${C.accent}, ${C.coral}, ${C.cyan}, ${C.purple}, ${C.green}, ${C.amber}, ${C.accent}, ${C.coral})`,
          borderRadius: 2,
        }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 8, position: 'relative' }}>
          {events.map((e, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700,
                color: e.color, marginBottom: 14,
              }}>{e.year}</div>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: '#fff', border: `4px solid ${e.color}`,
                boxShadow: `0 4px 12px ${e.color}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28,
                marginBottom: 18,
              }}>{e.icon}</div>
              <div style={{ textAlign: 'center' }}>
                <div className="aip-title-md" style={{ color: e.color, fontSize: 21, marginBottom: 4 }}>{e.name}</div>
                <div className="aip-body" style={{ fontSize: 16, color: '#475569' }}>{e.desc}</div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      <div className="aip-body aip-muted" style={{ fontStyle: 'italic', fontSize: 20, marginTop: 16, textAlign: 'center' }}>
        Son 3 yılda, önceki 30 yıldan daha fazla ilerleme.
      </div>
    </>
  );
};

/* ---------------- SLAYT 4 — AI Kışları + Yıl Etiketleri ---------------- */
const Slide4 = () => {
  return (
    <>
      <Badge color={C.coral}>Bölüm 1 / Tarih</Badge>
      <div className="aip-title-lg" style={{ marginTop: 14, color: '#fff' }}>İki Kış, Bir Yaz — Bu Sefer Farklı mı?</div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 32, marginTop: 22, alignItems: 'stretch' }}>
        <div className="aip-card" style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <svg viewBox="0 0 700 360" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              <linearGradient id="curveGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={C.accent} />
                <stop offset="35%" stopColor={C.coral} />
                <stop offset="70%" stopColor={C.cyan} />
                <stop offset="100%" stopColor={C.green} />
              </linearGradient>
            </defs>
            <line x1="40" y1="310" x2="680" y2="310" stroke="#475569" strokeWidth="1.5" />
            <line x1="40" y1="30" x2="40" y2="310" stroke="#475569" strokeWidth="1.5" />
            <text x="40" y="332" fill="#94A3B8" fontSize="14" textAnchor="middle">1956</text>
            <text x="180" y="332" fill="#94A3B8" fontSize="14" textAnchor="middle">1974</text>
            <text x="320" y="332" fill="#94A3B8" fontSize="14" textAnchor="middle">1987</text>
            <text x="460" y="332" fill="#94A3B8" fontSize="14" textAnchor="middle">2012</text>
            <text x="545" y="332" fill="#94A3B8" fontSize="14" textAnchor="middle">2017</text>
            <text x="640" y="332" fill="#94A3B8" fontSize="14" textAnchor="middle">2025</text>
            <text x="20" y="180" fill="#94A3B8" fontSize="14" transform="rotate(-90 20 180)" textAnchor="middle">Yatırım / İlgi</text>

            <path
              d="M 40 290 Q 110 80, 180 280 Q 250 320, 320 280 Q 400 250, 460 170 Q 560 90, 680 40"
              fill="none" stroke="url(#curveGrad)" strokeWidth="4" strokeLinecap="round"
            />
            <circle cx="180" cy="280" r="7" fill={C.coral} />
            <text x="180" y="265" fill={C.coral} fontSize="15" fontWeight="700" textAnchor="middle">1. Kış</text>
            <circle cx="320" cy="280" r="7" fill={C.coral} />
            <text x="320" y="265" fill={C.coral} fontSize="15" fontWeight="700" textAnchor="middle">2. Kış</text>
            <circle cx="460" cy="170" r="7" fill={C.green} />
            <text x="460" y="155" fill={C.green} fontSize="15" fontWeight="700" textAnchor="middle">AlexNet</text>
            <circle cx="545" cy="108" r="7" fill={C.purple} />
            <text x="545" y="93" fill={C.purple} fontSize="15" fontWeight="700" textAnchor="middle">Transformer</text>
            <circle cx="680" cy="40" r="9" fill={C.green} />
            <text x="635" y="30" fill={C.green} fontSize="16" fontWeight="700" textAnchor="middle">Bugün ⚡</text>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
          <div className="aip-card" style={{ borderLeft: `3px solid ${C.green}`, padding: '40px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <IconBadge color={C.green}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="2" x2="9" y2="4" />
                <line x1="15" y1="2" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="22" />
                <line x1="15" y1="20" x2="15" y2="22" />
                <line x1="2" y1="9" x2="4" y2="9" />
                <line x1="2" y1="15" x2="4" y2="15" />
                <line x1="20" y1="9" x2="22" y2="9" />
                <line x1="20" y1="15" x2="22" y2="15" />
              </svg>
            </IconBadge>
            <div>
              <div className="aip-title-md" style={{ color: C.green, fontSize: 22, marginBottom: 4 }}>Hesaplama</div>
              <div className="aip-body" style={{ color: '#cbd5e1', fontSize: 18 }}>Bugün bir laptop, 2010 süper bilgisayarından güçlü.</div>
            </div>
          </div>
          <div className="aip-card" style={{ borderLeft: `3px solid ${C.cyan}`, padding: '40px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <IconBadge color={C.cyan}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
                <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
              </svg>
            </IconBadge>
            <div>
              <div className="aip-title-md" style={{ color: C.cyan, fontSize: 22, marginBottom: 4 }}>Veri</div>
              <div className="aip-body" style={{ color: '#cbd5e1', fontSize: 18 }}>İnternet 30 yılda devasa bir eğitim seti üretti.</div>
            </div>
          </div>
          <div className="aip-card" style={{ borderLeft: `3px solid ${C.amber}`, padding: '40px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <IconBadge color={C.amber}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <circle cx="3" cy="6" r="2" />
                <circle cx="21" cy="6" r="2" />
                <circle cx="3" cy="18" r="2" />
                <circle cx="21" cy="18" r="2" />
                <line x1="9" y1="11" x2="5" y2="7" />
                <line x1="15" y1="11" x2="19" y2="7" />
                <line x1="9" y1="13" x2="5" y2="17" />
                <line x1="15" y1="13" x2="19" y2="17" />
              </svg>
            </IconBadge>
            <div>
              <div className="aip-title-md" style={{ color: C.amber, fontSize: 22, marginBottom: 4 }}>Mimari</div>
              <div className="aip-body" style={{ color: '#cbd5e1', fontSize: 18 }}>Transformer: ölçeklenebilir, "emergent".</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ---------------- SLAYT 5 — Transformer + Paper Kapağı ---------------- */
const Slide5 = () => {
  const reasons = [
    { ico: '🔀', text: 'Self-attention: Her token diğer tüm tokenlara "bakabilir"', color: C.accent },
    { ico: '⚡', text: "Paralel eğitim → GPU'ların gücünden tam yararlanma", color: C.cyan },
    { ico: '📈', text: 'Ölçeklendikçe "emergent" yetenekler ortaya çıkıyor', color: C.green },
  ];
  return (
    <>
      <Badge color={C.accent}>Bölüm 2 / SOTA</Badge>
      <div className="aip-title-lg" style={{ marginTop: 14 }}>Transformer: Her Şeyin Başladığı Nokta</div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 22 }}>
        <div className="aip-card-light" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          {/* Paper kapak rozetı sol üst */}
          <div style={{
            position: 'absolute', top: 16, left: 16,
            background: '#fff', border: `2px solid ${C.accent}`, borderRadius: 8,
            padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transform: 'rotate(-3deg)',
            maxWidth: 180,
          }}>
            <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em' }}>arXiv:1706.03762</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.accent, marginTop: 4, lineHeight: 1.3 }}>Attention Is All You Need</div>
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>Vaswani et al. · 2017</div>
          </div>
          <svg viewBox="0 0 400 280" style={{ width: '100%', height: 'auto', marginTop: 30 }}>
            {['The', 'cat', 'sat', 'on', 'mat'].map((w, i) => (
              <g key={i}>
                <rect x={20 + i * 75} y="120" width="60" height="40" rx="8" fill={C.accent} />
                <text x={50 + i * 75} y="146" fill="#fff" fontSize="16" fontWeight="700" textAnchor="middle">{w}</text>
              </g>
            ))}
            {[0, 1, 2, 3, 4].map(i =>
              [0, 1, 2, 3, 4].filter(j => j !== i).map(j => (
                <line
                  key={`${i}-${j}`}
                  x1={50 + i * 75} y1="120"
                  x2={50 + j * 75} y2="120"
                  stroke={C.cyan}
                  strokeOpacity={i === 1 && (j === 0 || j === 4) ? 0.9 : 0.15}
                  strokeWidth={i === 1 && (j === 0 || j === 4) ? 2.5 : 1}
                  fill="none"
                />
              ))
            )}
            <text x="200" y="215" fill="#94A3B8" fontSize="13" textAnchor="middle" fontStyle="italic">"cat" → "The" ve "mat" en alakalı</text>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {reasons.map((r, i) => (
            <div key={i} className="aip-row" style={{ background: 'var(--light-card)', borderColor: r.color }}>
              <span style={{ fontSize: 36 }}>{r.ico}</span>
              <span className="aip-body">{r.text}</span>
            </div>
          ))}
          <Prompt color={C.coral}>
            GPT-2'nin parametre sayısı kaçtır sizce?
          </Prompt>
        </div>
      </div>
    </>
  );
};

/* ---------------- SLAYT 6 — Scaling Laws + Mini Avatarlar ---------------- */
const Slide6 = () => {
  // Bileşenin üstüne ekle:
const chartRef = React.useRef(null);
const chartInstanceRef = React.useRef(null);

const scalingModels = [
  { name: 'GPT-2',           year: 2019, params_b: 1.5,   mmlu: 26.0 },
  { name: 'GPT-3 175B',      year: 2020, params_b: 175,   mmlu: 43.9 },
  { name: 'Gopher 280B',     year: 2021, params_b: 280,   mmlu: 60.0 },
  { name: 'Jurassic-1 178B', year: 2021, params_b: 178,   mmlu: 41.8 },
  { name: 'MT-NLG 530B',     year: 2022, params_b: 530,   mmlu: 56.0 },
  { name: 'Chinchilla 70B',  year: 2022, params_b: 70,    mmlu: 67.5 },
  { name: 'PaLM 540B',       year: 2022, params_b: 540,   mmlu: 70.0 },
  { name: 'GPT-3.5',         year: 2022, params_b: 175,   mmlu: 70.0 },
  { name: 'LLaMA-1 65B',     year: 2023, params_b: 65,    mmlu: 63.4 },
  { name: 'PaLM-2',          year: 2023, params_b: 340,   mmlu: 78.3 },
  { name: 'LLaMA-2 70B',     year: 2023, params_b: 70,    mmlu: 68.9 },
  { name: 'Mistral 7B',      year: 2023, params_b: 7,     mmlu: 60.1 },
  { name: 'Claude 2',        year: 2023, params_b: 130,   mmlu: 78.5 },
  { name: 'Mixtral 8×7B',    year: 2023, params_b: 47,    mmlu: 70.6 },
  { name: 'Gemini Pro',      year: 2023, params_b: 90,    mmlu: 71.8 },
  { name: 'GPT-4',           year: 2023, params_b: 1800,  mmlu: 86.4 },
  { name: 'Gemini Ultra',    year: 2024, params_b: 1000,  mmlu: 90.0 },
  { name: 'Claude 3 Sonnet', year: 2024, params_b: 70,    mmlu: 81.5 },
  { name: 'Claude 3 Opus',   year: 2024, params_b: 200,   mmlu: 86.8 },
  { name: 'Llama 3 70B',     year: 2024, params_b: 70,    mmlu: 82.0 },
  { name: 'GPT-4o',          year: 2024, params_b: 1800,  mmlu: 88.7 },
  { name: 'Llama 3 405B',    year: 2024, params_b: 405,   mmlu: 88.0 },
  { name: 'DeepSeek-V3',     year: 2024, params_b: 671,   mmlu: 87.1 },
  { name: 'GPT-5',           year: 2025, params_b: 2000,  mmlu: 92.5 },
];

React.useEffect(() => {
  if (!chartRef.current || typeof Chart === 'undefined') return;
  if (chartInstanceRef.current) chartInstanceRef.current.destroy();

  const logParam = scalingModels.map(m => Math.log10(m.params_b * 1e9));

  const mmluColor = v => v >= 88 ? '#4ade80' : v >= 70 ? '#fbbf24' : '#f87171';

  const barColors = scalingModels.map((_, i) =>
    i === scalingModels.length - 1
      ? 'rgba(167,139,250,0.85)'
      : `rgba(99,102,241,${0.2 + (i / scalingModels.length) * 0.45})`
  );

  chartInstanceRef.current = new Chart(chartRef.current, {
    type: 'bar',
    data: {
      labels: scalingModels.map((_, i) => i + 1),
      datasets: [
        {
          label: 'Parametre (log₁₀)',
          data: logParam,
          backgroundColor: barColors,
          borderWidth: 0,
          borderRadius: 3,
          yAxisID: 'yParam',
          order: 2,
        },
        {
          label: 'MMLU %',
          data: scalingModels.map(m => m.mmlu),
          type: 'line',
          borderColor: '#4ade80',
          backgroundColor: 'transparent',
          pointBackgroundColor: scalingModels.map(m => mmluColor(m.mmlu)),
          pointBorderColor: scalingModels.map(m => mmluColor(m.mmlu)),
          pointRadius: scalingModels.map((_, i) => i === scalingModels.length - 1 ? 7 : 4),
          pointHoverRadius: 7,
          borderWidth: 2,
          tension: 0.35,
          yAxisID: 'yMMlu',
          order: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e293b',
          titleColor: '#f1f5f9',
          bodyColor: '#94a3b8',
          callbacks: {
            title: ctx => `${scalingModels[ctx[0].dataIndex].name} (${scalingModels[ctx[0].dataIndex].year})`,
            label: ctx => {
              if (ctx.datasetIndex === 0) {
                const p = scalingModels[ctx.dataIndex].params_b;
                return ` Params: ${p >= 1000 ? (p / 1000).toFixed(1) + 'T' : p + 'B'}`;
              }
              return ` MMLU: ${ctx.raw}%`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: { color: '#64748b', font: { size: 9 }, maxRotation: 0 },
          grid: { color: 'rgba(71,85,105,0.3)' },
        },
        yParam: {
          position: 'left',
          title: { display: true, text: 'params (log₁₀)', color: '#64748b', font: { size: 10 } },
          ticks: {
            color: '#64748b',
            font: { size: 9 },
            callback: v => ({ 9: '1B', 10: '10B', 11: '100B', 12: '1T', 13: '10T' })[Math.round(v)] || '',
          },
          grid: { color: 'rgba(71,85,105,0.3)' },
          min: 8.5,
          max: 13.5,
        },
        yMMlu: {
          position: 'right',
          title: { display: true, text: 'MMLU (%)', color: '#4ade80', font: { size: 10 } },
          ticks: { color: '#4ade80', font: { size: 10 }, callback: v => v + '%' },
          grid: { drawOnChartArea: false },
          min: 20,
          max: 100,
        },
      },
    },
  });

  return () => { if (chartInstanceRef.current) chartInstanceRef.current.destroy(); };
}, []);


  return (
    // JSX kısmı — orijinal yapıyı koruyarak güncellendi:
<>
  <Badge color={C.purple}>Bölüm 2 / SOTA</Badge>
  <div className="aip-title-lg" style={{ marginTop: 14, color: '#fff' }}>
    Scaling Laws: Büyüklük Önemli
  </div>
  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, marginTop: 22 }}>

    {/* Sol — grafik */}
    <div className="aip-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
        {[
          { color: 'rgba(99,102,241,0.55)', label: 'Parametre (log ölçek)', shape: 'rect' },
          { color: '#4ade80', label: 'MMLU skoru', shape: 'line' },
          { color: '#f87171', label: '<70% — zayıf', shape: 'dot' },
          { color: '#fbbf24', label: '70–87% — orta', shape: 'dot' },
          { color: '#4ade80', label: '≥88% — insan+', shape: 'dot' },
        ].map(({ color, label, shape }) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#cbd5e1', fontSize: 16 }}>
            {shape === 'rect' && <span style={{ width: 16, height: 16, borderRadius: 3, background: color, display: 'inline-block' }} />}
            {shape === 'line' && <span style={{ width: 22, height: 3, background: color, borderRadius: 2, display: 'inline-block' }} />}
            {shape === 'dot'  && <span style={{ width: 12, height: 12, borderRadius: '50%', background: color, display: 'inline-block' }} />}
            {label}
          </span>
        ))}
      </div>

      {/* Canvas */}
      <div style={{ position: 'relative', width: '100%', flex: 1, minHeight: 0 }}>
        <canvas ref={chartRef} />
      </div>

      {/* Alt not */}
      <div style={{ textAlign: 'center', color: '#64748b', fontSize: 13, fontStyle: 'italic', marginTop: 8 }}>
        rastgele = %25 · insan uzmanı ≈ %89.8 · 2025 SOTA = %92.5
      </div>
    </div>

    {/* Sağ — kartlar */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>

      {/* Formül kartı */}
      <div className="aip-card" style={{ borderLeft: `3px solid ${C.purple}` }}>
        <div className="aip-title-md" style={{ color: C.purple, marginBottom: 8 }}>Scaling Formülleri</div>
        <div className="aip-body" style={{ color: '#cbd5e1', marginBottom: 6 }}>
          Kaplan 2020 → Perf ≈ f(N, D, C)
        </div>
        <div className="aip-body" style={{ color: '#cbd5e1', marginBottom: 6 }}>
          Chinchilla 2022 → N ve D dengeli ölçeklenmeli
        </div>
        <div className="aip-body" style={{ color: C.green }}>
          2024+ → Test-time scaling: daha az param, daha çok düşün
        </div>
      </div>

      {/* Tartışma kartı */}
      <div className="aip-card" style={{ borderLeft: `3px solid ${C.amber}` }}>
        <div className="aip-title-md" style={{ color: C.amber, marginBottom: 12 }}>
          Tartışma — Pre-training bitti mi?
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
          <LeaderAvatar name="Yann LeCun" color={C.coral} size={36} />
          <div>
            <div style={{ color: C.coral, fontWeight: 700, fontSize: 16 }}>✗ LeCun (Meta)</div>
            <div className="aip-body" style={{ color: '#cbd5e1', fontSize: 15, marginTop: 2 }}>
              "LLM'ler yetersiz — yeni mimari şart"
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
          <LeaderAvatar name="Sam Altman" color={C.green} size={36} />
          <div>
            <div style={{ color: C.green, fontWeight: 700, fontSize: 16 }}>✓ Altman (OpenAI)</div>
            <div className="aip-body" style={{ color: '#cbd5e1', fontSize: 15, marginTop: 2 }}>
              "Duvar yok — o3 ve GPT-5 bunu kanıtladı"
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <LeaderAvatar name="Dario Amodei" color={C.accent} size={36} />
          <div>
            <div style={{ color: C.accent, fontWeight: 700, fontSize: 16 }}>~ Amodei (Anthropic)</div>
            <div className="aip-body" style={{ color: '#cbd5e1', fontSize: 15, marginTop: 2 }}>
              "Scaling devam ediyor; test-time yeni yol"
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</>
  );
};

/* ---------------- SLAYT 7 — Model Arenası + Logolar ---------------- */
const Slide7 = () => {
  const models = [
    { brand: 'openai', name: 'GPT-5 / o3', org: 'OpenAI', strength: 'Reasoning & agent lideri', open: false, color: C.accent },
    { brand: 'anthropic', name: 'Claude Opus 4.7 / Sonnet 4.6', org: 'Anthropic', strength: 'Kod & uzun bağlam', open: false, color: C.purple },
    { brand: 'google', name: 'Gemini 3 Pro', org: 'Google', strength: 'Multimodal & 1M+ token', open: false, color: C.coral },
    { brand: 'meta', name: 'Llama 4', org: 'Meta', strength: 'Açık kaynak + multimodal', open: true, color: C.green },
    { brand: 'deepseek', name: 'DeepSeek V3.2 / R1', org: 'DeepSeek', strength: 'Düşük maliyetli reasoning', open: true, color: C.amber },
  ];
  return (
    <>
      <Badge color={C.accent}>Bölüm 2 / SOTA</Badge>
      <div className="aip-title-lg" style={{ marginTop: 14 }}>2024–2025: Model Arenası</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22, flex: 1 }}>
        {models.map((m, i) => (
          <div
            key={i}
            className="aip-row"
            style={{
              background: m.open ? '#f0fdf4' : 'var(--light-card)',
              borderColor: m.color,
              gap: 18,
            }}
          >
            <BrandLogo brand={m.brand} size={48} />
            <span className="aip-title-md" style={{ width: 200, color: 'var(--text-dark)' }}>{m.name}</span>
            <span className="aip-body aip-muted" style={{ width: 130 }}>{m.org}</span>
            <span className="aip-body" style={{ flex: 1, color: '#334155' }}>{m.strength}</span>
            <span
              className="aip-type-tag"
              style={{
                background: m.open ? 'rgba(16,185,129,0.12)' : 'rgba(59,130,246,0.12)',
                color: m.open ? C.green : C.accent,
              }}
            >
              {m.open ? 'Açık' : 'Kapalı'}
            </span>
          </div>
        ))}
      </div>
      <Prompt color={C.accent}>
        El kaldırın: Son bir haftada bu modellerden birini kullanan? Sadece kod için kullanan?
      </Prompt>
    </>
  );
};

/* ---------------- SLAYT 8 — Multimodal + Gerçek Örnekler ---------------- */
const Slide8 = () => {
  return (
    <>
      <Badge color={C.cyan}>Bölüm 2 / SOTA</Badge>
      <div className="aip-title-lg" style={{ marginTop: 14, color: '#fff' }}>Metin Ötesi: Görme, İşitme, Üretme</div>
      <div className="aip-grid-2" style={{ flex: 1, marginTop: 22, alignContent: 'start' }}>
        {/* Görüntü kartı */}
        <div className="aip-card" style={{ border: `1px solid ${C.accent}40`, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <span className="aip-title-md" style={{ color: C.accent, fontSize: 28 }}>🖼️ Görüntü</span>
          </div>
          <svg viewBox="0 0 320 100" style={{ width: '100%', height: 80, borderRadius: 8, background: '#0f1d3b' }}>
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
            <rect width="320" height="100" fill="url(#sky)" rx="6" />
            <circle cx="60" cy="30" r="14" fill="#fef3c7" opacity="0.9" />
            <polygon points="0,100 80,40 140,70 200,30 280,80 320,50 320,100" fill="#1e293b" opacity="0.85" />
            <polygon points="0,100 100,70 180,90 280,75 320,85 320,100" fill="#0f172a" />
          </svg>
          <div className="aip-body aip-muted" style={{ marginTop: 12, fontSize: 18 }}>FLUX.1.1 Pro, Midjourney v7, GPT Image 1.5</div>
        </div>
        {/* Video kartı */}
        <div className="aip-card" style={{ border: `1px solid ${C.cyan}40`, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <span className="aip-title-md" style={{ color: C.cyan, fontSize: 28 }}>🎬 Video</span>
          </div>
          <div style={{ position: 'relative', height: 80, background: 'linear-gradient(135deg, #1e293b, #334155)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'repeating-linear-gradient(90deg, transparent 0 60px, rgba(255,255,255,0.04) 60px 62px)' }} />
            <div style={{
              width: 0, height: 0,
              borderLeft: `24px solid ${C.cyan}`,
              borderTop: '14px solid transparent',
              borderBottom: '14px solid transparent',
              marginLeft: 8,
            }} />
            <div style={{ position: 'absolute', bottom: 8, right: 12, color: '#94a3b8', fontSize: 12 }}>0:00 / 1:00</div>
          </div>
          <div className="aip-body aip-muted" style={{ marginTop: 12, fontSize: 18 }}>Veo 3.1, Runway Gen-4.5, Pika 2.5, Kling 3.0</div>
        </div>
        {/* Ses kartı */}
        <div className="aip-card" style={{ border: `1px solid ${C.purple}40`, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <span className="aip-title-md" style={{ color: C.purple, fontSize: 28 }}>🔊 Ses</span>
          </div>
          <svg viewBox="0 0 320 80" style={{ width: '100%', height: 80, background: '#0f1d3b', borderRadius: 8 }}>
            {[...Array(40)].map((_, i) => {
              const h = 8 + Math.abs(Math.sin(i * 0.6) * 28) + Math.abs(Math.sin(i * 1.7) * 12);
              return (
                <rect
                  key={i}
                  x={8 + i * 7.5}
                  y={40 - h / 2}
                  width="4"
                  height={h}
                  rx="2"
                  fill={C.purple}
                  opacity={0.6 + (i % 3) * 0.15}
                />
              );
            })}
          </svg>
          <div className="aip-body aip-muted" style={{ marginTop: 12, fontSize: 18 }}>ElevenLabs, Whisper, MusicGen</div>
        </div>
        {/* Kod kartı */}
        <div className="aip-card" style={{ border: `1px solid ${C.green}40`, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <span className="aip-title-md" style={{ color: C.green, fontSize: 28 }}>💻 Kod</span>
          </div>
          <div style={{ background: '#0f172a', borderRadius: 8, padding: '12px 16px', fontFamily: 'monospace', fontSize: 14, lineHeight: 1.6, height: 80, overflow: 'hidden' }}>
            <div><span style={{ color: '#c084fc' }}>def</span> <span style={{ color: '#60a5fa' }}>fibonacci</span>(<span style={{ color: '#fbbf24' }}>n</span>):</div>
            <div style={{ paddingLeft: 16 }}><span style={{ color: '#c084fc' }}>if</span> n &lt;= 1: <span style={{ color: '#c084fc' }}>return</span> n</div>
            <div style={{ paddingLeft: 16 }}><span style={{ color: '#c084fc' }}>return</span> fibonacci(n-1) + fibonacci(n-2)</div>
          </div>
          <div className="aip-body aip-muted" style={{ marginTop: 12, fontSize: 18 }}>Copilot, Cursor, Claude Code</div>
        </div>
      </div>
      <div
        className="aip-card"
        style={{
          marginTop: 18,
          padding: '20px 28px',
          border: `1px solid ${C.cyan}40`,
          background: `linear-gradient(135deg, ${C.cyan}14, ${C.purple}14)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <span className="aip-title-md" style={{ color: C.cyan, fontSize: 26 }}>
            🌐 Multimodal Modeller
          </span>
          <span className="aip-body aip-muted" style={{ fontSize: 16 }}>
            tek model · birden çok modalite
          </span>
        </div>
        <div className="aip-body" style={{ color: '#cbd5e1', fontSize: 18, lineHeight: 1.5 }}>
          Tek bir model artık metin, görüntü, ses ve videoyu aynı temsil uzayında işleyebiliyor —
          girdi olarak bir resim + sesli soru alıp metin + konuşma + kod üretebiliyor.
          Örnekler: <b style={{ color: '#fff' }}>GPT-5</b>, <b style={{ color: '#fff' }}>Gemini 3 Pro</b>,
          {' '}<b style={{ color: '#fff' }}>Claude Opus 4.7</b>, <b style={{ color: '#fff' }}>Llama 4</b>.
        </div>
      </div>
      <div className="aip-body" style={{ color: C.cyan, fontStyle: 'italic', marginTop: 14, fontSize: 22, textAlign: 'center' }}>
        Modaliteler arası geçiş: bir görüntü göster → kodla cevap al
      </div>
    </>
  );
};

/* ---------------- SLAYT 9 — Chatbot → Agent + ReAct Döngüsü ---------------- */
const Slide9 = () => {
  const before = ['Tek seferlik soru-cevap', 'Bağlam sınırlı', 'Araç kullanamaz', 'Pasif — sadece cevaplar'];
  const after = ['Çok adımlı görev planlar', 'Uzun vadeli hafıza', 'Araçları çağırır (API, kod, web)', 'Aktif — hedef belirler ve eyler'];
  const tools = [
    { brand: null, symbol: 'Cu', name: 'Cursor', desc: 'AI IDE', color: C.accent },
    { brand: 'anthropic', name: 'Claude Code', desc: 'Terminal agent', color: C.amber },
    { brand: null, symbol: 'D', name: 'Devin', desc: 'Otonom yazılımcı', color: C.purple },
    { brand: null, symbol: 'M', name: 'Manus', desc: 'Genel amaçlı', color: C.green },
  ];
  return (
    <>
      <Badge color={C.amber}>Bölüm 2 / SOTA</Badge>
      <div className="aip-title-lg" style={{ marginTop: 14 }}>Chatbot'tan Agent'a: Büyük Sıçrama</div>
      <div className="aip-grid-2" style={{ marginTop: 22, alignContent: 'start' }}>
        <div className="aip-card-light">
          <div className="aip-title-md" style={{ color: '#64748b', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #cbd5e1' }}>🤖 Chatbot (Önce)</div>
          {before.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0' }}>
              <span style={{ color: '#94a3b8' }}>→</span>
              <span className="aip-body" style={{ color: '#475569' }}>{t}</span>
            </div>
          ))}
        </div>
        <div className="aip-card-light" style={{ background: '#fffbeb', border: `1px solid ${C.amber}4D` }}>
          <div className="aip-title-md" style={{ color: C.amber, marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${C.amber}26` }}>⚡ Agent (Sonra)</div>
          {after.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0' }}>
              <span style={{ color: C.amber }}>→</span>
              <span className="aip-body" style={{ color: '#1e293b' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ReAct döngü diyagramı */}
      <div style={{
        marginTop: 20, padding: '18px 24px', borderRadius: 12,
        background: `${C.amber}14`, border: `1px solid ${C.amber}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
      }}>
        <div className="aip-title-md" style={{ color: C.amber, fontSize: 22, marginRight: 14 }}>ReAct Döngüsü:</div>
        {['Planla', 'Eyle', 'Gözle'].map((step, i) => (
          <React.Fragment key={i}>
            <div style={{
              padding: '8px 18px', borderRadius: 20,
              background: '#fff', border: `2px solid ${C.amber}`,
              fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, color: C.amber,
            }}>{step}</div>
            <span style={{ color: C.amber, fontSize: 22, fontWeight: 700 }}>→</span>
          </React.Fragment>
        ))}
        <div style={{ color: C.amber, fontSize: 22, fontWeight: 700, fontFamily: 'Syne' }}>↻ Tekrar</div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        {tools.map((t, i) => (
          <div key={i} style={{ flex: 1, background: 'var(--light-card)', borderRadius: 8, padding: 14, borderLeft: `3px solid ${t.color}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            {t.brand ? (
              <BrandLogo brand={t.brand} size={36} />
            ) : (
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: t.color, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16,
              }}>{t.symbol}</div>
            )}
            <div>
              <div className="aip-title-md" style={{ color: t.color, fontSize: 20 }}>{t.name}</div>
              <div className="aip-body aip-muted" style={{ fontSize: 16 }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

/* ---------------- SLAYT 10 — Benchmarklar + İnsan Baseline ---------------- */
const Slide10 = () => {
  const points = [
    { x: 80, y: 325, label: '2023 başı', val: '%2' },
    { x: 240, y: 282, label: '2024 başı', val: '%20' },
    { x: 400, y: 210, label: '2024 sonu', val: '%50' },
    { x: 560, y: 162, label: '2025', val: '%70+' },
  ];
  const benchmarks = [
    { name: 'MMLU', detail: 'Genel bilgi (57 konu)', score: '%92', color: C.accent },
    { name: 'ARC-AGI', detail: 'Sembolik akıl yürütme', score: '%87', color: C.purple },
    { name: 'FrontierMath', detail: 'Uzman seviyesi matematik', score: '%25+', color: C.coral },
    { name: 'HumanEval', detail: 'Python kodlama', score: '%95+', color: C.green },
  ];
  // İnsan baseline: %90 → y = 330 - (90 * 2.4) = 330 - 216 = 114
  const humanY = 114;
  return (
    <>
      <Badge color={C.green}>Bölüm 2 / SOTA</Badge>
      <div className="aip-title-lg" style={{ marginTop: 14, color: '#fff' }}>Sayılarla Yetenek: Bir Yılda %2 → %70</div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, marginTop: 22 }}>
        <div className="aip-card" style={{ padding: 28 }}>
          <div className="aip-title-md" style={{ color: C.green, marginBottom: 12 }}>SWE-bench Verified — Gerçek GitHub Issue Çözme</div>
          <svg viewBox="0 0 700 360" style={{ width: '100%', height: 'auto' }}>
            <line x1="50" y1="330" x2="680" y2="330" stroke="#475569" strokeWidth="1.5" />
            <line x1="50" y1="40" x2="50" y2="330" stroke="#475569" strokeWidth="1.5" />
            {[0, 25, 50, 75, 100].map((v, i) => {
              const y = 330 - (v * 2.4);
              return (
                <g key={i}>
                  <line x1="48" y1={y} x2="52" y2={y} stroke="#94a3b8" />
                  <text x="36" y={y + 4} fill="#94a3b8" fontSize="13" textAnchor="end">{v}%</text>
                </g>
              );
            })}
            {/* İnsan baseline */}
            <line x1="50" y1={humanY} x2="680" y2={humanY} stroke={C.coral} strokeWidth="2" strokeDasharray="8 6" opacity="0.7" />
            <text x="660" y={humanY - 8} fill={C.coral} fontSize="14" fontWeight="700" textAnchor="end">İnsan baseline ~%90</text>

            <path
              d={`M ${points.map(p => `${p.x} ${p.y}`).join(' L ')} L ${points[points.length-1].x} 330 L ${points[0].x} 330 Z`}
              fill={C.green} fillOpacity="0.15"
            />
            <path
              d={`M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`}
              fill="none" stroke={C.green} strokeWidth="3"
            />
            {points.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="8" fill={C.green} stroke="#fff" strokeWidth="3" />
                <text x={p.x} y={p.y - 16} fill="#fff" fontSize="18" fontWeight="700" textAnchor="middle">{p.val}</text>
                <text x={p.x} y="354" fill="#cbd5e1" fontSize="13" textAnchor="middle">{p.label}</text>
              </g>
            ))}
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {benchmarks.map((b, i) => (
            <div key={i} className="aip-card" style={{ borderLeft: `3px solid ${b.color}`, padding: '18px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="aip-title-md" style={{ color: b.color, fontSize: 22 }}>{b.name}</div>
                <div style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 800, color: '#fff' }}>{b.score}</div>
              </div>
              <div className="aip-body aip-muted" style={{ fontSize: 16, marginTop: 4 }}>{b.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/* ---------------- SLAYT 11 — Yazılımcı + İllüstrasyon ---------------- */
const Slide11 = () => {
  const automated = [
    'Boilerplate kod, syntax',
    'Test yazma & coverage',
    'Debug & hata tanılama',
    'Dokümantasyon yazma',
    'Code review (ilk geçiş)',
  ];
  const human = [
    'Mimari & sistem tasarımı',
    'Problemi formüle etmek',
    'Ürün & kullanıcı kararları',
    'Yargı, etik, sorumluluk',
    'Ekip & paydaş yönetimi',
  ];
  return (
    <>
      <Badge color={C.coral}>Bölüm 3 / Değişim</Badge>
      <div className="aip-title-lg" style={{ marginTop: 14 }}>Yazılımcı İçin Ne Değişiyor?</div>

      {/* Üstte: Yazılımcı + AI illüstrasyonu */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20,
        background: 'rgba(239,68,68,0.08)', borderRadius: 10,
        padding: '14px 20px', border: '1px solid rgba(239,68,68,0.25)',
        marginTop: 16,
      }}>
        <svg viewBox="0 0 80 60" width="60" height="45">
          <circle cx="40" cy="20" r="10" fill={C.coral} />
          <path d="M 25 55 Q 25 35, 40 35 Q 55 35, 55 55 Z" fill={C.coral} />
        </svg>
        <span style={{ color: C.coral, fontSize: 26, fontFamily: 'Syne', fontWeight: 700 }}>+</span>
        <svg viewBox="0 0 80 60" width="60" height="45">
          <rect x="20" y="10" width="40" height="30" rx="6" fill={C.accent} />
          <circle cx="32" cy="22" r="3" fill="#fff" />
          <circle cx="48" cy="22" r="3" fill="#fff" />
          <line x1="30" y1="32" x2="50" y2="32" stroke="#fff" strokeWidth="2" />
          <line x1="40" y1="40" x2="40" y2="50" stroke={C.accent} strokeWidth="3" />
          <line x1="30" y1="50" x2="50" y2="50" stroke={C.accent} strokeWidth="3" />
        </svg>
        <span className="aip-title-md" style={{ color: C.coral, fontSize: 22 }}>= "AI bizi işsiz bırakır mı?"</span>
      </div>

      <div className="aip-grid-2" style={{ marginTop: 16, alignContent: 'start' }}>
        <div className="aip-card-light" style={{ borderLeft: `3px solid ${C.amber}` }}>
          <div className="aip-title-md" style={{ color: C.amber, marginBottom: 12 }}>🤖 AI'a devredildi</div>
          {automated.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0' }}>
              <span style={{ color: C.amber }}>→</span>
              <span className="aip-body">{t}</span>
            </div>
          ))}
        </div>
        <div className="aip-card-light" style={{ borderLeft: `3px solid ${C.green}`, background: '#f0fdf4' }}>
          <div className="aip-title-md" style={{ color: C.green, marginBottom: 12 }}>🧠 Hâlâ insan işi</div>
          {human.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0' }}>
              <span style={{ color: C.green }}>→</span>
              <span className="aip-body">{t}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        marginTop: 18, padding: '16px 24px', borderRadius: 10,
        background: `${C.cyan}14`, border: `1px solid ${C.cyan}40`,
        textAlign: 'center',
      }}>
        <span className="aip-body" style={{ color: C.cyan, fontWeight: 600, fontSize: 22 }}>
          GitHub: Copilot kullananlar <strong>%55 daha hızlı</strong>, görevlerin <strong>%88'ini</strong> başarıyor
        </span>
      </div>
    </>
  );
};

/* ---------------- SLAYT 12 — T-Şekilli Mühendis + GERÇEK T DİYAGRAMI ---------------- */
const Slide12 = () => {
  const horizontal = [
    { title: 'Temel', detail: 'Algoritma, sistem tasarımı', color: C.accent },
    { title: 'AI Tooling', detail: 'Cursor, Copilot, LangChain', color: C.purple },
    { title: 'Ürün', detail: 'Müşteri sorunu, MVP', color: C.coral },
    { title: 'İletişim', detail: 'İkna, ekip, dokümantasyon', color: C.amber },
  ];
  return (
    <>
      <Badge color={C.purple}>Bölüm 3 / Değişim</Badge>
      <div className="aip-title-lg" style={{ marginTop: 14, color: '#fff' }}>Yeni Beceri Profili: T-Şekilli Mühendis</div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, marginTop: 22 }}>
        {/* T-şekli görsel */}
        <div className="aip-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Syne', fontSize: 16, color: '#94a3b8', marginBottom: 12, letterSpacing: '0.05em' }}>GENİŞ KAPSAM</div>
          {/* Yatay kol */}
          <div style={{ display: 'flex', gap: 8, width: '100%', marginBottom: 0 }}>
            {horizontal.map((h, i) => (
              <div key={i} style={{
                flex: 1, padding: '14px 10px', textAlign: 'center',
                background: `${h.color}26`, border: `2px solid ${h.color}`,
                borderRadius: i === 0 ? '10px 0 0 0' : i === horizontal.length - 1 ? '0 10px 0 0' : 0,
              }}>
                <div style={{ fontFamily: 'Syne', fontWeight: 700, color: h.color, fontSize: 16 }}>{h.title}</div>
                <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 4 }}>{h.detail}</div>
              </div>
            ))}
          </div>
          {/* Dikey gövde */}
          <div style={{
            width: '40%', flex: 1,
            background: `linear-gradient(180deg, ${C.green}40, ${C.green}80)`,
            border: `2px solid ${C.green}`, borderTop: 'none',
            borderRadius: '0 0 10px 10px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '20px 12px', minHeight: 200,
          }}>
            <div style={{ fontFamily: 'Syne', fontSize: 14, color: '#94a3b8', letterSpacing: '0.05em', writingMode: 'vertical-rl', transform: 'rotate(180deg)', marginBottom: 14 }}>DERİNLİK</div>
            <div style={{ fontFamily: 'Syne', fontWeight: 800, color: '#fff', fontSize: 24, textAlign: 'center', marginBottom: 8 }}>Alan Derinliği</div>
            <div style={{ fontSize: 14, color: '#d1fae5', textAlign: 'center', lineHeight: 1.5 }}>
              NLP · CV · Agents<br/>Robotics · RL<br/>Sağlık · Fintech
            </div>
          </div>
        </div>
        {/* Sağ: açıklama */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
          <div className="aip-card" style={{ borderLeft: `3px solid ${C.purple}` }}>
            <div className="aip-title-md" style={{ color: C.purple, marginBottom: 8, fontSize: 24 }}>Yatay: Geniş Yetkinlik</div>
            <div className="aip-body" style={{ color: '#cbd5e1', fontSize: 18 }}>
              Mühendislik temeli + AI araçları + ürün düşüncesi + iletişim — hepsi makul seviyede.
            </div>
          </div>
          <div className="aip-card" style={{ borderLeft: `3px solid ${C.green}` }}>
            <div className="aip-title-md" style={{ color: C.green, marginBottom: 8, fontSize: 24 }}>Dikey: Bir Alanda Uzman</div>
            <div className="aip-body" style={{ color: '#cbd5e1', fontSize: 18 }}>
              Bir alt alan (NLP, CV, agents, robotics) seç ve <strong>derinleş</strong>. AI'ı uzmanlığınla birleştir.
            </div>
          </div>
          <div style={{
            padding: '14px 18px', borderRadius: 10,
            background: `${C.amber}14`, border: `1px solid ${C.amber}40`,
            textAlign: 'center',
          }}>
            <span style={{ color: C.amber, fontFamily: 'Syne', fontWeight: 700, fontSize: 18 }}>
              T-shaped = İşinizde geleceğin profili
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

/* ---------------- SLAYT 13 — Sen Ne Yapacaksın + Kaynak Logoları ---------------- */
const Slide13 = () => {
  const actions = [
    { ico: '📚', text: 'Temel al — ML/DL matematiği, Transformer mimarisi', color: C.accent },
    { ico: '🛠️', text: 'Uygula — Hugging Face, LangChain, OpenAI API', color: C.green },
    { ico: '🔬', text: 'Araştır — haftada 1 paper (arXiv, Papers With Code)', color: C.purple },
    { ico: '🌐', text: "Katıl — Kaggle, açık kaynak, hackathon, GitHub portfolyosu", color: C.cyan },
    { ico: '🎯', text: 'Odaklan — bir alt alan seç ve derinleş', color: C.amber },
  ];
  const resources = [
    { name: 'Karpathy YT', icon: '▶', color: '#FF0000' },
    { name: 'Hugging Face', icon: '🤗', color: '#FFD21E' },
    { name: 'arXiv', icon: 'X', color: '#B31B1B' },
    { name: 'Kaggle', icon: 'K', color: '#20BEFF' },
    { name: 'GitHub', icon: 'g', color: '#181717' },
  ];
  return (
    <>
      <Badge color={C.green}>Bölüm 3 / Değişim</Badge>
      <div className="aip-title-lg" style={{ color: '#fff', marginTop: 14 }}>Sen Bu Dönemde Ne Yapacaksın?</div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 28, marginTop: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {actions.map((a, i) => (
            <div
              key={i}
              className="aip-row"
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderColor: a.color,
              }}
            >
              <div style={{
                minWidth: 44, height: 44, borderRadius: '50%',
                background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Syne', fontSize: 20, fontWeight: 800, color: '#fff',
              }}>{i + 1}</div>
              <span style={{ fontSize: 28 }}>{a.ico}</span>
              <span className="aip-body" style={{ color: '#fff', fontSize: 20 }}>{a.text}</span>
            </div>
          ))}
        </div>

        {/* Sağ: Kaynak logoları sütunu */}
        <div className="aip-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 }}>
          <div className="aip-title-md" style={{ color: C.green, marginBottom: 14, fontSize: 20, textAlign: 'center' }}>📌 Bookmarklayın</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {resources.map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#0f172a', padding: '10px 14px', borderRadius: 8,
                border: `1px solid ${r.color}40`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: r.color, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 18,
                }}>{r.icon}</div>
                <span className="aip-body" style={{ color: '#fff', fontSize: 18 }}>{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Prompt color={C.green}>
        Bir saniye düşünün: mezun olduğunuzda nerede, hangi problemi çözüyor olmak istiyorsunuz?
      </Prompt>
    </>
  );
};

/* ---------------- SLAYT 14 — Liderlerden Alıntılar + AVATARLAR ---------------- */
const Slide14 = () => {
  const leaders = [
    {
      name: 'Demis Hassabis',
      role: 'DeepMind CEO · Nobel 2024',
      quote: 'AGI\'ye 5–10 yıl içinde ulaşacağımıza inanıyorum.',
      color: C.accent,
      image: '/leaders/demis-hassabis.jpg',
    },
    {
      name: 'Dario Amodei',
      role: 'Anthropic CEO',
      quote: '2026–27\'de Nobel ödüllü bilim insanlarından akıllı AI olacak.',
      color: C.purple,
      image: '/leaders/dario-amodei.jpg',
    },
    {
      name: 'Sam Altman',
      role: 'OpenAI CEO',
      quote: 'Süperzeka birkaç bin gün uzakta olabilir.',
      color: C.amber,
      image: '/leaders/sam-altman.jpg',
    },
    {
      name: 'Yann LeCun',
      role: 'Meta · Turing Ödülü',
      quote: 'LLM\'ler bir çıkmaz sokak. Bir kediye bile ulaşamaz.',
      color: C.coral,
      image: '/leaders/yann-lecun.jpg',
    },
  ];
  return (
    <>
      <Badge color={C.coral}>Bölüm 4 / Gelecek</Badge>
      <div className="aip-title-lg" style={{ marginTop: 14, color: '#fff' }}>Liderler Anlaşamıyor</div>
      <div className="aip-grid-2" style={{ flex: 1, marginTop: 22, alignContent: 'start' }}>
        {leaders.map((l, i) => (
          <div key={i} className="aip-card" style={{ border: `1px solid ${l.color}40`, position: 'relative', padding: '26px 28px' }}>
            <div style={{
              position: 'absolute', top: 16, right: 22,
              fontSize: 80, color: `${l.color}33`, fontFamily: 'Syne', lineHeight: 1,
            }}>"</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <LeaderAvatar name={l.name} color={l.color} size={120} image={l.image} />
              <div>
                <div className="aip-title-md" style={{ color: l.color, fontSize: 22, marginBottom: 2 }}>{l.name}</div>
                <div className="aip-body aip-muted" style={{ fontSize: 15 }}>{l.role}</div>
              </div>
            </div>
            <div className="aip-body" style={{ color: '#fff', fontSize: 20, fontStyle: 'italic', lineHeight: 1.5 }}>
              "{l.quote}"
            </div>
          </div>
        ))}
      </div>
      <div className="aip-body aip-muted" style={{ fontStyle: 'italic', fontSize: 20, marginTop: 18, textAlign: 'center' }}>
        Hiç kimse — gerçekten hiç kimse — sonraki 5 yılı bilmiyor. Hazırlık: temel + esneklik.
      </div>
    </>
  );
};

/* ---------------- SLAYT 15 — 2030 Vizyonu + Somut Görseller ---------------- */
const Slide15 = () => {
  const items = [
    {
      year: '2025–26', title: 'Agent Dönemi',
      detail: 'Çok adımlı görevleri otonom yürüten sistemler standart hale geliyor',
      color: C.accent,
      icon: (color) => (
        <svg viewBox="0 0 60 60" width="56" height="56">
          <circle cx="30" cy="20" r="10" fill={color} />
          <rect x="22" y="30" width="16" height="22" rx="3" fill={color} opacity="0.7" />
          <circle cx="26" cy="38" r="2" fill="#fff" />
          <circle cx="34" cy="38" r="2" fill="#fff" />
          <path d="M 45 30 Q 55 25, 50 15" fill="none" stroke={color} strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="50" cy="15" r="3" fill={color} />
        </svg>
      ),
    },
    {
      year: '2027–28', title: 'Fiziksel AI',
      detail: 'Robotik + dil modeli entegrasyonu — ev, otomotiv, lojistik',
      color: C.cyan,
      icon: (color) => (
        <svg viewBox="0 0 60 60" width="56" height="56">
          <rect x="18" y="14" width="24" height="20" rx="4" fill={color} />
          <circle cx="26" cy="22" r="2.5" fill="#fff" />
          <circle cx="34" cy="22" r="2.5" fill="#fff" />
          <line x1="26" y1="30" x2="34" y2="30" stroke="#fff" strokeWidth="1.5" />
          <line x1="30" y1="6" x2="30" y2="14" stroke={color} strokeWidth="2" />
          <circle cx="30" cy="6" r="3" fill={color} />
          <rect x="22" y="34" width="6" height="20" rx="2" fill={color} opacity="0.7" />
          <rect x="32" y="34" width="6" height="20" rx="2" fill={color} opacity="0.7" />
        </svg>
      ),
    },
    {
      year: '2029–30', title: 'Bilim Motoru',
      detail: 'AI destekli ilaç keşfi, malzeme bilimi, iklim modelleri',
      color: C.green,
      icon: (color) => (
        <svg viewBox="0 0 60 60" width="56" height="56">
          {[0, 1, 2, 3, 4].map(i => (
            <circle key={i}
              cx={30 + Math.cos((i / 5) * Math.PI * 2 + i * 0.3) * 18}
              cy={30 + Math.sin((i / 5) * Math.PI * 2 + i * 0.3) * 18}
              r="5" fill={color} opacity={0.5 + i * 0.1} />
          ))}
          <circle cx="30" cy="30" r="6" fill={color} />
          {[0, 1, 2, 3, 4].map(i => (
            <line key={i}
              x1="30" y1="30"
              x2={30 + Math.cos((i / 5) * Math.PI * 2 + i * 0.3) * 18}
              y2={30 + Math.sin((i / 5) * Math.PI * 2 + i * 0.3) * 18}
              stroke={color} strokeWidth="1" opacity="0.5" />
          ))}
        </svg>
      ),
    },
    {
      year: '2030+', title: 'AGI Tartışması',
      detail: 'Belki ulaşılmış olur, belki yeni bir kış. Belirsizlik bu işin doğası.',
      color: C.coral,
      icon: (color) => (
        <svg viewBox="0 0 60 60" width="56" height="56">
          <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="2.5" strokeDasharray="4 3" />
          <text x="30" y="38" textAnchor="middle" fontSize="28" fontFamily="Syne" fontWeight="800" fill={color}>?</text>
        </svg>
      ),
    },
  ];
  return (
    <>
      <Badge color={C.purple}>Bölüm 4 / Gelecek</Badge>
      <div className="aip-title-lg" style={{ marginTop: 14 }}>2030 Vizyonu</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, marginTop: 22 }}>
        {items.map((t, i) => (
          <div key={i} className="aip-card-light" style={{
            display: 'flex', alignItems: 'center', gap: 22,
            border: `1px solid ${t.color}40`, padding: '18px 26px',
          }}>
            <div style={{
              minWidth: 140, fontFamily: 'Syne, sans-serif',
              fontSize: 24, fontWeight: 800, color: t.color, letterSpacing: '0.04em',
            }}>
              {t.year}
            </div>
            <div style={{ width: 2, height: 56, background: `${t.color}33` }} />
            <div style={{ flex: 1 }}>
              <div className="aip-title-md" style={{ color: '#1e293b', marginBottom: 4 }}>{t.title}</div>
              <div className="aip-body" style={{ color: '#475569', fontSize: 19 }}>{t.detail}</div>
            </div>
            <div style={{
              flexShrink: 0,
              background: `${t.color}14`,
              border: `1px solid ${t.color}40`,
              borderRadius: 12,
              padding: 8,
            }}>
              {t.icon(t.color)}
            </div>
          </div>
        ))}
      </div>
      <div className="aip-body" style={{ fontStyle: 'italic', fontSize: 22, marginTop: 18, textAlign: 'center', color: C.purple }}>
        Belirsizlikte fırsat var. Kuralları siz yazacaksınız.
      </div>
    </>
  );
};

/* ---------------- SLAYT 16 — Q&A + İletişim ---------------- */
const Slide16 = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, position: 'relative' }}>
    <div className="aip-orb" style={{ width: 900, height: 900, top: -200, left: -200, background: 'rgba(16,185,129,0.2)' }} />
    <div className="aip-orb" style={{ width: 700, height: 700, bottom: -200, right: -100, background: 'rgba(139,92,246,0.18)' }} />
    <div className="aip-title-lg" style={{ color: '#fff', fontSize: 44, marginBottom: 28 }}>
      Bu çağda doğmak — ne mutlu size.
    </div>
    <div className="aip-title-xl" style={{ color: C.green, fontSize: 120 }}>SORU &</div>
    <div className="aip-title-xl" style={{ color: C.purple, fontSize: 120 }}>CEVAP</div>
    <div style={{ width: 480, height: 3, background: 'rgba(148,163,184,0.3)', margin: '36px 0' }} />
    <div className="aip-body aip-muted" style={{ fontSize: 24 }}>
      Teşekkürler. Sorularınızı bekliyorum.
    </div>

    {/* İletişim kartı */}
    <div style={{
      position: 'absolute', bottom: 40, right: 0,
      display: 'flex', alignItems: 'center', gap: 32,
      background: 'rgba(15,29,59,0.7)', backdropFilter: 'blur(12px)',
      padding: '36px 40px', borderRadius: 20,
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      {/* QR placeholder */}
      <div style={{
        width: 240, height: 240, background: '#fff', borderRadius: 12,
        padding: 12, boxSizing: 'border-box',
      }}>
        <img style={{ width: '100%', height: '100%', display: 'block' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXIAAAFyCAIAAABnRsZeAAAHH0lEQVR4nO3csY1rNxRFUY/xC3DoHtx/Ke7BoTuQUwcGMTA3/+WT1spHeiMJGwwO+PV6vX4B6Pw6/QDAu5EVICYrQExWgJisADFZAWKyAsRkBYjJChCTFSAmK0BMVoCYrAAxWQFisgLEZAWIyQoQkxUgJitATFaAmKwAMVkBYrICxGQFiMkKEJMVICYrQExWgJisADFZAWKyAsRkBYjJChCTFSAmK0BMVoCYrAAxWQFisgLEfky98W+//zH11of8/def//tv15/GzitPufP7XX+Sdz7zjqlfjtMKEJMVICYrQExWgJisADFZAWKyAsRkBYjJChAbW9mu3bkrnVphnnvfc8vgHe/3VOfcuQx2WgFisgLEZAWIyQoQkxUgJitATFaAmKwAMVkBYpeubNeeuKR8v2e+832ntrBP/H7PcVoBYrICxGQFiMkKEJMVICYrQExWgJisADFZAWKPXNl+miduf8+979T2l+9zWgFisgLEZAWIyQoQkxUgJitATFaAmKwAMVkBYla2V1hvQ8/tSnfed+3O/a4N7s/htALEZAWIyQoQkxUgJitATFaAmKwAMVkBYrICxB65sv20reTO/7uzOj23wV079/+e82m/yTWnFSAmK0BMVoCYrAAxWQFisgLEZAWIyQoQkxUgdunKdmoreaep+1l33nfqb8/xm/w+pxUgJitATFaAmKwAMVkBYrICxGQFiMkKEJMVIDa2snX35/dNfVZ33mV75x26/JvTChCTFSAmK0BMVoCYrAAxWQFisgLEZAWIyQoQG1vZnrvrdMr6me+8+fXOpezO2nXnb5/4u7qT0woQkxUgJitATFaAmKwAMVkBYrICxGQFiMkKEHvDu2zP7SyfuHfcMfVJnlu7Tu1oz/1y7vzFOq0AMVkBYrICxGQFiMkKEJMVICYrQExWgJisALGv1+s18sY7e8epe1LPPfOd77t25zc49e1/2gJ7zWkFiMkKEJMVICYrQExWgJisADFZAWKyAsRkBYiN3WX7ROduYJ26vXVqsbp252L1zpt97/ysnFaAmKwAMVkBYrICxGQFiMkKEJMVICYrQExWgNjYXbY7pm5R3XnlHXfezrv2xNtqz7nzd3WO0woQkxUgJitATFaAmKwAMVkBYrICxGQFiMkKEBtb2b7fcnTKnYvVc9/CEz1xgb3DaQWIyQoQkxUgJitATFaAmKwAMVkBYrICxGQFiD1yZXvub3d82jPvvPI5d65On/hJ7nBaAWKyAsRkBYjJChCTFSAmK0BMVoCYrAAxWQFij1zZnnvlqS3sE5eU73cP7tS9v2t37obXnFaAmKwAMVkBYrICxGQFiMkKEJMVICYrQExWgNjYynbHuT3rna+8875rU8vgqSX0lE9bYDutADFZAWKyAsRkBYjJChCTFSAmK0BMVoCYrACxj7vLdm1qObrzyuf4NCpTNyhPLXSdVoCYrAAxWQFisgLEZAWIyQoQkxUgJitATFaA2I/pB/jZnrgcnbp/d+3c2nXq03iiO2+6dVoBYrICxGQFiMkKEJMVICYrQExWgJisADFZAWKPXNneebfr1K2i5155ar+7duftrTvu/F3tcFoBYrICxGQFiMkKEJMVICYrQExWgJisADFZAWKPXNk+8dbYHefWrlOfxtStwFOe+EnucFoBYrICxGQFiMkKEJMVICYrQExWgJisADFZAWJfr9dr+hk+wtQacuo+2nP73Ttvfn3iuvccpxUgJitATFaAmKwAMVkBYrICxGQFiMkKEJMVIDa2sr1zlbhjasF5582vd+5Z77zZd21qKbvDaQWIyQoQkxUgJitATFaAmKwAMVkBYrICxGQFiP2YfoD/dueycGdJeeeq+M57Yaec+4+mltDusgXehKwAMVkBYrICxGQFiMkKEJMVICYrQExWgNilK9u1T7s39NwtqutXnrr59dxT3bl1vvOpdjitADFZAWKyAsRkBYjJChCTFSAmK0BMVoCYrACxR65sP825FebU2nVqzTz1vu+3o11zWgFisgLEZAWIyQoQkxUgJitATFaAmKwAMVkBYla2V5i6NXbHzitPrU7fb+165+3LTitATFaAmKwAMVkBYrICxGQFiMkKEJMVICYrQOyRK9s7l4VrO8/8xB3t2tSq+M4189T3e47TChCTFSAmK0BMVoCYrAAxWQFisgLEZAWIyQoQ+3q9XiNv/MTt4NrUCnNt6n3XnvhprJ17qiduyp1WgJisADFZAWKyAsRkBYjJChCTFSAmK0BMVoDY2MoWeFdOK0BMVoCYrAAxWQFisgLEZAWIyQoQkxUgJitATFaAmKwAMVkBYrICxGQFiMkKEJMVICYrQExWgJisADFZAWKyAsRkBYjJChCTFSAmK0BMVoCYrAAxWQFisgLEZAWIyQoQkxUgJitATFaAmKwAMVkBYrICxGQFiMkKEPsHPBA0Dsj4IVAAAAAASUVORK5CYII=" alt="QR code for linkedin.com/in/alper-bahcekapili/"/>
      </div>
      <div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 14 }}>İletişim</div>
        <div className="aip-body aip-muted" style={{ fontSize: 22, lineHeight: 1.7 }}>
          🔗 linkedin.com/in/alper-bahcekapili<br/>
          💻 github.com/alperbahcekapili<br/>
          ✉️ alperbah.13@gmail.com
        </div>
      </div>
    </div>
  </div>
);

const SLIDES = [
  { theme: 'dark', accent: C.accent, render: Slide1 },
  { theme: 'dark', accent: C.amber, render: Slide2 },
  { theme: 'light', accent: C.accent, render: Slide3 },
  { theme: 'dark', accent: C.coral, render: Slide4 },
  { theme: 'light', accent: C.accent, render: Slide5 },
  { theme: 'dark', accent: C.purple, render: Slide6 },
  { theme: 'light', accent: C.accent, render: Slide7 },
  { theme: 'dark', accent: C.cyan, render: Slide8 },
  { theme: 'light', accent: C.amber, render: Slide9 },
  { theme: 'dark', accent: C.green, render: Slide10 },
  { theme: 'light', accent: C.coral, render: Slide11 },
  { theme: 'dark', accent: C.purple, render: Slide12 },
  { theme: 'dark', accent: C.green, render: Slide13 },
  { theme: 'dark', accent: C.coral, render: Slide14 },
  { theme: 'light', accent: C.purple, render: Slide15 },
  { theme: 'dark', accent: C.green, render: Slide16 },
];

const AtilimPresentation = () => {
  const [idx, setIdx] = useState(0);
  const total = SLIDES.length;

  const go = useCallback((delta) => {
    setIdx((i) => Math.max(0, Math.min(total - 1, i + delta)));
  }, [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const slide = SLIDES[idx];
  const Render = slide.render;

  return (
    <div className="aip">
      <div className="aip-stage">
        <div className="aip-deck">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              className={`aip-slide ${slide.theme}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="aip-accent-bar" style={{ background: slide.accent }} />
              <Render />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="aip-arrow left"
          onClick={() => go(-1)}
          disabled={idx === 0}
          aria-label="Önceki"
        >
          ‹
        </button>
        <button
          className="aip-arrow right"
          onClick={() => go(1)}
          disabled={idx === total - 1}
          aria-label="Sonraki"
        >
          ›
        </button>

        <div className="aip-nav">
          <div className="aip-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`aip-dot ${i === idx ? 'active' : ''}`}
                onClick={() => setIdx(i)}
                aria-label={`Slayt ${i + 1}`}
              />
            ))}
          </div>
          <div className="aip-counter">{idx + 1} / {total}</div>
        </div>
      </div>
    </div>
  );
};

export default AtilimPresentation;
