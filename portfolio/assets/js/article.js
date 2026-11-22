(function () {
  'use strict';
  const progress = document.getElementById('readingProgressBar');
  const article = document.getElementById('articleBody');
  const tocLinks = Array.from(document.querySelectorAll('.article-toc a'));

  function updateReadingProgress() {
    if (!progress || !article) return;
    const articleTop = article.getBoundingClientRect().top + window.scrollY;
    const articleHeight = article.offsetHeight;
    const available = Math.max(1, articleHeight - window.innerHeight * 0.55);
    const amount = Math.min(100, Math.max(0, ((window.scrollY - articleTop + 120) / available) * 100));
    progress.style.width = amount + '%';
  }

  window.addEventListener('scroll', updateReadingProgress, { passive: true });
  window.addEventListener('resize', updateReadingProgress);
  updateReadingProgress();

  const headings = tocLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && headings.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
        }
      });
    }, { rootMargin: '-18% 0px -68% 0px' });
    headings.forEach(heading => observer.observe(heading));
  }

  const copyButton = document.getElementById('copyArticleLink');
  const feedback = document.getElementById('copyFeedback');
  if (copyButton) {
    copyButton.addEventListener('click', async function () {
      try {
        await navigator.clipboard.writeText(window.location.href);
        if (feedback) feedback.textContent = 'Link copied';
      } catch (error) {
        if (feedback) feedback.textContent = 'Copy unavailable in this browser';
      }
    });
  }
})();
