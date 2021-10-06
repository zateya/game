const initHeaderHighlight = () => {
    const header = document.querySelector('.header');

    document.addEventListener('scroll', () => {
        let scrollY = window.scrollY;

        header.classList.toggle('header_highlight', scrollY > 0);
    });
};

const initDropdown = () => {
    const dropdowns = Array.from(document.querySelectorAll('.dropdown'));

    for (const dropdown of dropdowns) {
        const toggle = dropdown.querySelector('.dropdown__toggle');
    
        toggle.addEventListener('click', () => {
            dropdown.classList.toggle('dropdown_opened');
        });
    }

    document.addEventListener('click', (evt) => {
        if (evt.target.closest('.dropdown')) {
            return;
        }

        dropdowns.forEach((it) => {
            it.classList.remove('dropdown_opened');
        });
    });
};

const initAccordion = () => {
    const accordionItems = Array.from(document.querySelectorAll('.accordion__item'));

    for (const accordionItem of accordionItems) {
        const toggle = accordionItem.querySelector('.accordion__toggle');
    
        toggle.addEventListener('click', (evt) => {
            const target = evt.target;
            const activeClass = 'accordion__item_highlight';

            const item = target.closest('.accordion__item');
            const description = item.querySelector('.accordion__description');

            const isToggleOpened = target.getAttribute('aria-expanded') === 'false';
            
            target.setAttribute('aria-expanded', isToggleOpened);
            description.setAttribute('aria-hidden', !isToggleOpened);

            item.classList.toggle(activeClass);
            
        });
    }
}

initHeaderHighlight();
initDropdown();
initAccordion();



