import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['navLinks'];

  toggleMenu() {
    this.navLinks.classList.remove('duration-0');
    this.navLinks.classList.add('duration-500');
    this.navLinks.classList.toggle('opacity-0');

    setTimeout(() => {
      this.navLinks.classList.remove('duration-500');
      this.navLinks.classList.add('duration-0');
    }, 500);
  }

  get navLinks() {
    return this.navLinksTarget;
  }
}
