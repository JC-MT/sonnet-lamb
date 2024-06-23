import { Controller } from '@hotwired/stimulus';
const routes = {
  404: '/pages/404.html',
  '/': '/pages/home.html',
  '/About': '/pages/about.html',
  '/Gallery': '/pages/gallery.html',
  '/Reels': '/pages/reels.html',
  '/News': '/pages/news.html',
  '/Contact': '/pages/contact.html'
};

export default class extends Controller {
  static targets = ['mobileMenu', 'animate'];
  static values = { activeMenu: false };

  initialize() {
    this.mainPage = document.getElementById('main-page');
    this.isMobileUser = () => window.innerWidth < 768;
    this.getCurrentLocation();
    window.onpopstate = this.getCurrentLocation.bind(this);
  }

  getCurrentLocation() {
    const { pathname } = window.location;
    const route = routes[pathname] || routes[404];
    fetch(route)
      .then((response) => response.text())
      .then((html) => {
        if (this.isMobileUser()) {
          this.mainPage.innerHTML = html;
        } else {
          setTimeout(() => (this.mainPage.innerHTML = html), 500);
        }
      })
      .catch((error) => {
        console.error('Failed to load the page:', error);
      });
  }

  handleRouteRequest(e) {
    e.preventDefault();
    const requestedHref = e.target.href || e.target.firstChild.href;
    const { location, history } = window;

    if (requestedHref !== location.href) {
      history.pushState({}, '', requestedHref);
    } else {
      this.isMobileUser() ? this.toggleMobileMenu() : null;
      return;
    }

    this.isMobileUser() ? this.toggleMobileMenu() : this.handleOpacity();
    this.getCurrentLocation();
  }
  
  toggleMobileMenu() {
    this.activeMenuValue = !this.activeMenuValue;
    this.mobileMenuTarget.dataset.active = this.activeMenuValue;
    this.animateTargets.forEach((bar) => {
      bar.dataset.active = this.activeMenuValue;
    });

    window.document.body.classList.toggle('overflow-y-hidden');
  }

  handleOpacity() {
    this.mainPage.classList.toggle('opacity-0');
    setTimeout(() => this.mainPage.classList.toggle('opacity-0'), 500);
  }
}
