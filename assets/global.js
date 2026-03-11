/* PureStudio Theme - Global JavaScript */

(function () {
  'use strict';

  /* ----------------------------------------
     Mobile Menu Toggle
  ---------------------------------------- */
  const menuToggle = document.querySelector('.header__menu-toggle');
  const mobileMenu = document.getElementById('MobileMenu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileMenu.getAttribute('aria-hidden') === 'false';
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      menuToggle.setAttribute('aria-expanded', !isOpen);
    });
  }

  /* ----------------------------------------
     Product Thumbnails
  ---------------------------------------- */
  const thumbnails = document.querySelectorAll('.product__thumbnail');
  const mainImage = document.querySelector('.product__media-main img');

  if (thumbnails.length && mainImage) {
    thumbnails.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        const img = thumb.querySelector('img');
        if (img) {
          mainImage.src = img.src.replace(/width=\d+/, 'width=800');
          mainImage.alt = img.alt;

          thumbnails.forEach(function (t) {
            t.classList.remove('product__thumbnail--active');
          });
          thumb.classList.add('product__thumbnail--active');
        }
      });
    });
  }

  /* ----------------------------------------
     Product Variant Selection
  ---------------------------------------- */
  const productForm = document.querySelector('.product__form');

  if (productForm) {
    const selects = productForm.querySelectorAll('.product__option-select');

    selects.forEach(function (select) {
      select.addEventListener('change', function () {
        // Variant change handling can be extended for AJAX cart updates
      });
    });
  }
})();
