let editButton = document.querySelector(".button_type_edit");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".button_type_close");
let profileName = document.querySelector(".profile__name");
let nameInput = document.querySelector(".popup__input_type_name");
let profileJob = document.querySelector(".profile__job");
let jobInput = document.querySelector(".popup__input_type_job");

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

function handleCloseButtonClick() {
  //   console.log("Close button is clicked");
  closePopup(popup);
}

editButton.addEventListener("click", handleEditButtonClick);
popup.addEventListener("submit", handleEditFormSubmit);
closeButton.addEventListener("click", handleCloseButtonClick);
