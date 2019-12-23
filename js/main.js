$(document).ready(function($){
    // menu mob
  $('.menu-btn').click(function () {
    $('.mobile-menu').addClass('active');
    $('body').addClass('hidden');
  });
  
  $('body').click(function (e) {
      alert('test');
    if($(e.target).hasClass('hidden')){
      $('.mobile-menu').removeClass('active');
      $('body').removeClass('hidden');
      $('.personal').removeClass('active');
    }
    
    if($(e.target).hasClass('no-hidden')){
      $('#bag-container').fadeOut();
      $('body').removeClass('no-hidden');
    }
  });
  $('.mobile-menu .menu-link').click(function (e) {
    if($(this).next('.sub-menu').length){
      e.preventDefault();
      $(this).next().slideToggle();
    }
  });
  $('.close-menu').click(function () {
      $('.mobile-menu').removeClass('active');
      $('body').removeClass('hidden');
  });
  
  // home-slider
  function homeSliderToggle() {
    let images = $('.home-slider .img');
    let imagesLength = images.length;
    let imagesActive = $('.home-slider .img.active').index();
    
    $(images[imagesActive]).fadeOut(1000, function () {
      $(this).removeClass('active')
    });
    if(imagesActive + 1 < imagesLength){
      $(images[imagesActive + 1]).fadeIn(1000, function () {
        $(this).addClass('active');
      });
    } else {
      $(images[0]).fadeIn(1000, function () {
        $(this).addClass('active');
      });
    }
  }
  setInterval(function () {
    homeSliderToggle();
  }, 4500);


  //  header search
    $('#header_search_btn').click(function () {
        $('#search_form').toggleClass('active');
    });
  
  // discover-slider
  if(typeof  $.fn.slick == 'function'){
    $('#discover-slider').slick({
      fade: true,
      prevArrow: $('.discover-slider .slick-prev'),
      nextArrow: $('.discover-slider .slick-next')
    });
    
    $('.shopnow-slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: $('.shopnow-prev'),
      nextArrow: $('.shopnow-next'),
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            arrows: false
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            arrows: false
          }
        }
      ]
    });
    
    $('.product-slider').slick({
      dots: true,
      arrows: false
    });
  }
  
  // Our bestsellers
  $('.heart-btn').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
  });
  
  // filter
  $('.filter-title').click(function () {
    $(this).toggleClass('active');
    $(this).next().slideToggle();
  });
  
  // filter price slider
  if (typeof $.fn.slider === 'function') {
    if ($( ".amount1" ).length && $( ".amount2" ).length) {
      $( ".slider-range" ).slider({
        range: true,
        min: 0,
        max: 1000,
        values: [ $( ".amount1" ).val(), $( ".amount2" ).val() ],
        slide: function( event, ui ) {
          priceLeft(ui.handleIndex, ui.handle.style.left);
          
          $( ".amount1, .amount2" ).removeClass('active');
          $( ".amount1" ).val( ui.values[ 0 ]);
          $( ".amount2" ).val( ui.values[ 1 ]);
          
        }
      });
      
      $( ".amount1" ).val( $( ".slider-range" ).slider( "values", 0 ));
      $( ".amount2" ).val( $( ".slider-range" ).slider( "values", 1 ));
      
      $('.ui-slider-handle').each(function (item) {
        $($('.price-item')[item]).css('left', this.style.left)
      });
    }
    function priceLeft(hand, left) {
      if(hand){
        $( ".price-item-2" ).css('left', left);
      } else {
        $( ".price-item-1" ).css('left', left);
      }
    }
  }
  if($( "#slider-range" ).length && typeof $.fn.draggable() === "object"){
    $( "#slider-range" ).draggable();
  }
  // end filter price slider
  
  // dropkick
  if(typeof $.fn.dropkick === 'function') {
    $('.drop-select').dropkick();
  }
  
  // login registration
  $('#modal').click(function (e) {
    if($(e.target).hasClass('modal-block')){
      $(this).fadeOut();
      $('.login-reg-block').fadeOut();
    }
  });
  $('#login-btn').click(function () {
    $('#modal, .login-reg-block').fadeIn();
  });
  
  $('.login-reg-top .btn-pink').click(function (e) {
    e.preventDefault();
    $('.login-reg-top .btn-pink').removeClass('active');
    $(this).addClass('active');
    $('.login-reg-form').removeClass('active');
    $($(this).attr('href')).addClass('active');
  });
  
  // gallery section
  $('.zoom-btn').click(function () {
    let src = $(this).parent().find('img').attr('src');
    $('.zoom-image img').attr('src', src);
    $('#modal, .zoom-image').fadeIn();
  });
  $('.zoom-image').click(function () {
    $('#modal, .zoom-image').fadeOut();
  });
  
  // cart
  $('.remove-cart').click(function () {
    let p = $(this).parents('.cart');
    $(p).fadeOut(300, function () {
        $(p).remove();
    });
  });
  $('.count-btn').click(function () {
      let p = $(this).parent().children('.count-number');
      let num = +p.html();
      if($(this).hasClass('count-plus')){
          num++;
      } else {
        num--;
      }
      num = num <= 1 ? 1 : num;
      p.html(num);
  });
  
  // feedback
  $('.rating').each(function () {
    $(this).find('[type=radio]').change(function () {
      $(this).parents('.feedback').find('.feedback-info').addClass('active');
      $(this).parent().find('input').attr('disabled', true);
    });
  });

  // personal menu
  $('.personal .review-img').click(function () {
      $(this).parents('.personal').toggleClass('active');
      $('body').toggleClass('hidden');
  });

  // my-address-form
  $('.my-address-form .shipping-inputs input, .my-address-form .shipping-inputs select').change(function () {
    $(this).parents('.my-address-form').find('.btn-pink').attr('disabled', false);
  });
  
  // supported ie photo
  let userAgent = window.navigator.userAgent;
  let ieReg = /msie|Trident.*rv[ :]*11\./gi;
  let ie = ieReg.test(userAgent);
  let images = $('.img');
  
  if(ie && images.length) {
    $(images).each(function () {
      let imgUrl = $(this).attr("src");
      
      if (imgUrl.length) {
        let div = $('<div class="custom-object-fit"></div>');
        $(div).css('background-image', 'url(' + imgUrl + ')');
        $(this).parent().append(div);
        $(this).addClass('d-none');
      }
    });
  }
  
});
