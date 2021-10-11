import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

if (window.innerWidth > 600) {
  document.querySelector('#hero-trigger').addEventListener('canplaythrough', () => {
    document.querySelector('.wrapper').classList.remove('hidden');
    gsap.to('.load-wrap', { opacity: 0, duration: 0.3, onComplete: () => {
      document.querySelector('.load-wrap').classList.add('hidden');
    }});
    gsap.to('.wrapper', { opacity: 1, duration: 0.3, onComplete: () => {
      setVideoTriggers('#life-trigger', '-=100', '+=100');
      setVideoTriggers('#int-trigger', '-=100', '+=100');
      setVideoTriggers('#hero-trigger', '', window.innerWidth > 600 ? '+=200' : '+=100');
    }});
  });
} else {
  document.querySelector('.wrapper').classList.remove('hidden');
  document.querySelector('.wrapper').classList.remove('invisible');
  document.querySelector('.load-wrap').classList.add('hidden');
}

function setVideoTriggers(selector, offsetStart = '', offsetEnd = '') {
  const element = document.querySelector(selector);

  ScrollTrigger.create({
    trigger: element,
    start: `top${offsetStart} center`,
    end: `bottom${offsetEnd} center`,
    onEnter: () => { element.play(); },
    onEnterBack: () => { element.play(); },
    onLeave: () => { element.pause(); },
    onLeaveBack: () => { element.pause(); },
  });
}
