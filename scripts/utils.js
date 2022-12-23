/** internal utility functions and variables -------------------------------------------- */
// TODO Function to close opened popup on Escape - DONE
// function closeWithEsc(event) {
//   if (event.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

//  TODO Function to close opened popup on click - PLACE INTO POPUP.JS
// function closePopupByOverlayClick(event) {
//   if (event.target === event.currentTarget) {
//     closePopup(event.target);
//   }
// }

// export functions to open/close popup forms as we may use it externally
/** TODO Function to Open Popup with closeWithEsc and OverlayClick enabled -  DONE */
// export function openPopup(popupForm) {
//   popupForm.classList.add("popup_opened");
//   document.addEventListener("keydown", closeWithEsc);
//   popupForm.addEventListener("mousedown", closePopupByOverlayClick);
// }

/**  TODO Function to Close Popup with closeWithEsc and OverlayClick enabled  - DONE */
// export function closePopup(popupForm) {
//   popupForm.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeWithEsc);
//   popupForm.removeEventListener("mousedown", closePopupByOverlayClick);
// }
