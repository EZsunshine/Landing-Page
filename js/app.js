/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const header = document.querySelector('.page__header');
const navbar = document.querySelector('#navbar__list');
const navbarList = document.querySelector('.navbar__list');
const sections = Array.from(document.querySelectorAll('section'));
const fragment = document.createDocumentFragment();


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// check which element is active
function getActiveElem() {
    maxSection = sections[0];
    minVal = 1000000;
    for (item of sections) {
        let bounding = item.getBoundingClientRect();
        if (bounding.top > -300 & bounding.top < minVal) {
            minVal = bounding.top;
            maxSection = item;
        };
    };
    return maxSection;
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function addNavbarItem() {
    sections.forEach((section, i) => {
        const navbarItem = document.createElement('li');
        navbarItem.setAttribute('class', 'menu__item');
        navbarItem.innerHTML = `<a href=#section${i + 1} class="menu__link">${section.dataset.nav}</a>`;
        fragment.appendChild(navbarItem);
    });
};


// Add class 'active' to section when near top of viewport
function setActive () {
    window.addEventListener('scroll', function (event) {
        let section = getActiveElem();
         section.classList.add('your-active-class');
            // set other sections as inactive
            for (let item of sections) {
                if (item.id != section.id & item.classList.contains('your-active-class')) {
                    item.classList.remove('your-active-class');
                }
            }
    });
   
};


// Scroll to anchor ID using scrollTO event
function scrollToSection(e) {
    navbarList.querySelectorAll('a[href^="#"]').forEach(anchor => {
      e.preventDefault();
      if (anchor === e.target) {
        console.log(anchor);
        document.querySelector(e.target.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      }
    })
  }



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
addNavbarItem();
navbarList.appendChild(fragment);
// Scroll to section on link click
navbarList.addEventListener('click', scrollToSection);
// Set sections as active
setActive()