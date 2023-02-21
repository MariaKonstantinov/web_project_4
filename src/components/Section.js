// Section class purpose is to render a list of elements on a page.
// Section class doesn't have markup. It receives markup through the callback function and inserts it in the container.

export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // It stores a public method named renderItems() that renders all elements on the page
  renderItems(items) {
    items.forEach((item) => this.addItem(item));
  }

  // It stores a public method named addItem() that takes a DOM element and adds it to the container
  addItem(element) {
    this._container.prepend(this._renderer(element));
  }
}
