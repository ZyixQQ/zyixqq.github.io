(function ($) {
    let isOpen;
    let animateTimeout;
    let isDragging;
    let linksClosed;

    $stickyNav = $('#sticky-nav');
    $categoryList = $('.category-links');
    $background = $('.background');
    $goUpButton = $('#go-up-button');
    $form = $('#search-form');
    $suggestionContainer = $('.suggestion-container');

    
    $scrollableSlide = $('.slider-list');
    $sliderLeftButton = $('.left-button');
    $sliderRightButton = $('.right-button');


    $(window).scroll(function () {
        if (window.scrollY > 75 && !$stickyNav.hasClass('fixed-top')) {
            $goUpButton.css('display', 'flex');
            $stickyNav.addClass('fixed-top');
        } else if (window.scrollY < 75 && $stickyNav.hasClass('fixed-top')) {
            $stickyNav.removeClass('fixed-top');
            $goUpButton.css('display', 'none');
        }
    });


    $form.click(function (e) {
        e.stopPropagation();
        $suggestionContainer.css('display', 'block');

        $(window).one('click', function () {
            $suggestionContainer.css('display', 'none');
          });
          
    })

    $goUpButton.click(function (e) {
        $(document).scrollTop(0);
    })

    $scrollableSlide.mousedown(function (e) {
        isDragging = true;
        startX = e.clientX;


            $scrollableSlide.mousemove(function(event) {
                $scrollableSlide = $(this);
                $sliderRightButton = $($(this.parentElement).find('.right-button'));
                $sliderLeftButton = $($(this.parentElement).find('.left-button'));

                if (isDragging) {
                    deltaX = event.clientX - startX;
                    $scrollableSlide.scrollLeft($scrollableSlide.scrollLeft() - deltaX);
                    startX = event.clientX;

                    

                    if ($scrollableSlide.scrollLeft() + $scrollableSlide[0].clientWidth === $scrollableSlide[0].scrollWidth) {
                        $sliderRightButton.css('display', 'none');
                    } else {
                        $sliderRightButton.css('display', 'flex');
                    }

                    if ($scrollableSlide.scrollLeft() !== 0) {
                        $sliderLeftButton.css('display', 'flex');
                    } else {
                        $sliderLeftButton.css('display', 'none');
                    }

                    
                    if (!linksClosed) {
                        $scrollableSlide.find('a').css({
                            'pointer-events': 'none',
                        });
                    } 
                }
            });


        $scrollableSlide.mouseup(function(event) {
            $scrollableSlide = $(this);
            isDragging = false;
            $scrollableSlide.off('mousemove, mouseup');
            $scrollableSlide.find('a').css({
                'pointer-events': 'initial',
            });

        })

        $scrollableSlide.mouseleave(function(event) {
            $scrollableSlide = $(this);
            isDragging = false;
            $scrollableSlide.off('mousemove, mouseup');
            $scrollableSlide.find('a').css({
                'pointer-events': 'initial',
            });
        })

        

    })
    $categoryList.on('mouseenter', 'li.nav-item', function(e) {
        var $self = $(this);
        var $subnav = $self.find('div.subnav');

        if (!isOpen) {
            clearTimeout(animateTimeout);
            animateTimeout = setTimeout(function () {
                isOpen = true;
                $subnav.addClass('animate-subnav').addClass('enable');
                $background.css('display', 'block');
            }, 400);
        } else {
            $subnav.addClass('enable');
        }

    });

    $categoryList.on('mouseleave', 'li.nav-item', function (e) {
        var $self = $(this);
        var $subnav = $self.find('div.subnav');
        clearTimeout(animateTimeout);
        $subnav.removeClass('enable').removeClass('animate-subnav');
    });

    $categoryList.on('mouseleave', function () {
        isOpen = false;
        $background.css('display', 'none');
    });


    $('.inactive').on('mouseenter', function () {
        if (isOpen) {
            $categoryList.trigger('mouseleave');
            $categoryList.trigger('mouseleave', 'li.nav-item');
        }
    })

    $sliderLeftButton.click(function (event) {
        $sliderRightButton = $($(this.parentElement).find('.right-button'));
        $sliderLeftButton = $($(this.parentElement).find('.left-button'));
        $scrollableSlide = $($(this.parentElement).find('.slider-list'));


        $sliderRightButton.css('display', 'flex');
        $scrollableSlide.animate({ scrollLeft: $scrollableSlide.scrollLeft() - ($scrollableSlide[0].clientWidth - 30) }, {duration: 500, easing: 'linear'}); 
        if ($scrollableSlide.scrollLeft() - ($scrollableSlide[0].clientWidth - 30) <= 0) {
            $sliderLeftButton.css({
                'display': 'none',
            })
        }
    });
    
    $sliderRightButton.click(function (event) {
        $sliderRightButton = $($(this.parentElement).find('.right-button'));
        $sliderLeftButton = $($(this.parentElement).find('.left-button'));
        $scrollableSlide = $($(this.parentElement).find('.slider-list'));

        $sliderLeftButton.css('display', 'flex');
        console.log($scrollableSlide);

        $scrollableSlide.animate({ scrollLeft: $scrollableSlide.scrollLeft() + ($scrollableSlide[0].clientWidth - 30) }, {duration: 500, easing: 'linear'}); 
        if ($scrollableSlide.scrollLeft() + $scrollableSlide[0].clientWidth + ($scrollableSlide[0].clientWidth - 30) >= $scrollableSlide[0].scrollWidth) {
            $sliderRightButton.css({
                'display': 'none',
            })
        }
    });
    
    



})(jQuery);


