import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  _popupImage = this._popup.querySelector('.card-open__image');
  _popupLabel = this._popup.querySelector('.card-open__label');

  open(imageLink, imageName) {
    this._popupImage.src = imageLink;
    this._popupImage.alt = imageName;
    this._popupLabel.textContent = imageName;

    super.open();
  }

}