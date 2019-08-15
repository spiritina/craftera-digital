export default class {
    constructor() {
        this.headerContainer = document.querySelector('.header');
        this.themeContaineres = this.headerContainer.querySelectorAll('[data-theme]');

        this.init();
    }

    changeTheme(theme) {
        Array.from(this.themeContaineres).forEach( elem => {
            elem.setAttribute('data-theme', theme)
        })
    }

    initLogoHover() {
        const topLogoLetters = document.querySelectorAll('.header__logo .logo__top path');
        const bottomLogoLetters = document.querySelectorAll('.header__logo .logo__bottom path');
        const logo = document.querySelector('.header__logo');
        logo.addEventListener('mouseenter', () => {
            const tlTop = new TimelineMax();
            const tlBottom = new TimelineMax();

            tlTop
                .staggerTo(topLogoLetters, 0.4, {y: -30}, 0.05)
                .staggerTo(topLogoLetters, 0.4, {y: 0}, 0.05, '-=0.3')

            tlBottom
                .staggerTo(bottomLogoLetters, 0.4, {y: 20}, 0.05)
                .staggerTo(bottomLogoLetters, 0.4, {y: 0}, 0.05, '-=0.3')
        })
    }

    addHoverContactUs() {
        const contactUsCircle = document.querySelector('.header__circle');
        const tl = new TimelineMax();
        contactUsCircle.addEventListener('mouseenter', () => {
            tl
                .to(contactUsCircle, 0.4, {opacity: 0})
                .to(contactUsCircle, 0, {strokeDashoffset: 352, opacity: 1})
                .to(contactUsCircle, 1.1, {strokeDashoffset: 704})
        })
    }

    init() {
        this.initLogoHover();
        this.addHoverContactUs();
    }
}
