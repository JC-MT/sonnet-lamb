import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  initialize() {
    window.innerWidth >= 768 ? window.addEventListener('scroll', () => this.throttle(this.parallaxEffect(this.element), 100)) : null
  }

  disconnect() {
    window.removeEventListener('scroll', () => this.throttle(this.parallaxEffect(this.element), 100));
  }

  throttle(func, timeFrame) {
    let lastTime = 0;
    return function () {
        const now = new Date();
        if (now - lastTime >= timeFrame) {
            func();
            lastTime = now;
        }
    };
  }

  parallaxEffect(element) {
    let speed = 0.715 + window.scrollY / 20 / 1000;

    element.style.setProperty(
      'transform',
      `translateY(${window.scrollY * speed - 120}px)`
    );
  }
}
