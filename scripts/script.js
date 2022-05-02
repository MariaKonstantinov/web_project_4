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
