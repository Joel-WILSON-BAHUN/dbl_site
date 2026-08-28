/* ============================================================
   chants.js — Données des chants + lecteur audio DBL
   Utilisé par : chants.html (page complète) et index.html (aperçu)

   POUR AJOUTER UN AUDIO :
   1. Déposer le fichier .mp3 dans le dossier /audio
   2. Vérifier que le nom correspond au champ "src" ci-dessous
   Si le fichier est absent, la carte reste affichée avec la
   mention « Audio à venir » (aucune erreur visible).
   ============================================================ */

const CHANTS = [
  {
    id: 'hymne',
    cat: 'hymne',
    catLabel: 'Hymne',
    titre: 'Hymne BAPA',
    sousTitre: 'Chant officiel de la communauté Bapa',
    src: 'audio/hymne-bapa.mp3',
    desc: "Chant officiel entonné à l'ouverture des assises et lors des grandes manifestations de la Dynamique Bapa de Libreville. Il rappelle l'attachement de la communauté à son village et à sa devise : Union, Fraternité, Amour.",
    paroles: ''
  },
  {
    id: 'ouverture',
    cat: 'traditionnel',
    catLabel: 'Traditionnel',
    titre: "Pa 'a – Kuitchouè",
    sousTitre: 'Chant d\'ouverture de séance',
    src: 'audio/pa-a-kuitchoue.mp3',
    desc: "Chant rituel reprenant le slogan de l'association. Il est lancé par le Chargé Culturel & Protocole avant l'ouverture officielle de chaque réunion ordinaire.",
    paroles: ''
  },
  {
    id: 'accueil-membres',
    cat: 'traditionnel',
    catLabel: 'Traditionnel',
    titre: 'Chant de bienvenue',
    sousTitre: 'Accueil des nouveaux adhérents',
    src: 'audio/chant-bienvenue.mp3',
    desc: "Entonné pour accueillir un nouveau membre au sein de la DBL, ou un hôte de passage venu du village. Il marque l'entrée du nouvel adhérent dans la grande famille Bapa.",
    paroles: ''
  },
  {
    id: 'village',
    cat: 'traditionnel',
    catLabel: 'Traditionnel',
    titre: 'Chant du village Bapa',
    sousTitre: 'Mémoire et transmission',
    src: 'audio/chant-village-bapa.mp3',
    desc: "Chant de mémoire évoquant la terre des Hauts Plateaux, les anciens et les coutumes du village. Il est transmis aux plus jeunes pour préserver la langue et l'héritage Bapa.",
    paroles: ''
  },
  {
    id: 'deuil',
    cat: 'deuil',
    catLabel: 'Deuil',
    titre: 'Chant de veillée',
    sousTitre: 'Accompagnement dans le deuil',
    src: 'audio/chant-veillee.mp3',
    desc: "Chant d'accompagnement exécuté lors des veillées et des cérémonies de deuil, en signe de soutien fraternel à la famille éprouvée.",
    paroles: ''
  },
  {
    id: 'rejouissance',
    cat: 'fete',
    catLabel: 'Fête',
    titre: 'Chant de réjouissance',
    sousTitre: 'Mariages, naissances, cassations',
    src: 'audio/chant-rejouissance.mp3',
    desc: "Chant de joie repris lors des mariages, des « voir bébé », des cassations de banque et de toutes les occasions heureuses partagées par les membres.",
    paroles: ''
  },
  {
    id: 'cloture',
    cat: 'traditionnel',
    catLabel: 'Traditionnel',
    titre: 'Chant de clôture',
    sousTitre: 'Fin des assises',
    src: 'audio/chant-cloture.mp3',
    desc: "Chant final marquant la levée de la séance. Les membres se tiennent debout et le reprennent ensemble avant la dispersion.",
    paroles: ''
  }
];

/* ---------- Utilitaires ---------- */

function chantsFmtTime(sec) {
  if (!isFinite(sec) || sec < 0) return '--:--';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ':' + String(s).padStart(2, '0');
}

const ICON_PLAY  = '<svg class="pp-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5z"/></svg>';
const ICON_PAUSE = '<svg class="pp-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/></svg>';
const ICON_CHEVRON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

/* Bloc lecteur commun à toutes les cartes */
function playerHTML(c) {
  return `
    <div class="audio-player">
      <button class="play-btn" type="button" aria-label="Écouter ${c.titre}">
        ${ICON_PLAY}${ICON_PAUSE}
      </button>
      <div class="player-main">
        <div class="progress-wrap" role="slider" tabindex="0" aria-label="Progression de la lecture" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div class="progress-bar"></div>
        </div>
        <div class="player-times">
          <span class="t-cur">0:00</span>
          <span class="t-dur">--:--</span>
        </div>
      </div>
    </div>
    <audio preload="metadata" src="${c.src}"></audio>`;
}

/* Bloc paroles (repliable) */
function parolesHTML(c) {
  const contenu = (c.paroles && c.paroles.trim())
    ? c.paroles
    : '<span class="paroles-vide">Paroles non encore publiées. Le texte sera mis en ligne dès sa transmission par le Chargé Culturel &amp; Protocole.</span>';
  return `
    <button class="paroles-toggle" type="button" aria-expanded="false">
      <span class="pt-label">Voir les paroles</span>${ICON_CHEVRON}
    </button>
    <div class="paroles">${contenu}</div>`;
}

/* ---------- Rendu ---------- */

function chantCardHTML(c, i) {
  return `
    <article class="chant-card" data-chant="${c.id}" data-cat="${c.cat}" data-aos="fade-up" data-aos-delay="${(i % 3) * 60}">
      <div class="chant-card-head">
        <span class="tag ${c.cat === 'hymne' ? 'tag-green' : 'tag-gold'}">${c.catLabel}</span>
        <span class="chant-soon">Audio à venir</span>
      </div>
      <h3 class="chant-titre">${c.titre}</h3>
      <p class="chant-desc">${c.desc}</p>
      ${playerHTML(c)}
      ${parolesHTML(c)}
    </article>`;
}

function chantFeaturedHTML(c) {
  return `
    <div class="chant-featured" data-chant="${c.id}" data-cat="${c.cat}" data-aos="fade-up">
      <div class="chant-featured-head">
        <span class="chant-featured-label">
          <svg width="6" height="6" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="4"/></svg>
          ${c.catLabel} de la DBL
        </span>
        <h2>${c.titre}</h2>
        <p>${c.desc}</p>
      </div>
      <div class="chant-featured-body">
        ${playerHTML(c)}
        <span class="chant-soon">Audio à venir</span>
        ${parolesHTML(c)}
      </div>
    </div>`;
}

/* ---------- Lecteur : logique ---------- */

let chantsCourant = null; // élément <audio> en cours de lecture

function initPlayer(bloc) {
  const audio   = bloc.querySelector('audio');
  const btn     = bloc.querySelector('.play-btn');
  const barre   = bloc.querySelector('.progress-bar');
  const piste   = bloc.querySelector('.progress-wrap');
  const tCur    = bloc.querySelector('.t-cur');
  const tDur    = bloc.querySelector('.t-dur');
  if (!audio || !btn) return;

  // Fichier audio absent ou illisible → état « Audio à venir »
  function indisponible() {
    bloc.classList.add('is-unavailable');
    bloc.classList.remove('is-playing');
    btn.disabled = true;
    btn.classList.remove('playing');
    tDur.textContent = '--:--';
  }
  audio.addEventListener('error', indisponible);

  audio.addEventListener('loadedmetadata', () => {
    bloc.classList.remove('is-unavailable');
    btn.disabled = false;
    tDur.textContent = chantsFmtTime(audio.duration);
  });

  btn.addEventListener('click', () => {
    if (audio.paused) {
      // Un seul chant à la fois
      if (chantsCourant && chantsCourant !== audio) chantsCourant.pause();
      audio.play().catch(indisponible);
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', () => {
    chantsCourant = audio;
    btn.classList.add('playing');
    bloc.classList.add('is-playing');
    btn.setAttribute('aria-label', 'Mettre en pause');
  });

  audio.addEventListener('pause', () => {
    btn.classList.remove('playing');
    bloc.classList.remove('is-playing');
    btn.setAttribute('aria-label', 'Reprendre la lecture');
  });

  function majAffichage() {
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    barre.style.width = pct + '%';
    tCur.textContent = chantsFmtTime(audio.currentTime);
    piste.setAttribute('aria-valuenow', Math.round(pct));
  }
  audio.addEventListener('timeupdate', majAffichage);
  audio.addEventListener('seeked', majAffichage);

  audio.addEventListener('ended', () => {
    barre.style.width = '0%';
    tCur.textContent = '0:00';
    btn.classList.remove('playing');
    bloc.classList.remove('is-playing');
  });

  // Déplacement dans la piste (clic + clavier)
  function deplacable() {
    return audio.seekable && audio.seekable.length > 0 && audio.seekable.end(0) > 0;
  }
  audio.addEventListener('canplay', () => {
    piste.classList.toggle('no-seek', !deplacable());
  });
  function seek(clientX) {
    if (!audio.duration || !deplacable()) return;
    const r = piste.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
    audio.currentTime = ratio * audio.duration;
  }
  piste.addEventListener('click', e => seek(e.clientX));
  piste.addEventListener('keydown', e => {
    if (!audio.duration || !deplacable()) return;
    if (e.key === 'ArrowRight') { audio.currentTime = Math.min(audio.currentTime + 5, audio.duration); e.preventDefault(); }
    if (e.key === 'ArrowLeft')  { audio.currentTime = Math.max(audio.currentTime - 5, 0); e.preventDefault(); }
  });

  // Paroles repliables
  const toggle = bloc.querySelector('.paroles-toggle');
  const paroles = bloc.querySelector('.paroles');
  if (toggle && paroles) {
    toggle.addEventListener('click', () => {
      const ouvert = paroles.classList.toggle('open');
      toggle.classList.toggle('open', ouvert);
      toggle.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
      toggle.querySelector('.pt-label').textContent = ouvert ? 'Masquer les paroles' : 'Voir les paroles';
    });
  }
}

/* Rend une liste de chants dans un conteneur.
   opts.featured = true → première carte en version mise en avant */
function renderChants(conteneur, liste, opts) {
  if (!conteneur) return;
  opts = opts || {};
  if (!liste.length) {
    conteneur.innerHTML = '<p style="color:var(--muted);font-size:14px;">Aucun chant dans cette catégorie pour le moment.</p>';
    return;
  }
  conteneur.innerHTML = liste.map((c, i) => (opts.featured ? chantFeaturedHTML(c) : chantCardHTML(c, i))).join('');
  conteneur.querySelectorAll('.chant-card, .chant-featured').forEach(initPlayer);
  if (window.AOS && AOS.refreshHard) AOS.refreshHard();
}

/* Lance la lecture de l'hymne (utilisé par le bouton du hero) */
function jouerHymne() {
  const bloc = document.querySelector('[data-chant="hymne"]');
  if (!bloc) return;
  const btn = bloc.querySelector('.play-btn');
  if (!btn || btn.disabled) return;
  const audio = bloc.querySelector('audio');
  if (audio && audio.paused) btn.click();
}
