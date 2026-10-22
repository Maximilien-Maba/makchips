(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');

  // Mobile navigation: open/close and close after selecting a section.
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
      nav.classList.toggle('is-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
        nav.classList.remove('is-open');
      });
    });
  }

  // Reveal sections progressively; content remains visible if the API is unavailable.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Product buttons preselect the requested item in the WhatsApp order form.
  const productSelect = document.querySelector('#product-select');
  document.querySelectorAll('[data-product]').forEach((link) => {
    link.addEventListener('click', () => {
      if (productSelect) productSelect.value = link.dataset.product;
    });
  });

  // Wholesale CTA selects the matching request type.
  const orderKind = document.querySelector('#order-kind');
  document.querySelectorAll('[data-order-type]').forEach((link) => {
    link.addEventListener('click', () => {
      if (orderKind) orderKind.value = link.dataset.orderType;
    });
  });

  // Build a prefilled WhatsApp message. The customer still presses Send in WhatsApp.
  const orderForm = document.querySelector('#whatsapp-order');
  const formError = document.querySelector('#form-error');
  const whatsappNumber = '243976125282'; // Number displayed on the supplied brand visual.

  if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!orderForm.reportValidity()) return;

      const data = new FormData(orderForm);
      const name = String(data.get('name') || '').trim();
      const product = String(data.get('product') || '').trim();
      const quantity = String(data.get('quantity') || '').trim();
      const kind = String(data.get('kind') || '').trim();
      const details = String(data.get('details') || '').trim();

      if (!name || !product || !quantity || Number(quantity) < 1) {
        if (formError) {
          formError.hidden = false;
          formError.textContent = 'Vérifiez votre nom, le produit et la quantité.';
        }
        return;
      }

      if (formError) formError.hidden = true;
      const lines = [
        'Bonjour MAK’CHIPS, je souhaite faire une demande.',
        '',
        `Nom : ${name}`,
        `Produit : ${product}`,
        `Quantité : ${quantity}`,
        `Type : ${kind}`,
        details ? `Précisions : ${details}` : '',
        '',
        'Merci de me confirmer la disponibilité et le prix.'
      ].filter(Boolean);

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // Keep the copyright year current.
  const year = document.querySelector('#current-year');
  if (year) year.textContent = new Date().getFullYear();
})();
