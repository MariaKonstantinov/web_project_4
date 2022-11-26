import "./validation.js";
import { toggleButtonToDisabledState, configObject } from "./validation.js";

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

/** Utility functions and variables -------------------------------------------- */
// Function to close opened popup on Escape
function closeWithEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// Function to close opened popup on click
function closePopupByOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

/** Function to Open Popup with closeWithEsc and OverlayClick enabled */
function openPopup(popupForm) {
  popupForm.classList.add("popup_opened");
  document.addEventListener("keydown", closeWithEsc);
  popupForm.addEventListener("mousedown", closePopupByOverlayClick);
}

/** Function to Close Popup with closeWithEsc and OverlayClick enabled */
function closePopup(popupForm) {
  popupForm.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeWithEsc);
  popupForm.removeEventListener("mousedown", closePopupByOverlayClick);
}

/** Utility Variables */
const cardsListElement = document.querySelector(".cards__grid");
const cardTemplateElement = document.querySelector("#card-template");

/** Enable Close Button to Close All Popups by Pressing Close Button and Escape Button*/
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".button_type_close");
  closeButton.addEventListener("click", () => closePopup(popup));
});

/** Function to Reset Popup Form Fields After Form Submission */
function resetPopupForm(popup) {
  const popupFormElement = popup.querySelector(".popup__form");
  popupFormElement.reset();
}

/** Popup - Edit Profile -------------------------------------------- */
const editButton = document.querySelector(".button_type_edit");
const popupProfile = document.querySelector(".popup.popup_type_edit-profile");
const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_type_name");
const profileJob = document.querySelector(".profile__job");
const jobInput = document.querySelector(".popup__input_type_job");

/** Function to fill the Edit Profile popup inputs */
function fillEditProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

/** Handlers definition */
function handleEditButtonClick() {
  fillEditProfileForm();
  openPopup(popupProfile);
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

/** Attach handlers */
editButton.addEventListener("click", handleEditButtonClick);
popupProfile.addEventListener("submit", handleEditFormSubmit);

/** Popup - New Card ---------------------------------------------- */
const addButton = document.querySelector(".button_type_add");
const popupNewPlace = document.querySelector(".popup.popup_type_new-card");
const imageTitleInput = document.querySelector(
  ".popup__input_type_image-title"
);
const imageLinkInput = document.querySelector(".popup__input_type_image-link");

function handleAddButtonClick() {
  toggleButtonToDisabledState(submitButton, configObject);
  resetPopupForm(popupNewPlace);
  openPopup(popupNewPlace);
}

const submitButton = popupNewPlace.querySelector(".button_type_submit");
function handleAddFormSubmit(event) {
  event.preventDefault();
  const newCard = { name: imageTitleInput.value, link: imageLinkInput.value };
  cardsListElement.prepend(createCard(newCard));
  closePopup(popupNewPlace);
}

/** Attach handlers */
addButton.addEventListener("click", handleAddButtonClick);
popupNewPlace.addEventListener("submit", handleAddFormSubmit);

/** Popup - Zoom Image -------------------------------------------- */
const popUpImageZoom = document.querySelector(".popup_type_zoom-card");
const imageZoom = document.querySelector(".popup__zoom-image");
const imageZoomTitle = document.querySelector(".popup__zoom-title");

function handleCardImageClick(event) {
  imageZoom.src = event.target.src;
  imageZoom.alt = event.target.alt;
  imageZoomTitle.textContent = event.target.alt;
  openPopup(popUpImageZoom);
}

/** Create and Initialize a New Card Object ------------------------ */
function createCard(card) {
  /** Function to Delete a Card */
  function handleTrashButtonClick(event) {
    event.target.closest(".card").remove();
  }

  /** Function to Change Heart Icon to Black Color */
  function handleLikeButtonClick(event) {
    event.target.classList.toggle("button_style_like-active");
  }

  const cardElement = cardTemplateElement.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitleElement = cardElement.querySelector(".card__title");
  cardTitleElement.textContent = card.name;

  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.src = card.link;
  cardImageElement.alt = card.name;

  /** Attach handlers */
  const cardLikeButtonElement = cardElement.querySelector(".button_style_like");
  cardLikeButtonElement.addEventListener("click", handleLikeButtonClick);

  const cardTrashButtonElement =
    cardElement.querySelector(".button_type_trash");
  cardTrashButtonElement.addEventListener("click", handleTrashButtonClick);

  cardImageElement.addEventListener("click", handleCardImageClick);

  return cardElement;
}

/** Function to Display All Cards */
function renderInitialCards() {
  initialCards.forEach((card) => cardsListElement.prepend(createCard(card)));
}

renderInitialCards();
