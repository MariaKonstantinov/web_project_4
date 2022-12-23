// IMPORTS
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";

// The index.js file must contain only the code for creating class instances and adding specific event listeners, and all such code should only be placed in index.js.

/** Six Cards - Links */
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

/** CARD GRID / CARD TEMPLATE CONSTS ---------------------------------------------> */
// const cardsListElement = document.querySelector(".cards__grid");
const cardTemplateElement = document.querySelector("#card-template");

/** TODO Enable Close Button to Close All Popups by Pressing Close Button and Escape Button - DONE ?? */
// const popups = document.querySelectorAll(".popup");
// popups.forEach((popup) => {
//   const closeButton = popup.querySelector(".button_type_close");
//   closeButton.addEventListener("click", () => closePopup(popup));
// });

/** Function to Reset Popup Form Fields After Form Submission */
// function resetPopupForm(popup) {
//   const popupFormElement = popup.querySelector(".popup__form");
//   popupFormElement.reset();
// }

/** SECTION ----------------------- POPUP - EDIT PROFILE ---------------------------------------- */
// EDIT PROFILE POPUP CONSTS
const editButton = document.querySelector(".button_type_edit");
// const popupProfile = document.querySelector(".popup.popup_type_edit-profile");
const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_type_name");
const profileJob = document.querySelector(".profile__job");
const jobInput = document.querySelector(".popup__input_type_job");

/** Function to fill the Edit Profile popup inputs -----------------------------> */
function fillEditProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

/** Handlers definition */
function handleEditButtonClick() {
  fillEditProfileForm();
  popUpFormProfile.open();
  // openPopup(popupProfile);
}

// function handleEditFormSubmit(event) {
//   event.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup(popupProfile);
// }

/** Attach handlers */
editButton.addEventListener("click", handleEditButtonClick);
// popupProfile.addEventListener("submit", handleEditFormSubmit);

/** SECTION ----------------------- POPUP - NEW CARD ---------------------------------------------- */
// NEW CARD POPUP CONSTS
const addButton = document.querySelector(".button_type_add");
// const popupNewPlace = document.querySelector(".popup.popup_type_new-card");
// const imageTitleInput = document.querySelector(
//   ".popup__input_type_image-title"
// );
// const imageLinkInput = document.querySelector(".popup__input_type_image-link");

/** SECTION ----------------------- POPUP - ZOOM IMAGE ---------------------------------------------- */
// ZOOM IMAGE POPUP CONSTS
// const popUpImageZoom = document.querySelector(".popup_type_zoom-card");
const imageZoom = document.querySelector(".popup__zoom-image");
const imageZoomTitle = document.querySelector(".popup__zoom-title");

// POPUP Submit Button functionality
function handleAddButtonClick() {
  // resetPopupForm(popupNewPlace);
  popUpFormNewCard.open();
  // openPopup(popupNewPlace);
}

// function to create a new card
// function handleAddFormSubmit(event) {
//   event.preventDefault();
//   const cardData = { name: imageTitleInput.value, link: imageLinkInput.value };
//   const card = new Card(cardData, cardTemplateElement);
//   cardsListElement.prepend(card.render(handleCardImageClick));
//   closePopup(popupNewPlace);
// }

// function to preview image card TODO in PopupWithImage
function handleCardImageClick(cardData) {
  imageZoom.src = cardData.link;
  imageZoom.alt = cardData.name;
  imageZoomTitle.textContent = cardData.name;

  popUpImage.open(cardData);
  // openPopup(popUpImageZoom);
}

/** Attach handlers */
addButton.addEventListener("click", handleAddButtonClick);
// popupNewPlace.addEventListener("submit", handleAddFormSubmit);

// SECTION creating a new formValidator class instance ----------------------------->

const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(settings, formElement);

  // we have all our methods and properties accessed after dot, but we can only use a public method here which is enableValidation
  formValidator.enableValidation();
});

// SECTION creating a new Card class instance ----------------------------->

// TODO add 3d parameter: imagePopup.open
// function renderInitialCards() {
//   initialCards.forEach((cardData) => {
//     const card = new Card(cardData, cardTemplateElement);
//     cardsListElement.prepend(card.render(handleCardImageClick));
//   });
// }

// renderInitialCards();

// initialization of popUpWithImage
const popUpImage = new PopupWithImage(".popup_type_zoom-card");
popUpImage.setEventListeners();

// initialization of Cards
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

// initialization of popUpWithForm - New Card
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

// initialization of popUpWithForm - Profile
const handleEditFormSubmit = (inputs) => {
  // const profileName = document.querySelector(".profile__name");
  // const profileJob = document.querySelector(".profile__job");
  profileName.textContent = inputs["profileFormNameInput"];
  profileJob.textContent = inputs["profileFormJobInput"];
};

const popUpFormProfile = new PopupWithForm(
  ".popup.popup_type_edit-profile",
  handleEditFormSubmit
);
popUpFormProfile.setEventListeners();
