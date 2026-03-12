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
     Sticky Header with Scroll Detection
  ---------------------------------------- */
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  /* ----------------------------------------
     Carousel / Slider
  ---------------------------------------- */
  var carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(function (carousel) {
    var track = carousel.querySelector('[data-carousel-track]');
    var prevBtn = carousel.querySelector('[data-carousel-prev]');
    var nextBtn = carousel.querySelector('[data-carousel-next]');

    if (!track) return;

    function getScrollAmount() {
      var slide = track.querySelector('.carousel__slide, .category-explorer__item');
      if (!slide) return 300;
      var style = window.getComputedStyle(track);
      var gap = parseFloat(style.gap) || 20;
      return slide.offsetWidth + gap;
    }

    function updateButtons() {
      if (!prevBtn || !nextBtn) return;
      prevBtn.disabled = track.scrollLeft <= 5;
      nextBtn.disabled = track.scrollLeft + track.offsetWidth >= track.scrollWidth - 5;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -getScrollAmount() * 2, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: getScrollAmount() * 2, behavior: 'smooth' });
      });
    }

    track.addEventListener('scroll', updateButtons, { passive: true });
    updateButtons();

    // Recalculate on resize
    window.addEventListener('resize', updateButtons, { passive: true });
  });

  /* ----------------------------------------
     Product Thumbnails & Slide Arrows
  ---------------------------------------- */
  var thumbnails = document.querySelectorAll('.product__thumbnail');
  var mainMediaContainer = document.querySelector('.product__media-main');
  var currentSlideIndex = 0;

  function goToSlide(index) {
    if (!thumbnails.length) return;
    if (index < 0) index = thumbnails.length - 1;
    if (index >= thumbnails.length) index = 0;
    currentSlideIndex = index;
    thumbnails[currentSlideIndex].click();
  }

  if (thumbnails.length && mainMediaContainer) {
    var mainImage = mainMediaContainer.querySelector('img');
    thumbnails.forEach(function (thumb, i) {
      thumb.addEventListener('click', function () {
        currentSlideIndex = i;
        var src = thumb.getAttribute('data-media-src');
        var alt = thumb.getAttribute('data-media-alt') || '';
        if (src && mainImage) {
          mainImage.src = src;
          mainImage.alt = alt;
        }

        thumbnails.forEach(function (t) {
          t.classList.remove('product__thumbnail--active');
        });
        thumb.classList.add('product__thumbnail--active');
      });
    });

    var prevArrow = mainMediaContainer.querySelector('.product__media-arrow--prev');
    var nextArrow = mainMediaContainer.querySelector('.product__media-arrow--next');

    if (prevArrow) {
      prevArrow.addEventListener('click', function () {
        goToSlide(currentSlideIndex - 1);
      });
    }
    if (nextArrow) {
      nextArrow.addEventListener('click', function () {
        goToSlide(currentSlideIndex + 1);
      });
    }
  }

  /* ----------------------------------------
     Product Quantity Buttons
  ---------------------------------------- */
  document.querySelectorAll('.product__quantity-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = btn.closest('.product__quantity-selector').querySelector('.product__quantity-input');
      if (!input) return;
      var current = parseInt(input.value, 10) || 1;
      var min = parseInt(input.min, 10) || 1;
      if (btn.getAttribute('data-action') === 'decrease') {
        input.value = Math.max(min, current - 1);
      } else {
        input.value = current + 1;
      }
    });
  });

  /* ----------------------------------------
     Share Button
  ---------------------------------------- */
  document.querySelectorAll('.product__share-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var url = btn.getAttribute('data-share-url');
      if (url && navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          var orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(function () { btn.textContent = orig; }, 2000);
        });
      }
    });
  });

  /* ----------------------------------------
     Product Variant Selection
  ---------------------------------------- */
  var productForm = document.querySelector('.product__form');

  if (productForm) {
    var selects = productForm.querySelectorAll('.product__option-select');

    selects.forEach(function (select) {
      select.addEventListener('change', function () {
        // Variant change handling can be extended for AJAX cart updates
      });
    });
  }

  /* ----------------------------------------
     Close dropdown menus on click outside
  ---------------------------------------- */
  document.addEventListener('click', function (e) {
    var openDetails = document.querySelectorAll('.header__dropdown[open]');
    openDetails.forEach(function (detail) {
      if (!detail.contains(e.target)) {
        detail.removeAttribute('open');
      }
    });
  });

  /* ----------------------------------------
     Intersection Observer for Animations
  ---------------------------------------- */
  if ('IntersectionObserver' in window) {
    var animatedElements = document.querySelectorAll('.section-featured-collection, .section-category-explorer, .section-newsletter, .section-split-feature');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
