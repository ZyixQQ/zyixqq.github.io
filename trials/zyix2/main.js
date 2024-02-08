(function ($) {
    $hiddenForm = $('#hidden-form');
    $mainNav = $('#main-navbar');
    

    let navbarOpened;
    let asideOpened;
    let mainNavOpened;




    function resizeHandler() {
        
        if (window.innerWidth > 767) {
            if (navbarOpened) {
                $('#navbar__hide').click();
                navbarOpened = false;
            }
            if (asideOpened) {
                $('#aside__hide').click();
                asideOpened = false;
            }

            if (!mainNavOpened) {
                $mainNav.fadeIn(200);
                if ($mainNav.hasClass('closed')) {
                    $('#mainNav__toggle').click();
                    $mainNav.removeClass('closed');
                    $mainNav.addClass('opened');
                }
                mainNavOpened = true;
            }
            
        } else {
            if (mainNavOpened) {
                
                if ($mainNav.hasClass('opened')) {
                    $('#mainNav__toggle').click();
                    $mainNav.removeClass('opened');
                    $mainNav.addClass('closed');
                }
                mainNavOpened = false;
                $mainNav.fadeOut(200);  
            }
        }

    }

    $(window).resize(resizeHandler);
    resizeHandler();


    function checkRange($el) {
        return window.innerWidth <= ($el.attr('data-animation-enable-max') || window.innerWidth) && window.innerWidth >= ($el.attr('data-animation-enable-min') || 0);
    }




    function hide(el, type) {
        if (type === 'slide') {
            el.slideUp(200);
        } else if (type === 'fade') {
            el.fadeOut(200);
        } else {
            el.hide(200);
        }
    }

    function show(el, type) {
        if (type === 'slide') {
            el.slideDown(200);
        } else if (type === 'fade') {
            el.fadeIn(200);
        } else if (type === 'flex') {
            el.css('display', 'flex');
        } else if ('type' === 'block') {
            el.css('display', 'block');
        } else {
            el.show(200);
        }
    }


    function navbarShowHandler() {
        $('[data-hiding-event="navbar:show"]').each((index, el) => {
            $el = $(el);


            if (checkRange($el)) {
                hide($el, $el.attr('data-hiding-type'));
            }
        })


        setTimeout(() => {
            $('[data-showing-event="navbar:show"]').each((index, el) => {
                $el = $(el);
                    show($el, $el.attr('data-showing-type'));
            })
        }, 200)
        navbarOpened = true;
    }

    function navbarHideHandler() {
        $('[data-hiding-event="navbar:hide"]').each((index, el) => {
            $el = $(el);
            
            if (checkRange($el)) {
                hide($el, $el.attr('data-hiding-type'));
            }
        })

        setTimeout(() => {
            $('[data-showing-event="navbar:hide"]').each((index, el) => {
                $el = $(el);
                    show($el, $el.attr('data-showing-type'));
            })
        }, 200)
        navbarOpened = false;

    }

    function asideShowHandler() {
        $('[data-hiding-event="aside:show"]').each((index, el) => {
            $el = $(el);
            hide($el, $el.attr('data-hiding-type'));
        })

        setTimeout(() => {
            $('[data-showing-event="aside:show"]').each((index, el) => {
                $el = $(el);
                show($el, $el.attr('data-showing-type'));
            })
        }, 200);

        asideOpened = true;
    }

    function asideHideHandler() {
        $('[data-hiding-event="aside:hide"]').each((index, el) => {
            $el = $(el);
            hide($el, $el.attr('data-hiding-type'));
        })

        setTimeout(() => {
            $('[data-showing-event="aside:hide"]').each((index, el) => {
                $el = $(el);
                show($el, $el.attr('data-showing-type'));
            })
        }, 200);
        asideOpened = false;
    }

    $('#navbar__show.active').click(function () {
        navbarShowHandler();
    })


    $('#navbar__hide').click(function () {
        navbarHideHandler();
    })


    $('#aside__show').click(function () {
        asideShowHandler();
    })

    $('#aside__hide').click(function () {
        asideHideHandler();
    })

    $('.background').click(function () {
        asideHideHandler();
    })


    $('#mainNav__toggle').click(function () {
        
        if ($mainNav.hasClass('opened')) {

            $mainNav.removeClass('opened');
            $mainNav.addClass('closed');

            $mainNav.find('ul').removeClass('expand');
            $mainNav.find('ul').addClass('minimize');
            $(this).find('i.up').hide(150);
            $(this).find('i.down').show(150);
        } else {
            $mainNav.css({
                transform: 'translateY(0)',
            })
            $mainNav.find('ul').removeClass('minimize');
            $mainNav.find('ul').addClass('expand');
            
            $mainNav.removeClass('closed');
            $mainNav.addClass('opened');
            $(this).find('i.down').hide(150);
            $(this).find('i.up').show(150);
        }
    })
})(jQuery);