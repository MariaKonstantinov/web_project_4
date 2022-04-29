/* Six Cards - Links */
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

/* General functions */
function openPopup(popupForm) {
  popupForm.classList.add("popup_opened");
}

function closePopup(popupForm) {
  popupForm.classList.remove("popup_opened");
}

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  closeButton = popup.querySelector(".button_type_close");
  closeButton.addEventListener("click", () => closePopup(popup));
});

/* Popup Form - Edit Profile */
const editButton = document.querySelector(".button_type_edit");
const popupProfile = document.querySelector(".popup.popup_type_profile");
const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_type_name");
const profileJob = document.querySelector(".profile__job");
const jobInput = document.querySelector(".popup__input_type_job");

function handleEditButtonClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

editButton.addEventListener("click", handleEditButtonClick);
popupProfile.addEventListener("submit", handleEditFormSubmit);

/*Card Elements Selection*/
const cardTemplateElement = document.querySelector("#card-template");
const cardsListElement = document.querySelector(".cards__grid");

function createCard(card) {
  const cardElement = cardTemplateElement.content
    .querySelector(".cards__card")
    .cloneNode(true);
  const cardImageElement = cardElement.querySelector(".cards__image");
  const cardTitleElement = cardElement.querySelector(".cards__title");

  cardTitleElement.textContent = card.name;
  cardImageElement.src = card.link;
  cardImageElement.alt = card.name;

  return cardElement;
}

initialCards.forEach((card) => cardsListElement.prepend(createCard(card)));
