const lightbox = document.createElement('dialog');
lightbox.className = 'portfolio-lightbox';
lightbox.setAttribute('aria-label', 'Foto vergroten');

const lightboxImage = document.createElement('img');
lightboxImage.className = 'portfolio-lightbox__image';

const lightboxCounter = document.createElement('p');
lightboxCounter.className = 'portfolio-lightbox__counter';
lightboxCounter.setAttribute('aria-live', 'polite');

function createLightboxButton(className, label, text) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `portfolio-lightbox__button ${className}`;
  button.setAttribute('aria-label', label);
  button.textContent = text;
  return button;
}

const closeButton = createLightboxButton('portfolio-lightbox__close', 'Sluiten', '\u00d7');
const previousButton = createLightboxButton('portfolio-lightbox__previous', 'Vorige foto', '\u2039');
const nextButton = createLightboxButton('portfolio-lightbox__next', 'Volgende foto', '\u203a');

lightbox.append(lightboxImage, lightboxCounter, closeButton, previousButton, nextButton);
document.body.append(lightbox);

let sliderImages = [];
let currentImageIndex = 0;

function showImage(index) {
  currentImageIndex = (index + sliderImages.length) % sliderImages.length;
  const image = sliderImages[currentImageIndex];
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCounter.textContent = `${currentImageIndex + 1} / ${sliderImages.length}`;
  previousButton.disabled = sliderImages.length < 2;
  nextButton.disabled = sliderImages.length < 2;
}

function openLightbox(image) {
  const slider = image.closest('.portfolio-slider');
  if (!slider) return;

  sliderImages = Array.from(slider.querySelectorAll('.portfolio-item img'));
  const imageIndex = sliderImages.indexOf(image);
  if (imageIndex < 0) return;

  showImage(imageIndex);
  lightbox.showModal();
  closeButton.focus();
}

function initializePortfolioLightbox(root = document) {
  const images = [];
  if (root.nodeType === Node.ELEMENT_NODE && root.matches('.portfolio-slider .portfolio-item img')) {
    images.push(root);
  }
  images.push(...root.querySelectorAll('.portfolio-slider .portfolio-item img'));

  images.forEach((image) => {
    if (image.dataset.lightboxReady) return;

    image.dataset.lightboxReady = 'true';
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Dubbelklik om te vergroten: ${image.alt || 'Portfoliofoto'}`);
    image.title = 'Dubbelklik om te vergroten';

    image.addEventListener('dblclick', (event) => {
      event.preventDefault();
      openLightbox(image);
    });

    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });
}

initializePortfolioLightbox();

closeButton.addEventListener('click', () => lightbox.close());
previousButton.addEventListener('click', () => showImage(currentImageIndex - 1));
nextButton.addEventListener('click', () => showImage(currentImageIndex + 1));

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

lightbox.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    lightbox.close();
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    showImage(currentImageIndex - 1);
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    showImage(currentImageIndex + 1);
  }
});
