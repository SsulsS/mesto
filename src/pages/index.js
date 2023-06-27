import '../pages/index.css';

import {
  profilePopup,
  popupAddCard,
  elementTemplate,
  profileEditButton,
  profileAddButton,
  cardsContainerSelector,
  cardPopup,
  cardPopupImage,
  cardPopupLabel,
  profilePopupSelector,
  popupAddCardSelector,
  imageSelector,
  profileNameSelector,
  profileActivitySelector,
  initialCards,
} from '../script/utils/constants.js';
import Card from "../script/components/Card.js";
import FormValid from "../script/components/FormValidator.js";
import UserInfo from "../script/components/UserInfo.js";
import Section from "../script/components/Section.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import PopupWithImage from "../script/components/PopupWithImage.js";

const  validProfilePopup = new FormValid({
  formSelector: profilePopup,
  fieldsetSelector: '.popup__set',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
});
validProfilePopup.enableValidation();

const  validPopupAddCard = new FormValid({
  formSelector: popupAddCard,
  fieldsetSelector: '.popup__set',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
});
validPopupAddCard.enableValidation();

const userInfo = new UserInfo({ profileNameSelector, profileActivitySelector });

function createCard(item) {
  const card = new Card(elementTemplate,item.name,item.link,cardPopupImage,cardPopupLabel,cardPopup,imageSelector,() => {
    const popupPhotos = new PopupWithImage('.card-open');
    popupPhotos.setEventListener();
    popupPhotos.open(item.link, item.name);
  });
  const cardElement = card.createCard();
  return cardElement
}

const cards = new Section({
  items: initialCards, renderer: (item) => {
    const cardElement = createCard(item);
    cards.addItem(cardElement);
  },
}, cardsContainerSelector);
cards.renderItems();

const popupProfile = new PopupWithForm(profilePopupSelector, (evt) => {
  evt.preventDefault();
  const formValues = popupProfile.getFormValues();
  userInfo.setUserInfo({ userName: formValues.name, userActivity: formValues.activity });
  popupProfile.close();
});
popupProfile.setEventListener();

const popupNewPlace = new PopupWithForm(popupAddCardSelector, (evt) => {
  evt.preventDefault();
  const formValues = popupNewPlace.getFormValues();
  const item = { name: formValues.name, link: formValues.url };
  const cardElement = createCard(item);
  cards.addNewItem(cardElement);
  popupNewPlace.close();
});
popupNewPlace.setEventListener();

profileEditButton.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  const profileForm = popupProfile.getFormElement();
  profileForm.elements.name.value = userInfoData.userName;
  profileForm.elements.activity.value = userInfoData.userActivity;
  validProfilePopup.resetValidation()
  popupProfile.open();
});

profileAddButton.addEventListener('click', () => {
  validPopupAddCard.resetValidation();
  popupNewPlace.open();
});