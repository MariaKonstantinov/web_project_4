/* Six Cards - Links */
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
]; 

/* General functions */
function openPopup(popupForm) {
  popupForm.classList.add("popup_opened");
}

function closePopup(popupForm) {
  popupForm.classList.remove("popup_opened");
}


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


/* Popup Form - New Card */
const addButton = document.querySelector(".button_type_add");
const popupNewPlace = document.querySelector(".popup.popup_type_new-card");
const imageTitleInput = document.querySelector(".popup__input_type_image-title");
const imageLinkInput = document.querySelector(".popup__input_type_image-link");

function handleAddButtonClick() {
  imageTitleInput.value = ""
  imageLinkInput.value = ""
  openPopup(popupNewPlace);
}

/* Function to Add a New Card before existing ones */
function handleAddFormCreate(event) {
  event.preventDefault();
  const newCard = {name: imageTitleInput.value, link: imageLinkInput.value};
  renderCard(newCard);
  closePopup(popupNewPlace);
}

addButton.addEventListener("click", handleAddButtonClick);
popupNewPlace.addEventListener("submit", handleAddFormCreate);


/* Popups Forms - Close Button Function */
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  closeButton = popup.querySelector(".button_type_close");
  closeButton.addEventListener("click", () => closePopup(popup));
})


/*Card Elements Selection*/
const cardTemplateElement = document.querySelector("#card-template");
const cardsListElement = document.querySelector(".cards__grid");

function createCard (card) {

  const cardElement = cardTemplateElement.content.querySelector(".cards__card").cloneNode(true);
  const cardImageElement = cardElement.querySelector(".cards__image");
  const cardTitleElement = cardElement.querySelector(".cards__title");
  const cardLikeButtonElement = cardElement.querySelector(".button_style_like");
  const cardTrashButtonElement = cardElement.querySelector(".button_type_trash");

  cardTitleElement.textContent = card.name;
  cardImageElement.src = card.link;
  cardImageElement.alt = card.name;

  cardLikeButtonElement.addEventListener('click', handleLikeButtonClick);
  cardTrashButtonElement.addEventListener('click', handleTrashButtonClick);
  cardImageElement.addEventListener('click', handleCardImageClick);

  return cardElement;
}


/*Function to Preview Image*/
const popUpImageZoom = document.querySelector(".popup_type_zoom-card");
const imageZoom = document.querySelector(".popup__zoom_image");
const imageZoomTitle = document.querySelector(".popup__zoom_title");

function handleCardImageClick (event) {
  imageZoom.src = event.target.src;
  imageZoom.alt = event.target.alt;
  imageZoomTitle.textContent = event.target.alt;
  openPopup(popUpImageZoom);
}


/*Function to Place a New Card Before All Existing Cards*/
function renderCard (card) {
  cardsListElement.prepend(createCard(card));
}


/*Function to Display All Cards*/
function renderInitialCards () {
  initialCards.forEach(card => renderCard(card));
}


/*Function to Change Heart Icon to Black Color*/
function handleLikeButtonClick (event) {
  event.target.classList.toggle("button_active");
}


/*Function to Delete a Card*/
function handleTrashButtonClick (event) {
  event.target.closest(".cards__card").remove();
}


renderInitialCards();

