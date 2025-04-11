'use client';

import { JSX, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SnippetCategory {
  name: string;
  icon: JSX.Element;
  snippets: Snippet[];
}

interface Snippet {
  name: string;
  description: string;
  code: string;
  preview?: string;
}
 
const IconSkills = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  </svg>
);

const IconGitHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const IconStats = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
    <path d="M7 17V9"></path>
    <path d="M12 17V13"></path>
    <path d="M17 17V7"></path>
  </svg>
);

const IconBadges = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

const IconLayout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);

const IconMedia = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const IconChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="15" y1="21" x2="15" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
    <line x1="3" y1="15" x2="21" y2="15"></line>
  </svg>
);

const IconCode = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);
 
const snippetData: SnippetCategory[] = [
  {
    name: "Habilidades / Skills",
    icon: <IconSkills />,
    snippets: [
      {
        name: "Skill Icons (Horizontal)",
        description: "Muestra un conjunto de iconos de tecnologías en formato horizontal",
        code: `## Tecnologías que uso

[![My Skills](https://skillicons.dev/icons?i=js,html,css,react,nodejs,python,java,git,docker&theme=dark)](https://skillicons.dev)`,
        preview: "https://skillicons.dev/icons?i=js,html,css,react,nodejs,python,java,git,docker&theme=dark"
      },
      {
        name: "Skill Icons (Cuadrícula)",
        description: "Muestra un conjunto de iconos de tecnologías en formato de cuadrícula",
        code: `## Mis habilidades técnicas

[![My Skills](https://skillicons.dev/icons?i=js,ts,html,css,react,vue,angular,nodejs,express,nestjs,python,java,spring,git,github,docker,kubernetes,aws&perline=6)](https://skillicons.dev)`,
        preview: "https://skillicons.dev/icons?i=js,ts,html,css,react,vue,angular,nodejs,express,nestjs,python,java,spring,git,github,docker,kubernetes,aws&perline=6"
      },
      {
        name: "Tarjetas de Lenguajes",
        description: "Tarjetas que muestran lenguajes de programación con colores de marca",
        code: `## Lenguajes de programación

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)`,
      },
      {
        name: "DevIcons (Cuadrícula)",
        description: "Iconos de desarrollador organizados en cuadrícula",
        code: `## Tecnologías y Herramientas

<div align="center">  
  <img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" height="50" />  
  <img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="50" />  
  <img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" height="50" />  
  <img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/typescript-original.svg" alt="TypeScript" height="50" />  
  <img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg" alt="JavaScript" height="50" />  
  <img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/docker-original-wordmark.svg" alt="Docker" height="50" />  
</div>`,
      },
      {
        name: "Iconos Coloridos",
        description: "Íconos coloridos para frameworks y herramientas",
        code: `## 🧰 Frameworks y Herramientas

<p align="left">
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg" width="36" height="36" alt="JavaScript" />
  </a>
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" width="36" height="36" alt="React" />
  </a>
  <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nextjs-colored.svg" width="36" height="36" alt="NextJs" />
  </a>
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/tailwindcss-colored.svg" width="36" height="36" alt="TailwindCSS" />
  </a>
  <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg" width="36" height="36" alt="NodeJS" />
  </a>
</p>`,
      },
    ],
  },
  {
    name: "GitHub Stats",
    icon: <IconGitHub />,
    snippets: [
      {
        name: "GitHub Stats Card",
        description: "Muestra estadísticas de tu perfil de GitHub",
        code: `## Mis estadísticas de GitHub

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)`,
        preview: "https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical"
      },
      {
        name: "Top Lenguajes",
        description: "Muestra los lenguajes más utilizados en tus repositorios",
        code: `## Lenguajes más usados

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact&theme=vision-friendly-dark)](https://github.com/anuraghazra/github-readme-stats)`,
        preview: "https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact&theme=vision-friendly-dark"
      },
      {
        name: "Streak Stats",
        description: "Muestra tu racha de contribuciones",
        code: `## Mi racha de contribuciones

[![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=DenverCoder1&theme=dark&background=000000)](https://git.io/streak-stats)`,
        preview: "https://github-readme-streak-stats.herokuapp.com/?user=DenverCoder1&theme=dark&background=000000"
      },
      {
        name: "Activity Graph",
        description: "Gráfico de actividad de contribuciones",
        code: `## Gráfico de actividad

[![Ashutosh's github activity graph](https://github-readme-activity-graph.vercel.app/graph?username=ashutosh00710&theme=dracula)](https://github.com/ashutosh00710/github-readme-activity-graph)`,
        preview: "https://github-readme-activity-graph.vercel.app/graph?username=ashutosh00710&theme=dracula"
      },
      {
        name: "GitHub Profile Summary Cards",
        description: "Resumen detallado de tu actividad en GitHub",
        code: `## Resumen de mi actividad en GitHub

[![](https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=vn7n24fzkq&theme=nord_dark)](https://github.com/vn7n24fzkq/github-profile-summary-cards)
[![](https://github-profile-summary-cards.vercel.app/api/cards/stats?username=vn7n24fzkq&theme=nord_dark)](https://github.com/vn7n24fzkq/github-profile-summary-cards)
[![](https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=vn7n24fzkq&theme=nord_dark)](https://github.com/vn7n24fzkq/github-profile-summary-cards)`,
        preview: "https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=vn7n24fzkq&theme=nord_dark"
      },
      {
        name: "Metrics avanzadas",
        description: "Panel de métricas detalladas de GitHub",
        code: `![Metrics](https://metrics.lecoq.io/username?template=classic&achievements=1&activity=1&base=header%2C%20activity%2C%20community%2C%20repositories%2C%20metadata&base.indepth=false&base.hireable=false&base.skip=false&achievements=false&achievements.threshold=C&achievements.secrets=true&achievements.display=compact&achievements.limit=0&activity=false&activity.limit=5&activity.load=300&activity.days=14&activity.visibility=all&activity.timestamps=false&activity.filter=all&config.timezone=America%2FNew_York)`,
      },
    ],
  },
  {
    name: "Repo Stats",
    icon: <IconStats />,
    snippets: [
      {
        name: "Repo Card",
        description: "Tarjeta con información sobre un repositorio",
        code: `## Mi proyecto destacado

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)`,
        preview: "https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats"
      },
      {
        name: "Visitor Badge",
        description: "Contador de visitantes para tu perfil",
        code: `![Visitor Count](https://profile-counter.glitch.me/{tu-usuario}/count.svg)`,
      },
      {
        name: "Trophy Stats",
        description: "Trofeos de GitHub basados en tus estadísticas",
        code: `## Trofeos de GitHub

[![trophy](https://github-profile-trophy.vercel.app/?username=ryo-ma&theme=onedark)](https://github.com/ryo-ma/github-profile-trophy)`,
        preview: "https://github-profile-trophy.vercel.app/?username=ryo-ma&theme=onedark"
      },
      {
        name: "Gráfico de contribuciones en 3D",
        description: "Visualización en 3D de tu historial de contribuciones",
        code: `## Gráfico de contribuciones en 3D
        
![](./profile-3d-contrib/profile-night-rainbow.svg)

<!-- Generado con: https://github.com/yoshi389111/github-profile-3d-contrib -->`,
      },
      {
        name: "Estadísticas del proyecto",
        description: "Estadísticas detalladas de un proyecto",
        code: `## Estadísticas del proyecto

[![Stars](https://img.shields.io/github/stars/username/repo?style=social)](https://github.com/username/repo/stargazers)
[![Forks](https://img.shields.io/github/forks/username/repo?style=social)](https://github.com/username/repo/network/members)
[![Watchers](https://img.shields.io/github/watchers/username/repo?style=social)](https://github.com/username/repo/watchers)
[![Contributors](https://img.shields.io/github/contributors/username/repo)](https://github.com/username/repo/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/username/repo)](https://github.com/username/repo/issues)
[![Issues cerrados](https://img.shields.io/github/issues-closed/username/repo)](https://github.com/username/repo/issues?q=is%3Aissue+is%3Aclosed)
[![Pull Requests](https://img.shields.io/github/issues-pr/username/repo)](https://github.com/username/repo/pulls)`,
      },
      {
        name: "Wakatime Stats",
        description: "Estadísticas de tiempo de codificación con WakaTime",
        code: `## Mis estadísticas de Wakatime

[![wakatime](https://wakatime.com/badge/user/username.svg)](https://wakatime.com/@username)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)`,
      },
    ],
  },
  {
    name: "Badges",
    icon: <IconBadges />,
    snippets: [
      {
        name: "Contacto / Redes Sociales",
        description: "Badges para enlaces de contacto y redes sociales",
        code: `## Conecta conmigo
        
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/username)
[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?logo=Twitter&logoColor=white)](https://twitter.com/username)
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://youtube.com/@username)
[![Portfolio](https://img.shields.io/badge/Portfolio-%23000000.svg?logo=firefox&logoColor=white)](https://tusitio.com)`,
      },
      {
        name: "Estado del Proyecto",
        description: "Badges que muestran el estado actual del proyecto",
        code: `## Estado del Proyecto

![Mantenimiento](https://img.shields.io/badge/Mantenimiento-Activo-green.svg)
![GitHub stars](https://img.shields.io/github/stars/usuario/repositorio?style=social)
![GitHub forks](https://img.shields.io/github/forks/usuario/repositorio?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/usuario/repositorio?style=social)`,
      },
      {
        name: "Donaciones / Apoyo",
        description: "Badges para plataformas de donación",
        code: `## Apóyame

[![Ko-Fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/tuusuario)
[![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/tuusuario)
[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/tuusuario)`,
      },
      {
        name: "Insignias de estado de CI/CD",
        description: "Muestra el estado de integración continua",
        code: `## Estado de CI/CD

[![CI/CD](https://github.com/username/repo/actions/workflows/ci.yml/badge.svg)](https://github.com/username/repo/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/username/repo/branch/main/graph/badge.svg)](https://codecov.io/gh/username/repo)
[![CodeQL](https://github.com/username/repo/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/username/repo/actions/workflows/codeql-analysis.yml)`,
      },
      {
        name: "Badges de tecnologías (Completo)",
        description: "Conjunto completo de badges para tecnologías",
        code: `## Stack Tecnológico

#### Frontend
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

#### Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)

#### Bases de datos
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

#### DevOps
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)`,
      },
      {
        name: "Insignias dinámicas de versión",
        description: "Muestra versiones y dependencias del proyecto",
        code: `## Versiones
        
![npm](https://img.shields.io/npm/v/package-name)
![node-current](https://img.shields.io/node/v/package-name)
![GitHub package.json version](https://img.shields.io/github/package-json/v/username/repo)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/username/repo)
![Dependencias](https://img.shields.io/librariesio/release/npm/package-name)`,
      },
    ],
  },
  {
    name: "Layouts",
    icon: <IconLayout />,
    snippets: [
      {
        name: "Header con Banner",
        description: "Encabezado con banner y título llamativo",
        code: `<div align="center">
  <img src="https://raw.githubusercontent.com/usuario/repositorio/main/banner.png" alt="Banner" width="800"/>
  
  # 🚀 Proyecto Asombroso

  ### Una breve descripción sobre lo que hace tu proyecto

  [![GitHub license](https://img.shields.io/github/license/usuario/repositorio)](https://github.com/usuario/repositorio/blob/master/LICENSE)
  [![GitHub stars](https://img.shields.io/github/stars/usuario/repositorio)](https://github.com/usuario/repositorio/stargazers)
  [![GitHub issues](https://img.shields.io/github/issues/usuario/repositorio)](https://github.com/usuario/repositorio/issues)
  [![GitHub forks](https://img.shields.io/github/forks/usuario/repositorio)](https://github.com/usuario/repositorio/network)
</div>`,
      },
      {
        name: "Sección Sobre Mí",
        description: "Plantilla para la sección 'Sobre Mí' en un perfil",
        code: `## 👨‍💻 Sobre Mí
- 🔭 Actualmente trabajo en **[Nombre del Proyecto](https://github.com/usuario/repositorio)**
- 🌱 Estoy aprendiendo **Tecnología X, Framework Y**
- 👯 Busco colaborar en **Proyectos Open Source**
- 💬 Pregúntame sobre **React, JavaScript, Node.js**
- 📫 Cómo contactarme: **tucorreo@ejemplo.com**
- ⚡ Dato curioso: **Me encanta la fotografía**`,
      },
      {
        name: "Tabla de Contenidos",
        description: "Índice navegable para documentos extensos",
        code: `## 📋 Tabla de Contenidos
- [Instalación](#instalación)
- [Características](#características)
- [Uso](#uso)
- [API](#api)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## 📦 Instalación
\`\`\`bash
npm install mi-paquete
\`\`\``,
      },
      {
        name: "Header Animado",
        description: "Encabezado con GIF animado y título dinámico",
        code: `<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?lines=¡Hola+👋,+Soy+Tu+Nombre!;Desarrollador+Full+Stack;+Amante+de+la+tecnología&font=Fira%20Code&center=true&width=380&height=50&duration=4000&pause=1000" alt="Texto animado con tu información">
</p>

<p align="center">
  <a href="https://github.com/DenverCoder1/readme-typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com?font=Time+New+Roman&color=cyan&size=25&center=true&vCenter=true&width=600&height=100&lines=Full-Stack+Developer;Cloud+Solutions+Architect;Always+learning+new+things" alt="Typing SVG" />
  </a>
</p>`,
      },
      {
        name: "Layout de perfil completo",
        description: "Plantilla completa para un perfil de GitHub",
        code: `<h1 align="center">
  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="30px"/>
  ¡Hola! Soy Tu Nombre
</h1>

<div align="center">
  <img src="https://media.giphy.com/media/dWesBcTLavkZuG35MI/giphy.gif" width="600" height="300"/>
</div>

---

### 👨‍💻 Sobre mí:
Soy un desarrollador Full Stack <img src="https://media.giphy.com/media/WUlplcMpOCEmTGBtBW/giphy.gif" width="30"> de España.

- 🔭 Estoy trabajando como Ingeniero de Software contribuyendo al desarrollo frontend y backend de aplicaciones web.
- 🌱 Explorando tecnologías Cloud y DevOps.
- ⚡ En mi tiempo libre resuelvo problemas en LeetCode y leo artículos técnicos.
- 📫 Contáctame: [![Linkedin Badge](https://img.shields.io/badge/-tunombre-blue?style=flat&logo=Linkedin&logoColor=white)](https://linkedin.com/in/tunombre)

---

### 🛠️ Lenguajes y Herramientas:
<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/java/java-original-wordmark.svg" title="Java" alt="Java" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/spring/spring-original-wordmark.svg" title="Spring" alt="Spring" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" title="AWS" alt="AWS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="40" height="40"/>
</div>

---

### 🔥 Mis Estadísticas:

[![GitHub Streak](http://github-readme-streak-stats.herokuapp.com?user=username&theme=dark&background=000000)](https://git.io/streak-stats)

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=username&layout=compact&theme=vision-friendly-dark)](https://github.com/anuraghazra/github-readme-stats)`,
      },
      {
        name: "Documentación de Proyecto",
        description: "Plantilla para documentar un proyecto completo",
        code: `# 📌 Nombre del Proyecto

Una descripción clara y concisa de lo que hace tu proyecto.

## 🎯 Características principales

- ✅ Característica principal 1
- ✅ Característica principal 2
- ✅ Característica principal 3

## 🖼️ Capturas de pantalla

<div align="center">
  <img src="ruta/a/tu/captura1.png" alt="Captura 1" width="400"/>
  <img src="ruta/a/tu/captura2.png" alt="Captura 2" width="400"/>
</div>

## 🚀 Instalación

\`\`\`bash
git clone https://github.com/usuario/repo.git
cd repo
npm install
npm start
\`\`\`

## 🔧 Configuración

Crea un archivo \`.env\` en la raíz del proyecto:

\`\`\`
API_KEY=tu_api_key
DATABASE_URL=tu_url_de_base_de_datos
\`\`\`

## 💡 Cómo usar

\`\`\`javascript
import { funcion } from 'tu-proyecto';

// Ejemplo de uso
funcion('parámetro');
\`\`\`

## 📊 Estructura del proyecto

\`\`\`
/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── index.js
├── public/
│   └── assets/
├── tests/
└── package.json
\`\`\`

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor, lee primero [CONTRIBUTING.md](CONTRIBUTING.md).

## 📜 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.`,
      },
    ],
  },
  {
    name: "Media",
    icon: <IconMedia />,
    snippets: [
      {
        name: "Banner GIF Animado",
        description: "Banner animado con GIF para la parte superior del README",
        code: `<div align="center">
  <img src="https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif" alt="Coding" width="100%"/>
</div>`,
      },
      {
        name: "Logo con eslogan",
        description: "Logo del proyecto con un eslogan centrado",
        code: `<p align="center">
  <img src="https://example.com/logo.png" alt="Logo" width="200" height="200">
  <h3 align="center">Tu Proyecto Asombroso</h3>
  <p align="center">
    Una breve descripción de tu proyecto
    <br />
    <a href="https://github.com/usuario/repo"><strong>Explora la documentación »</strong></a>
    <br />
    <br />
    <a href="https://demo-link.com">Ver Demo</a>
    ·
    <a href="https://github.com/usuario/repo/issues">Reportar Bug</a>
    ·
    <a href="https://github.com/usuario/repo/issues">Solicitar Feature</a>
  </p>
</p>`,
      },
      {
        name: "GIF de Programación",
        description: "GIF que muestra actividad de programación",
        code: `<div align="center">
  <img alt="Coding" width="400" src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif">
</div>`,
      },
      {
        name: "SVG Dinámico",
        description: "Imagen SVG dinámica para perfil",
        code: `<img src="https://svgshare.com/i/ZhY.svg" width="450" height="150">

<!-- Para crear uno propio, visita: https://svgshare.com/ -->`,
      },
      {
        name: "Animación de onda",
        description: "Añade una onda animada al final de tu README",
        code: `<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=120&section=footer"/>

<!-- Generado con: https://github.com/kyechan99/capsule-render -->`,
      },
      {
        name: "Banner de perfil",
        description: "Banner personalizado para perfil de GitHub",
        code: `<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:EEFF00,100:a82da8&height=200&section=header&text=Tu%20Nombre&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Desarrollador%20Full%20Stack%20|%20UX/UI%20Designer&descAlignY=51&descAlign=62"/>`,
      },
    ],
  },
  {
    name: "Gráficos",
    icon: <IconChart />,
    snippets: [
      {
        name: "Diagrama Mermaid (Flujo)",
        description: "Crea un diagrama de flujo con Mermaid",
        code: `## Diagrama de flujo

\`\`\`mermaid
graph TD;
    A[Inicio] --> B{¿Tiene cuenta?};
    B -- Sí --> C[Iniciar sesión];
    B -- No --> D[Registrarse];
    C --> E[Dashboard];
    D --> E;
    E --> F[Fin];
\`\`\``,
      },
      {
        name: "Diagrama Mermaid (Secuencia)",
        description: "Diagrama de secuencia para documentar procesos",
        code: `## Diagrama de secuencia

\`\`\`mermaid
sequenceDiagram
    participant Cliente
    participant API
    participant Base de Datos
    
    Cliente->>API: GET /productos
    API->>Base de Datos: Consulta productos
    Base de Datos-->>API: Resultados
    API-->>Cliente: JSON con productos
\`\`\``,
      },
      {
        name: "Diagrama Mermaid (Gantt)",
        description: "Diagrama de Gantt para planificación",
        code: `## Cronograma del proyecto

\`\`\`mermaid
gantt
    title Planificación del Proyecto
    dateFormat  YYYY-MM-DD
    section Fase 1
    Análisis de requisitos :a1, 2025-04-01, 10d
    Diseño de la arquitectura :after a1, 15d
    section Fase 2
    Implementación :2025-04-25, 30d
    Pruebas :2025-05-15, 15d
    section Lanzamiento
    Despliegue :2025-06-01, 5d
    Capacitación :2025-06-05, 10d
\`\`\``,
      },
      {
        name: "Gráfico de barras ASCII",
        description: "Gráfico de barras simple usando texto ASCII",
        code: `## Estadísticas de Uso por Lenguaje

\`\`\`
JavaScript  ███████████████████▓░░░░  80%
Python      ██████████████▒░░░░░░░░░  60%
Java        ████████▒░░░░░░░░░░░░░░░  35%
C++         █████▒░░░░░░░░░░░░░░░░░░  20%
\`\`\``,
      },
    ],
  },
  {
    name: "Código",
    icon: <IconCode />,
    snippets: [
      {
        name: "Instalación básica",
        description: "Instrucciones de instalación básicas con npm/yarn",
        code: `## Instalación

\`\`\`bash
# Con npm
npm install mi-paquete

# Con yarn
yarn add mi-paquete
\`\`\``,
      },
      {
        name: "Ejemplo de uso en React",
        description: "Muestra cómo usar tu componente en React",
        code: `## Uso en React

\`\`\`jsx
import React from 'react';
import MiComponente from 'mi-paquete';

function App() {
  return (
    <div className="app">
      <h1>Mi Aplicación</h1>
      <MiComponente 
        prop1="valor1"
        prop2={42}
        onEvent={() => console.log('Evento activado')}
      />
    </div>
  );
}

export default App;
\`\`\``,
      },
      {
        name: "API REST con Endpoints",
        description: "Documentación de una API REST",
        code: `## API REST

#### Obtener todos los productos
\`\`\`http
GET /api/v1/productos
\`\`\`

#### Obtener un producto específico
\`\`\`http
GET /api/v1/productos/:id
\`\`\`

#### Crear un nuevo producto
\`\`\`http
POST /api/v1/productos

{
  "nombre": "Producto nuevo",
  "precio": 99.99,
  "descripcion": "Este es un producto nuevo",
  "categoria": "electrónica"
}
\`\`\`

#### Actualizar un producto
\`\`\`http
PUT /api/v1/productos/:id

{
  "precio": 89.99,
  "descripcion": "Descripción actualizada"
}
\`\`\`

#### Eliminar un producto
\`\`\`http
DELETE /api/v1/productos/:id
\`\`\`

### Respuestas de ejemplo

#### Éxito
\`\`\`json
{
  "success": true,
  "data": {
    "id": "123",
    "nombre": "Producto nuevo",
    "precio": 99.99
  }
}
\`\`\`

#### Error
\`\`\`json
{
  "success": false,
  "error": "Producto no encontrado",
  "code": 404
}
\`\`\``,
      },
      {
        name: "Tabla de Configuraciones",
        description: "Tabla que documenta opciones de configuración",
        code: `## Opciones de Configuración

| Opción | Tipo | Predeterminado | Descripción |
|--------|------|---------------|------------|
| \`apiKey\` | string | \`null\` | Tu API key para autenticación |
| \`timeout\` | number | \`30000\` | Tiempo de espera en ms para solicitudes |
| \`debug\` | boolean | \`false\` | Habilitar logs de depuración |
| \`retries\` | number | \`3\` | Número de intentos antes de fallar |
| \`cacheTime\` | number | \`3600\` | Tiempo en segundos para cachear resultados |

### Ejemplo de configuración

\`\`\`javascript
const client = new Client({
  apiKey: 'tu-api-key',
  timeout: 60000,
  debug: true
});
\`\`\``,
      },
      {
        name: "Variables de entorno",
        description: "Documentación de variables de entorno requeridas",
        code: `## Variables de Entorno

Crea un archivo \`.env\` en la raíz del proyecto y añade lo siguiente:

\`\`\`env
# Configuración de la API
API_URL=https://api.ejemplo.com/v1
API_KEY=tu_clave_api_secreta

# Base de datos
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=contraseña
DB_NAME=nombre_db
DB_PORT=5432

# Configuración de JWT
JWT_SECRET=tu_clave_secreta_jwt
JWT_EXPIRE=24h

# Configuración de Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=tu@email.com
SMTP_PASSWORD=tu_contraseña
FROM_EMAIL=noreply@tuapp.com
FROM_NAME=Tu Aplicación
\`\`\`

> ⚠️ **IMPORTANTE**: Nunca subas el archivo \`.env\` a tu repositorio. Asegúrate de añadirlo a \`.gitignore\`.`,
      },
    ],
  },
];

interface MarkdownSnippetsProps {
  onInsertSnippet: (code: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const MarkdownSnippets = ({ onInsertSnippet, isOpen = true, onClose }: MarkdownSnippetsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(snippetData[0].name);
  const [searchTerm, setSearchTerm] = useState('');
   
  const filteredSnippets = searchTerm.trim() 
    ? snippetData.flatMap(category => 
        category.snippets.filter(snippet => 
          snippet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          snippet.description.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(snippet => ({ ...snippet, category: category.name }))
      )
    : [];

  const handleInsert = (code: string) => {
    onInsertSnippet(code);
    if (onClose) {
      onClose();
    }
  };

  const activeCategorySnippets = snippetData.find(cat => cat.name === activeCategory)?.snippets || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 right-0 h-full bg-background border-l border-border shadow-lg w-80 z-30 flex flex-col"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="border-b border-border p-3 flex items-center justify-between">
            <h3 className="font-semibold">Fragmentos Markdown</h3>
            {onClose && (
              <motion.button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-secondary/50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
            )}
          </div>
          
          <div className="p-3 border-b border-border">
            <input
              type="text"
              placeholder="Buscar fragmentos..."
              className="w-full px-3 py-1.5 rounded border border-input bg-background text-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          {searchTerm.trim() ? (
            <div className="flex-1 overflow-y-auto p-3">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Resultados de búsqueda</h4>
              {filteredSnippets.length === 0 ? (
                <p className="text-sm text-muted-foreground">No se encontraron fragmentos.</p>
              ) : (
                filteredSnippets.map((snippet, index) => (
                  <motion.div
                    key={`search-${index}`}
                    className="border border-border rounded-md mb-3 overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="bg-secondary/30 p-2 text-xs font-medium border-b border-border">
                      {snippet.category}: {snippet.name}
                    </div>
                    <div className="p-2">
                      <p className="text-xs text-muted-foreground mb-2">{snippet.description}</p>
                      {snippet.preview && (
                        <div className="mb-2 p-1 bg-secondary/20 rounded-md overflow-hidden">
                          <img 
                            src={snippet.preview} 
                            alt={snippet.name} 
                            className="w-full h-auto rounded"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <motion.button
                        className="w-full p-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium"
                        onClick={() => handleInsert(snippet.code)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Insertar
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-0.5 border-b border-border p-1">
                {snippetData.map((category) => (
                  <motion.button
                    key={category.name}
                    className={`flex flex-col items-center justify-center p-2 rounded ${
                      activeCategory === category.name ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-secondary/30'
                    }`}
                    onClick={() => setActiveCategory(category.name)}
                    whileHover={{ backgroundColor: activeCategory !== category.name ? 'rgba(0,0,0,0.05)' : '' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{category.icon}</span>
                    <span className="text-[10px] mt-1">{category.name.split('/')[0]}</span>
                  </motion.button>
                ))}
              </div>
              
              <div className="flex-1 overflow-y-auto p-3">
                <h4 className="text-sm font-medium mb-3">{activeCategory}</h4>
                {activeCategorySnippets.map((snippet, index) => (
                  <motion.div
                    key={`cat-${index}`}
                    className="border border-border rounded-md mb-3 overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="bg-secondary/30 p-2 text-xs font-medium border-b border-border">
                      {snippet.name}
                    </div>
                    <div className="p-2">
                      <p className="text-xs text-muted-foreground mb-2">{snippet.description}</p>
                      {snippet.preview && (
                        <div className="mb-2 p-1 bg-secondary/20 rounded-md overflow-hidden">
                          <img 
                            src={snippet.preview} 
                            alt={snippet.name} 
                            className="w-full h-auto rounded"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <motion.button
                        className="w-full p-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium"
                        onClick={() => handleInsert(snippet.code)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Insertar
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};