// PopupWithImage is a child class of Popup. This class has to change the parent open() method.
// In the open() method of the PopupWithImage class, you need to add an image to the popup and the corresponding image src attribute along with a caption for the image.

// IMPORTS
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = ({ link, name }) => {
    const imageZoom = document.querySelector(".popup__zoom-image");
    const imageZoomTitle = document.querySelector(".popup__zoom-title");

    imageZoom.src = link;
    imageZoom.alt = name;
    imageZoomTitle.textContent = name;

    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  };
}
