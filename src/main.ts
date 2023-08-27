import "./style/style.css";

import Cart from "./js/cart";
import Gallery from "./js/gallery";
import Offcanvas from "./js/offcanvas";
import Popover from "./js/popover";
import NumberInput from "./js/number-input";

document.addEventListener("DOMContentLoaded", () => {
  const galleries = document.querySelectorAll<HTMLElement>("[data-gallery]");
  const overlays = document.querySelectorAll<HTMLElement>("[data-offcanvas]");
  const popovers = document.querySelectorAll<HTMLElement>("[data-popover]");
  const numberInputs = document.querySelectorAll<HTMLElement>(
    "[data-number-input]"
  );

  new Cart().init();

  galleries.forEach((galleryElement) => {
    new Gallery(galleryElement).init();
  });

  overlays.forEach((offcanvasElement) => {
    new Offcanvas(offcanvasElement).init();
  });

  popovers.forEach((popoverElement) => {
    new Popover(popoverElement).init();
  });

  numberInputs.forEach((numberInput) => {
    new NumberInput(numberInput).init();
  });
});
