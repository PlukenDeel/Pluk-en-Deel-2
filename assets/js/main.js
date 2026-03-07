// ─── Hamburger menu ───
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

function sluitMenu() {
  navLinks.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Navigatiemenu openen');
}

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  hamburger.setAttribute('aria-label', isOpen ? 'Navigatiemenu sluiten' : 'Navigatiemenu openen');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', sluitMenu));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) { sluitMenu(); hamburger.focus(); }
});
navLinks.addEventListener('focusout', e => {
  if (!navLinks.contains(e.relatedTarget)) sluitMenu();
});

// ─── Verlopen agenda-kaarten (client-side check) ───
// Kaarten hebben data-iso attribuut; we vergelijken met vandaag
document.querySelectorAll('.agenda-kaart[data-iso]').forEach(kaart => {
  const iso = kaart.dataset.iso;
  if (!iso) return;
  const datum = new Date(iso);
  datum.setHours(23, 59, 59); // einde van de dag
  if (datum < new Date()) {
    kaart.classList.add('verlopen');
  }
});

// ─── Teller-animatie impact dashboard ───
function animeerTeller(el) {
  const doel  = parseInt(el.dataset.doel, 10);
  const duur  = 1800;
  const stap  = 16;
  const stappen = duur / stap;
  let huidig = 0;
  const timer = setInterval(() => {
    huidig += doel / stappen;
    if (huidig >= doel) { huidig = doel; clearInterval(timer); }
    el.textContent = Math.round(huidig).toLocaleString('nl-NL');
  }, stap);
}

// ─── Fade-in + tellers via IntersectionObserver ───
if ('IntersectionObserver' in window) {
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -80px 0px', threshold: 0 });
  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  const impactObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.impact-getal[data-doel]').forEach(animeerTeller);
        impactObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  const impactSectie = document.querySelector('.impact');
  if (impactSectie) impactObserver.observe(impactSectie);
} else {
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
}

// ─── Aanmeldformulier ───
function verstuurFormulier() {
  const naam  = document.getElementById('naam').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!naam || !email) {
    alert('Vul je naam en e-mailadres in om je aan te melden.');
    return;
  }
  document.getElementById('formInhoud').style.display = 'none';
  const succes = document.getElementById('formSucces');
  succes.style.display = 'block';
  succes.focus();
}
