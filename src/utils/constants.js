/** Six Cards - Links -------------------------------------------------------------> */
export const initialCards = [
  {
    name: "Fern",
    link: "https://i.pinimg.com/564x/70/79/54/70795497719646f223e9a8fc537ab062.jpg",
  },

  {
    name: "Peperomia",
    link: "https://i.pinimg.com/564x/55/3e/0d/553e0d19251b4f8826108faca0952746.jpg",
  },

  {
    name: "Calathea",
    link: "https://i.pinimg.com/564x/cd/44/06/cd44063fafd73e5e7dd53357c11c33ae.jpg",
  },

  {
    name: "Aglaonema",
    link: "https://i.pinimg.com/564x/d5/ab/ec/d5abec622cc41746a5c301aeb5a1e9ec.jpg",
  },

  {
    name: "Photos",
    link: "https://i.pinimg.com/564x/88/41/7f/88417f4ddf8fab3dabd9508368a9cce7.jpg",
  },

  {
    name: "Monstera",
    link: "https://i.pinimg.com/564x/61/82/1a/61821adc2d24e1a7e3fca7c09f00066f.jpg",
  },
];

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
