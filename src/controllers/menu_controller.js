import { Controller } from '@hotwired/stimulus';
const routes = {
  404: './src/pages/404.html',
  '/': './src/pages/home.html',
  '/About': './src/pages/about.html',
  '/Gallery': './src/pages/gallery.html',
  '/Reels': './src/pages/reels.html',
  '/News': './src/pages/news.html',
  '/Contact': './src/pages/contact.html'
};

export default class extends Controller {
  static targets = ['mobileMenu', 'animate'];
  static values = { activeMenu: false };

initialize() {
    this.handleLocation();
    window.onpopstate = this.handleLocation.bind(this);
  }

  handleLocation() {
    const { pathname } = window.location;
    const mainPage = document.getElementById('main-page');
    const route = routes[pathname] || routes[404];
    fetch(route)
      .then((response) => response.text())
      .then((html) => {
        this.handleOpacity(mainPage);
        setTimeout(() => mainPage.innerHTML = html, 600)
      })
      .catch((error) => {
        console.error('Failed to load the page:', error);
      })
      .finally(() => {
        setTimeout(() => this.handleOpacity(mainPage), 600)
      });
  }

  handleRouting(e) {
    e.preventDefault();
    const requestedHref = e.target.href || e.target.firstChild.href
    const { href } = window.location;

    if(requestedHref === href) return;
    window.history.pushState({}, '', requestedHref);
    this.handleLocation();
    window.innerWidth <= 767 ? this.toggleMenu() : null;
  }

  toggleMenu() {
    this.activeMenuValue = !this.activeMenuValue;
    this.mobileMenuTarget.dataset.active = this.activeMenuValue;
    this.animateTargets.forEach((bar) => {
      bar.dataset.active = this.activeMenuValue;
    });

    window.document.body.classList.toggle('fixed');

    const { classList } = this.mobileMenuTarget;
    classList.add('duration-500');
    classList.remove('duration-0');

    setTimeout(() => {
      classList.remove('duration-500');
      classList.add('duration-0');
    }, 500);
  }

  handleOpacity(mainPage) {
    mainPage.classList.toggle('opacity-0');
  }
}
