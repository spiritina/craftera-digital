// import 'gsap/ScrollToPlugin';
import { TweenMax } from 'gsap/TweenMax';
import Slider from './partials/fullpage-slider';
import PortfolioSlider from './partials/portfolio-slider';
import HeaderClass from './partials/header';
import FooterClass from './partials/footer';
import PreloaderClass from './partials/preloader';
import widowStore from './store/windowStore';
import form from './partials/form';
import { TimelineLite } from 'gsap/TimelineLite';
import {btnHovers} from "./partials/btnHovers";

window.addEventListener('load', () => {

  const Header = new HeaderClass();
  const Footer = new FooterClass();
  const Preloader = new PreloaderClass();

  Preloader.animatePreloader();

  function setWrapperHeight() {
      document.querySelector('.homepage-swiper').style.height = window.innerHeight + 'px';
  }

  window.addEventListener('resize', setWrapperHeight)

  setWrapperHeight();

  if(widowStore.isIntroSlideFullPaged) {
    Header.changeTheme('light')
    Footer.changeTheme('light')
  }

  const slider = new Slider();
  const portfolioSlider = new PortfolioSlider();

  slider.init();
  portfolioSlider.init();
  btnHovers();
  form();
});
