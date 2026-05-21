// =========================================
//   TalentDrop — auth.js
//   Sistema de sesión compartido en todas las páginas
// =========================================

const SESSION_KEY = 'td_session';
const USERS_KEY   = 'td_users';

// ── Leer sesión (localStorage = recuérdame, sessionStorage = temporal) ──
function getSession() {
  try {
    const ls = localStorage.getItem(SESSION_KEY);
    const ss = sessionStorage.getItem(SESSION_KEY);
    return JSON.parse(ls || ss || 'null');
  } catch(e) { return null; }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

// ── Proteger página: si no hay sesión → login ──
function requireAuth() {
  if (!getSession()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// ── Inyectar navbar con sesión ──
function buildNav(activePage) {
  const sess = getSession();
  const nav  = document.querySelector('nav');
  if (!nav) return;

  const initials = sess
    ? (sess.nombre[0] + (sess.apellido ? sess.apellido[0] : '')).toUpperCase()
    : '';

  nav.innerHTML = `
    <a class="logo" href="../index.html"><div class="logo-dot"></div>TalentDrop</a>
    <div class="nav-links">
      <a href="../index.html" ${activePage==='inicio'?'style="color:var(--accent)"':''}>Inicio</a>
      ${sess ? `<a href="dashboard.html" ${activePage==='dashboard'?'style="color:var(--accent)"':''}>Dashboard</a>` : ''}
      ${sess ? `<a href="perfil.html"    ${activePage==='perfil'?'style="color:var(--accent)"':''}>Mi perfil</a>` : ''}
      ${sess ? `<a href="upload.html"    ${activePage==='upload'?'style="color:var(--accent)"':''}>Actualizar CV</a>` : ''}
    </div>
    ${sess ? `
      <div class="nav-user-wrap">
        <div class="nav-avatar" id="navAvatarBtn">${initials}</div>
        <div class="nav-dropdown" id="navDropdown">
          <div class="nav-dropdown-header">
            <div class="nav-dropdown-name">${sess.nombre} ${sess.apellido||''}</div>
            <div class="nav-dropdown-email">${sess.email}</div>
          </div>
          <a href="perfil.html"    class="nav-dropdown-item">👤 Mi perfil</a>
          <a href="dashboard.html" class="nav-dropdown-item">📊 Dashboard</a>
          <a href="upload.html"    class="nav-dropdown-item">📄 Actualizar CV</a>
          <div class="nav-dropdown-divider"></div>
          <button class="nav-dropdown-item nav-logout" onclick="logout()">🚪 Cerrar sesión</button>
        </div>
      </div>
    ` : `
      <button class="nav-cta" onclick="window.location.href='login.html'">Iniciar sesión</button>
    `}
  `;

  // Toggle dropdown
  const avatarBtn  = document.getElementById('navAvatarBtn');
  const dropdown   = document.getElementById('navDropdown');
  if (avatarBtn && dropdown) {
    avatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
  }

  // Scroll shadow
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,0.07)' : 'none';
  });
}

// ── Cerrar sesión ──
function logout() {
  clearSession();
  window.location.href = 'login.html';
}
