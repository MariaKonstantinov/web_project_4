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

  // BUG method to preview (zoom) a card
  // _handleCardImageClick(event) {
  //   imageZoom.src = this._target.src;
  //   imageZoom.alt = this._target.alt;
  //   imageZoomTitle.textContent = this._target.alt;
  //   openPopup(popUpImageZoom);
  // }

  // EVENT LISTENERS
  _addEventListeners() {
    const cardLikeButtonElement =
      this._cardElement.querySelector(".button_style_like");
    const cardTrashButtonElement =
      this._cardElement.querySelector(".button_type_trash");
    const cardImageElement = this._cardElement.querySelector(".card__image");
    const cardTitleElement = this._cardElement.querySelector(".card__title");

    cardImageElement.src = this._link;
    cardImageElement.alt = this._text;
    cardTitleElement.textContent = this._text;

    // handlers
    cardLikeButtonElement.addEventListener(
      "click",
      this._handleLikeButtonClick
    );
    cardTrashButtonElement.addEventListener(
      "click",
      this._handleTrashButtonClick
    );
    // cardImageElement.addEventListener("click", this._handleCardImageClick);
  }

  // public method to display card
  render(handleCardImageClick) {
    this._cardElement = this._template.content
      .querySelector(".card")
      .cloneNode(true);

    this._addEventListeners();

    const cardImageElement = this._cardElement.querySelector(".card__image");
    const cardData = { name: this._text, link: this._link };
    cardImageElement.addEventListener("click", () =>
      handleCardImageClick(cardData)
    );

    return this._cardElement;
  }
}
