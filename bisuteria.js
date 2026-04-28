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
const validPromoCodes = new Set(['BRILLOLILA', 'LILA2026', 'JOYALILA']);
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
        `<div class="cart-item"><span>${item.name}</span><strong>$${item.price}</strong></div>`
    )
    .join('');

  cartItemsList.innerHTML = itemsHtml;
  const total = cartProducts.reduce((sum, item) => sum + Number(item.price), 0);
  cartTotal.textContent = `$${total}`;
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
  modalPrice.textContent = `$${price}`;
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

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  mainNav.classList.toggle('open');
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
    closeCart();
  }
});

heroShopButton.addEventListener('click', () => {
  document.querySelector('#productos').scrollIntoView({ behavior: 'smooth' });
});

promoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  canjearCodigoPromocional(promoCodeInput.value, getPromoProductName());
});

const revealElements = document.querySelectorAll('.section-header, .product-card, .featured-inner, .about-card, .promo-card');

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
