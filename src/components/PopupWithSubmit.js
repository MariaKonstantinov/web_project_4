import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleFormSubmit, processingMessage) {
    super(popupSelector);
    this._button = this._popup.querySelector(".button_type_submit");
    this._handleFormSubmit = handleFormSubmit;
    this._processingMessage = processingMessage;
  }

  open(card, target) {
    super.open();
    this._button.textContent = "Yes";
    this._target = target;
    this._card = card;
  }

  changeButtonText(text) {
    this._button.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      this._button.textContent = this._processingMessage;
      this._handleFormSubmit(this._card, this._target);
      evt.preventDefault();
    });
  }
}
