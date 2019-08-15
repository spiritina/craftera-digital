import Swiper from 'swiper/dist/js/swiper';

export default class {
    constructor() {
        this.sldierContainer = document.querySelector('.homepage-portfolio__slider');
        this.activeSlide = document.querySelector('.homepage-portfolio__item--active');
        this.itemList = document.querySelectorAll('.homepage-portfolio__item');
        this.itemInnerList = document.querySelectorAll('.homepage-portfolio__item-inner');

        this.tl = new TimelineMax();
    }

    setInnerWidth() {
        Array.from(this.itemInnerList).forEach( elem => {
            const slideWidth = this.activeSlide.clientWidth;
            elem.style.width = slideWidth + 'px';
        })
    }

    portfolioItemClick() {
        Array.from(this.itemList).forEach( elem => {
            elem.addEventListener('click', () => {
                this.toggleSlide(elem)
            })
        })
    }

    setDefaultSettings() {
        const animationBlocks = this.sldierContainer.querySelectorAll('.animation-item');

        this.tl.to(animationBlocks, 0, {opacity: 0, y: 50});
    }

    toggleSlide(elem) {
        if(this.activeSlide === elem ) return;

        // this.tl.clear();

        const animationBlocks = this.activeSlide.querySelectorAll('.animation-item');
        const prevCircle = this.activeSlide.querySelectorAll('.homepage-portfolio__circle');
        const activeCircle = elem.querySelector('.homepage-portfolio__circle');

        this.tl
            .staggerTo(animationBlocks, 0.1,{ opacity: 0, y: 50,}, -0.1)
            .to(activeCircle, 0.4, {opacity: 0, y: 50, onComplete: () => {
                    this.activeSlide.classList.remove('homepage-portfolio__item--active');
                    this.activeSlide = elem;
                    this.activeSlide.classList.add('homepage-portfolio__item--active');
                    const animationBlocks = this.activeSlide.querySelectorAll('.animation-item');
                    const tl = new TimelineMax();

                    tl
                        .staggerTo(animationBlocks, 0.7,{ opacity: 1, y: 0,}, 0.2, 0.4)
                        .to(prevCircle, 0.4, {opacity: 1, y: 0}, '-=0.3')
                }}, '-=0.3')
    }

    resize() {
        window.addEventListener('resize', () => {
            this.setInnerWidth();
        })
    }

    init() {
        this.setDefaultSettings();
        this.portfolioItemClick();
        this.setInnerWidth();
        this.resize();
    }
}
