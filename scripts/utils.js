/** internal utility functions and variables -------------------------------------------- */
// Function to close opened popup on Escape
function closeWithEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//  Function to close opened popup on click
function closePopupByOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

// export functions to open/close popup forms as we may use it externally
/** Function to Open Popup with closeWithEsc and OverlayClick enabled */
export function openPopup(popupForm) {
  popupForm.classList.add("popup_opened");
  document.addEventListener("keydown", closeWithEsc);
  popupForm.addEventListener("mousedown", closePopupByOverlayClick);
}

/**  Function to Close Popup with closeWithEsc and OverlayClick enabled */
export function closePopup(popupForm) {
  popupForm.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeWithEsc);
  popupForm.removeEventListener("mousedown", closePopupByOverlayClick);
}
