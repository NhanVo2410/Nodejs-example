$(document).ready(function () {
    // Cacular Year
    var d = new Date();
    var currentyear = d.getFullYear();
    $("#CurrentYear").html(currentyear);

    $('.btn-showmenu').click(function () {
        $('.menu').toggleClass('open');
        $('.overlay').fadeToggle(300);
    });

    $('.has-sub a').click(function () {
        $(this).toggleClass('active');
        $(this).siblings('.sub').slideToggle(300);
    });

    $('.overlay').click(function () {
        $('.menu').removeClass('open');
        $(this).fadeOut(500);
    });
});
/*remove right click*/
$(document).bind("contextmenu", function (e) {
    e.preventDefault();
});
/*end  remove right click*/
$(window).on('load', function () {
    $('.slider').slider();

    const owl = $('.owl-carousel');
    owl.owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 1
            },
            1023: {
                items: 3
            },
            1365: {
                items: 3
            },
            1500: {
                items: 6
            }
        },
        loop: true,
        margin: 5,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 4000,
        autoplaySpeed: 4000,
        autoplayHoverPause: false
    });
});

// Update multi modal
$(document).on('show.bs.modal', '.modal', function () {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function () {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});