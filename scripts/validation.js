/** My configObject */
const configObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_type_submit",
  inactiveButtonClass: "button_type-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form-error_visible",
}

/** Function ShowInputError */
function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(`${errorClass}`);
}

/** Function HideInputError */
function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(`${inputErrorClass}`);
  errorElement.textContent = " ";
  errorElement.classList.remove(`${errorClass}`);
}

/** Function CheckInputValidity */
function checkInputValidity(formElement, inputElement, configObject) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, configObject);
  } else {
    showInputError(formElement, inputElement, configObject);
  }
}

/** Function HasInvalidInput */
function hasInvalidInput (inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

/** Function to Toggle Submit Button to Disabled State */
function toggleButtonToDisabledState(buttonElement, {inactiveButtonClass}) {
  buttonElement.classList.add(`${inactiveButtonClass}`);
  buttonElement.disabled = true;
}

/** Function to remove Toggle Submit Button to Disabled State */
function toggleButtonToEnabledState(buttonElement, {inactiveButtonClass}) {
  buttonElement.classList.remove(`${inactiveButtonClass}`);
  buttonElement.disabled = false;
}

/** Calling Function to Change Submit Button State */
function changeButtonState (inputList, buttonElement, {inactiveButtonClass}) {
  if (hasInvalidInput(inputList)) {
    toggleButtonToDisabledState(buttonElement, {inactiveButtonClass});
  } else {
    toggleButtonToEnabledState(buttonElement, {inactiveButtonClass});
  }
}

/** Setting Event Listeners */
function setEventListeners(formElement, configObject) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(`${configObject.submitButtonSelector}`);
  changeButtonState(inputList, buttonElement, configObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, configObject)
      changeButtonState(inputList, buttonElement, configObject);
    })
  })
}

/** Function Enable Validation */
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => evt.preventDefault);
    setEventListeners(formElement, settings);
  })
}

enableValidation(configObject);
