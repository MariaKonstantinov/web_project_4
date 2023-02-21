// PopupWithForm is a child class of Popup.

// IMPORTS
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleAddFormSubmit, processingMessage) {
    super(popupSelector);
    this._handleAddFormSubmit = handleAddFormSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._popupForm = this._popup.querySelector(".popup__form");
    this._button = this._popup.querySelector(".button_type_submit");
    this._buttonText = this._button.textContent;
    this._processingMessage = processingMessage;
  }

  // private method which collects data from all the input fields and returns that data as an object
  _getInputValues() {
    // Create an empty object
    this._formValues = {};

    // Add the values of the fields to this object
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // Return the values object
    return this._formValues;
  }

  // methods for api change avatar: to change the text on "save" button
  changeButtonText(text) {
    this._button.textContent = text;
  }

  // changes setEventListeners() parent method: adds submit event handler to the form and the click event listener to the close icon
  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();

      // Add a _handleFormSubmit() function call
      // Pass an object which is the result of the _getInputValues work to it

      this._button.textContent = this._processingMessage;
      this._handleAddFormSubmit(this._getInputValues());
      this._button.textContent = this._buttonText;

      this.close();
    });
  }

  // changes the parent close() method in order to reset the form once the popup is closed
  close() {
    super.close();
    this._popupForm.reset();
  }
}
