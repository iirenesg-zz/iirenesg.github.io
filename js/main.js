import gsap from 'gsap';

let menuOpen = false;

document.querySelector('#nav-icon2').addEventListener('click', (event) => {
  event.currentTarget.classList.toggle('open');
  const timeline = gsap.timeline();
  const stagger = window.innerWidth > 600 ? 0.2 : 0.3;

  if (menuOpen) {
    timeline.to('.menu-item', { duration: 0.5, y: '-100vh', stagger, ease: 'power1', reversed: true, onComplete: () => {
      document.querySelector('nav').classList.remove('is-open');
    } })
  } else {
    document.querySelector('nav').classList.add('is-open');
    timeline.to('.menu-item', { duration: 0.5, y: 0, stagger, ease: 'power1' })
  }

  menuOpen = !menuOpen;
})