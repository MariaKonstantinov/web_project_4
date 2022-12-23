// Section class purpose is to render a list of elements on a page.
// Section class doesn't have markup. It receives markup through the callback function and inserts it in the container.
// It has an object with two properties (items and renderer) as the first parameter of the constructor.
// The items property serves as an array of data, which we need to add on a page when initializing the class. The renderer property is a function responsible for creating and rendering data on a page.
// The second parameter is a CSS class selector where we add the card elements.

export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // It stores a public method named renderItems() that renders all elements on the page
  renderItems() {
    this._renderedItems.forEach((item) =>
      this._container.prepend(this._renderer(item))
    );
  }

  // It stores a public method named addItem() that takes a DOM element and adds it to the container
  addItem(element) {
    this._container.prepend(this._renderer(element));
  }
}
