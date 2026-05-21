// Auth guard
if (typeof requireAuth !== 'undefined') {
  if (!requireAuth()) throw new Error('Not authenticated');
}
if (typeof buildNav !== 'undefined') buildNav('dashboard');

// =========================================
//   TalentDrop — dashboard.js
// =========================================

// ── Leer perfil desde localStorage ──
let profile = {};
try { profile = JSON.parse(localStorage.getItem('td_profile') || '{}'); } catch(e) {}

// Compatibilidad con claves simples (datos.html)
const nombre  = profile.nombre  || localStorage.getItem('nombre')  || 'Tu perfil';
const area    = profile.area    || localStorage.getItem('area')     || 'General';
const resumen = profile.resumen || localStorage.getItem('resumen')  || '';
const ciudad  = profile.ciudad  || localStorage.getItem('ciudad')   || 'México';
const expYears = parseInt(profile.exp || localStorage.getItem('exp') || '2');
const savedSkills = profile.skills || [];

// ── Detectar skills según área ──
const SKILL_BANKS = {
  diseño:      [{ n:'Figma',          p:92 }, { n:'UX Research',    p:85 }, { n:'Prototipado', p:88 }, { n:'CSS/HTML',        p:72 }, { n:'Design Systems', p:80 }, { n:'Adobe XD', p:74 }],
  tecnología:  [{ n:'JavaScript',     p:88 }, { n:'React',          p:82 }, { n:'Node.js',     p:78 }, { n:'Python',          p:75 }, { n:'Git',            p:90 }, { n:'APIs REST', p:83 }],
  marketing:   [{ n:'SEO',            p:85 }, { n:'Google Ads',     p:80 }, { n:'Copywriting', p:88 }, { n:'Analytics',       p:76 }, { n:'Social Media',   p:92 }, { n:'Email Mkt', p:70 }],
  datos:       [{ n:'SQL',            p:90 }, { n:'Power BI',       p:85 }, { n:'Python',      p:80 }, { n:'Excel Avanzado',  p:88 }, { n:'Tableau',        p:72 }, { n:'Machine Learning', p:68 }],
  administración:[{ n:'Gestión',      p:88 }, { n:'Liderazgo',      p:82 }, { n:'Comunicación', p:90 }, { n:'Análisis',       p:78 }, { n:'Planificación',  p:85 }, { n:'Negociación', p:75 }],
  default:     [{ n:'Comunicación',   p:82 }, { n:'Gestión',        p:78 }, { n:'Creatividad',  p:85 }, { n:'Trabajo en equipo', p:90 }, { n:'Análisis',    p:75 }, { n:'Resolución de problemas', p:80 }],
};
const JOBS_BY_AREA = {
  diseño:       [
    { logo:'GG', name:'UX Designer Sr.',     co:'Google',          mode:'Remoto',   sal:'$85k USD', match:98 },
    { logo:'SP', name:'Product Designer',    co:'Spotify',         mode:'Híbrido',  sal:'$70k USD', match:94 },
    { logo:'MS', name:'UI Designer',         co:'Microsoft',       mode:'Remoto',   sal:'$80k USD', match:91 },
    { logo:'NF', name:'UX Lead',             co:'Netflix',         mode:'CDMX',     sal:'$60k USD', match:87 },
  ],
  tecnología:   [
    { logo:'AM', name:'Backend Developer',   co:'Amazon',          mode:'Remoto',   sal:'$90k USD', match:96 },
    { logo:'MS', name:'Full Stack Engineer', co:'Microsoft',       mode:'Híbrido',  sal:'$85k USD', match:91 },
    { logo:'GG', name:'Software Engineer',   co:'Google',          mode:'Remoto',   sal:'$100k USD',match:89 },
    { logo:'ML', name:'Dev Sr.',             co:'Mercado Libre',   mode:'CDMX',     sal:'$75k USD', match:85 },
  ],
  default:      [
    { logo:'CL', name:'Analista',            co:'Clip',            mode:'CDMX',     sal:'$40k USD', match:88 },
    { logo:'BB', name:'Coordinador',         co:'BBVA',            mode:'Híbrido',  sal:'$50k USD', match:82 },
    { logo:'OX', name:'Consultor Jr.',       co:'Oxford',          mode:'Remoto',   sal:'$35k USD', match:78 },
    { logo:'PS', name:'Especialista',        co:'PwC',             mode:'CDMX',     sal:'$55k USD', match:75 },
  ],
};

function detectKey(a) {
  const l = a.toLowerCase();
  if (l.includes('dise') || l.includes('ux') || l.includes('ui'))  return 'diseño';
  if (l.includes('tec')  || l.includes('dev') || l.includes('prog'))return 'tecnología';
  if (l.includes('mark') || l.includes('digit'))                    return 'marketing';
  if (l.includes('dato') || l.includes('data') || l.includes('anali')) return 'datos';
  if (l.includes('adm')  || l.includes('gest') || l.includes('rh'))   return 'administración';
  return 'default';
}
const areaKey   = detectKey(area);
const skillSet  = savedSkills.length >= 3
  ? savedSkills.map((s,i) => ({ n:s, p: Math.round(65 + Math.random()*30) }))
  : (SKILL_BANKS[areaKey] || SKILL_BANKS.default);
const jobsList  = JOBS_BY_AREA[areaKey] || JOBS_BY_AREA.default;

// ── Calcular métricas ──
const baseScore = Math.min(60 + skillSet.length * 4 + expYears * 3, 99);
const nivel     = expYears >= 6 ? 'Senior' : expYears >= 3 ? 'Mid-level' : 'Junior';
const skillsIdx = Math.min(50 + skillSet.length * 7, 100);

// ── Render KPIs ──
document.getElementById('dashTitle').textContent = `Hola, ${nombre.split(' ')[0]} 👋`;
document.getElementById('dashSub').textContent   = `Dashboard profesional · ${area} · ${ciudad}`;
document.getElementById('kpiScore').textContent  = baseScore + '%';
document.getElementById('kpiNivel').textContent  = nivel;
document.getElementById('kpiSkills').textContent = skillsIdx;
const deltaEl = document.getElementById('kpiDelta');
deltaEl.textContent = baseScore >= 80 ? '↑ Muy competitivo' : baseScore >= 65 ? '→ Competitivo' : '↗ En crecimiento';
if (baseScore < 65) deltaEl.classList.add('down');

// ── Render skill bars ──
const barsWrap = document.getElementById('skillBars');
skillSet.slice(0,6).forEach((s, i) => {
  const colors = ['sf-blue','sf-green','sf-orange','sf-blue','sf-green','sf-orange'];
  barsWrap.innerHTML += `
    <div class="skill-row-dash">
      <span class="skill-name">${s.n}</span>
      <div class="skill-track"><div class="skill-fill ${colors[i]}" data-pct="${s.p}"></div></div>
      <span class="skill-pct">${s.p}%</span>
    </div>`;
});
setTimeout(() => {
  document.querySelectorAll('.skill-fill').forEach(el => {
    el.style.width = el.dataset.pct + '%';
  });
}, 300);

// ── Render skill chips ──
const chipsWrap = document.getElementById('skillChips');
skillSet.forEach(s => {
  chipsWrap.innerHTML += `<span class="skill-chip-d">${s.n}</span>`;
});

// ── Render recomendaciones ──
const recs = [
  { icon:'blue',   title:`Certifícate en ${skillSet[0]?.n || area}`, desc:'Plataformas como Coursera o LinkedIn Learning tienen cursos reconocidos por empleadores top.' },
  { icon:'green',  title:'Actualiza tu resumen profesional', desc:'Un resumen con métricas concretas aumenta un 40% las visitas a tu perfil de empleadores.' },
  { icon:'orange', title:'Amplía tu red en LinkedIn', desc:`Con tu nivel ${nivel}, conectar con reclutadores de ${area} puede acelerar tu búsqueda significativamente.` },
  { icon:'blue',   title:'Agrega proyectos a tu portafolio', desc:'Los candidatos con proyectos visibles reciben 2x más entrevistas según datos de TalentDrop.' },
];
const recList = document.getElementById('recList');
recs.forEach(r => {
  const icons = {
    blue:   `<svg fill="none" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>`,
    green:  `<svg fill="none" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></svg>`,
    orange: `<svg fill="none" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>`,
  };
  recList.innerHTML += `
    <li class="rec-item">
      <div class="rec-icon ri-${r.icon}">${icons[r.icon]}</div>
      <div><div class="rec-title">${r.title}</div><div class="rec-desc">${r.desc}</div></div>
    </li>`;
});

// ── Render jobs table ──
const tbody = document.getElementById('jobsTable');
jobsList.forEach(j => {
  tbody.innerHTML += `
    <tr>
      <td><div class="job-logo-sm">${j.logo}</div></td>
      <td style="font-weight:500">${j.name}</td>
      <td style="color:var(--ink2)">${j.co}</td>
      <td style="color:var(--ink3);font-size:0.78rem">${j.mode}</td>
      <td style="font-weight:600">${j.sal}</td>
      <td><span class="match-pill">${j.match}%</span></td>
      <td><button class="apply-btn">Aplicar</button></td>
    </tr>`;
});

// ── Chart.js — Bar Chart ──
Chart.defaults.font.family = "'DM Sans', sans-serif";
Chart.defaults.color = '#A09A94';

const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: skillSet.slice(0,6).map(s => s.n),
    datasets: [{
      label: 'Nivel (%)',
      data: skillSet.slice(0,6).map(s => s.p),
      backgroundColor: ['rgba(42,32,86,0.8)','rgba(76,175,125,0.8)','rgba(232,98,58,0.8)','rgba(42,32,86,0.6)','rgba(76,175,125,0.6)','rgba(232,98,58,0.6)'],
      borderRadius: 8,
      borderSkipped: false,
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, max: 100, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { callback: v => v + '%' } },
      x: { grid: { display: false } }
    }
  }
});

// ── Chart.js — Radar Chart ──
const radarCtx = document.getElementById('radarChart').getContext('2d');
const radarLabels = ['Técnico', 'Comunicación', 'Liderazgo', 'Creatividad', 'Analítico', 'Adaptabilidad'];
const radarData   = [
  Math.round(skillsIdx * 0.95),
  Math.round(70 + Math.random()*20),
  Math.round(55 + expYears * 4),
  Math.round(65 + Math.random()*25),
  Math.round(70 + Math.random()*20),
  Math.round(75 + Math.random()*15),
];
new Chart(radarCtx, {
  type: 'radar',
  data: {
    labels: radarLabels,
    datasets: [{
      label: 'Tu perfil',
      data: radarData,
      backgroundColor: 'rgba(42,32,86,0.15)',
      borderColor: '#2A2056',
      borderWidth: 2,
      pointBackgroundColor: '#E8623A',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
    }]
  },
  options: {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true, max: 100,
        grid: { color: 'rgba(0,0,0,0.06)' },
        pointLabels: { font: { size: 11 } },
        ticks: { display: false },
      }
    },
    plugins: { legend: { display: false } }
  }
});

// Nav scroll shadow
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) nav.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,0.07)' : 'none';
});
