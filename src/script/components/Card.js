export default class Card {
  constructor({ data, userId, cardSelector, handleCardClick, handleLikeButtonClick, handleRemoveButtonClick }) {
    this._currentUserId = userId;
    this._isUserCard = userId === data.owner._id;
    this._imageLink = data.link;
    this._imageName = data.name;
    this._name = data.name;
    this._countLikes = data.likes.length;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleRemoveButtonClick = handleRemoveButtonClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeButtonClick(evt);
    });
    if (this._isUserCard) {
      this._cardElement.querySelector('.element__delite').addEventListener('click', (evt) => {
        this._handleRemoveButtonClick(evt);
      });
    }
    this._cardsElementImage.addEventListener('click', () => this._handleCardClick());
  }

  _getTemplateElement() {
    console.log(this._cardSelector);
    return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
  }

  getCardId() {
    return this._cardId;
  };

  createCard() {
    this._cardElement = this._getTemplateElement();
    this._likeButton = this._cardElement.querySelector('.element__button');
    if (!this._isUserCard) {
      this._cardElement.querySelector('.element__delite').remove();
    }
    this._cardsElementImage = this._cardElement.querySelector('.element__place-photo');

    this._cardsElementImage.src = this._imageLink;
    this._cardsElementImage.alt = this._imageName;
    this._countLikeElement = this._cardElement.querySelector('.element__counter');
    this._cardElement.querySelector('.element__place-name').textContent = this._name;
    this._countLikeElement.textContent = this._countLikes;
    this._setEventListeners();

    return this._cardElement;
  }

  setLikeCount(likeCount) {
    this._countLikeElement.textContent = likeCount;
    this._likeButton.classList.toggle('element__btn-like_active');
  }

  isLiked() {
    return this._likeButton.classList.contains('element__btn-like_active');
  }
}
