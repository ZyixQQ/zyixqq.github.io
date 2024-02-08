const container = document.querySelector('.container');
const actualWidth = window.innerWidth;
const asideBackground = document.querySelector('.background');
const miniAside = document.querySelector('.mini-aside');
const maxAside = document.getElementById('changable-aside');
const main = document.querySelector('main');
const rows = document.querySelectorAll('.contents');
const rightButton = document.querySelector('.slide-right-button');
const leftButton = document.querySelector('.slide-left-button');
const navMiddle = document.querySelector('.nav-middle');
const hidden = document.querySelector('.hidden');
const searchInput = document.getElementById('search-input');
const linkBar = document.querySelector('.bar-link-list');
const profilePicture = document.querySelector('.profile-picture-wrapper');

let asideMinimalized;
let buttonsActive;
let offset = 0;
let navHidden;



function changeLayout() {
    let count = parseInt(document.documentElement.style.getPropertyValue('--video-items-count'));
    const sections = Array.from(document.querySelectorAll('.contents'));

    function createBox(oldBox) {
        container.appendChild(oldBox);
        newBox = document.createElement('div'); 
        newBox.setAttribute('class', 'contents');
        return newBox;
    }

    sections.forEach((box, index) => {
        if (box.children.length > count) {
            let newBox;
        
            while (box.children.length !== count) {        
                let lastItem = box.removeChild(box.lastElementChild);

                if (sections[sections.length - 1] === box) {

                    if (newBox && newBox.children.length >= count) {
                        newBox = createBox(newBox);

                    } else if (!newBox) {
                        newBox = document.createElement('div');
                        newBox.setAttribute('class', 'contents');
                    }
                    
                    if (newBox.children.length === 0) {
                        newBox.appendChild(lastItem);
                    }
                    newBox.insertBefore(lastItem, newBox.firstElementChild);
                
                } else {
                    sections[index + 1].insertBefore(lastItem, sections[index + 1].firstElementChild);
                
                }
            }
            if (newBox) {
                container.appendChild(newBox);
            
            }

        } else if (box.children.length < count && sections[sections.length - 1] !== box) {
            
            while (box.children.length !== count) {
                let firstElement = sections[index + 1];
                
                if (firstElement && firstElement.children.length === 0) {
                    firstElement.parentElement.removeChild(firstElement);
                    sections.splice(index + 1, 1);
                
                    if (sections.length > index && sections[index].children.length !== 0) {
                        firstElement = sections[index + 1];
                
                    } else {
                        break;
                
                    }
                } 

                if (firstElement && firstElement.firstElementChild) {
                    let firstItem = firstElement.removeChild(firstElement.firstElementChild);
                    box.appendChild(firstItem);
                } else {
                    break;
                }
            }
        }
        
    });
}

function manageAside() {
    function standarize() {
        maxAside.style.display = 'block';
    }

    function minimalize() {
        maxAside.style.display = 'none';
    }

    if (maxAside.style.display === 'none') {
        standarize();
    } else {
        minimalize();
    }
}

function minimalModAside() {
    if (asideMinimalized) {
        maxAside.style.left = '0';
        asideMinimalized = false;
        asideBackground.style.display = 'block';
    } else if (!asideMinimalized) {
        maxAside.style.left = '-260px';
        asideMinimalized = true;
        asideBackground.style.display = 'none';
    }
}

function centerContents() {
    miniAside.style.display = 'none';
    main.style.justifyContent = 'center';
    rows.forEach(row => {
        row.style.justifyContent = 'center';
    })
}

function checkWindow(width) {
    const count = document.documentElement.style.getPropertyValue('--video-items-count');

    if (width > 1900 && width <= screen.width && count !== '5') {
        document.documentElement.style.setProperty('--video-items-count', '5');
        changeLayout();
    } else if (width < 1900 && width > 1700 && count !== '4') {
        document.documentElement.style.setProperty('--video-items-count', '4');
        changeLayout();
    } else if (width < 1701 && width > 1100 && count !== '3') {
        document.documentElement.style.setProperty('--video-items-count', '3');
        changeLayout();
    } else if (width < 1101 && width > 700 && count !== '2') {
        document.documentElement.style.setProperty('--video-items-count', '2');
        changeLayout();
    } else if (width < 701 && count !== '1') {
        document.documentElement.style.setProperty('--video-items-count', '1');
        changeLayout();
    }

    if (width < 1316 && !asideMinimalized) {
        asideMinimalized = true;
        navMiddle.style.justifyContent = 'center';

        maxAside.style.left = '-260px';
        maxAside.classList.remove('standart-aside');
        maxAside.classList.add('first-hide-aside');
        maxAside.classList.add('hidden-aside');
    } else if (width > 1315 && asideMinimalized) {
        asideMinimalized = false;
        navMiddle.style.justifyContent = 'flex-end';
        maxAside.style.left = '0';
        maxAside.classList.remove('first-hide-aside');
        maxAside.classList.remove('hidden-aside');
        maxAside.classList.add('standart-aside');
    }

    if (width < 790) {
        if (leftButton.style.left !== '0') {
            leftButton.style.left = '0';
        }
        if (miniAside.style.display !== 'none') {
            centerContents();
        }

    } else if (width > 789) {
        if (miniAside.style.display === 'none') {
            miniAside.style.display = 'block';
            main.style.justifyContent = 'flex-start';
            rows.forEach(row => {
                row.style.justifyContent = 'flex-start';
            });
        } 
        if (leftButton.style.left !== '70px') {
            leftButton.style.left = '70px';
        }
    }

    if (width > 1000 && buttonsActive) {
        buttonsActive = false;
        rightButton.style.display = 'none';
        leftButton.style.display = 'none';
        rightButton.style.visibility = 'visible';
        leftButton.style.visibility = 'hidden';
        linkBar.style.transform = 'translateX(0)';
        offset = 0;
    }

    if (width < 1001 && !buttonsActive) {
        buttonsActive = true;
        rightButton.style.display = 'block';
        leftButton.style.display = 'block';
    }


    if (width < 700 && !navHidden) {
        navMiddle.classList.remove('nav-middle');
        navMiddle.classList.add('nav-middle-hidden');
        profilePicture.style.width = 'auto';
        navHidden = true;
    } 

    if (width > 700 && navHidden) {
        navMiddle.classList.remove('nav-middle-hidden');
        navMiddle.classList.remove('extended-nav-middle');
        navMiddle.classList.add('nav-middle');
        profilePicture.style.width = '60px';
        navHidden = false;
    }



}

function slide(direction) {
    if (direction === 'right') {
        leftButton.style.visibility = 'visible';
        offset -= 170;
        if (offset <= -480) {
            rightButton.style.visibility = 'hidden';
        }
    } else {
        rightButton.style.visibility = 'visible';
        offset += 170;
        if (offset >= 0) {
            leftButton.style.visibility = 'hidden';
        }
    }
    linkBar.style.transform = `translateX(${offset}px)`
};


searchInput.addEventListener('focus', () => {
    hidden.style.display = 'inline-flex';
});

searchInput.addEventListener('blur', () => {
    hidden.style.display = 'none';
});

window.addEventListener('resize', (e) => {
    const width = window.innerWidth;
    checkWindow(width);
});

rightButton.children[0].addEventListener('click', () => {
    slide('right');
});

leftButton.children[0].addEventListener('click', () => {
    slide('left');
});




document.querySelectorAll('.aside-menu-manager').forEach(element => {
    element.addEventListener('click', () => {
        if (window.innerWidth < 1316) {
            minimalModAside();
        } else {
            manageAside();
        }
    })
})

document.getElementById('hidden-button').addEventListener('click', () => {
    navMiddle.classList.add('extended-nav-middle');
})

document.getElementById('extended-nav-closer').addEventListener('click', () => {
    navMiddle.classList.remove('extended-nav-middle');
})



checkWindow(actualWidth);
