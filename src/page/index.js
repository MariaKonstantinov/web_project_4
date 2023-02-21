// IMPORTS
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
  myToken,
} from "../utils/constants.js";

// ------------------------- API ----------------------------->
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  token: myToken,
});

// ---------------------- FUNCTIONS ------------------------------------------------>
/** Edit Popup function */
function handleEditButtonClick() {
  const { nameInput, jobInput } = userInfo.getUserInfo();
  nameInputField.value = nameInput;
  jobInputField.value = jobInput;
  popUpFormProfile.open();
}

/** Preview Image function */
function handleCardImageClick(cardData) {
  popUpImage.open(cardData);
}

/** function to open confirmDeletePopup */
function handleTrashButtonClick(card, target) {
  confirmDeletePopup.open(card, target);
}

// ---------------------- HANDLERS ------------------------------------------------>
editButton.addEventListener("click", handleEditButtonClick);
addButton.addEventListener("click", () => {
  popUpFormNewCard.open();
});

// ----------------------------- INITIALIZATION OF CLASSES ----------------------------->

// SECTION initialization of formValidator ----------------------------->
formList.forEach((formElement) => {
  // excluding cardDeleteForm popup as it doesn't require any validation
  if (formElement.name !== "cardDeleteForm") {
    const formValidator = new FormValidator(settings, formElement);
    formValidator.enableValidation();
  }
});

// SECTION initialization of popUpWithImage ----------------------------->
const popUpImage = new PopupWithImage(".popup_type_zoom-card");
popUpImage.setEventListeners();

// SECTION initialization of popUpWithForm - New Card ----------------------------->
const handleAddFormSubmitNewCard = (cardData) => {
  section.addItem(cardData);
};

// SECTION initialization of popUpWithForm - New Card ----------------------------->
// (adding a new card to server)
const popUpFormNewCard = new PopupWithForm(
  ".popup.popup_type_new-card",
  async (inputs) => {
    const response = await api.addCard(
      inputs.newCardFormImageTitleInput,
      inputs.newCardFormImageLinkInput
    );

    if (response) {
      const cardData = {
        name: response.name,
        link: response.link,
        _id: response._id,
        owner: { _id: myToken },
      };
      handleAddFormSubmitNewCard(cardData);
    }
  },
  "Creating..."
);
popUpFormNewCard.setEventListeners();

// SECTION initialization of popUpWithForm - Profile ----------------------------->
const handleEditFormSubmit = (inputs) => {
  userInfo.setUserInfo({
    nameInput: inputs["profileFormNameInput"],
    jobInput: inputs["profileFormJobInput"],
  });
};

const popUpFormProfile = new PopupWithForm(
  ".popup.popup_type_edit-profile",
  handleEditFormSubmit,
  "Saving..."
);
popUpFormProfile.setEventListeners();

// SECTION initialization of popUpWithForm - Change Picture ----------------------------->
const popUpFormChangeAvatar = new PopupWithForm(
  ".popup.popup_type_edit-avatar",
  (avatar) => {
    api.editAvatar(avatar.editAvatarFormImageLinkInput).then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
      popUpFormChangeAvatar.close();
    });
  }
);
avatar.addEventListener("click", () => {
  popUpFormChangeAvatar.open();
  formValidator.enableValidation();
});
popUpFormChangeAvatar.setEventListeners();

// SECTION initialization of UserInfo ----------------------------->
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  userAvatarSelector: ".profile__image",
});

// SECTION initialization of Cards -----------------------------> //TODO

const renderer = (item) => {
  // const isOwnedCard = item.owner._id === myToken;
  const card = new Card(
    item,
    cardTemplateElement,
    handleCardImageClick,
    handleTrashButtonClick,
    handleLikeButtonClick,
    userId
  );

  function handleLikeButtonClick(id) {
    const CardisLiked = card.isLiked();
    if (CardisLiked) {
      api
        .removeLike(id)
        .then((res) => {
          card.handleLikeCardClick(res.likes);
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    } else {
      api
        .likeCard(id)
        .then((res) => {
          card.handleLikeCard(res.likes);
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    }
  }

  return card.render();
};

// SECTION initialization of Section ----------------------------->
const section = new Section(renderer, containerSelector);

// SECTION initialization of popUpWithSubmit - Delete Card ----------------------------->
const confirmDeletePopup = new PopupWithSubmit(
  ".popup_type_delete-card",
  (card, target) => {
    api.deleteCard(card._id);
    target.remove();
    confirmDeletePopup.close();
  },
  "Deleting..."
);
confirmDeletePopup.setEventListeners();

// SECTION loading cards from server and after rendering them ----------------------------->
api.getInitialCards().then((initialCards) => {
  section.renderItems(initialCards);
});

// SECTION loading user data from server -----------------------------> // TODO
// for card likes func
let userId;
api.getUserData().then((userData) => {
  userId = userData._id;
  userInfo.setUserInfo({
    nameInput: userData.name,
    jobInput: userData.about,
  });
  userInfo.setUserAvatar(userData.avatar);
});
