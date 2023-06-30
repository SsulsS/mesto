/*

const  validProfilePopup = new FormValid(profilePopup,validationConfig);
validProfilePopup.enableValidation();

const  validPopupAddCard = new FormValid(popupAddCard,validationConfig)
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

const popupProfile = new PopupWithForm(profilePopupSelector, (evt,formValues) => {
  evt.preventDefault();
  userInfo.setUserInfo({ userName: formValues.name, userActivity: formValues.activity });
  popupProfile.close();
});
popupProfile.setEventListener();

const popupNewPlace = new PopupWithForm(popupAddCardSelector, (evt,formValues) => {
  evt.preventDefault();
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
*/
//----------------------------------------------------------------------------------------

import './index.css';
import {
  validationConfig,
  profileAvatarEditButton,
  profileAvatarSelector,
  profileNameSelector,
  profileActivitySelector,
  profileEditButton,
  addCardButton,
  popupProfileSelector,
  popupNewPlaceSelector,
  popupViewerSelector,
  popupConfirmSelector,
  popupUpdateAvatarSelector,
  cardsContainerSelector,
  cardSelector,
  profilePopup,
  popupAddCard,
  avatarPopup
} from '../script/utils/constants.js';
import Api from '../script/components/Api';
import Card from '../script/components/Card.js';
import FormValid from '../script/components/FormValidator.js';
import Section from '../script/components/Section.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithConfirm from '../script/components/PopupWithConfirm.js';
import UserInfo from '../script/components/UserInfo.js';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '3423936a-6f7a-4159-a41b-e171525532ad',
    'Content-Type': 'application/json',
  }
});

const userInfo = new UserInfo({ profileNameSelector, profileActivitySelector, profileAvatarSelector });


const cards = new Section({
  renderer: (item) => {
    const cardElement = createNewCard(item, cardSelector);
    cards.addItem(cardElement);
  },
}, cardsContainerSelector);



const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector, (evt,formValues) => {
  evt.preventDefault();
  popupUpdateAvatar.isLoadingMessage(true);
  api.changeProfileAvatar({ avatar: formValues.url }).then(() => {
    popupUpdateAvatar.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupUpdateAvatar.isLoadingMessage(false);
  });
});
popupUpdateAvatar.setEventListener();
const popupUpdateAvatarValidator = new FormValid(avatarPopup,validationConfig)
popupUpdateAvatarValidator.enableValidation();
document.querySelector(profileAvatarEditButton).addEventListener('click', () => {
  popupUpdateAvatarValidator.resetValidation();
  popupUpdateAvatar.open();
});


api.getPageNeedData().then((responses) => {
  const [cardData, userData] = responses;
  userInfo.setUserInfo({ userName: userData.name, userDescription: userData.about });
  userInfo.setUserAvatar({ userAvatarLink: userData.avatar });
  userInfo.saveUserId(userData._id);
  cards.renderItems(cardData);
}).catch((err) => {
  console.error(err);
});


const popupProfile = new PopupWithForm(popupProfileSelector, (evt,formValues) => {
  evt.preventDefault();
  popupProfile.isLoadingMessage(true);
  api.updateUserInfo({ name: formValues.title, about: formValues.subtitle }).then((data) => {
    userInfo.setUserInfo({ userName: data.name, userDescription: data.about });
    popupProfile.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupProfile.isLoadingMessage(false);
  });
});
popupProfile.setEventListener();
const  validProfilePopup = new FormValid(profilePopup,validationConfig);
validProfilePopup.enableValidation();

const popupNewPlace = new PopupWithForm(popupNewPlaceSelector, (evt,formValues) => {
  evt.preventDefault();
  popupNewPlace.isLoadingMessage(true);formValues
  const item = { name: formValues.name, link: formValues.url };
  api.addNewCard(item).then((newCardItem) => {
    const cardElement = createNewCard(newCardItem, cardSelector);
    cards.addNewItem(cardElement);
    popupNewPlace.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupNewPlace.isLoadingMessage(false);
  });
});
popupNewPlace.setEventListener();
const  validPopupAddCard = new FormValid(popupAddCard,validationConfig)
validPopupAddCard.enableValidation();


const popupConfirm = new PopupWithConfirm(popupConfirmSelector);
popupConfirm.setEventListener();


const popupViewer = new PopupWithImage(popupViewerSelector);
popupViewer.setEventListener();


profileEditButton.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  const profileForm = popupProfile.getFormElement();
  profileForm.elements.name.value = userInfoData.userName;
  profileForm.elements.activity.value = userInfoData.userActivity;
  validProfilePopup.resetValidation();
  popupProfile.open();
});


addCardButton.addEventListener('click', () => {
  validPopupAddCard.resetValidation();
  popupNewPlace.open();
});


function createNewCard(item, cardSelector) {
  const card = new Card({
    data: item, cardSelector, userId: userInfo.getUserId(),
    handleCardClick: () => {
      popupViewer.open(item.link, item.name);
    },
    handleLikeButtonClick: () => {
      if (!card.isLiked()) {
        api.addCardLike(card.getCardId()).then((data) => {
          card.setLikeCount(data.likes.length);
        }).catch((err) => {
          console.error(err);
        });
      } else {
        api.deleteCardLike(card.getCardId()).then((data) => {
          card.setLikeCount(data.likes.length);
        }).catch((err) => {
          console.error(err);
        });
      }
    },
    handleRemoveButtonClick: (evt) => {
      const cardElement = evt.target.closest('.element');
      const cardId = card.getCardId();
      popupConfirm.changeHandlerSubmitForm((evt) => {
        evt.preventDefault();
        api.removeCard(cardId).then(() => {
          cardElement.remove();
          popupConfirm.close();

        }).catch((err) => {
          console.error(err);
        });
      });
      popupConfirm.open();
    },
  });
  return card.createCard();
}
