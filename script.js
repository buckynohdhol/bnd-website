// Bucky Noh Dhol 3.0 — site interactions

/* ------------------------------------------------------------------
   Shared navigation
   Rendered from one place so menu changes touch a single file.
   Each page sets  <body data-page="home|leadership|media|forms|policies">
   and (for pages without a full hero)  data-nav-solid="true".
   ------------------------------------------------------------------ */
function buildNav() {
  const mount = document.getElementById('nav');
  if (!mount) return;

  const page = document.body.dataset.page || '';
  const solid = document.body.dataset.navSolid === 'true';
  const isResources = ['media', 'forms', 'policies'].includes(page);
  const isHistory = ['history-bnd1', 'history-bnd2'].includes(page);
  const active = (p) => (page === p ? ' is-active' : '');

  mount.className = 'nav' + (solid ? ' nav--solid' : '');
  mount.innerHTML = `
    <a href="index.html" class="nav__brand nav__brand--placeholder" aria-label="BND logo (placeholder)">LOGO</a>
    <nav class="nav__links">
      <div class="nav__item nav__item--has-dropdown">
        <a href="index.html" class="nav__toplink${active('home')}">Home<span class="nav__caret"></span></a>
        <div class="nav__dropdown">
          <a href="index.html#about">About</a>
          <a href="index.html#show">Show</a>
          <a href="index.html#sponsors">Sponsors</a>
        </div>
      </div>

      <a href="leadership.html" class="nav__toplink${active('leadership')}">Leadership Team</a>

      <div class="nav__item nav__item--has-dropdown">
        <a href="media.html" class="nav__toplink${isResources ? ' is-active' : ''}">Resources<span class="nav__caret"></span></a>
        <div class="nav__dropdown">
          <a href="media.html" class="${active('media').trim()}">Media</a>
          <a href="forms.html" class="${active('forms').trim()}">Forms</a>
          <a href="policies.html" class="${active('policies').trim()}">Policies</a>
        </div>
      </div>

      <div class="nav__item nav__item--has-dropdown">
        <a href="history-bnd1.html" class="nav__toplink${isHistory ? ' is-active' : ''}">History<span class="nav__caret"></span></a>
        <div class="nav__dropdown">
          <a href="history-bnd1.html" class="${active('history-bnd1').trim()}">BND 1.0: Dons in the 608</a>
          <a href="history-bnd2.html" class="${active('history-bnd2').trim()}">BND 2.0: Raaslympus</a>
        </div>
      </div>

      <a href="contact.html" class="nav__toplink${active('contact')}">Contact</a>
    </nav>
  `;
}

buildNav();

/* ------------------------------------------------------------------
   Solid/blurred nav background once scrolled past the top.
   (Subpages already render solid via data-nav-solid.)
   ------------------------------------------------------------------ */
/* ------------------------------------------------------------------
   Headshots — auto-attach by filename convention.
   Any  .team__grid[data-photos="<dir>"]  gets each member's photo from
   <dir>/<name-slug>.<ext>  (tries jpg → jpeg → png → webp). Missing files
   silently fall back to the dashed placeholder circle. No HTML edits per
   member — just name the file after the person, e.g. "Anjali Patel" →
   anjali-patel.jpg
   ------------------------------------------------------------------ */
function slugifyName(name) {
  return name.trim().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
function loadHeadshots() {
  const exts = ['jpg', 'jpeg', 'png', 'webp'];
  document.querySelectorAll('.team__grid[data-photos]').forEach((grid) => {
    const dir = grid.dataset.photos.replace(/\/+$/, '');
    grid.querySelectorAll('.member').forEach((member) => {
      const nameEl = member.querySelector('.member__name');
      const photo = member.querySelector('.member__photo');
      if (!nameEl || !photo || photo.querySelector('img')) return;
      const slug = slugifyName(nameEl.textContent);
      const img = document.createElement('img');
      img.className = 'member__photo-img';
      img.alt = nameEl.textContent.trim();
      img.loading = 'lazy';
      let i = 0;
      img.onerror = () => {
        i += 1;
        if (i < exts.length) img.src = `${dir}/${slug}.${exts[i]}`;
        else { img.remove(); } // no file found → keep dashed placeholder
      };
      img.onload = () => photo.classList.add('has-img');
      // optional per-photo framing, e.g. data-photo-pos="center 25%"
      if (member.dataset.photoPos) img.style.objectPosition = member.dataset.photoPos;
      img.src = `${dir}/${slug}.${exts[0]}`;
      photo.appendChild(img);
    });
  });
}
loadHeadshots();

/* ------------------------------------------------------------------
   Email obfuscation — assemble the BND address at runtime so it never
   sits in the static HTML for email-harvesting bots to scrape.
     • [data-email-text]        → filled with the address
     • [data-email-link]        → href set to mailto: (+ optional data-email-subject)
     • form[data-formsubmit]    → action set to the FormSubmit endpoint
   ------------------------------------------------------------------ */
(function () {
  var addr = ['buckynohdhol', 'gmail.com'].join('@');
  document.querySelectorAll('[data-email-text]').forEach(function (el) {
    el.textContent = addr;
  });
  document.querySelectorAll('[data-email-link]').forEach(function (el) {
    var subj = el.getAttribute('data-email-subject');
    el.setAttribute('href', 'mailto:' + addr + (subj ? '?subject=' + encodeURIComponent(subj) : ''));
  });
  document.querySelectorAll('form[data-formsubmit]').forEach(function (f) {
    f.setAttribute('action', 'https://formsubmit.co/' + addr);
  });
})();

const nav = document.getElementById('nav');
const onScroll = () => {
  if (!nav) return;
  if (window.scrollY > 40) nav.classList.add('nav--scrolled');
  else nav.classList.remove('nav--scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
