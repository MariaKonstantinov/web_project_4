// IMPORTS
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

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

/** SECTION ----------------------- POPUP - EDIT PROFILE ---------------------------------------- */
// EDIT PROFILE POPUP CONSTS
const editButton = document.querySelector(".button_type_edit");
const popupProfile = document.querySelector(".popup.popup_type_edit-profile");
const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_type_name");
const profileJob = document.querySelector(".profile__job");
const jobInput = document.querySelector(".popup__input_type_job");

// selecting submit button on EDIT PROFILE POPUP
const editPopup = document.querySelector(".popup_type_edit-profile");
const editPopupSubmitButton = editPopup.querySelector(
  settings.submitButtonSelector
);

/** Function to fill the Edit Profile popup inputs -----------------------------> */
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

/** SECTION ----------------------- POPUP - NEW CARD ---------------------------------------------- */
// NEW CARD POPUP CONSTS
const addButton = document.querySelector(".button_type_add");
const popupNewPlace = document.querySelector(".popup.popup_type_new-card");
const imageTitleInput = document.querySelector(
  ".popup__input_type_image-title"
);
const imageLinkInput = document.querySelector(".popup__input_type_image-link");
const submitButton = popupNewPlace.querySelector(".button_type_submit");
const popUpImageZoom = document.querySelector(".popup_type_zoom-card");
const imageZoom = document.querySelector(".popup__zoom-image");
const imageZoomTitle = document.querySelector(".popup__zoom-title");

// selecting submit button on ADD CARD POPUP
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardPopupSubmitButton = addCardPopup.querySelector(
  settings.submitButtonSelector
);

// POPUP Submit Button functionality
function handleAddButtonClick() {
  // selecting submit button on ADD CARD POPUP
  addCardPopupSubmitButton.classList.add(settings.inactiveButtonClass);
  addCardPopupSubmitButton.disabled = true;

  // selecting submit button on EDIT PROFILE POPUP
  editPopupSubmitButton.classList.add(settings.inactiveButtonClass);
  editPopupSubmitButton.disabled = true;

  resetPopupForm(popupNewPlace);
  openPopup(popupNewPlace);
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  const newCard = { name: imageTitleInput.value, link: imageLinkInput.value };
  cardsListElement.prepend(createCard(newCard));
  closePopup(popupNewPlace);
}

/** Attach handlers */
addButton.addEventListener("click", handleAddButtonClick);
popupNewPlace.addEventListener("submit", handleAddFormSubmit);

// ------------------------------------------------>

/** TODO Popup - Zoom Image -------------------------------------------- */
// function handleCardImageClick(event) {
//   imageZoom.src = event.target.src;
//   imageZoom.alt = event.target.alt;
//   imageZoomTitle.textContent = event.target.alt;
//   openPopup(popUpImageZoom);
// } // done

/** Create and Initialize a New Card Object ------------------------ */
// function createCard(card) {
//   /** TODO Function to Delete a Card */
//   function handleTrashButtonClick(event) {
//     event.target.closest(".card").remove();
//   } // done

/** TODO Function to Change Heart Icon to Black Color - "like" */
// function handleLikeButtonClick(event) {
//   event.target.classList.toggle("button_style_like-active");
// } // done

//   const cardElement = cardTemplateElement.content // done
//     .querySelector(".card") // done
//     .cloneNode(true); // done

//   const cardTitleElement = cardElement.querySelector(".card__title");
//   cardTitleElement.textContent = card.name;

//   const cardImageElement = cardElement.querySelector(".card__image"); // done
//   cardImageElement.src = card.link; // done
//   cardImageElement.alt = card.name; // done

//   /** Attach handlers with callback functions */
//   const cardLikeButtonElement = cardElement.querySelector(".button_style_like"); // done
//   cardLikeButtonElement.addEventListener("click", handleLikeButtonClick); //done

//   const cardTrashButtonElement =
//     cardElement.querySelector(".button_type_trash"); // done
//   cardTrashButtonElement.addEventListener("click", handleTrashButtonClick); //done

//   cardImageElement.addEventListener("click", handleCardImageClick); // done

//   return cardElement; // done
// }

/** Function to Display All Cards */
// function renderInitialCards() {
//   initialCards.forEach((card) => cardsListElement.prepend(createCard(card)));
// }

// renderInitialCards();

// SECTION creating a new formValidator class instance ----------------------------->

const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(settings, formElement);

  // we have all our methods and properties accessed after dot, but we can only use a public method here which is enableValidation
  formValidator.enableValidation();
});

// SECTION creating a new Card class instance ----------------------------->
function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const card = new Card(cardData, cardTemplateElement);
    cardsListElement.prepend(createCard(card.render()));
  });
}
