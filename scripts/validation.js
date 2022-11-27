/** My configObject */
export const configObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_type_submit",

  //   css class for error state (button block)
  inactiveButtonClass: "button_type-submit_disabled",
  //   css class for error state (popup block)
  inputErrorClass: "popup__input_type_error",
  //   css class for error state (popup block)
  errorClass: "popup__form-error_visible",
};

/** TODO Function ShowInputError */
function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  // selecting all input elements by ID
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  //   customizing default validationMessage property
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);

  console.log(inputElement.id);
}

/** TODO Function HideInputError */
function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  // selecting all input elements by ID
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  //   resetting the error
  errorElement.textContent = " ";
  errorElement.classList.remove(errorClass);
}

/** TODO Function CheckInputValidity */
function checkInputValidity(formElement, inputElement, configObject) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, configObject);
  } else {
    showInputError(formElement, inputElement, configObject);
  }
}

/** TODO Function HasInvalidInput */
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

/** TODO THIS FUNCTION IS INCLUDED IN _changeButtonState: Function to set Toggle Submit Button to Disabled State */
export function toggleButtonToDisabledState(
  buttonElement,
  { inactiveButtonClass }
) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

/** TODO THIS FUNCTION IS INCLUDED IN _changeButtonState: Function to remove Toggle Submit Button to Disabled State */
function toggleButtonToEnabledState(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

/** TODO Calling Function to Change Submit Button State */
function changeButtonState(inputList, buttonElement, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    toggleButtonToDisabledState(buttonElement, { inactiveButtonClass });
  } else {
    toggleButtonToEnabledState(buttonElement, { inactiveButtonClass });
  }
}

/** TODO Setting Event Listeners */
function setEventListeners(formElement, configObject) {
  const inputList = [...formElement.querySelectorAll(".popup__input")];
  const buttonElement = formElement.querySelector(
    configObject.submitButtonSelector
  );
  changeButtonState(inputList, buttonElement, configObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, configObject);
      changeButtonState(inputList, buttonElement, configObject);
    });
  });
}

/** TODO Function Enable Validation */
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault);
    setEventListeners(formElement, settings);
  });
}

enableValidation(configObject);
