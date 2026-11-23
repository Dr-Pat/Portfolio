(() => {
  'use strict';
  const cards = Array.from(document.querySelectorAll('.blog-card-wrap'));
  const filters = Array.from(document.querySelectorAll('.filter-chip'));
  const search = document.getElementById('blogSearch');
  const empty = document.getElementById('blogEmpty');
  let activeFilter = 'all';

  function updateCards() {
    const term = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
      const searchMatch = !term || `${card.dataset.search || ''} ${card.textContent}`.toLowerCase().includes(term);
      const show = categoryMatch && searchMatch;
      card.hidden = !show;
      if (show) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  }

  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filters.forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    updateCards();
  }));
  search?.addEventListener('input', updateCards);
})();
