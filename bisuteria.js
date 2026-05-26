const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const cartButton = document.getElementById('cartButton');
const closeCartPanel = document.getElementById('closeCartPanel');
const cartPanel = document.getElementById('cartPanel');
const cartCount = document.getElementById('cartCount');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotal = document.getElementById('cartTotal');
const addButtons = document.querySelectorAll('.add-cart');
const viewDetailsButtons = document.querySelectorAll('.view-details');
const productModal = document.getElementById('productModal');
const closeProductModal = document.getElementById('closeProductModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const modalAddCartButton = document.getElementById('modalAddCartButton');
const toastMessage = document.getElementById('toastMessage');
const heroShopButton = document.getElementById('heroShopButton');
const openCustomModalBtn = document.getElementById('openCustomModal');
const customFormModal = document.getElementById('customFormModal');
const closeCustomFormModalBtn = document.getElementById('closeCustomFormModal');
const customDesignForm = document.getElementById('customDesignForm');
const cancelCustomFormBtn = document.getElementById('cancelCustomForm');
const customImageInput = document.getElementById('customImage');
const customImagePreview = document.getElementById('customImagePreview');

let cartItems = 0;
const cartProducts = [];
let activeProduct = null;

const productDescriptions = {
  'Anillo Estelar': 'Anillo con terminación en brillo suave, perfecto para combinar con cualquier conjunto elegante.',
  'Pulsera Aura': 'Pulsera ligera con detalles delicados y un acabado luminoso que resalta tu estilo.',
  'Collar Eclipse': 'Collar moderno con ojaladas minimalistas y un diseño que atrae todas las miradas.',
  'Aretes Luz': 'Aretes ligeros que aportan un toque de feminidad y elegancia en cada movimiento.',
};

const promoForm = document.getElementById('promoForm');
const promoCodeInput = document.getElementById('promoCode');
const promoProductSelect = document.getElementById('promoProduct');
const promoFeedback = document.getElementById('promoFeedback');
const validPromoCodes = new Set(['VALIKA', 'LILA2026', 'JOYALILA']);
const usedPromoCodes = new Set();

const setPromoFeedback = (message, isError = false) => {
  promoFeedback.textContent = message;
  promoFeedback.classList.toggle('error', isError);
};

const getPromoProductName = () => promoProductSelect.value;

const canjearCodigoPromocional = (code, productName) => {
  const normalizedCode = code.trim().toUpperCase();

  if (!normalizedCode) {
    setPromoFeedback('Ingresa un código promocional válido.', true);
    return;
  }

  if (!validPromoCodes.has(normalizedCode)) {
    setPromoFeedback('Código promocional inválido. Intenta con otro código.', true);
    return;
  }

  if (usedPromoCodes.has(normalizedCode)) {
    setPromoFeedback('Este código ya fue utilizado.', true);
    return;
  }

  usedPromoCodes.add(normalizedCode);
  addToCart(`${productName} (Promoción)`, '0');
  setPromoFeedback(`Código canjeado. ${productName} se agregó gratis a tu carrito.`);
  promoCodeInput.value = '';
};

const toggleCartPanel = () => {
  const isOpen = cartPanel.classList.toggle('open');
  cartPanel.setAttribute('aria-hidden', String(!isOpen));
};

const closeCart = () => {
  cartPanel.classList.remove('open');
  cartPanel.setAttribute('aria-hidden', 'true');
};

const showToast = (message) => {
  toastMessage.textContent = message;
  toastMessage.classList.add('visible');

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toastMessage.classList.remove('visible');
  }, 2200);
};

const renderCart = () => {
  cartCount.textContent = cartItems;

  if (cartProducts.length === 0) {
    cartItemsList.innerHTML = '<p class="empty-cart">Tu carrito está vacío.</p>';
    cartTotal.textContent = '$0';
    return;
  }

  const itemsHtml = cartProducts
    .map(
      (item, index) =>
        `<div class="cart-item"><span>${item.name}</span><strong>Bs. ${item.price}</strong></div>`
    )
    .join('');

  cartItemsList.innerHTML = itemsHtml;
  const total = cartProducts.reduce((sum, item) => sum + Number(item.price), 0);
  cartTotal.textContent = `Bs. ${total}`;
};

const addToCart = (productName, price) => {
  cartItems += 1;
  cartProducts.push({ name: productName, price });
  renderCart();
  showToast(`${productName} agregado al carrito.`);
};

const openProductModal = (card) => {
  const productName = card.dataset.product;
  const price = card.dataset.price;
  const image = card.querySelector('img').src;

  activeProduct = { name: productName, price };

  modalTitle.textContent = productName;
  modalPrice.textContent = `Bs. ${price}`;
  modalImage.src = image;
  modalImage.alt = productName;
  modalDescription.textContent = productDescriptions[productName] || 'Explora este producto exclusivo con un detalle único.';

  productModal.classList.add('open');
  productModal.setAttribute('aria-hidden', 'false');
};

const closeProductModalFn = () => {
  productModal.classList.remove('open');
  productModal.setAttribute('aria-hidden', 'true');
  activeProduct = null;
};

const openCustomModalFn = () => {
  customFormModal.classList.add('open');
  customFormModal.setAttribute('aria-hidden', 'false');
};


const closeCustomModalFn = () => {
  customFormModal.classList.remove('open');
  customFormModal.setAttribute('aria-hidden', 'true');
};

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navToggle.classList.toggle('open');
  mainNav.classList.toggle('open');
  navToggle.textContent = mainNav.classList.contains('open') ? 'Cerrar' : 'Menú';
  // Evita que el fondo se mueva cuando el menú está abierto
  document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
});

// Cerrar el menú automáticamente al hacer clic en un enlace de navegación
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.textContent = 'Menú';
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

cartButton.addEventListener('click', toggleCartPanel);
closeCartPanel.addEventListener('click', closeCart);

addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const productName = card.dataset.product;
    const price = card.dataset.price;

    addToCart(productName, price);

    button.textContent = 'Agregado';
    button.disabled = true;
    button.style.opacity = '0.8';

    setTimeout(() => {
      button.textContent = 'Agregar al carrito';
      button.disabled = false;
      button.style.opacity = '1';
    }, 1200);
  });
});

viewDetailsButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    openProductModal(card);
  });
});

modalAddCartButton.addEventListener('click', () => {
  if (!activeProduct) return;
  addToCart(activeProduct.name, activeProduct.price);
  closeProductModalFn();
});

closeProductModal.addEventListener('click', closeProductModalFn);
productModal.addEventListener('click', (event) => {
  if (event.target === productModal) {
    closeProductModalFn();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeProductModalFn();
    closeCustomModalFn();
    closeCart();
  }
});

if (openCustomModalBtn) {
  openCustomModalBtn.addEventListener('click', openCustomModalFn);
}

if (closeCustomFormModalBtn) {
  closeCustomFormModalBtn.addEventListener('click', closeCustomModalFn);
}

if (customFormModal) {
  customFormModal.addEventListener('click', (e) => {
    if (e.target === customFormModal) closeCustomModalFn();
  });
}

if (cancelCustomFormBtn) {
  cancelCustomFormBtn.addEventListener('click', closeCustomModalFn);
}

if (customImageInput && customImagePreview) {
  customImageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        customImagePreview.src = e.target.result;
        customImagePreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      customImagePreview.style.display = 'none';
      customImagePreview.src = '';
    }
  });
}

if (customDesignForm) {
  customDesignForm.addEventListener('submit', (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¡Solicitud recibida!',
      text: 'Estamos ansiosos por crear tu pieza. Nos contactaremos pronto contigo.',
      icon: 'success',
      confirmButtonColor: '#7f5a9b',
      background: '#f8f4fb'
    });
    closeCustomModalFn();
    customDesignForm.reset();
    if (customImagePreview) {
      customImagePreview.style.display = 'none';
      customImagePreview.src = '';
    }
  });
}

heroShopButton.addEventListener('click', () => {
  document.querySelector('#productos').scrollIntoView({ behavior: 'smooth' });
});

promoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  canjearCodigoPromocional(promoCodeInput.value, getPromoProductName());
});

const revealElements = document.querySelectorAll('.section-header, .product-card, .featured-inner, .about-card, .promo-card, .custom-card');

const revealOnScroll = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(revealOnScroll, {
  threshold: 0.2,
});

revealElements.forEach((element) => {
  element.classList.add('reveal');
  observer.observe(element);
});

renderCart();

// Preloader: ocultar cuando la página cargue completamente
const preloader = document.getElementById('preloader');
if (preloader) {
  window.addEventListener('load', () => {
    preloader.classList.add('preloader--hide');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  });
}

/* La imagen del preloader ahora es un elemento decorativo (.loader-inner-dot).
   No se requieren listeners de vista previa para imagen. */

// Catálogo dinámico: datos, render y búsqueda
const catalogTabs = document.querySelectorAll('.catalog-tab');
const catalogGrid = document.getElementById('catalogGrid');
const catalogSearchInput = document.getElementById('catalogSearch');

// Áreas: manillas, aretes, collares, anillos, accesorios
const areas = ['manillas', 'aretes', 'collares', 'anillos', 'accesorios'];

// Generar datos de ejemplo con imágenes únicas
const catalogData = {};
const sampleImages = {
  manillas: [
    'img/manillas/1.jpg',
    'img/manillas/2.jpg',
    'img/manillas/3.jpg',
    'img/manillas/4.jpg',
    'img/manillas/5.jpg',
    'img/manillas/6.jpg',
    'img/manillas/7.jpg',
    'img/manillas/8.jpg',
  
  ],
  aretes: [
    'img/aretes/estrella%20y%20concha.jpg',
    'img/aretes/imagen%202.jpg',
    'img/aretes/imagen%203.jpg',
    'img/aretes/imagen%204.jpg',
    'img/aretes/6.jpg',
    'img/aretes/5.jpg',
    'img/aretes/7.jpg',
    'img/aretes/8.jpg'
  ],
  collares: [
    'img/collares/1.jpg',
    'img/collares/2.jpg',
    'img/collares/3.jpg',
    'img/collares/4.jpg',
    'img/collares/5.jpg',
    'img/collares/6.jpg',
    'img/collares/7.jpg',
    'img/collares/8.jpg',
    
  ],
  anillos: [
    'img/anillos/1.jpg',
    'img/anillos/2.jpg',
    'img/anillos/3.jpg',
    'img/anillos/4.jpg',
    'img/anillos/5.jpg',
    'img/anillos/6.jpg',
    'img/anillos/7.jpg',
    'img/anillos/8.jpg',
  ],
  accesorios: [
    'img/accesorios/1.jpg',
    'img/accesorios/2.jpg',
    'img/accesorios/3.jpg',
    'img/accesorios/4.jpg',
    'img/accesorios/5.jpg',
    'img/accesorios/6.jpg',
    'img/accesorios/7.jpg',
    'img/accesorios/8.jpg',
  ]
};

areas.forEach((area) => {
  catalogData[area] = [];

  for (let i = 1; i <= 8; i++) {
    catalogData[area].push({
      id: `${area}-${i}`, // Identificador único para el producto
      name: `${area.charAt(0).toUpperCase() + area.slice(1)} ${i}`, // Nombre del producto
      price: (10 + Math.floor(Math.random() * 16)).toString(), // Precios entre 10 y 25
      image: sampleImages[area][(i - 1) % sampleImages[area].length]
    });
  }
});

let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 4;

const renderCatalog = (filter = 'all', search = '') => {
  currentFilter = filter;
  const items = [];
  areas.forEach((area) => {
    if (filter === 'all' || filter === area) {
      catalogData[area].forEach((p) => items.push({ ...p, area }));
    }
  });

  const normalizedSearch = (search || '').trim().toLowerCase();
  const filtered = normalizedSearch
    ? items.filter((it) => it.name.toLowerCase().includes(normalizedSearch))
    : items;

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (currentPage > totalPages) currentPage = Math.max(1, totalPages);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pagedItems = filtered.slice(start, end);

  catalogGrid.innerHTML = pagedItems
    .map((item) => {
      return `
        <article class="product-card catalog-item" data-area="${item.area}" data-product="${item.name}" data-price="${item.price}">
          <img src="${item.image}" alt="${item.name}" />
          <div class="product-info">
            <h3>${item.name}</h3>
            <p class="price">Bs. ${item.price}</p>
            <div class="product-actions">
              <button class="add-cart button button-tertiary" type="button">Agregar al carrito</button>
              <button class="view-details button button-secondary" type="button">Ver detalles</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  // Reattach listeners for new buttons
  const addBtns = catalogGrid.querySelectorAll('.add-cart');
  addBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;
      const name = card.dataset.product;
      const price = card.dataset.price;
      addToCart(name, price);
      btn.textContent = 'Agregado';
      btn.disabled = true;
      btn.style.opacity = '0.8';
      setTimeout(() => {
        btn.textContent = 'Agregar al carrito';
        btn.disabled = false;
        btn.style.opacity = '1';
      }, 1200);
    });
  });

  const viewBtns = catalogGrid.querySelectorAll('.view-details');
  viewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const fakeCard = document.createElement('div');
      fakeCard.dataset.product = card.dataset.product;
      fakeCard.dataset.price = card.dataset.price;
      // reuse modal logic: set image + details
      const productName = card.dataset.product;
      const productPrice = card.dataset.price;
      const productImage = card.querySelector('img').src;
      activeProduct = { name: productName, price: productPrice };
      modalTitle.textContent = productName;
      modalPrice.textContent = `Bs. ${productPrice}`;
      modalImage.src = productImage;
      modalImage.alt = productName;
      modalDescription.textContent = 'Detalle del producto ' + productName + '. Disfruta de esta pieza única.';
      productModal.classList.add('open');
      productModal.setAttribute('aria-hidden', 'false');
    });
  });

  renderPagination(totalPages);
};

const renderPagination = (totalPages) => {
  const paginationContainer = document.getElementById('catalogPagination');
  if (!paginationContainer) return;

  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  paginationContainer.innerHTML = `
    <button class="pagination-button" id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button>
    <span class="page-info">Página ${currentPage} de ${totalPages}</span>
    <button class="pagination-button" id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>Siguiente</button>
  `;

  document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderCatalog(currentFilter, catalogSearchInput ? catalogSearchInput.value : '');
      document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
    }
  });

  document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderCatalog(currentFilter, catalogSearchInput ? catalogSearchInput.value : '');
      document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
    }
  });
};

catalogTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    currentPage = 1;
    const filter = tab.dataset.filter;
    catalogTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    renderCatalog(filter, catalogSearchInput ? catalogSearchInput.value : '');
    if (window.innerWidth < 700) document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
  });
});

if (catalogSearchInput) {
  catalogSearchInput.addEventListener('input', (e) => {
    currentPage = 1;
    const q = e.target.value || '';
    renderCatalog(currentFilter, q);
  });
}

// Lógica de contadores en el Footer
const initFooterStats = () => {
  const visitorCountEl = document.getElementById('visitorCount');
  const countdownEl = document.getElementById('countdownTimer');

  // Simulación de contador de visitas persistente localmente
  if (visitorCountEl) {
    let visits = localStorage.getItem('valikaVisitas');
    if (!visits) {
      visits = 15420; // Número base para dar sensación de comunidad activa
    } else {
      visits = parseInt(visits);
    }
    visits++;
    localStorage.setItem('valikaVisitas', visits);
    visitorCountEl.textContent = visits.toLocaleString();
  }

  // Temporizador de cuenta regresiva para Fin de Año
  if (countdownEl) {
    const updateTimer = () => {
      const ahora = new Date();
      const finDeAño = new Date(ahora.getFullYear(), 11, 31, 23, 59, 59);
      const diferencia = finDeAño - ahora;

      if (diferencia <= 0) {
        countdownEl.textContent = "¡Feliz Año Nuevo!";
        return;
      }

      const d = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const h = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diferencia % (1000 * 60)) / 1000);

      countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }
};

initFooterStats();

// Inicial
renderCatalog('all', '');
