const buttons = document.querySelectorAll('.slide-control-nav a');
const pages = document.querySelectorAll('.slides-menu li');



for (let i = 0; i < 5; i++) {
    buttons[i].addEventListener('click', (e) => {
        pages.forEach(element => {
            if (element.style.display !== 'none' && element !== pages[i]) {
                element.classList.remove('selected-page');
                element.style.display = 'none';
            }
        });

        pages[i].style.display = 'list-item';
        pages[i].classList.add('selected-page');

        buttons.forEach(element => {
            if (element.classList.contains('selected-number')) {
                element.classList.remove('selected-number');
            } 
        });

        buttons[i].classList.add('selected-number');
    });
}

