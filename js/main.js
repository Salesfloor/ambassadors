$(document).ready(function(){
    var faq = $('.faq-ctn');
    $('> div', faq).on('click', function(){
        $(this).toggleClass('open').find('p').slideToggle(300);
    });

    setTimeout(function(){
        $('.masthead h1').removeClass('init');
    }, 2500);

    var headerImgsCtn = $('.masthead .ctn');
    var headerImgs = $('> div', headerImgsCtn);
    $(window).on('resize', function(){
        if($(window).width() < 768 && !headerImgsCtn.hasClass('mobile')) {
            headerImgsCtn.addClass('mobile');
            headerImgs.hide();
            headerImgs.eq(Math.floor(Math.random()*headerImgs.length)).show();
        } else if ($(window).width() >= 768) {
            headerImgs.show();
            headerImgsCtn.removeClass('mobile');
        }
    });
    $(window).trigger('resize');

    $('.button.arrow', faq).on('click', function(e){
        $('> div', faq).slideDown(300);
        $(this).fadeOut(100);
        e.preventDefault();
    });

    $('#mobile-menu').on('click', function(){
    	$(this).toggleClass( 'active' );
    	$('.main-wrapper, header').toggleClass( 'cbp-spmenu-push-toright' );
    	$('#cbp-spmenu-s1').toggleClass( 'cbp-spmenu-open' );
    });

    //override anchor links
    $('a[href^=#]').on('click', function(e){
        e.preventDefault();

        var element = $('#'+$(this).attr("href").split("#")[1]);
        var number = element.offset().top - 100;
        // $(document).scrollTop(number);
        $("html, body").stop().animate({ scrollTop: number });

        if($(this).parents('.cbp-spmenu').length > 0){
            $('#mobile-menu').trigger('click');
        }
    });

    var mapSettings = {
        width: "",
        height: "",
        lat: 45.489824,
        lng: -73.566833,
        zoom: 14,
        backgroundColor: '#B5C7D4',
        centerOffsetX: 200,
        centerOffsetY: 0,
        draggable:false,
        scrollwheel: false,
        mainMarkerIcon: "img/main-marker.svg",
        disableDefaultUI: true,
        style:[{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]
    };

    if($(window).width() < 768) {
        mapSettings.centerOffsetX = 0;
        mapSettings.centerOffsetY = -200;
    } else {
        mapSettings.centerOffsetX = 200;
        mapSettings.centerOffsetY = 0;
    }

    var wn = $('.wn');

    $(window).on('resize', function(){
        if($(window).width() < 768) {
            mapSettings.centerOffsetX = 0;
            mapSettings.centerOffsetY = -200;
        } else {
            mapSettings.centerOffsetX = 200;
            mapSettings.centerOffsetY = 0;
        }

        wn.data('whatsnearby').changeOffset(mapSettings.centerOffsetX, mapSettings.centerOffsetY);
        wn.data('whatsnearby').recenter();
    });

    wn.whatsnearby(mapSettings);
});
