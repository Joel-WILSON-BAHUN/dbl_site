/* nav-common.js — Navbar + Modal partagés */

const NAV_HTML = `
<header>
  <nav class="navbar glass" id="navbar">
    <a class="nav-logo" href="index.html">
      <div class="nav-logo-icon">
       <img src="logo_DBL.png" alt="Logo de la Dynamique Bapa de Libreville">
      </div>
      <div>
        <div class="nav-logo-main">Dynamique Bapa</div>
        <div class="nav-logo-sub">Libreville</div>
      </div>
    </a>

    <ul class="nav-links" id="nav-links">
      <li><a href="index.html"        data-page="index">Accueil</a></li>
      <li><a href="a-propos.html"     data-page="a-propos">À Propos</a></li>
      <li><a href="organisation.html" data-page="organisation">Organisation</a></li>
      <li><a href="statuts.html"      data-page="statuts">Statuts &amp; RI</a></li>
      <li><a href="bureau.html"       data-page="bureau">Bureau</a></li>
      <li><a href="actualites.html"   data-page="actualites">Actualités</a></li>
    </ul>

    <div class="nav-actions">
      <button class="btn-info-week" id="open-week-modal" style="display:none">
        <span class="pulse-dot"></span>
        <span class="btn-label">Info de la semaine</span>
      </button>

      <button class="theme-toggle" id="theme-toggle" aria-label="Changer de thème">
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        <svg class="icon-sun"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      </button>

      <button class="burger-btn" id="burger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <ul class="mobile-menu glass" id="mobile-menu">
    <li><a href="index.html"        data-page="index">Accueil</a></li>
    <li><a href="a-propos.html"     data-page="a-propos">À Propos</a></li>
    <li><a href="organisation.html" data-page="organisation">Organisation</a></li>
    <li><a href="statuts.html"      data-page="statuts">Statuts &amp; RI</a></li>
    <li><a href="bureau.html"       data-page="bureau">Bureau Exécutif</a></li>
    <li><a href="actualites.html"   data-page="actualites">Actualités</a></li>
  </ul>
</header>
`;

const MODAL_HTML = `
<div class="modal-overlay" id="week-modal" role="dialog" aria-modal="true">
  <div class="modal-box">
    <div class="modal-header">
      <div class="modal-week-label">
        <svg width="6" height="6" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="4"/></svg>
        Compte rendu de la semaine
      </div>
      <h2>Semaine du 23 juin 2025</h2>
      <p class="modal-date">Réunion ordinaire — 1er dimanche · Siège DBL, PK11</p>
      <button class="modal-close" id="close-week-modal" aria-label="Fermer">&#x2715;</button>
    </div>

    <div class="modal-body">
      <div class="modal-section">
        <div class="modal-section-head">Décisions prises</div>
        <div class="modal-item">
          <span class="modal-item-dot decision"></span>
          <span>Le bureau a validé le calendrier électoral pour le renouvellement du Président — date fixée au <strong>20 juillet 2025</strong>. Dépôt des candidatures ouvert jusqu'au 10 juillet.</span>
        </div>
        <div class="modal-item">
          <span class="modal-item-dot decision"></span>
          <span>La banque scolaire 2025 est officiellement ouverte. Premier tour de tontine tiré au sort : le bénéficiaire a été désigné avec son avaliste.</span>
        </div>
      </div>

      <div class="modal-section">
        <div class="modal-section-head">Événements à venir</div>
        <div class="modal-item">
          <span class="modal-item-dot event"></span>
          <span>Voir bébé de <strong>Mme HOMDIM Hermine</strong> — Samedi 5 juillet à 14h au siège. Participation obligatoire : 5 000F + cadeau de 3 000F minimum.</span>
        </div>
        <div class="modal-item">
          <span class="modal-item-dot event"></span>
          <span>Réunion du Comité Central le <strong>mercredi 2 juillet</strong> à 19h30 — Point sur le fond d'aide et de solidarité.</span>
        </div>
      </div>

      <div class="modal-section">
        <div class="modal-section-head">Rappels</div>
        <div class="modal-item">
          <span class="modal-item-dot rappel"></span>
          <span>Membres n'ayant pas reconstitué leur fond d'aide (150 000F) : délai expirant le <strong>30 juin 2025</strong>. Passé ce délai, aucune aide ne pourra être accordée.</span>
        </div>
        <div class="modal-item">
          <span class="modal-item-dot rappel"></span>
          <span>Toute absence non justifiée à la séance après comité est sanctionnée de <strong>2 000F CFA</strong>. Prévenir le Secrétaire Général en cas d'empêchement.</span>
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <span class="modal-footer-note">Mis à jour le 23 juin 2025</span>
      <button class="btn-modal-close" id="close-week-modal-2">Fermer</button>
    </div>
  </div>
</div>
`;

function initNav(currentPage) {
  // Theme init (avant injection pour éviter flash)
  const saved = localStorage.getItem('dbl-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  // Injecter navbar
  const tmp = document.createElement('div');
  tmp.innerHTML = NAV_HTML;
  document.body.insertBefore(tmp.firstElementChild, document.body.firstChild);

  // Injecter modal
  const tmp2 = document.createElement('div');
  tmp2.innerHTML = MODAL_HTML;
  document.body.appendChild(tmp2.firstElementChild);

  // Lien actif
  document.querySelectorAll('[data-page]').forEach(a => {
    if (a.dataset.page === currentPage) a.classList.add('active');
  });

  // Bouton info semaine — visible uniquement sur index
  if (currentPage === 'index') {
    document.getElementById('open-week-modal').style.display = 'flex';
  }

  // Burger
  document.getElementById('burger').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('open');
  });

  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('dbl-theme', next);
  });

  // Modal info semaine : auto-ouverture uniquement sur index
  const modal = document.getElementById('week-modal');
  if (currentPage === 'index') {
    setTimeout(() => modal.classList.add('open'), 900);
  }
  document.getElementById('open-week-modal').addEventListener('click', () => modal.classList.add('open'));
  document.getElementById('close-week-modal').addEventListener('click', () => modal.classList.remove('open'));
  document.getElementById('close-week-modal-2').addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
}
