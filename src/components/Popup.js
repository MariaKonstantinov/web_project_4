// Popup class opens and closes popup window.
// The constructor has a single parameter, which is the popup selector.

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // public method which adds a "click" event listener to the close icon of popup
  // + it closes when user clicks area around the form
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("button_type_close")
      ) {
        this.close();
      }
    });
  }

  // public method to open popup
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // public method to close popup
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // private method to close popup by pressing Esc key
  _handleEscClose = (evt) => {
    // evt.preventDefault();

    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOverlayClickClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };
}
