import BaseComponent from "./base-component";

class NumberInput extends BaseComponent {
  numberInputElement?: HTMLElement;

  init(): void {
    const inputElement = this.element.querySelector<HTMLInputElement>("input");
    const minusButton = this.element.querySelector<HTMLButtonElement>(
      "[data-number-minus]"
    );
    const plusButton =
      this.element.querySelector<HTMLButtonElement>("[data-number-plus]");

    if (!inputElement || !minusButton || !plusButton) {
      console.error(
        "No input-elemnt or (one of the) control buttons was found"
      );
      return;
    }

    if (!inputElement.value) {
      inputElement.value = "1";
    }

    minusButton.addEventListener("click", (e) => {
      e.preventDefault();
      inputElement.value = String(Math.max(Number(inputElement.value) - 1, 0));
    });

    plusButton.addEventListener("click", (e) => {
      e.preventDefault();
      inputElement.value = String(Number(inputElement.value) + 1);
    });
  }
}

export default NumberInput;
