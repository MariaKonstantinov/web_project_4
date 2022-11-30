export class Card {
  constructor(cardData, cardTemplateElement) {
    this._text = cardData.name;
    this._link = cardData.link;

    this._template = cardTemplateElement;
  }

  // method to "like" a card
  _handleLikeButtonClick(event) {
    event.target.classList.toggle("button_style_like-active");
  }

  // method to delete a card
  _handleTrashButtonClick(event) {
    event.target.closest(".card").remove();
  }

  // method to preview (zoom) a card
  _handleCardImageClick(event) {
    imageZoom.src = event.target.src;
    imageZoom.alt = event.target.alt;
    imageZoomTitle.textContent = event.target.alt;
    openPopup(popUpImageZoom);
  }

  // EVENT LISTENERS
  _addEventListeners() {
    const cardLikeButtonElement =
      this._cardElement.querySelector(".button_style_like");
    const cardTrashButtonElement =
      this._cardElement.querySelector(".button_type_trash");
    const cardImageElement = this._cardElement.querySelector(".card__image");

    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;

    // handlers
    cardLikeButtonElement.addEventListener(
      "click",
      this._handleLikeButtonClick
    );
    cardTrashButtonElement.addEventListener(
      "click",
      this._handleTrashButtonClick
    );
    cardImageElement.addEventListener("click", this._handleCardImageClick);
  }

  // public method to display card
  render() {
    this._cardElement = cardTemplateElement.textContent
      .querySelector(".card")
      .cloneNode(true);

    this._addEventListeners();

    return this._cardElement;
  }
}
