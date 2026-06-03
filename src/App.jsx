import React, { useState } from 'react';

const COLORS = {
  bg: '#0f1117',
  card: '#1a1d27',
  border: '#2a2d3a',
  accent: '#4f8ef7',
  accentGlow: '#4f8ef720',
  green: '#22c55e',
  red: '#ef4444',
  yellow: '#f59e0b',
  text: '#e8eaf0',
  muted: '#6b7280',
};

const S = {
  app: { minHeight: '100vh', background: COLORS.bg, color: COLORS.text, fontFamily: "'Segoe UI', sans-serif" },
  header: { background: COLORS.card, borderBottom: `1px solid ${COLORS.border}`, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { fontSize: '20px', fontWeight: '700', color: COLORS.accent },
  nav: { display: 'flex', gap: '8px' },
  navBtn: (active) => ({ padding: '8px 18px', borderRadius: '8px', border: 'none', background: active ? COLORS.accent : 'transparent', color: active ? '#fff' : COLORS.muted, fontWeight: '500', cursor: 'pointer', fontSize: '14px' }),
  main: { padding: '32px', maxWidth: '1100px', margin: '0 auto' },
  pageTitle: { fontSize: '26px', fontWeight: '700', marginBottom: '8px' },
  pageSub: { color: COLORS.muted, fontSize: '14px', marginBottom: '28px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '18px' },
  card: { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: '14px', padding: '22px', cursor: 'pointer', transition: 'all 0.2s' },
  cardTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '8px' },
  cardMeta: { fontSize: '13px', color: COLORS.muted, marginBottom: '14px' },
  badge: (color) => ({ display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: color + '22', color: color }),
  startBtn: { marginTop: '16px', width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: COLORS.accent, color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '14px' },
  question: { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: '14px', padding: '28px', marginBottom: '20px' },
  qText: { fontSize: '17px', fontWeight: '600', marginBottom: '20px', lineHeight: '1.5' },
  option: (selected, correct, wrong) => ({ padding: '12px 16px', borderRadius: '10px', border: `1.5px solid ${wrong ? COLORS.red : correct ? COLORS.green : selected ? COLORS.accent : COLORS.border}`, background: wrong ? COLORS.red+'15' : correct ? COLORS.green+'15' : selected ? COLORS.accentGlow : 'transparent', marginBottom: '10px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.15s', color: COLORS.text }),
  progressBar: { background: COLORS.border, borderRadius: '99px', height: '6px', marginBottom: '24px', overflow: 'hidden' },
  progressFill: (pct) => ({ height: '100%', width: `${pct}%`, background: COLORS.accent, borderRadius: '99px', transition: 'width 0.3s' }),
  resultCard: { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: '16px', padding: '36px', textAlign: 'center' },
  bigScore: { fontSize: '64px', fontWeight: '800', color: COLORS.accent, lineHeight: '1' },
  statRow: { display: 'flex', justifyContent: 'center', gap: '32px', margin: '24px 0', flexWrap: 'wrap' },
  stat: { textAlign: 'center' },
  statVal: { fontSize: '22px', fontWeight: '700' },
  statLabel: { fontSize: '12px', color: COLORS.muted, marginTop: '4px' },
  retryBtn: { padding: '12px 32px', borderRadius: '10px', border: 'none', background: COLORS.accent, color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '15px', marginTop: '8px' },
};

const TESTS = [
  { id: 1, title: "Kompyuter asoslari", description: "Kompyuter qismlari va ishlash tartibi", level: "Boshlang'ich", levelColor: COLORS.green, questions: [{ q: 'Kompyuterning "miyasi" deb qaysi qism ataladi?', options: ['RAM','CPU','GPU','SSD'], answer: 1 }, { q: 'RAM nima uchun ishlatiladi?', options: ["Doimiy saqlash","Vaqtinchalik saqlash","Elektr ta'minoti","Tasvirni ko'rsatish"], answer: 1 }, { q: "Qaysi qurilma ma'lumotlarni doimiy saqlaydi?", options: ['RAM','Cache','SSD','CPU'], answer: 2 }, { q: 'Ctrl+C nima qiladi?', options: ['Ochadi','Nusxa oladi','Yopadi','Saqlaydi'], answer: 1 }, { q: 'Operatsion tizim nima?', options: ['Qurilma driveri','Kompyuterni boshqaruvchi dastur','Antivirus','Brauzer'], answer: 1 }] },
  { id: 2, title: "Internet va tarmoq", description: "Internet, brauzer va tarmoq tushunchalari", level: "O'rta", levelColor: COLORS.yellow, questions: [{ q: 'URL nima?', options: ['Dasturlash tili','Veb-manzil','Virus turi','Fayl formati'], answer: 1 }, { q: 'HTTP nima uchun ishlatiladi?', options: ['Faylni siqish','Veb-sahifalarni uzatish','Parolni shifrlash','Tarmoq ulash'], answer: 1 }, { q: 'Qaysi brauzer Google tomonidan?', options: ['Firefox','Safari','Chrome','Edge'], answer: 2 }, { q: 'IP-manzil nima?', options: ['Internet Protokol manzili','Injener Protokol','Interfeys Parametri','Ilova Portali'], answer: 0 }, { q: 'WiFi va Ethernet farqi?', options: ["Farqi yo'q","WiFi simsiz, Ethernet simli","Ethernet bepul","WiFi faqat uyda"], answer: 1 }] },
  { id: 3, title: "Kiberxavfsizlik", description: "Xavfsiz internet va ma'lumotlarni himoya", level: "Murakkab", levelColor: COLORS.red, questions: [{ q: 'Phishing nima?', options: ['Virus turi',"Aldov yo'li bilan ma'lumot olish","Parolni o'zgartirish","Fayl shifrlash"], answer: 1 }, { q: 'Kuchli parol?', options: ["Tug'ilgan yil","Ism va raqam","Katta-kichik harf, raqam va belgi","Faqat raqamlar"], answer: 2 }, { q: 'HTTPS va HTTP farqi?', options: ['HTTPS tezroq','HTTPS shifrlangan','HTTP xavfsizroq',"Farqi yo'q"], answer: 1 }, { q: 'Antivirus nima qiladi?', options: ['Internetni tezlashtiradi','Zararli dasturlarni aniqlaydi','RAM ni tozalaydi','Parolni saqlaydi'], answer: 1 }, { q: '2FA nima?', options: ['Ikki parol','Parol + qo\'shimcha tasdiqlash','Ikki hisob','Ikki brauzer'], answer: 1 }] },
  { id: 4, title: "MS Office", description: "Word, Excel va PowerPoint asoslari", level: "O'rta", levelColor: COLORS.yellow, questions: [{ q: 'Excel da yacheykalarni birlashtirish?', options: ['Merge & Center','Combine','Join','Link'], answer: 0 }, { q: 'Word da qalin (bold)?', options: ['Ctrl+I','Ctrl+U','Ctrl+B','Ctrl+G'], answer: 2 }, { q: 'PowerPoint da yangi slayd?', options: ['Ctrl+N','Ctrl+M','Ctrl+S','Ctrl+P'], answer: 1 }, { q: "Excel da yig'indi formula?", options: ['=YIGINDI()','=SUM()','=ADD()','=TOTAL()'], answer: 1 }, { q: 'Word da saqlash?', options: ['Ctrl+P','Ctrl+Z','Ctrl+S','Ctrl+A'], answer: 2 }] },
];

function TestCard({ test, onStart }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ ...S.card, borderColor: hovered ? COLORS.accent : COLORS.border, transform: hovered ? 'translateY(-2px)' : 'none' }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={S.cardTitle}>{test.title}</div>
      <div style={S.cardMeta}>{test.description}</div>
      <span style={S.badge(test.levelColor)}>{test.level}</span>
      <div style={{ fontSize: '13px', color: COLORS.muted, marginTop: '10px' }}>{test.questions.length} ta savol</div>
      <button style={S.startBtn} onClick={() => onStart(test)}>Testni boshlash →</button>
    </div>
  );
}

function QuizView({ test, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const q = test.questions[current];
  const pct = (current / test.questions.length) * 100;

  function choose(i) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.answer) setScore(s => s + 1);
  }

  function next() {
    if (current + 1 < test.questions.length) {
      setCurrent(c => c + 1); setSelected(null); setAnswered(false);
    } else {
      onFinish({ score: selected === q.answer ? score + 1 : score, total: test.questions.length, test });
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: '600' }}>{test.title}</div>
        <div style={{ fontSize: '14px', color: COLORS.muted }}>{current + 1} / {test.questions.length}</div>
      </div>
      <div style={S.progressBar}><div style={S.progressFill(pct)} /></div>
      <div style={S.question}>
        <div style={S.qText}>{current + 1}. {q.q}</div>
        {q.options.map((opt, i) => (
          <div key={i} style={S.option(selected === i, answered && i === q.answer, answered && selected === i && i !== q.answer)} onClick={() => choose(i)}>
            <span style={{ marginRight: '10px', color: COLORS.muted, fontWeight: '600' }}>{['A','B','C','D'][i]}.</span>{opt}
          </div>
        ))}
        {answered && <button style={S.startBtn} onClick={next}>{current + 1 < test.questions.length ? 'Keyingisi →' : "Natijani ko'rish →"}</button>}
      </div>
    </div>
  );
}

function ResultView({ result, onBack, onRetry }) {
  const pct = Math.round((result.score / result.total) * 100);
  const color = pct >= 80 ? COLORS.green : pct >= 50 ? COLORS.yellow : COLORS.red;
  return (
    <div style={S.resultCard}>
      <div style={{ fontSize: '48px', marginBottom: '12px' }}>{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}</div>
      <div style={{ ...S.bigScore, color }}>{pct}%</div>
      <div style={{ fontSize: '16px', color: COLORS.muted, margin: '8px 0 24px' }}>{result.test.title} — yakuniy natija</div>
      <div style={S.statRow}>
        <div style={S.stat}><div style={{ ...S.statVal, color: COLORS.green }}>{result.score}</div><div style={S.statLabel}>To'g'ri</div></div>
        <div style={S.stat}><div style={{ ...S.statVal, color: COLORS.red }}>{result.total - result.score}</div><div style={S.statLabel}>Noto'g'ri</div></div>
        <div style={S.stat}><div style={S.statVal}>{result.total}</div><div style={S.statLabel}>Jami</div></div>
      </div>
      <div style={{ color, fontWeight: '600', marginBottom: '20px' }}>{pct >= 80 ? 'Ajoyib! Siz bu mavzuni yaxshi bilasiz.' : pct >= 50 ? "Yaxshi! Lekin ko'proq o'qing." : "Ko'proq mashq qiling!"}</div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button style={{ ...S.retryBtn, background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.text }} onClick={onBack}>← Testlar ro'yxati</button>
        <button style={S.retryBtn} onClick={onRetry}>Qayta urinish</button>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('tests');
  const [activeTest, setActiveTest] = useState(null);
  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState({});

  function startTest(test) { setActiveTest(test); setResult(null); setPage('quiz'); }
  function finishTest(res) { setResult(res); setCompleted(c => ({ ...c, [res.test.id]: res })); setPage('result'); }

  return (
    <div style={S.app}>
      <header style={S.header}>
        <div style={S.logo}>KompTest</div>
        <nav style={S.nav}>
          <button style={S.navBtn(page === 'tests')} onClick={() => setPage('tests')}>Testlar</button>
          <button style={S.navBtn(page === 'stats')} onClick={() => setPage('stats')}>Natijalar</button>
        </nav>
      </header>
      <main style={S.main}>
        {page === 'tests' && (<>
          <div style={S.pageTitle}>Kompyuter savodxonligi testlari</div>
          <div style={S.pageSub}>O'z bilimingizni tekshiring</div>
          <div style={S.grid}>{TESTS.map(t => <TestCard key={t.id} test={t} onStart={startTest} />)}</div>
        </>)}
        {page === 'quiz' && activeTest && <QuizView test={activeTest} onFinish={finishTest} />}
        {page === 'result' && result && <ResultView result={result} onBack={() => setPage('tests')} onRetry={() => startTest(result.test)} />}
        {page === 'stats' && (<>
          <div style={S.pageTitle}>Mening natijalarim</div>
          <div style={S.pageSub}>Tugallangan testlar statistikasi</div>
          {Object.keys(completed).length === 0
            ? <div style={{ ...S.card, textAlign: 'center', padding: '48px', color: COLORS.muted }}>Hali hech qanday test tugatilmagan.<br /><button style={{ ...S.retryBtn, marginTop: '16px' }} onClick={() => setPage('tests')}>Testlarni boshlash →</button></div>
            : <div style={S.grid}>{Object.values(completed).map(r => { const pct = Math.round((r.score / r.total) * 100); const color = pct >= 80 ? COLORS.green : pct >= 50 ? COLORS.yellow : COLORS.red; return (<div key={r.test.id} style={S.card}><div style={S.cardTitle}>{r.test.title}</div><div style={{ ...S.bigScore, fontSize: '36px', color, marginBottom: '8px' }}>{pct}%</div><div style={{ fontSize: '13px', color: COLORS.muted }}>{r.score}/{r.total} to'g'ri</div><button style={S.startBtn} onClick={() => startTest(r.test)}>Qayta urinish</button></div>); })}</div>
          }
        </>)}
      </main>
    </div>
  );
}
