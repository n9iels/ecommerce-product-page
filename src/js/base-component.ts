abstract class BaseComponent {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  abstract init(): void;
}

export default BaseComponent;
