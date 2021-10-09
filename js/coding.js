import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.querySelector('#hero-trigger').addEventListener('canplaythrough', () => {
  document.querySelector('.wrapper').classList.remove('hidden');
  gsap.to('.load-wrap', { opacity: 0, duration: 0.3 });
  gsap.to('.wrapper', { opacity: 1, duration: 0.3 });

  setVideoTriggers('#life-trigger');
  setVideoTriggers('#int-trigger');
  setVideoTriggers('#hero-trigger', window.innerWidth > 600 ? '+=200' : '+=100');
});

function setVideoTriggers(selector, offsetEnd = '') {
  const element = document.querySelector(selector);

  ScrollTrigger.create({
    trigger: element,
    start: 'top center',
    end: `bottom${offsetEnd} center`,
    onEnter: () => { element.play(); },
    onEnterBack: () => { element.play(); },
    onLeave: () => { element.pause(); },
    onLeaveBack: () => { element.pause(); },
  });
}
