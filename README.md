# TalentDrop 🎯

**Plataforma de empleo con IA — Proyecto escolar de innovación**

TalentDrop transforma tu CV en un **ADN Profesional**: un perfil visual único que conecta tu talento con las oportunidades correctas, apoyado por un asesor de carrera con inteligencia artificial.

---

## 🚀 Ver demo en vivo

👉 **Abre `index.html` en tu navegador o usa GitHub Pages (ver instrucciones abajo)**

---

## 📂 Estructura del proyecto

```
talentdrop/
├── index.html          # Landing page principal (con chat IA)
├── css/
│   └── style.css       # Estilos globales + sección de precios
├── js/
│   └── main.js         # Lógica y animaciones
└── pages/
    ├── upload.html     # Formulario de subida de CV
    ├── demo.html       # Perfil / ADN Profesional + chat IA funcional
    └── login.html      # Inicio de sesión / Registro
```

---

## ✨ Características

| Funcionalidad | Descripción |
|---|---|
| 🧬 ADN Profesional | Perfil visual único generado desde el CV |
| 📊 Score de empleabilidad | Puntaje dinámico comparado con el mercado |
| 🤖 Asesor IA (funcional) | Chat real con IA que analiza tu perfil y sugiere mejoras |
| 💰 Planes y precios | Sección de precios con 3 niveles: Gratis, Pro y Empresas |
| 🔗 Integraciones | LinkedIn, GitHub, Gmail, Indeed y más |
| 📱 Responsive | Funciona en móvil y escritorio |

---

## 🤖 Chat IA — Cómo funciona

El chat del asesor de carrera usa la **API de Claude (Anthropic)** directamente desde el navegador. Para que funcione localmente necesitas servir los archivos a través de un servidor HTTP (no abrirlos directamente como archivo), ya que el navegador bloquea las peticiones fetch en archivos locales (`file://`).

**Opción recomendada — VS Code Live Server:**
1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html` → "Open with Live Server"
3. El chat funcionará automáticamente

**Alternativa con Python:**
```bash
cd talentdrop
python -m http.server 3000
# Abre http://localhost:3000
```

---

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 (Grid, Flexbox, animaciones)
- JavaScript vanilla
- Google Fonts (Syne + DM Sans)
- Anthropic Claude API (chat IA)

---

## 🌐 Publicar en GitHub Pages

1. Crea un repositorio en GitHub (puede ser público o privado)
2. Sube todos los archivos:
   ```bash
   git init
   git add .
   git commit -m "TalentDrop v1.0"
   git remote add origin https://github.com/TU-USUARIO/talentdrop.git
   git push -u origin main
   ```
3. Ve a **Settings → Pages**
4. En **Branch**, selecciona `main` y carpeta `/root`
5. Guarda — en unos minutos tendrás tu enlace: `https://TU-USUARIO.github.io/talentdrop`

> **Nota:** El chat IA funciona normalmente en GitHub Pages ya que los archivos se sirven por HTTP.

---

## 👩‍🎓 Proyecto académico

Desarrollado como proyecto escolar de innovación. Inspirado en plataformas como LinkedIn, Xing, Indeed, Viadeo y Glassdoor, con un enfoque diferenciador en la visualización del perfil profesional mediante IA.

---

*© 2025 TalentDrop — Proyecto escolar de innovación*
