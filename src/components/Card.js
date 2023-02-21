// Transforming the Card class: Connect the Card class to the popup. Make Card take the handleCardClick() function into the constructor.
// When the user clicks on the card, this function will open the popup with an image.
// adding an onImageClick() method to our constructor.

export class Card {
  constructor(
    cardData,
    cardTemplateElement,
    onImageClick,
    onTrashButtonClick,
    handleLikeButtonClick,
    userId
  ) {
    this._text = cardData.name;
    this._link = cardData.link;

    // ID
    this._id = cardData._id;
    this._userId = userId;
    // when we load data from server, there is a property "owner" which also contains an _id
    this._ownerId = cardData.owner._id;

    this._template = cardTemplateElement;
    this._onImageClick = onImageClick;
    this._onTrashButtonClick = onTrashButtonClick;

    // LIKES
    this._likes = cardData.likes;
    this._handleLikeButtonClick = handleLikeButtonClick;
  }

  // method to get card ID
  getId() {
    return this._id;
  }

  // card likes functionality
  isLiked() {
    return this._likes.some((user) => user._id === this._userId);
  }

  handleLikeCard = (newLikes) => {
    this._likes = newLikes;
    this._renderLikes();
  };

  _renderLikes() {
    this._likesCount.textContent = this._likes.length;
    if (this.isLiked()) {
      this._cardLikeButtonElement.classList.add("button_style_like-active");
    } else {
      this._cardLikeButtonElement.classList.remove("button_style_like-active");
    }
  }

  // EVENT LISTENERS ------------------------------------------------------------------>
  _addEventListeners() {
    const cardImageElement = this._cardElement.querySelector(".card__image");
    const cardTitleElement = this._cardElement.querySelector(".card__title");
    const cardLikeButtonElement =
      this._cardElement.querySelector(".button_style_like");
    const cardData = { name: this._text, link: this._link, _id: this._id };
    this._cardTrashButtonElement.addEventListener("click", (event) => {
      this._onTrashButtonClick(cardData, event.target.closest(".card"));
    });
    cardImageElement.src = this._link;
    cardImageElement.alt = this._text;
    cardTitleElement.textContent = this._text;

    // handlers ---------------------------------------------------------->
    cardLikeButtonElement.addEventListener(
      "click",
      this._handleLikeButtonClick(this._id)
    );

    cardImageElement.addEventListener("click", () =>
      this._onImageClick(cardData)
    );
  }

  render() {
    this._cardElement = this._template.content
      .querySelector(".card")
      .cloneNode(true);
    this._cardTrashButtonElement =
      this._cardElement.querySelector(".button_type_trash");
    this._addEventListeners();
    this._likesCount = this._cardElement.querySelector(".card__likes");
    this._renderLikes();

    // logic for trash button: if id doesn't match the owner id, make trash icon invisible
    if (!this._isOwnedCard) {
      this._cardTrashButtonElement.style.visibility = "hidden";
    }

    return this._cardElement;
  }
}
