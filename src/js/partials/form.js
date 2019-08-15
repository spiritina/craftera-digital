import widowStore from '../store/windowStore';

export default function() {
    const form = document.querySelector('.homepage-contacts__form');
    const inputs = form.querySelectorAll('.form__input');
    const header = document.querySelector('.header');

    function hideHeader() {
        header.style.opacity = 0;
        header.style.pinterEvents = 'none';
    }

    function showHeader() {
        header.style.opacity = 1;
        header.style.pinterEvents = 'auto';
    }

    function onInputFocus(input) {
        if (widowStore.isMobile()) {
            hideHeader()
        }
    }

    function onInputBlur(input) {
        if (widowStore.isMobile()) {
            showHeader()
        }
    }

    function animateOnFocusLabel(input, tl) {
        const label = input.target.parentNode;
        const topLine = label.querySelector('.label-square__border-top');
        const bottomLine = label.querySelector('.label-square__border-bottom');
        const leftLine = label.querySelector('.label-square__border-left');
        const rightLine = label.querySelector('.label-square__border-right');

        tl.clear();

        tl
            .to(topLine, 0.25, {width: '100%'})
            .to(rightLine, 0.15, {height: '100%'})
            .to(bottomLine, 0.25, {width: '100%'})
            .to(leftLine, 0.15, {height: '100%'})
    }

    function animateOnBlurLabel(input, tl) {
        const label = input.target.parentNode;
        const topLine = label.querySelector('.label-square__border-top');
        const bottomLine = label.querySelector('.label-square__border-bottom');
        const leftLine = label.querySelector('.label-square__border-left');
        const rightLine = label.querySelector('.label-square__border-right');

        tl.clear();

        tl
            .to(leftLine, 0, {height: '0%'})
            .to(bottomLine, 0, {width: '0%'})
            .to(rightLine, 0, {height: '0%'})
            .to(topLine, 0, {width: '0%'})

    }

    Array.from(inputs).forEach( input => {
        const tl = new TimelineMax();
        input.addEventListener('focus', (e) => {
            onInputFocus(e);
            animateOnFocusLabel(e, tl);
        });
        input.addEventListener('blur', (e) => {
            onInputBlur(e);
            animateOnBlurLabel(e, tl);
        });
    })
}
