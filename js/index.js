// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = 'none';
  }
});

// Portfolio filters
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 100);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Portfolio modal
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.querySelector('.modal-close');

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

// Variables para la galería
let currentImageIndex = 0;
let currentImages = [];

// Elementos del modal
const modalMainImage = document.getElementById('modalMainImage');
const thumbnailsContainer = document.getElementById('thumbnails');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Función para mostrar imagen
function showImage(index) {
  if (currentImages.length === 0) return;

  currentImageIndex = index;
  modalMainImage.src = currentImages[index];

  // Actualizar thumbnails
  const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });

  // Actualizar botones de navegación
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === currentImages.length - 1;

  // Actualizar contador
  updateImageCounter();
}

// Función para actualizar contador de imágenes
function updateImageCounter() {
  let counter = document.querySelector('.image-counter');
  if (!counter) {
    counter = document.createElement('div');
    counter.className = 'image-counter';
    document.querySelector('.main-image-container').appendChild(counter);
  }
  counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
}

// Función para crear thumbnails
function createThumbnails(images) {
  thumbnailsContainer.innerHTML = '';

  images.forEach((imageSrc, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = imageSrc;
    thumbnail.className = 'thumbnail';
    thumbnail.addEventListener('click', () => showImage(index));
    thumbnailsContainer.appendChild(thumbnail);
  });
}

// Navegación con botones
prevBtn.addEventListener('click', () => {
  if (currentImageIndex > 0) {
    showImage(currentImageIndex - 1);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentImageIndex < currentImages.length - 1) {
    showImage(currentImageIndex + 1);
  }
});

// Abrir modal
portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const title = item.querySelector('h3').textContent;
    const project = projectData[title];

    if (project && project.images) {
      currentImages = project.images;
      currentImageIndex = 0;

      // Actualizar información del proyecto
      modalTitle.textContent = title;
      document.querySelector('.modal-subject').textContent = project.subject || 'Proyecto Académico';
      document.querySelector('.modal-description').textContent = project.description || 'Descripción próximamente.';

      // Actualizar detalles
      const yearElement = document.querySelector('.modal-detail-value');
      const toolsElement = document.querySelectorAll('.modal-detail-value')[1];
      yearElement.textContent = project.year || '2024';
      toolsElement.textContent = project.tools || 'AutoCAD, SketchUp';

      // Crear thumbnails y mostrar primera imagen
      createThumbnails(currentImages);
      showImage(0);

      // Mostrar modal
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('show'), 10);
      document.body.style.overflow = 'hidden';
    }
  });
});

// Navegación con teclado
document.addEventListener('keydown', (e) => {
  if (modal.classList.contains('show')) {
    switch (e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        if (currentImageIndex > 0) showImage(currentImageIndex - 1);
        break;
      case 'ArrowRight':
        if (currentImageIndex < currentImages.length - 1) showImage(currentImageIndex + 1);
        break;
    }
  }
});

// Cerrar modal (mantén la función que ya tienes)
function closeModal() {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 300);
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Actualizar la función de apertura del modal:
portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const title = item.querySelector('h3').textContent;
    const project = projectData[title];

    modalImage.src = img.src;
    modalTitle.textContent = title;

    // Actualizar el HTML del modal-info
    document.querySelector('.modal-info').innerHTML = `
      <h3>${title}</h3>
      <div class="modal-subject">${project?.subject || 'Proyecto Académico'}</div>
      <div class="modal-description">${project?.description || 'Descripción del proyecto próximamente.'}</div>
      <div class="modal-details">
        <div class="modal-detail-item">
          <div class="modal-detail-label">Año</div>
          <div class="modal-detail-value">${project?.year || '2024'}</div>
        </div>
        <div class="modal-detail-item">
          <div class="modal-detail-label">Herramientas</div>
          <div class="modal-detail-value">${project?.tools || 'AutoCAD, SketchUp'}</div>
        </div>
      </div>
    `;

    modal.style.display = 'flex'; // Cambiar a flex
    setTimeout(() => modal.classList.add('show'), 10);
    document.body.style.overflow = 'hidden';
  });
});

// Actualizar la función de cierre:
function closeModal() {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 300);
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});



// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Initialize first animation
document.querySelector('.hero .fade-in').classList.add('visible');

// Touch optimizations for mobile
if ('ontouchstart' in window) {
  portfolioItems.forEach(item => {
    item.addEventListener('touchstart', () => {
      item.querySelector('.portfolio-overlay').style.opacity = '1';
    });

    item.addEventListener('touchend', () => {
      setTimeout(() => {
        if (!item.matches(':hover')) {
          item.querySelector('.portfolio-overlay').style.opacity = '0';
        }
      }, 2000);
    });
  });
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = '<span>Sending...</span>';
  submitBtn.disabled = true;

  // Simulate form submission (replace with actual form handling)
  setTimeout(() => {
    submitBtn.innerHTML = '<span>Message Sent!</span>';
    submitBtn.style.background = '#4CAF50';

    // Reset form
    setTimeout(() => {
      this.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = 'var(--accent-color)';
      submitBtn.disabled = false;
    }, 2000);
  }, 1500);
});

// Add floating label animation
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
  input.addEventListener('blur', function () {
    if (this.value !== '') {
      this.setAttribute('data-filled', 'true');
    } else {
      this.removeAttribute('data-filled');
    }
  });
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const body = `Nombre: ${name}%0AEmail: ${email}%0A%0AMensaje:%0A${encodeURIComponent(message)}`;
  const mailtoLink = `mailto:francinaferretti@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  window.location.href = mailtoLink;
});

function animateImageChange(newIndex, direction) {
  // direction: 'left' (siguiente), 'right' (anterior)
  const outClass = direction === 'left' ? 'slide-out-left' : 'slide-out-right';
  const inClass = direction === 'left' ? 'slide-in-right' : 'slide-in-left';

  // Animar salida
  modalMainImage.classList.add(outClass);

  modalMainImage.addEventListener('transitionend', function handler() {
    modalMainImage.removeEventListener('transitionend', handler);

    // Cambiar imagen y animar entrada
    modalMainImage.classList.remove(outClass);
    modalMainImage.src = currentImages[newIndex];
    setTimeout(() => {
      modalMainImage.classList.add(inClass);
      setTimeout(() => {
        modalMainImage.classList.remove(inClass);
      }, 400); // Duración igual a la transición CSS
    }, 10);

    // Actualizar thumbnails y botones
    currentImageIndex = newIndex;
    const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === newIndex);
    });
    prevBtn.disabled = newIndex === 0;
    nextBtn.disabled = newIndex === currentImages.length - 1;
    updateImageCounter();
  });
}