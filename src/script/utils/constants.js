export const elementTemplate = document.querySelector('#element-template').content;

/*POPUPы*/
export const profilePopup = document.querySelector('.profile-popup');
export const popupAddCard = document.querySelector('.add-popup');

/*Кнопки*/
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');

export const cardsContainerSelector = '.elements';
export const cardPopup = document.querySelector('.card-open');
export const cardPopupImage = cardPopup.querySelector('.card-open__image');
export const cardPopupLabel = cardPopup.querySelector('.card-open__label');

//SELECTORS

export const profilePopupSelector = '.profile-popup';
export const popupAddCardSelector = '.add-popup'

export const imageSelector = '.element__place-photo';

export const profileNameSelector = '.profile__name';
export const profileActivitySelector = '.profile__activity';

export const validationConfig = {
  fieldsetSelector: '.popup__set',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

