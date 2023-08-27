import BaseComponent from "./base-component";

class Popover extends BaseComponent {
  popoverElement?: HTMLElement;

  init(): void {
    const popoverId = this.element.getAttribute("data-popover") ?? "";
    const popoverElement = document.getElementById(popoverId);

    if (!popoverId || !popoverElement) {
      console.error(
        "No identifier given to popover-handle or element with the identifier was not found"
      );
      return;
    }

    this.popoverElement = popoverElement;
    this.element.addEventListener("click", (e) => {
      e.preventDefault();
      this.togglePopover();
    });
  }

  togglePopover() {
    const windowWith = window.innerWidth;
    const elementRects = this.element.getClientRects().item(0);

    if (!elementRects || !this.popoverElement) {
      return;
    }

    this.popoverElement.style.top = `${
      elementRects.top + elementRects.height + 20
    }px`;
    this.popoverElement.style.left = `${elementRects.x - 200}px`;
    this.popoverElement.classList.toggle("h-show");

    if (elementRects.x - 200 + this.popoverElement.clientWidth > windowWith) {
      this.popoverElement.style.right = "20px";
      this.popoverElement.style.left = "auto";
    }

    this.createCloseListener();
  }

  closePopover() {
    this.popoverElement?.classList.remove("h-show");
  }

  createCloseListener() {
    const closeOnClickOutsidePopover = (event: Event) => {
      const isClickInPopover = this.popoverElement?.contains(
        event.target as Node
      );
      const isClickOnHandler = this.element.contains(event.target as Node);

      if (!isClickInPopover && !isClickOnHandler) {
        this.closePopover();
        document.removeEventListener("click", closeOnClickOutsidePopover);
      }
    };

    document.addEventListener("click", closeOnClickOutsidePopover);
  }
}

export default Popover;
