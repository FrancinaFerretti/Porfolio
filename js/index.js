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
      'Vivienda': {
        subject: 'Proyecto Arquitectónico II',
        description: 'Diseño de vivienda unifamiliar que explora la relación entre espacios interiores y exteriores. El proyecto se enfoca en la integración con el entorno natural y la optimización de la luz natural.',
        year: '2024',
        tools: 'AutoCAD, SketchUp, Photoshop'
      },
      'Oficina': {
        subject: 'Diseño Arquitectónico III',
        description: 'Complejo de oficinas diseñado con criterios de sustentabilidad y bienestar laboral. Incluye espacios verdes, sistemas de ventilación natural y configuraciones flexibles de trabajo.',
        year: '2024',
        tools: 'Revit, 3ds Max, V-Ray'
      },
      'Exterior': {
        subject: 'Storm cottage - Fearon Hay',
        description: 'Entrega para la materia Representación arquitectónica. FADU, UBA.',
        year: '2024',
        tools: 'Twinmotion'
      }
      ,
      // Agregar el resto de proyectos...
    };

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