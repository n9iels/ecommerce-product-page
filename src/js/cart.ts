type CartItem = {
  title: string;
  price: number;
  image: number;
  quantity: number;
};

class CartStore {
  cart = new Map<string, CartItem>();
  $cartContent?: HTMLElement;
  $cartQuantity?: NodeListOf<HTMLElement>;

  init(): void {
    this.$cartContent =
      document.querySelector("[data-cart-content]") ?? undefined;
    this.$cartQuantity = document.querySelectorAll<HTMLElement>(
      "[data-cart-quantity]"
    );

    document
      .querySelectorAll<HTMLButtonElement>("[data-add-to-cart]")
      .forEach((button) => this.onClickAddToCart(button));

    this.updateDom();
  }

  updateDom() {
    this.renderCart();
    this.renderCartQuantity();
  }

  onClickAddToCart(button: HTMLButtonElement) {
    const buttonData = button.getAttribute("data-item");
    const quantityInputRef =
      button.getAttribute("data-quantity-input-ref") ?? "";
    let quantityInput: HTMLInputElement | null = null;

    if (!buttonData) {
      return;
    }

    if (quantityInputRef) {
      quantityInput = document.getElementById(
        quantityInputRef
      ) as HTMLInputElement;
    }

    button.addEventListener("click", (e) => {
      e.preventDefault();
      const item = JSON.parse(buttonData) as CartItem;
      const quantity = Number(quantityInput?.value) ?? 0;

      if (this.cart.has(item.title)) {
        const currentItem = this.cart.get(item.title) as CartItem;

        this.cart.set(item.title, {
          ...currentItem,
          quantity: currentItem.quantity + quantity,
        });
      } else {
        this.cart.set(item.title, { ...item, quantity });
      }

      this.updateDom();
    });
  }

  onClickRemoveFromCart(item: string) {
    if (this.cart.has(item)) {
      this.cart.delete(item);
      this.updateDom();
    } else {
      console.warn(`The item ${item} was not found in the cart`);
    }
  }

  renderCart() {
    const cart = document.createElement("ul");
    cart.classList.add("c-list");

    if (!this.$cartContent) {
      return;
    }

    if (this.cart.size === 0) {
      this.$cartContent.textContent = "No items in cart";
      return;
    }

    this.cart.forEach((item) => {
      const removeButton = document.createElement("button");
      removeButton.innerHTML = `<button><img src="/icons/icon-delete.svg" alt="" /></button>`;
      removeButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.onClickRemoveFromCart(item.title);
      });

      const listItem = document.createElement("li");
      listItem.classList.add("c-list__item");
      listItem.innerHTML = `
        <div class="c-list__start">
            <img src="${item.image}" />
        </div>
        <div class="c-list__body">
            <span>${item.title}</span>
            <span>$${item.price}.00 x ${
        item.quantity
      } <span class="h-fw-bold">$${item.price * item.quantity}.00</span>
        </div>
      `;
      listItem.appendChild(
        document.createElement("div").appendChild(removeButton)
      );
      cart.appendChild(listItem);
    });

    this.$cartContent.innerHTML = "";
    this.$cartContent.appendChild(cart);
  }

  renderCartQuantity() {
    let total = 0;
    this.cart.forEach((item) => (total = total + item.quantity));

    this.$cartQuantity?.forEach(
      (element) => (element.innerText = String(total))
    );
  }
}

export default CartStore;
