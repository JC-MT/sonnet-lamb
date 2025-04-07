import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["mobileMenu", "animate"];
  static values = { activeMenu: false };

  initialize() {
    this.mainPage = document.getElementById("main-page");
    this.isMobileUser = () => window.innerWidth < 768;
  }

  toggleMobileMenu() {
    this.activeMenuValue = !this.activeMenuValue;
    this.mobileMenuTarget.dataset.active = this.activeMenuValue;
    this.animateTargets.forEach((bar) => {
      bar.dataset.active = this.activeMenuValue;
    });

    window.document.body.classList.toggle("overflow-y-hidden");
  }
}
