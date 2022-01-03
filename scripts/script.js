/* Popup Form - Edit Profile*/

const editButton = document.querySelector(".button_type_edit");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".button_type_close");
const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_type_name");
const profileJob = document.querySelector(".profile__job");
const jobInput = document.querySelector(".popup__input_type_job");

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleEditButtonClick() {
  //   console.log("Edit button is clicked");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup();
}

function handleEditFormSubmit(event) {
  //   console.log("Submit button is clicked");
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener("click", handleEditButtonClick);
popup.addEventListener("submit", handleEditFormSubmit);
closeButton.addEventListener("click", () => closePopup());

