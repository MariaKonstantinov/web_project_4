// SETTINGS OBJECT ------------------------------------------------------------->
export const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_type_submit",

  //   css class for error state (button block)
  inactiveButtonClass: "button_type-submit_disabled",
  //   css class for error state (popup block)
  inputErrorClass: "popup__input_type_error",
  //   css class for error state (popup block)
  errorClass: "popup__form-error_visible",
};

/** ------------------------------- API TOKEN ---------------------------------------------> */
// export const myToken = "7d6faf2c-0a1b-4234-a80e-36eb1914e77c";

/** CARD TEMPLATE CONSTS ---------------------------------------------> */
export const containerSelector = ".cards__grid";
export const cardTemplateElement = document.querySelector("#card-template");

/** ----------------------- POPUP ---------------------------------------- */
export const formList = Array.from(document.querySelectorAll(".popup__form"));

/** ----------------------- POPUP - EDIT PROFILE ---------------------------------------- */
// EDIT PROFILE POPUP CONSTS
export const editButton = document.querySelector(".button_type_edit");
export const profileName = document.querySelector(".profile__name");
export const nameInputField = document.querySelector(".popup__input_type_name");
export const profileJob = document.querySelector(".profile__job");
export const jobInputField = document.querySelector(".popup__input_type_job");

/**  ----------------------- POPUP - NEW CARD ------------------------------------------ */
// NEW CARD POPUP CONSTS
export const addButton = document.querySelector(".button_type_add");

/** ------------------- POPUP - ZOOM IMAGE ---------------------------------------------- */
// ZOOM IMAGE POPUP CONSTS
export const imageZoom = document.querySelector(".popup__zoom-image");
export const imageZoomTitle = document.querySelector(".popup__zoom-title");

/** ------------------- POPUP - CHANGE AVATAR ---------------------------------------------- */
// CHANGE AVATAR POPUP CONSTS
export const avatar = document.querySelector(".profile__avatar-container");
