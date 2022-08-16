/**
 * Инициализация функции маски для поля телефона
 * Документация: https://imask.js.org/guide.html
 */
function initPhoneMask() {
  $('input[type=tel]').each(function(index, element) {
    var mask = IMask(element, {
      mask: [
        {
          mask: '+7 000 000-00-00',
          startsWith: '+7',
          country: 'Russia',
        },
        {
          mask: '+7 000 000-00-00',
          startsWith: '7',
          country: 'Russia',
        },
        {
          mask: '0 000 000-00-00',
          startsWith: '8',
          country: 'Russia',
        },
        {
          mask: '+7 000 000-00-00',
          startsWith: '',
          country: 'unknown',
        },
      ],
      dispatch: function dispatch(appended, dynamicMasked) {
        var number = (dynamicMasked.value + appended).replace(/\D/g, '');
        return dynamicMasked.compiledMasks.find(function(m) {
          return number.indexOf(m.startsWith) === 0;
        });
      },
    });
    $(this).blur(function() {
      var maskValue = mask.unmaskedValue;
      var startWith = 10;

      if (maskValue.charAt(0) === '8') {
        startWith = 11;
      }

      if (maskValue.length < startWith) {
        mask.value = '';
      }
    });
  });
}

function initGallerySlider() {
  $('.gallery__slider').slick({
    prevArrow: '<button type="button" class="btn gallery__prev">Назад</button>',
    nextArrow:
      '<button type="button" class="btn gallery__next">Вперёд</button>',
    slidesToShow: 1,
    slidesToScroll: 1,
  });
}

function initProductSlider() {
  $('.product-slider__list').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.product-slider__nav',
  });
  $('.product-slider__nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product-slider__list',
    focusOnSelect: true,
  });
}

$(function() {
  objectFitImages();
  initPhoneMask();
  initGallerySlider();
  initProductSlider();
});
