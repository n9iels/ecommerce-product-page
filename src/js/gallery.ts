import BaseComponent from "./base-component";

type GalleryImage = { navElement: HTMLButtonElement; url: string };

class Gallery extends BaseComponent {
  images: GalleryImage[] = [];
  currentItemIndex = 0;

  $currentImage?: HTMLImageElement;
  $nextSlideButton?: HTMLButtonElement;
  $prevSlideSlideButton?: HTMLButtonElement;

  init(): void {
    this.$currentImage =
      this.element.querySelector("[data-gallery-current-image]") ?? undefined;
    this.$nextSlideButton =
      this.element.querySelector("[data-gallery-next]") ?? undefined;
    this.$prevSlideSlideButton =
      this.element.querySelector("[data-gallery-prev]") ?? undefined;

    this.element
      .querySelectorAll<HTMLButtonElement>("[data-gallery-nav]")
      .forEach((item, key) => {
        const imageUrl = item.getAttribute("data-gallery-nav") ?? "";

        item.addEventListener("click", (e) => {
          e.preventDefault();
          this.setActiveImage(key);
        });

        this.images.push({ navElement: item, url: imageUrl });
      });

    this.$prevSlideSlideButton?.addEventListener("click", () =>
      this.previousImage()
    );
    this.$nextSlideButton?.addEventListener("click", () => this.nextImage());

    this.setActiveImage(0);
  }

  setActiveImage(index: number) {
    if (!this.$currentImage) {
      return;
    }

    const currentImage = this.images[this.currentItemIndex];
    const newImage = this.images[index];

    currentImage.navElement.classList.remove("c-gallery__nav-button--active");
    newImage.navElement.classList.add("c-gallery__nav-button--active");

    this.currentItemIndex = index;
    this.$currentImage.src = newImage.url;
  }

  nextImage() {
    if (this.currentItemIndex === this.images.length - 1) {
      this.setActiveImage(0);
    } else {
      this.setActiveImage(this.currentItemIndex + 1);
    }
  }

  previousImage() {
    if (this.currentItemIndex === 0) {
      this.setActiveImage(this.images.length - 1);
    } else {
      this.setActiveImage(this.currentItemIndex - 1);
    }
  }
}

export default Gallery;
