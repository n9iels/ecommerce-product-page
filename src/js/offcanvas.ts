import BaseComponent from "./base-component";

class Offcanvas extends BaseComponent {
  offcanvasElement?: HTMLElement;

  init(): void {
    const offcanvasId = this.element.getAttribute("data-offcanvas") ?? "";
    const offcanvasElement = document.getElementById(offcanvasId);
    const offcanvasClose = document.querySelector("[data-offcanvas-close]");

    if (!offcanvasId || !offcanvasElement) {
      console.error(
        "No identifier given to offcanvas-handle or element with the identifier was not found"
      );
      return;
    }

    this.offcanvasElement = offcanvasElement;
    this.element.addEventListener("click", (e) => {
      e.preventDefault();
      this.showOffcanvas();
    });
    offcanvasClose?.addEventListener("click", (e) => {
      e.preventDefault();
      this.closeOffcanvas();
    });
  }

  showOffcanvas() {
    document.body.classList.add("h-no-scroll");
    this.offcanvasElement?.classList.add("h-show");
  }

  closeOffcanvas() {
    document.body.classList.remove("h-no-scroll");
    this.offcanvasElement?.classList.remove("h-show");
  }
}

export default Offcanvas;
