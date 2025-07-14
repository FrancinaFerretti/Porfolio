const portfolioItems = document.querySelectorAll('.portfolio-item');

if ('ontouchstart' in window) {
  portfolioItems.forEach(item => {
    item.addEventListener('touchstart', () => {
      const overlay = item.querySelector('.portfolio-overlay');
      if (overlay) overlay.style.opacity = '1';
    });

    item.addEventListener('touchend', () => {
      setTimeout(() => {
        if (!item.matches(':hover')) {
          const overlay = item.querySelector('.portfolio-overlay');
          if (overlay) overlay.style.opacity = '0';
        }
      }, 2000);
    });
  });
}
