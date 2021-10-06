import gsap from 'gsap';

let menuOpen = false;
const timeline = gsap.timeline();
const navNode = document.querySelector('nav');

document.querySelector('#nav-icon2').addEventListener('click', (event) => {
  event.currentTarget.classList.toggle('open');
  const stagger = '0.1';
  const duration = '0.3';
  const delay = window.innerWidth > 600 ? '<+=0.3' : '>';

  if (menuOpen) {
    timeline.reverse().eventCallback('onComplete', () => {
      if (!menuOpen) navNode.classList.remove('is-open');
    });
  } else if (timeline.reversed()) {
    navNode.classList.add('is-open');
    timeline.play();
  } else {
    navNode.classList.add('is-open');
    timeline
      .to('.menu-item', { duration, y: 0, stagger, ease: 'power1' })
      .to('.color-slide', { duration, y: '100vh', stagger, ease: 'power1' }, delay)
  }

  menuOpen = !menuOpen;
})