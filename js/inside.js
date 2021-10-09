import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

setVideoTriggers('#life-trigger');
setVideoTriggers('#int-trigger');
setVideoTriggers('#hero-trigger', '+=200');

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
