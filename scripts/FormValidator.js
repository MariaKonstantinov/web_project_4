/** FormValidator Class */
class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

/** showInputError - private method */
  _showInputError = (inputElement) => {
    const { inputErrorClass, errorClass } = this.settings
    const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
  }


/** hideInputError - private method */
  _hideInputError = (inputElement) => {
    const { inputErrorClass, errorClass } = this.settings
    const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = " ";
    errorElement.classList.remove(errorClass);
  }

/** checkInputValidity - private method */
  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };

  /** setEventListeners - private method */
  _setEventListeners = () => {
    const { inputSelector } = this.settings
    this.inputList = [...this.formElement.querySelectorAll(inputSelector)];

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
         this._checkInputValidity(inputElement, configObject);
        this._changeButtonState();
      });
    });
  };


   /** hasInvalidInput - private method */
  _hasInvalidInput = () => this.inputList.some(inputElement => !inputElement.validity.valid);


  /** changeButtonState - private method */
  _changeButtonState = () => {
    const { inactiveButtonClass } = this.settings
    const buttonElement = this.formElement.querySelector(
      submitButtonSelector);
    if (this.hasInvalidInput()) {
      toggleButtonToDisabledState(buttonElement, {inactiveButtonClass});
    } else {
      toggleButtonToEnabledState(buttonElement, {inactiveButtonClass});
    }
  };

   /** resetValidation */
  resetValidation() {
    this.inputList.forEach(inputElement => {
    this._hideInputError(inputElement)
  })
}

  /** enableValidation - public method */
  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => evt.preventDefault);
    this._setEventListeners(formElement, settings);
  }
}

export default FormValidator;

