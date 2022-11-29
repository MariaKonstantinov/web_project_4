// Create FormValidator class, which sets settings for validating form fields.
// FormValidator class constructor has 2 parameters: 1. settings object that stores selectors and form classes and 2. parameter which takes a form element to be validated.
// FormValidator class has private methods for processing the form, which include: checking the field's validity, changing the state of the Submit button, and adding all the needed handlers.
// FormValidator class has 1 public method enableValidation(), which enables form validation.
// Create an instance of the FormValidator class for each form that should be validated.
// Note: Class is like an "instruction", like a "function"; it doesn't do anything by itself unless we create an instance of a class.
// we save each of the classes on our "this" object which will be unique for each of the form validator
export class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
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

    console.log(inputElement.id);
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
  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  //   private method _changeButtonState()
  _changeButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  //   private method _setEventListeners()
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    // changeButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._changeButtonState(inputList, buttonElement);
      });
    });
  }

  //   public method to enable validation
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault);
    this._setEventListeners();
  }
}
