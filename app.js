const eventDate = new Date('2026-10-02T22:00:00-05:00').getTime();
const numberFormatter = new Intl.NumberFormat('es-ES', { minimumIntegerDigits: 2, useGrouping: false });

function updateCountdown() {
  const remaining = Math.max(0, eventDate - Date.now());
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  document.querySelector('#days').textContent = numberFormatter.format(days);
  document.querySelector('#hours').textContent = numberFormatter.format(hours);
  document.querySelector('#minutes').textContent = numberFormatter.format(minutes);
  document.querySelector('#seconds').textContent = numberFormatter.format(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 55, 330)}ms`;
  revealObserver.observe(element);
});
