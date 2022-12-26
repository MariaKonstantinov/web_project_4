// IMPORTS
// JS CLASSES IMPORTS
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "../page/index.css";

// The index.js file must contain only the code for creating class instances and adding specific event listeners, and all such code should only be placed in index.js.

/** Six Cards - Links -------------------------------------------------------------> */
const initialCards = [
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
const settings = {
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
const cardTemplateElement = document.querySelector("#card-template");

/** SECTION ----------------------- POPUP - EDIT PROFILE ---------------------------------------- */
// EDIT PROFILE POPUP CONSTS
const editButton = document.querySelector(".button_type_edit");
const profileName = document.querySelector(".profile__name");
const nameInputField = document.querySelector(".popup__input_type_name");
const profileJob = document.querySelector(".profile__job");
const jobInputField = document.querySelector(".popup__input_type_job");

/** Handlers definition */
function handleEditButtonClick() {
  const { nameInput, jobInput } = userInfo.getUserInfo();
  nameInputField.value = nameInput;
  jobInputField.value = jobInput;
  popUpFormProfile.open();
}

/** Attach handlers */
editButton.addEventListener("click", handleEditButtonClick);

/** SECTION ----------------------- POPUP - NEW CARD ---------------------------------------------- */
// NEW CARD POPUP CONSTS
const addButton = document.querySelector(".button_type_add");

/** SECTION ----------------------- POPUP - ZOOM IMAGE ---------------------------------------------- */
// ZOOM IMAGE POPUP CONSTS
const imageZoom = document.querySelector(".popup__zoom-image");
const imageZoomTitle = document.querySelector(".popup__zoom-title");

// function to preview image card
function handleCardImageClick(cardData) {
  imageZoom.src = cardData.link;
  imageZoom.alt = cardData.name;
  imageZoomTitle.textContent = cardData.name;

  popUpImage.open(cardData);
}

/** Attach handlers */
addButton.addEventListener("click", () => {
  popUpFormNewCard.open();
});

// initialization of a new formValidator class instance ----------------------------->

const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(settings, formElement);
  formValidator.enableValidation();
});

// initialization of popUpWithImage ----------------------------->
const popUpImage = new PopupWithImage(".popup_type_zoom-card");
popUpImage.setEventListeners();

// initialization of popUpWithForm - New Card ----------------------------->
const handleAddFormSubmitNewCard = (inputs) => {
  const cardData = {
    name: inputs["newCardFormImageTitleInput"],
    link: inputs["newCardFormImageLinkInput"],
  };
  section.addItem(cardData);
};

const popUpFormNewCard = new PopupWithForm(
  ".popup.popup_type_new-card",
  handleAddFormSubmitNewCard
);
popUpFormNewCard.setEventListeners();

// initialization of popUpWithForm - Profile ----------------------------->
const handleEditFormSubmit = (inputs) => {
  userInfo.setUserInfo({
    nameInput: inputs["profileFormNameInput"],
    jobInput: inputs["profileFormJobInput"],
  });
};

const popUpFormProfile = new PopupWithForm(
  ".popup.popup_type_edit-profile",
  handleEditFormSubmit
);
popUpFormProfile.setEventListeners();

// initialization of UserInfo ----------------------------->
const userInfo = new UserInfo({
  nameInput: profileName.textContent,
  jobInput: profileJob.textContent,
});

// initialization of Cards ----------------------------->
const renderer = (item) => {
  const card = new Card(item, cardTemplateElement, handleCardImageClick);
  return card.render();
};

const containerSelector = ".cards__grid";

const section = new Section(
  { items: initialCards, renderer: renderer },
  containerSelector
);

section.renderItems();
