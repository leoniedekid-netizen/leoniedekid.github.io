/* ==========================================================
   Leonied Artisan Candles - cart logic (vanilla JS)
   - "Add to cart" increments the badge in the navbar
   - Cart contents are saved in localStorage so they survive a refresh
   ========================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'leonied-cart';
  var cart = loadCart(); // { productId: { name, price, qty } }

  var badge = document.getElementById('cartCount');
  var cartButton = document.getElementById('cartButton');

  // ---------- Storage helpers (wrapped in try/catch: storage can be blocked) ----------
  function loadCart() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved && typeof saved === 'object' ? saved : {};
    } catch (e) {
      return {};
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) { /* ignore: the cart still works for this visit */ }
  }

  // ---------- Cart maths ----------
  function totalItems() {
    return Object.keys(cart).reduce(function (sum, id) { return sum + cart[id].qty; }, 0);
  }

  function totalPrice() {
    return Object.keys(cart).reduce(function (sum, id) { return sum + cart[id].qty * cart[id].price; }, 0);
  }

  // ---------- UI updates ----------
  function renderBadge(animate) {
    badge.textContent = totalItems();
    cartButton.setAttribute(
      'aria-label',
      'Shopping cart, ' + totalItems() + ' items, $' + totalPrice().toFixed(2)
    );
    cartButton.title = '$' + totalPrice().toFixed(2);

    if (animate) {
      badge.classList.remove('bump');
      void badge.offsetWidth; // restart the CSS animation
      badge.classList.add('bump');
    }
  }

  function flashButton(btn) {
    var original = btn.textContent;
    btn.textContent = 'Added';
    btn.classList.add('is-added');
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove('is-added');
    }, 1200);
  }

  // ---------- Add to cart ----------
  document.querySelectorAll('.add-to-cart').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.dataset.id;
      if (!cart[id]) {
        cart[id] = { name: btn.dataset.name, price: parseFloat(btn.dataset.price), qty: 0 };
      }
      cart[id].qty += 1;

      saveCart();
      renderBadge(true);
      flashButton(btn);
    });
  });

  // Placeholder: hook your checkout page or a cart drawer in here
  cartButton.addEventListener('click', function () {
    // e.g. window.location.href = 'cart.html';
    console.log('Cart:', cart, 'Total: $' + totalPrice().toFixed(2));
  });

  // ---------- Footer year ----------
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Initial render ----------
  renderBadge(false);
})();
