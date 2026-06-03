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
  startBtn: { marginTop: '16px'
