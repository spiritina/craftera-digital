import Swiper from 'swiper/dist/js/swiper';
import widowStore from '../store/windowStore';
import { throttle } from "lodash";

export default class {
    constructor() {
        this.swiper = null;
        this.themeList = document.querySelectorAll("[data-theme]");
        this.timeLine = new TimelineMax();
        this.activeSlide = {};
    }

    toggleTheme(themeName) {
        const theme = themeName === 'dark' ? 'dark' : 'light';

        Array.from(this.themeList).map(elem => {
            elem.setAttribute('data-theme', theme)
        })
    }

    initSlider() {
        this.swiper = new Swiper('.fp-swiper-wrapper', {
            preventInteractionOnTransition: true,
            mousewheel: {
                releaseOnEdges: true
            },
            speed: 700,
            simulateTouch: false,
            longSwipesRatio: 0.1,
            longSwipesMs: 150,
            touchAngle: 70,
            resistanceRatio: 0.13,
            on: {
                slideChange: (e) => {
                    const activeSlide = this.swiper.slides[this.swiper.activeIndex]
                    const theme = activeSlide.getAttribute('data-active-theme');
                    const activeSection = activeSlide.querySelector('[data-section]');
                    const animationName = activeSection.getAttribute('data-section') || 'default';

                    this.timeLine.clear();

                    const animationFn = this.chooseAnimationForSection(animationName);
                    animationFn ? animationFn(activeSlide) : false

                    this.chooseTheme(theme)
                }
            },
            direction: 'vertical'
        });
    }

    chooseAnimationForSection(sectionName = 'default') {
        const variants = {
            about: this.animateAboutUs,
            prices: this.animatePriceList,
            contacts: this.animateContacts,
            portfolio: this.animatePortfolio,
        }

        return variants[sectionName] ? variants[sectionName].bind(this) : false
    }

    animateAboutUs(activeSlide) {
        const animationItems = activeSlide.querySelectorAll('.animation-item');
        const square = activeSlide.querySelector('.corner__container');

        this.timeLine
            .to(animationItems, 0, {y: 40, opacity: 0})
            .to(square, 0, {scale: 0.5, opacity: 0})

        if(widowStore.isMobile()) {
            this.timeLine.staggerTo(animationItems, 0.8, {y: 0, opacity: 1}, 0.2, 0.5)

        } else {
            this.timeLine
                .to(square, 0.6, {scale: 1, opacity: 1}, 0.5)
                .staggerTo(animationItems, 0.8, {y: 0, opacity: 1}, 0.2)
        }
    }

    animatePriceList(activeSlide) {
        const animationItems = activeSlide.querySelectorAll('.animation-item');
        const button = activeSlide.querySelector('.btn');
        const dash = activeSlide.querySelector('.homepage-prices__dash');
        const animationPriceItems = widowStore.isTablet()
            ? activeSlide.querySelectorAll('.homepage-prices__list--mobile .animation-price__item')
            : activeSlide.querySelectorAll('.homepage-prices__list--desktop .animation-price__item')

        this.timeLine
            .to(animationPriceItems, 0, {y: 40, opacity: 0})
            .to(animationItems, 0, {y: 40, opacity: 0})
            .to(button, 0, {y: 40, opacity: 0})
            .to(dash, 0, {scaleY: 0})

        if(widowStore.isTablet()) {
            this.timeLine
                .staggerTo([...animationItems, ...animationPriceItems, button], 0.8, {y: 0, opacity: 1}, 0.15, 0.3)

        } else {
            this.timeLine
                .staggerTo([...animationItems, button, ...animationPriceItems, ], 0.8, {y: 0, opacity: 1}, 0.15, 0.3)
                .to(dash, 0.4, {scaleY: 1}, )
        }
    }

    animatePortfolio(activeSlide) {
        const circles = document.querySelectorAll('.homepage-portfolio__item:not(.homepage-portfolio__item--active) .homepage-portfolio__circle');
        const animationItems = activeSlide.querySelectorAll('.homepage-portfolio__item--active .animation-item');

        this.timeLine
            .to(circles, 0, {y: 50, opacity: 0})
            .to(animationItems, 0, {y: 50, opacity: 0})
            .staggerTo([...animationItems, ...circles], 0.6, {y: 0, opacity: 1}, 0.15, 0.4)
    }

    animateContacts(activeSlide) {
        const animationItems = activeSlide.querySelectorAll('.animation-item');
        const animationFormItems = activeSlide.querySelectorAll('.animation-item__form');
        const dash = activeSlide.querySelector('.homepage-contacts__dash');

        this.timeLine
            .to(animationItems, 0, {y: 40, opacity: 0})
            .to(animationFormItems, 0, {y: 40, opacity: 0})
            .to(dash, 0, {scaleX: 0})

        if(widowStore.isTablet()) {
            this.timeLine
                .staggerTo([...animationFormItems, ...animationItems ], 0.8, {y: 0, opacity: 1}, 0.15, 0.3)
        } else {
            this.timeLine
                .to(dash, 0.4, {scaleX: 1}, 0.3)
                .staggerTo([dash, ...animationItems, ...animationFormItems], 0.8, {y: 0, opacity: 1}, 0.15)
        }
    }

    chooseTheme(theme) {
        if (theme === 'intro') {
            if (widowStore.isIntroSlideFullPaged) {
                theme = 'light'
            } else {
                theme = 'dark'
            }
        }
        this.toggleTheme(theme);
    }

    addListenerToHireUsBtn() {
        const hireUsBtn = document.querySelector('.header__contacts-us');

        hireUsBtn.addEventListener('click', () => {
            this.swiper.slideTo(4)
        })
    }

    init() {
        this.addListenerToHireUsBtn();
        this.initSlider();
    }

    destroy() {
        if (this.currentSwiper) {
            this.currentSwiper.destroy();
        }
    }
}
