// PopupWithImage is a child class of Popup. This class has to change the parent open() method.
// In the open() method of the PopupWithImage class, you need to add an image to the popup and the corresponding image src attribute along with a caption for the image.

// IMPORTS
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageZoom = document.querySelector(".popup__zoom-image");
    this._imageZoomTitle = document.querySelector(".popup__zoom-title");
  }

  open = ({ link, name }) => {
    super.open();

    this._imageZoom.src = link;
    this._imageZoom.alt = name;
    this._imageZoomTitle.textContent = name;
  };
}
