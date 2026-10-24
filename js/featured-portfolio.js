const featuredPortfolio = document.querySelector('[data-featured-slider]');

if (featuredPortfolio) {
  const sliderId = featuredPortfolio.dataset.featuredSlider;

  fetch('portfolio.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Portfolio request failed with status ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      const portfolioDocument = new DOMParser().parseFromString(html, 'text/html');
      const portfolioSlider = portfolioDocument.getElementById(sliderId);
      const portfolioSection = portfolioSlider?.closest('.portfolio-gallery-section');

      if (!portfolioSection) {
        throw new Error(`Portfolio slider "${sliderId}" was not found`);
      }

      const featuredSection = portfolioSection.cloneNode(true);
      featuredPortfolio.replaceChildren(featuredSection);
      featuredPortfolio.removeAttribute('role');
      initializeSliderControls(featuredSection);
      initializePortfolioLightbox(featuredSection);
    })
    .catch((error) => {
      console.error('Failed to load featured portfolio slider:', error);
      featuredPortfolio.textContent = 'De portfolio-slider kon niet worden geladen.';
    });
}
