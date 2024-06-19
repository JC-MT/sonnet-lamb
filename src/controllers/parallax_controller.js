import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  initialize() {
    window.addEventListener('scroll', () => this.parallaxEffect(this.element));
  }

  parallaxEffect(element) {
    window.innerWidth >= 767 ? element.style.setProperty('transform', `translateY(${(window.scrollY * 0.8) - 128 }px)`) : null;
  }
}
