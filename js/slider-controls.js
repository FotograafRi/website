function updateSliderControls(container) {
  const slider = container.querySelector('.portfolio-slider, .about-carousel-slider');
  const previousButton = container.querySelector('.nav-btn.prev');
  const nextButton = container.querySelector('.nav-btn.next');
  if (!slider || !previousButton || !nextButton) return;

  const maxScroll = slider.scrollWidth - slider.clientWidth;
  previousButton.disabled = maxScroll <= 1 || slider.scrollLeft <= 1;
  nextButton.disabled = maxScroll <= 1 || slider.scrollLeft >= maxScroll - 1;
}

const sliderContainers = new Set();

function initializeSliderControls(root = document) {
  const containers = [];
  if (root.nodeType === Node.ELEMENT_NODE && root.matches('.portfolio-container, .about-carousel-container')) {
    containers.push(root);
  }
  containers.push(...root.querySelectorAll('.portfolio-container, .about-carousel-container'));

  containers.forEach((container) => {
    if (sliderContainers.has(container)) return;

    const slider = container.querySelector('.portfolio-slider, .about-carousel-slider');
    if (!slider) return;

    sliderContainers.add(container);
    slider.addEventListener('scroll', () => updateSliderControls(container), { passive: true });
    updateSliderControls(container);
  });
}

initializeSliderControls();

window.addEventListener('resize', () => {
  sliderContainers.forEach(updateSliderControls);
});

window.addEventListener('load', () => {
  sliderContainers.forEach(updateSliderControls);
});
