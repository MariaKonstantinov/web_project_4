// Create FormValidator class, which sets settings for validating form fields.
// FormValidator class constructor has 2 parameters: 1. settings object that stores selectors and form classes and 2. parameter which takes a form element to be validated
// we save each of the classes on our "this" object which will be unique for each of the form validator
export class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  //   private method _showInputError()
  _showInputError(inputElement) {
    // selecting all input elements by ID
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    //   customizing default validationMessage property
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  //   private method _hideInputError()
  _hideInputError(inputElement) {
    // selecting all input elements by ID
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    //   resetting the error
    errorElement.textContent = " ";
    errorElement.classList.remove(this._errorClass);
  }

  // private method __checkInputValidity()
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  // private method _hasInvalidInput()
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  //   private method _changeButtonState()
  _changeButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  // function to disable submit button
  disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  // function to enable submit button
  enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  //   private method _setEventListeners()
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._changeButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  resetValidation() {
    this._changeButtonState(); // controlling the submit button
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); // clearing errors
    });
  }

  //   public method to enable validation
  enableValidation() {
    // this._formElement.addEventListener("submit", () => this.disableButton());
    this._setEventListeners();
  }
}
