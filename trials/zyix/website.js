(function ($) {
    let scrollLabel = 0;
    $show = $('.show');
    $window = $(window);
    $aside = $('.scroller');
    const buffer = [];
    $textBox = $('.textbox');
    $toTopButton = $('.upButton');


    $(document).ready(function () {
        $('[data-line-layer=0]').css('display', 'block');
        $show.css({
            transform: 'translate(-200px, 70px) rotate(45deg) rotateX(400deg) rotateY(20deg)'
        }).addClass('initialized')
        setTimeout(() => {
            $show.css('animation', 'fixRotate 20s ease both');
        }, 1000);
        $textBox.fadeIn('slow');
        $asideLeft.fadeIn('slow');
        
        for (let i = 0; i < messages.length; i++) {
            setTimeout(() => {
                textAnimation(messages[i][0], messages[i][1])
            }, i * (7000));
        }
    })
    
    const messages = [
            ["Zyix Turbocharging Your Digital Performance." , [0, 1, 2, 3]],
            ["Experience Velocity with Zyix Redefining Software Speed.", [25, 26, 27, 28]],
            ["Unleash Speed, Unleash Success Zyix Solutions." , [31, 32, 33, 34]],
            ["Optimize. Accelerate. Succeed. Zyix’s Formula for Performance." , [31, 32, 33, 34]],
            ["Zyix Precision Coding for Peak Performance." , [0, 1, 2, 3]],
            ["Revolutionize Your Code, Maximize Your Speed with Zyix." , [50, 51, 52, 53]],
            ["Swift Solutions, Superior Performance Zyix Advantage." , [38, 39, 40, 41]],
            ["Zyix Fueling Your Business Engine with High,Speed Software." , [0, 1, 2, 3]],
            ["Code Faster, Scale Quicker Zyix Efficiency." , [27, 28, 29, 30]],
            ["Boosting Digital Agility Zyix Performance Unleashed.", [25, 26, 27, 28]],
            ["Welcome to Zyix! Ready for a tech adventure? Let's soar TOGETHER!", [11, 12, 13, 14, 15, 56, 57, 58, 59, 60, 61, 62, 63, 64]]
    ]

    const $asideLeft = $('.head-left-side');

    $(window).scroll(function () {
        
        if ($window.scrollTop() < 100 && $toTopButton.css('display') !== 'none') {
            $toTopButton.fadeOut('slow');
        }
        
        if ($window.scrollTop() > 100 && $toTopButton.css('display') === 'none') {
            $toTopButton.fadeIn('slow');
        }
    
        let currentLayer = Math.floor(window.scrollY / 700) + 1;
        if (currentLayer !== scrollLabel) {
           

            $(`[data-line-layer=${currentLayer}]`).each((index, e) => {
                el = $(e);
                if (el.attr('data-animation-type') === 'fade') {
                    el.fadeIn('slow');
                } else if (el.attr('data-animation-type') === 'slide') {
                    el.slideDown('slow')
                } else {
                    el.css('display', (el.attr('data-display') || 'block'));
                }
            });

            

            scrollLabel = currentLayer;
        }
    
    });

    let direction;
    let lastScrollPoint = 0;
    let layer = 1;


    $aside.scroll(function () {
        
        

        if (layer !== (Math.floor($aside.scrollTop() / 100) + 1)) {

            buffer.forEach(action => {
                clearTimeout(action);
            })
            currentScrollPoint = $aside.scrollTop();
        direction = lastScrollPoint > currentScrollPoint ? 'up' : 'down';

        
            if ($aside.scrollTop() < 100) {
                $('.previous-content-button').fadeOut('slow');
            } else {
                $('.previous-content-button').fadeIn('slow');
            }

            if ($aside.scrollTop() >= 600) {
                $('.next-content-button').fadeOut('slow');
            } else {
                $('.next-content-button').fadeIn('slow');
                
            }
        if ('up' === direction) {
            const firstElement = $('.scrollable-area .nav-item:first-child');
            
            if (firstElement.attr('data-location') !== '0') {
                        const elToDecrease = firstElement.nextUntil('[data-location=0]');
                    let elToIncrease = elToDecrease.last().nextAll();

                    if (elToDecrease.length === 0) {
                        elToIncrease = firstElement.nextAll();
                    }

                    firstElement.attr('data-location', `${Number(firstElement.attr('data-location')) - 1}`)

                    elToDecrease.each((index, el) => {
                        el.setAttribute('data-location', `${Number(el.getAttribute('data-location')) - 1}`);
                    })
                    elToIncrease.each((index, el) => {
                        el.setAttribute('data-location', `${Number(el.getAttribute('data-location')) + 1}`);
                    })
            }

        } else if ('down' === direction) {
            const lastElement = $('.scrollable-area .nav-item:last-child');

            if (lastElement.attr('data-location') !== 0) {
                let elToDecrease = lastElement.prevUntil('[data-location=0]');
            let elToIncrease = elToDecrease.last().prevAll();

            if (elToDecrease.length === 0) {
                elToIncrease = lastElement.prevAll();
            }


            lastElement.attr('data-location', `${Number(lastElement.attr('data-location')) - 1}`);

            elToDecrease.each((index, el) => {
                el.setAttribute('data-location', `${Number(el.getAttribute('data-location')) - 1}`)
            })

            elToIncrease.each((index, el) => {
                el.setAttribute('data-location', `${Number(el.getAttribute('data-location')) + 1}`)
            })
            }
            
        }

            lastScrollPoint = currentScrollPoint;
            layer = (Math.floor($aside.scrollTop() / 100) + 1);
            
            buffer.push(setTimeout(() => {
                let index = $('[data-location=0]').attr('data-index');
            $('.hidden-content').hide(200);
            $(`.hidden-content[data-index='${index}']`).show(700);
            }, 500))
        }
    })


    $('.previous-content-button').click(function () {
        $aside.scrollTop(($aside.scrollTop() - 100))

        $(this).find('i').animate({
            top: '-50px'
        }, 'slow').animate({
            top: '50px'
        }, 0).animate({
            top: '0px'
        }, 'slow');
    })
    $('.next-content-button').click(function () {
        $aside.scrollTop(($aside.scrollTop() + 100))

        $(this).find('i').animate({
            bottom: '-50px'
        }, 'slow').animate({
            bottom: '50px'
        }, 0).animate({
            bottom: '0px'
        }, 'slow');
    })
    
    function textAnimation(text, emIndexes = []) {
        let message = [...text];
        $textBox.html("<span class='cursor'>|</span>");
        const cursor = $textBox.find('.cursor');
    
        for (let i = 0; i < text.length; i++) {
            let letter = message.shift();
            let letterBox = document.createElement('span');
            letterBox.textContent = letter;
    
            if (emIndexes.includes(i)) {
                setTimeout(() => {
                    letterBox.classList.add('fancy');
                    $textBox[0].insertBefore(letterBox, cursor[0]);
                }, 100 * i);
            } else {
                setTimeout(() => {
                    $textBox[0].insertBefore(letterBox, cursor[0]);
                }, 100 * i);
            }
        }
    
    }


    $toTopButton.click(function () {
        $window.scrollTop(0);
        $(this).fadeOut(1000);
    })


})(jQuery);