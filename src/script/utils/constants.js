export const validationConfig = {
  fieldsetSelector: '.popup__set',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

export const profilePopup = document.querySelector('.profile-popup');
export const popupAddCard = document.querySelector('.add-popup');
export const avatarPopup = document.querySelector('.avatar-popup');

export const profileAvatarEditButton = '.profile__avatar-button';
export const profileAvatarSelector = '.profile__avatar';
export const profileElement = document.querySelector('.profile');
export const profileNameSelector = '.profile__name';
export const profileActivitySelector = '.profile__activity';
export const profileEditButton = profileElement.querySelector('.profile__edit-button');
export const addCardButton = profileElement.querySelector('.profile__add-button');

export const popupProfileSelector = '.profile-popup';
export const popupNewPlaceSelector = '.add-popup';
export const popupViewerSelector = '.card-open';
export const popupConfirmSelector = '.confirm-popup';
export const popupUpdateAvatarSelector = '.avatar-popup';

export const cardsContainerSelector = '.elements';
export const cardSelector = '#element-template';