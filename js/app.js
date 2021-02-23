//initializing new Wow object on load of window
$(window).on('load', function() {
    new WOW().init();
});

//document ready
$(document).ready(function() {

    //to avoid exepction on Lighthouse report for passive listeners
    jQuery.event.special.touchstart = {
        setup: function(_, ns, handle) {
            this.addEventListener("touchstart", handle, { passive: true });
        }
    };



    //smooth scroling to the top of page
    var btn = $('#top-btn');

    btn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '500');
    });

    //smooth scrolling on links of asside nav
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function() {

                window.location.hash = hash;
            });
        }
    });


    //on mobile/tablet load different imgs
    if ($(window).width() < 768) {
        $("#tablets").attr("src", "img/tablets-mobile.webp");
        $("#circle").attr("src", "img/circle-mobile.webp");
    } else {
        $("#tablets").attr("src", "img/tablets.webp");
        $("#circle").attr("src", "img/circle.webp");
    }

    //on windows size change, replacing img 
    $(window).on('resize', function() {
        if ($(window).width() < 768) {
            $("#tablets").attr("src", "img/tablets-mobile.webp");
            $("#circle").attr("src", "img/circle-mobile.webp");
        } else {
            $("#tablets").attr("src", "img/tablets.webp");
            $("#circle").attr("src", "img/circle.webp");
        }
    });

    //functions - on scroll
    $(window).on('scroll', function() {
        var sticky = $('.header-menu');
        var results = $('#results');
        var nilexTeam = $('#nilex-team');
        var scrollPos = $(window).scrollTop();

        //adding fixed header with animation 
        if (scrollPos > 300) {
            sticky.addClass('fixed fadeInHeader');
        } else {
            sticky.removeClass('fixed fadeInHeader');
        }

        //showing to the top btn 
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }

        //changing color of navigation text if we are in results or nilexTeam sections
        if (results.position().top <= scrollPos + 550 && results.position().top + results.height() > scrollPos + 550 || nilexTeam.position().top <= scrollPos + 550 && nilexTeam.position().top + nilexTeam.height() > scrollPos + 550) {
            $('#aside-nav').removeClass("text-firstText");
            $('#aside-nav').addClass("text-gray-50");
        } else {
            $('#aside-nav').addClass("text-firstText");
            $('#aside-nav').removeClass("text-gray-50");
        }

        //changing links style of sections on scrolling
        $('#aside-nav a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            console.log(refElement[0].id);
            if (refElement.position().top <= scrollPos + 550 && refElement.position().top + refElement.height() > scrollPos + 550) {
                $('#aside-nav ul li a').removeClass("activeLink");
                $('#aside-nav ul li a').removeClass("text-firstHeader");
                $('#aside-nav ul li a').removeClass("text-sectionThirteen");
                $('#aside-nav ul li a').removeClass("activeLinkOrange");

                if (refElement[0].id == 'solution' || refElement[0].id == 'results') {
                    currLink.addClass("activeLinkOrange");
                    currLink.addClass("text-sectionThirteen");
                } else {
                    currLink.addClass("activeLink");
                    currLink.addClass("text-firstHeader");
                }
            } else {
                currLink.removeClass("activeLinkOrange");
                currLink.removeClass("activeLink");
                currLink.removeClass("text-firstHeader");
                currLink.removeClass("text-sectionThirteen");
            }
        });
    });

    //slider - Section 7
    $('.slider1').owlCarousel({
        nav: true,
        loop: true,
        items: 1,
        smartSpeed: 1200,
        autoplayHoverPause: true,
        margin: 10,
        navText: ["<img src='img/nav-left.webp' class='mx-auto' loading='lazy' alt='bildstudio'>", "<img src='img/nav-right.webp' class='mx-auto' loading='lazy' alt='bildstudio'>"],
        dots: true,
        dotsData: true,
        responsive: {
            0: {
                items: 1,
                dots: false,
                dotsData: false,
            },
            1024: {
                stagePadding: 300,
                margin: 160,
                dots: false,
                dotsData: false,
            },
            1280: {
                stagePadding: 300,
                margin: 200,
            },
            1536: {
                stagePadding: 400,
                margin: 160,
            }
        }
    });

    //slider - Section 9
    $('.slider2').owlCarousel({
        nav: true,
        loop: true,
        items: 1,
        smartSpeed: 1200,
        autoplayHoverPause: true,
        margin: 10,
        navText: ["<img src='img/nav-left.webp' class='mx-auto' loading='lazy' alt='bildstudio'>", "<img src='img/nav-right.webp' class='mx-auto' loading='lazy' alt='bildstudio'>"],
        dots: true,
        dotsData: true,
        responsive: {
            0: {
                items: 1,
                dots: false,
                dotsData: false,
            },
            1024: {
                stagePadding: 300,
                margin: 160,
                dots: false,
                dotsData: false,
            },
            1280: {
                stagePadding: 300,
                margin: 200,
            },
            1536: {
                stagePadding: 400,
                margin: 280,
            }
        }
    });

    //Trigering counter function on appear of section 13, only once
    $(function() {
        var $triggered_times = true;
        $('.results-counter').appear();
        $('.results-counter').on('appear', function() {
            if ($triggered_times) {
                $('.count').each(function() {
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 4000,
                        easing: 'swing',
                        step: function(now) {
                            $(this).text(Math.ceil(now));
                        }
                    })
                });
                $triggered_times = false; // to make sure the above action triggers only once
            }
        })
    });

    //open and close video modal
    $(function() {
        let open = $('#open-btn');
        var video = $('#video-modal');
        var close = $('#close-btn');
        open.on('click', function() {
            document.getElementById('video-modal').showModal();
            $('body').attr('style', 'overflow:hidden;');
            video.children(0).scrollTop = 0;
            video.children(0).removeClass('opacity-0');
            video.children(0).addClass('opacity-100');
        });
        close.on('click', function() {
            video.children(0).removeClass('opacity-100');
            video.children(0).addClass('opacity-0');

            setTimeout(function() {
                document.getElementById('video-modal').close();
                $('body').removeAttr('style');
            }, 100);
        });
    });

    //open and close hamburger menu
    $(function() {
        var hamburger = $('#hamburger');
        var menu = $('#menu');
        hamburger.on('click', function() {
            if (menu.hasClass('hidden')) {
                menu.removeClass('hidden');
                hamburger.addClass('change');
                $('body').attr('style', 'overflow:hidden;');
            } else {
                hamburger.removeClass('change');
                menu.addClass('hidden');
                $('body').removeAttr('style');
            }
        });
    });
});