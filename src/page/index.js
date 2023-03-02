// ----------------------------- JS CLASSES IMPORTS ---------------------->
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "../page/index.css";
import { Api } from "../utils/api.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";

// ----------------------- JS CONSTS IMPORTS FROM CONSTANTS.JS ---------------------->
import {
  settings,
  cardTemplateElement,
  editButton,
  avatar,
  nameInputField,
  jobInputField,
  addButton,
  containerSelector,
  formList,
} from "../utils/constants.js";

// ------------------------- API ----------------------------->
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "7d6faf2c-0a1b-4234-a80e-36eb1914e77c",
    "Content-Type": "application/json",
  },
});

// SECTION -------------------------- FORM VALIDATOR OBJECT ----------------------------->
const formValidators = {};

// enable validation
const enableValidation = (settings) => {
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    // getting the name of the form
    const formName = formElement.getAttribute("name");

    // storing validator by the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(settings);

// SECTION  ---------------------------- POPUP TYPE: POPUP IMAGE ----------------------------->
function handleCardImageClick(cardData) {
  popUpImage.open(cardData);
}

const popUpImage = new PopupWithImage(".popup_type_zoom-card");
popUpImage.setEventListeners();

// SECTION ---------------------------- POPUP TYPE: POPUP FORM NEW CARD ----------------------------->
const handleAddFormSubmitNewCard = (cardData) => {
  section.addItem(cardData);
};

editButton.addEventListener("click", handleEditButtonClick);
addButton.addEventListener("click", () => {
  formValidators["newCardAddForm"].disableButton();
  popUpFormNewCard.open();
});

const popUpFormNewCard = new PopupWithForm(
  ".popup.popup_type_new-card",
  (inputs) => {
    api
      .addCard(
        inputs.newCardFormImageTitleInput,
        inputs.newCardFormImageLinkInput
      )
      .then((res) => {
        const cardData = {
          name: res.name,
          link: res.link,
          _id: res._id,
          owner: { _id: res.owner._id },
        };
        handleAddFormSubmitNewCard(cardData);
        popUpFormNewCard.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        popUpFormNewCard.changeButtonText("Create");
        formValidators["newCardAddForm"].enableButton();
      });
  },
  "Creating..."
);
popUpFormNewCard.setEventListeners();

// SECTION -------------------------- POPUP TYPE: POPUP FORM PROFILE ----------------------------->
function handleEditButtonClick() {
  const { nameInput, jobInput } = userInfo.getUserInfo();
  nameInputField.value = nameInput;
  jobInputField.value = jobInput;

  formValidators["profileEditForm"].resetValidation();
  formValidators["profileEditForm"].disableButton();
  popUpFormProfile.open();
}

const popUpFormProfile = new PopupWithForm(
  ".popup.popup_type_edit-profile",
  (inputs) => {
    api
      .editUserData(
        inputs["profileFormNameInput"],
        inputs["profileFormJobInput"]
      )
      .then((userData) => {
        userInfo.setUserInfo({
          nameInput: userData.name,
          jobInput: userData.about,
        });
        popUpFormProfile.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        popUpFormProfile.changeButtonText("Save");
        formValidators["profileEditForm"].enableButton();
      });
  },
  "Saving..."
);
popUpFormProfile.setEventListeners();

// SECTION ------------------------ POPUP TYPE: POPUP FORM CHANGE AVATAR ------------------------>

const popUpFormChangeAvatar = new PopupWithForm(
  ".popup.popup_type_edit-avatar",
  (avatar) => {
    api
      .editAvatar(avatar.editAvatarFormImageLinkInput)
      .then((userData) => {
        userInfo.setUserAvatar(userData.avatar);
        popUpFormChangeAvatar.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        popUpFormChangeAvatar.changeButtonText("Save");
        formValidators["profileAvatarEditForm"].enableButton();
      });
  },
  "Saving..."
);
avatar.addEventListener("click", () => {
  popUpFormChangeAvatar.open();
});
popUpFormChangeAvatar.setEventListeners();

// SECTION ------------------------- INITIALIZING USER INFO ----------------------------->
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  userAvatarSelector: ".profile__image",
});

// SECTION ---------------------------- LIKE CARD FUNCTIONALITY ----------------------------->
function handleLikeButtonClick(card) {
  const cardIsLiked = card.isLiked();
  if (cardIsLiked) {
    api
      .removeLike(card.getId())
      .then((res) => {
        card.handleLikeCard(res.likes);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  } else {
    api
      .likeCard(card.getId())
      .then((res) => {
        card.handleLikeCard(res.likes);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
}
const renderer = (item) => {
  const card = new Card(
    item,
    cardTemplateElement,
    handleCardImageClick,
    handleTrashButtonClick,
    handleLikeButtonClick,
    userId
  );

  return card.render();
};

// SECTION ----------------------------- POPUP TYPE: CONFIRM DELETE POPUP ----------------------------->
/** POPUP: CONFIRM DELETE POPUP */
function handleTrashButtonClick(card, target) {
  confirmDeletePopup.open(card, target);
}

const confirmDeletePopup = new PopupWithSubmit(
  ".popup_type_delete-card",
  (card, target) => {
    api
      .deleteCard(card._id)
      .then(() => {
        target.remove();
        confirmDeletePopup.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        confirmDeletePopup.changeButtonText("Yes");
        formValidators["cardDeleteForm"].enableButton();
      });
  },
  "Deleting..."
);
confirmDeletePopup.setEventListeners();

/* -------------------- GET INITIAL DATA FROM SERVER -------------------------------------------------- */
const section = new Section(renderer, containerSelector);

// loading cards and user information from server and rendering it
let userId;
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      nameInput: userData.name,
      jobInput: userData.about,
    });
    userInfo.setUserAvatar(userData.avatar);
    section.renderItems(cardData);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
