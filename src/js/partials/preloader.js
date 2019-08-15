import widowSizes from '../store/windowStore';
import canvasSpace from './stars-3d';
import widowStore from '../store/windowStore';

export default class {
    constructor() {
        this.preloaderContainer = document.querySelector('#preloader');
        this.preloaderLogo = this.preloaderContainer.querySelector('.preloader__logo');
        this.preloaderBG = this.preloaderContainer.querySelector('.preloader__bg');
        this.logo = document.querySelector('.header .logo');
        this.logoSvg = this.logo.querySelector('.logo__svg');
        this.preloaderLogoSvg = this.preloaderLogo.querySelector('.logo__svg');
        this.topPaths = this.preloaderContainer.querySelectorAll('.logo__top path');
        this.bottomPaths = this.preloaderContainer.querySelectorAll('.logo__bottom path');
        this.contactUsBtn = document.querySelector('.header__contacts-us');
        this.tl = new TimelineMax();
    }

    setDefaultSettings() {
        this.tl
            .to(this.topPaths, 0, {y: '-50'})
            .to(this.bottomPaths, 0, {y: '50'})
            .to('.homepage', 0, {opacity: 1})
            .to(this.logo, 0, {opacity: 0})
            .to(this.contactUsBtn, 0, {opacity: 0, x: 30})
            .to('[data-animation=intro]', 0, {opacity: 0, y: 30})

    }

    animateWords() {
        this.tl.staggerTo(
            this.topPaths,
            0.5,
            {
                strokeDasharray: `400 0`,
                y: 0,
                onComplete() {
                    const tl = new TimelineMax();
                    this.target.style.fill = '#dab61d';
                }
            },
            0.2
        )
        .staggerTo(
            this.bottomPaths,
            0.5,
            {
                strokeDasharray: `400 0`,
                y: 0,
                onComplete() {
                    const tl = new TimelineMax();
                    this.target.style.fill = '#fff';
                }
            },
            0.2,
            '-=1.9'
        )
    }

    movePreloaderLogoToActualLogo() {
        const logoLeft = this.logo.getBoundingClientRect().left;
        const logoTop = this.logo.getBoundingClientRect().top;
        const proportion = this.logoSvg.clientWidth / this.preloaderLogoSvg.clientWidth;
        const newHeight = this.preloaderLogoSvg.clientHeight * proportion + 'px';

        this.tl
            .to(this.preloaderLogo, 0.8, {x: logoLeft, y: logoTop}, '+=1.4')
            .to(this.preloaderLogoSvg, 0.8, {height: newHeight}, '-=0.7')
            .to(this.preloaderContainer, 0, {pointerEvents: 'none'})

        if(!widowStore.isIntroSlideFullPaged) {
            this.tl
                .to(this.bottomPaths, 0.8, {fill: '#000'}, '-=1.3')
        }
    }

    animateHeader() {
        this.tl
            .to(this.logo, 0, {opacity: 1})
            .to(this.contactUsBtn, 0.8, {opacity: 1, x: 0}, '-=0.6')
            .to(this.preloaderBG, 0.3, {opacity: 0, onComplete: () => { this.removePreloader()} })

        this.animateIntroPage()
    }

    animateIntroPage() {
        this.tl
            .staggerTo('[data-animation=intro]', 0.8, {opacity: 1, y: 0}, 0.2)
            .to('.homepage-intro__dash', 0.5, {scale: 1}, '-=0.4')
    }

    setLogoToCenter() {
        const preloaderLogoWidth = this.preloaderLogo.clientWidth;
        const preloaderLogoHeight = this.preloaderLogo.clientHeight;
        const left = (widowSizes.width - preloaderLogoWidth) / 2
        const top = (widowSizes.height - preloaderLogoHeight) / 2

        this.preloaderLogo.style.transform = `translate(${left}px, ${top}px)`
    }

    removePreloader() {
        this.preloaderContainer.parentNode.removeChild(this.preloaderContainer)
    }

    cropPreloaderBg() {

        if(widowStore.isIntroSlideFullPaged) {
            this.tl.to(this.preloaderBG, 0.6, {opacity: 0})
            return
        }

        const canvasContainer = document.querySelector('.canvas-stars')
        const proportionX = canvasContainer.clientWidth / this.preloaderBG.clientWidth;
        const proportionY = canvasContainer.clientHeight / this.preloaderBG.clientHeight;
        const PreloaderBgDuration = 0.7;
        const PreloaderBgDelay = 0.7;
        const y = this.preloaderLogo.getBoundingClientRect().top;

        //this.preloaderBG.style.transform = `scale(${proportion})`;

        this.tl
            .to(this.preloaderBG, PreloaderBgDuration, {scaleX: proportionX, scaleY: proportionY }, `+=${PreloaderBgDelay}`)
            .to(this.preloaderLogo,
                PreloaderBgDuration,
                {
                    y: y / proportionY,
                    onComplete: () => {
                        const tl = new TimelineMax();
                        tl.to(this.preloaderBG, 0.6, {opacity: 0}, 0.5)
                    }
                },
                `-=${PreloaderBgDuration}`)
    }

    animatePreloader() {
        canvasSpace('.canvas-stars');
        this.setLogoToCenter();
        this.setDefaultSettings();
        this.animateWords();
        this.cropPreloaderBg();
        this.movePreloaderLogoToActualLogo();
        this.animateHeader();
    }
}
