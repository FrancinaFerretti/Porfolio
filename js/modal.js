let currentImageIndex = 0;
let currentImages = [];
let isAnimating = false;

const modal = document.getElementById('projectModal');
const modalMainImage = document.getElementById('modalMainImage');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.querySelector('.modal-close');
const thumbnailsContainer = document.getElementById('thumbnails');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const projectData = {
  'Arquitectura Enterrada': {
    subject: 'Morfología 1',
    description: 'Proyecto de arquitectura enterrada que explora la relación entre el espacio construido y el paisaje natural.',
    year: '2024',
    tools: 'AutoCAD, SketchUp, Photoshop',
    images: [
      'img/arquitectura-enterrada/img1.jpg',
      'img/arquitectura-enterrada/img2.jpg',
      'img/arquitectura-enterrada/img3.jpg',
      'img/arquitectura-enterrada/img4.jpg',
      'img/arquitectura-enterrada/img5.jpg',
      'img/arquitectura-enterrada/img6.jpg',
      'img/arquitectura-enterrada/img7.jpg',
      'img/arquitectura-enterrada/img8.jpg',
      'img/arquitectura-enterrada/img9.jpg',
      'img/arquitectura-enterrada/img10.jpg',
      'img/arquitectura-enterrada/img11.jpg',
      'img/arquitectura-enterrada/img12.png',
      'img/arquitectura-enterrada/img13.jpg',
      'img/arquitectura-enterrada/img14.jpg',
      'img/arquitectura-enterrada/img15.png',
      'img/arquitectura-enterrada/img16.jpg',
    ]
  },
  'Conjunto de Viviendas': {
    subject: 'Proyecto Arquitectónico',
    description: 'Diseño de conjunto habitacional que busca optimizar el uso del suelo.',
    year: '2024',
    tools: 'Revit, 3ds Max, V-Ray',
    images: [
      'img/conjunto-viviendas/img1.jpg',
      'img/conjunto-viviendas/img2.jpg'
    ]
  },
  'Oficinas Estudio Contable': {
    subject: 'Diseño Interior',
    description: 'Diseño interior de oficinas para estudio contable.',
    year: '2024',
    tools: 'AutoCAD, SketchUp, Photoshop',
    images: [
      'img/oficinas-estudio-contable/img1.jpg',
      'img/oficinas-estudio-contable/img2.jpg',
      'img/oficinas-estudio-contable/img3.jpg',
      'img/oficinas-estudio-contable/img4.jpg',
      'img/oficinas-estudio-contable/img5.jpg',
      'img/oficinas-estudio-contable/img6.jpg',
      'img/oficinas-estudio-contable/img7.jpg',
      'img/oficinas-estudio-contable/img8.jpg',
      'img/oficinas-estudio-contable/img9.jpg',
      'img/oficinas-estudio-contable/img10.jpg',
      'img/oficinas-estudio-contable/img11.jpg',
      'img/oficinas-estudio-contable/img12.jpg',
      'img/oficinas-estudio-contable/img13.jpg',
      'img/oficinas-estudio-contable/img14.jpg',
      'img/oficinas-estudio-contable/img15.jpg',
    ]
  },
  'Edificio de Oficinas': {
    subject: 'Diseño Arquitectónico',
    description: 'Complejo de oficinas moderno con criterios de sustentabilidad.',
    year: '2024',
    tools: 'Revit, 3ds Max, V-Ray',
    images: [
      'img/edificio-oficinas/img1.jpg',
      'img/edificio-oficinas/img2.jpg',
      'img/edificio-oficinas/img3.jpg',
      'img/edificio-oficinas/img4.jpg',
      'img/edificio-oficinas/img5.jpg',
      'img/edificio-oficinas/img6.jpg',
    ]
  },
  'Edificio Spa': {
    subject: 'Muro Cortina',
    description: 'Edificio de spa con sistema de muro cortina.',
    year: '2024',
    tools: 'Revit, Rhino, V-Ray',
    images: [
      'img/edificio-spa/img1.jpg',
      'img/edificio-spa/img2.jpg',
      'img/edificio-spa/img3.jpg',
    ]
  },
  'Biblioteca San Isidro': {
    subject: 'Equipamiento Público',
    description: 'Diseño de biblioteca pública que funciona como centro cultural.',
    year: '2024',
    tools: 'AutoCAD, SketchUp, Lumion',
    images: [
      'img/biblioteca-san-isidro/img1.jpg',
      'img/biblioteca-san-isidro/img2.jpg'
    ]
  },
  'Proyecto Morfología': {
    subject: 'Morfología',
    description: 'Exploración morfológica de formas arquitectónicas.',
    year: '2024',
    tools: 'Rhino, Grasshopper, V-Ray',
    images: [
      'img/proyecto-morfologia/img1.png',
      'img/proyecto-morfologia/img2.jpg',
      'img/proyecto-morfologia/img3.jpg',
      'img/proyecto-morfologia/img4.jpg',
      'img/proyecto-morfologia/img5.jpg',
      'img/proyecto-morfologia/img6.jpg',
      'img/proyecto-morfologia/img7.jpg',
      'img/proyecto-morfologia/img8.jpg',
    ]
  }
};

function showImage(index, direction = 'none') {
  if (currentImages.length === 0 || isAnimating) return;
  
  const newIndex = Math.max(0, Math.min(index, currentImages.length - 1));
  
  if (newIndex === currentImageIndex) return;
  
  isAnimating = true;
  
  // Determinar la dirección de la animación si no se especifica
  if (direction === 'none') {
    direction = newIndex > currentImageIndex ? 'next' : 'prev';
  }
  
  // Precargar la nueva imagen
  const newImg = new Image();
  newImg.onload = () => {
    animateImageTransition(newImg.src, direction, () => {
      currentImageIndex = newIndex;
      updateThumbnails();
      updateNavigationButtons();
      updateImageCounter();
      isAnimating = false;
    });
  };
  
  newImg.onerror = () => {
    isAnimating = false;
  };
  
  newImg.src = currentImages[newIndex];
}

function animateImageTransition(newSrc, direction, callback) {
  const currentImg = modalMainImage;
  const container = currentImg.parentElement;
  
  // Crear imagen temporal para la animación
  const tempImg = document.createElement('img');
  tempImg.src = newSrc;
  tempImg.className = 'modal-main-image modal-temp-image';
  tempImg.style.position = 'absolute';
  tempImg.style.top = '0';
  tempImg.style.left = '0';
  tempImg.style.width = '100%';
  tempImg.style.height = '100%';
  tempImg.style.objectFit = 'cover';
  
  // Configurar posición inicial basada en la dirección
  if (direction === 'next') {
    tempImg.style.transform = 'translateX(100%)';
    tempImg.style.opacity = '0';
  } else {
    tempImg.style.transform = 'translateX(-100%)';
    tempImg.style.opacity = '0';
  }
  
  container.appendChild(tempImg);
  
  // Forzar reflow para que los estilos se apliquen
  tempImg.offsetHeight;
  
  // Animar imagen actual (salida)
  currentImg.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
  
  if (direction === 'next') {
    currentImg.style.transform = 'translateX(-100%)';
  } else {
    currentImg.style.transform = 'translateX(100%)';
  }
  currentImg.style.opacity = '0';
  
  // Animar imagen nueva (entrada)
  tempImg.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
  
  requestAnimationFrame(() => {
    tempImg.style.transform = 'translateX(0)';
    tempImg.style.opacity = '1';
  });
  
  // Limpiar después de la animación
  setTimeout(() => {
    currentImg.src = newSrc;
    currentImg.style.transition = '';
    currentImg.style.transform = 'translateX(0)';
    currentImg.style.opacity = '1';
    
    if (container.contains(tempImg)) {
      container.removeChild(tempImg);
    }
    
    if (callback) callback();
  }, 500);
}

function showImageInstant(index) {
  if (currentImages.length === 0 || isAnimating) return;
  
  currentImageIndex = index;
  const img = new Image();
  img.onload = () => {
    modalMainImage.src = currentImages[index];
    modalMainImage.style.transform = 'translateX(0)';
    modalMainImage.style.opacity = '1';
    updateThumbnails();
    updateNavigationButtons();
    updateImageCounter();
  };
  img.src = currentImages[index];
}

function updateThumbnails() {
  thumbnailsContainer.querySelectorAll('.thumbnail').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === currentImageIndex);
  });
}

function updateNavigationButtons() {
  prevBtn.disabled = currentImageIndex === 0;
  nextBtn.disabled = currentImageIndex === currentImages.length - 1;
  
  // Actualizar opacidad de los botones
  prevBtn.style.opacity = currentImageIndex === 0 ? '0.3' : '1';
  nextBtn.style.opacity = currentImageIndex === currentImages.length - 1 ? '0.3' : '1';
}

function updateImageCounter() {
  let counter = document.querySelector('.image-counter');
  if (!counter) {
    counter = document.createElement('div');
    counter.className = 'image-counter';
    document.querySelector('.main-image-container').appendChild(counter);
  }
  counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
}

function createThumbnails(images) {
  const fragment = document.createDocumentFragment();
  images.forEach((src, index) => {
    const thumb = document.createElement('img');
    thumb.src = src;
    thumb.className = 'thumbnail';
    thumb.loading = 'lazy';
    thumb.addEventListener('click', () => showImage(index));
    fragment.appendChild(thumb);
  });
  thumbnailsContainer.innerHTML = '';
  thumbnailsContainer.appendChild(fragment);
}

let navigationTimeout;
function navigateImage(direction) {
  if (isAnimating) return;
  
  clearTimeout(navigationTimeout);
  navigationTimeout = setTimeout(() => {
    if (direction === 'prev' && currentImageIndex > 0) {
      showImage(currentImageIndex - 1, 'prev');
    } else if (direction === 'next' && currentImageIndex < currentImages.length - 1) {
      showImage(currentImageIndex + 1, 'next');
    }
  }, 50);
}

function openModal(title, project) {
  if (!project || !project.images) return;
  
  currentImages = project.images;
  currentImageIndex = 0;
  modalTitle.textContent = title;

  document.querySelector('.modal-info').innerHTML = `
    <h3>${title}</h3>
    <div class="modal-subject">${project.subject}</div>
    <div class="modal-description">${project.description}</div>
    <div class="modal-details">
      <div class="modal-detail-item">
        <div class="modal-detail-label">Año</div>
        <div class="modal-detail-value">${project.year}</div>
      </div>
      <div class="modal-detail-item">
        <div class="modal-detail-label">Herramientas</div>
        <div class="modal-detail-value">${project.tools}</div>
      </div>
    </div>
  `;

  createThumbnails(currentImages);
  showImageInstant(0);

  modal.style.display = 'flex';
  requestAnimationFrame(() => modal.classList.add('show'));
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (isAnimating) return;
  
  isAnimating = true;
  modal.classList.remove('show');
  
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    isAnimating = false;
    
    // Limpiar cualquier imagen temporal que pueda quedar
    const tempImages = document.querySelectorAll('.modal-temp-image');
    tempImages.forEach(img => img.remove());
  }, 300);
}

// Event Listeners
document.querySelector('.portfolio-grid')?.addEventListener('click', (e) => {
  const item = e.target.closest('.portfolio-item');
  if (!item) return;
  const title = item.querySelector('h3')?.textContent;
  const project = projectData[title];
  if (project) openModal(title, project);
});

document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('show') || isAnimating) return;
  
  e.preventDefault();
  
  if (e.key === 'Escape') {
    closeModal();
  } else if (e.key === 'ArrowLeft') {
    navigateImage('prev');
  } else if (e.key === 'ArrowRight') {
    navigateImage('next');
  }
});

// Soporte para gestos táctiles (swipe)
let touchStartX = 0;
let touchEndX = 0;

modalMainImage.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

modalMainImage.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;
  
  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      // Swipe derecha - imagen anterior
      navigateImage('prev');
    } else {
      // Swipe izquierda - imagen siguiente
      navigateImage('next');
    }
  }
}

prevBtn.addEventListener('click', () => navigateImage('prev'));
nextBtn.addEventListener('click', () => navigateImage('next'));
modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});