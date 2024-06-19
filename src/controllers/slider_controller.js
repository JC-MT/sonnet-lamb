import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  initialize() {
    const sections = this.element.querySelectorAll('[slider]');

    sections.forEach((section) => {
      const prevButton = section.querySelector('[aria-label="Previous Item"]');
      const nextButton = section.querySelector('[aria-label="Next Item"]');
      const slider = section.querySelector('.flex');

      prevButton.addEventListener('click', () =>
        this.scrollSlider(slider, 'prev')
      );
      nextButton.addEventListener('click', () =>
        this.scrollSlider(slider, 'next')
      );
    });
  }

  scrollSlider(slider, direction) {
    let currentScrollLeft = slider.scrollLeft;
    if (direction === 'next')
      slider.scrollTo({
        left: currentScrollLeft + Number(slider.dataset.scroll),
        behavior: 'smooth'
      });
    if (direction === 'prev')
      slider.scrollTo({
        left: currentScrollLeft - Number(slider.dataset.scroll),
        behavior: 'smooth'
      });
  }
}
