// IMPORTS
// JS CLASSES IMPORTS
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "../page/index.css";

// JS CONSTS IMPORTS FROM CONSTANTS.JS
import {
  initialCards,
  settings,
  cardTemplateElement,
  editButton,
  profileName,
  nameInputField,
  profileJob,
  jobInputField,
  addButton,
  imageZoom,
  imageZoomTitle,
  containerSelector,
  formList,
} from "../utils/constants.js";

/** Edit Popup function */
function handleEditButtonClick() {
  const { nameInput, jobInput } = userInfo.getUserInfo();
  nameInputField.value = nameInput;
  jobInputField.value = jobInput;
  popUpFormProfile.open();
}

/** Attach handlers */
editButton.addEventListener("click", handleEditButtonClick);

// function to preview image card
function handleCardImageClick(cardData) {
  popUpImage.open(cardData);
}

/** Attach handlers */
addButton.addEventListener("click", () => {
  popUpFormNewCard.open();
});

// INITIALIZATION OF CLASSES
// initialization of formValidator ----------------------------->

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
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

// initialization of Cards ----------------------------->
const renderer = (item) => {
  const card = new Card(item, cardTemplateElement, handleCardImageClick);
  return card.render();
};

// const containerSelector = ".cards__grid";

const section = new Section(
  { items: initialCards, renderer: renderer },
  containerSelector
);

section.renderItems();
