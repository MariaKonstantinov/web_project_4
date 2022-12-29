// Transforming the Card class: Connect the Card class to the popup. Make Card take the handleCardClick() function into the constructor.
// When the user clicks on the card, this function will open the popup with an image.
// adding an onImageClick() method to our constructor.

export class Card {
  constructor(cardData, cardTemplateElement, onImageClick) {
    this._text = cardData.name;
    this._link = cardData.link;

    this._template = cardTemplateElement;

    this._onImageClick = onImageClick;
  }

  // method to "like" a card
  _handleLikeButtonClick(event) {
    event.target.classList.toggle("button_style_like-active");
  }

  // method to delete a card
  _handleTrashButtonClick(event) {
    event.target.closest(".card").remove();
  }

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
    const cardData = { name: this._text, link: this._link };
    cardImageElement.addEventListener("click", () =>
      this._onImageClick(cardData)
    );
  }

  render() {
    this._cardElement = this._template.content
      .querySelector(".card")
      .cloneNode(true);

    this._addEventListeners();

    return this._cardElement;
  }
}
