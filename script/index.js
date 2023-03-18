const elementTemplate = document.querySelector('#element-template').content;

/*Кнопки*/
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const overlayEdditPopup = document.querySelector('.profile-popup__overlay'); 
const overlayAddPopup = document.querySelector('.add-popup__overlay');
const cardOverlay = document.querySelector('.card-open__overlay');

/*Submit Buttons*/
const cardPopupSubmitButton = document.querySelector('.add-popup__button');
const profilePopupSubmitButton = document.querySelector('.popup__button');

/*POPUPы*/
const profilePopup = document.querySelector('.profile-popup');
const popupAddCard = document.querySelector('.add-popup');

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const person = document.querySelector('.popup__input_type_name');
const activity = document.querySelector('.popup__input_type_activity');

const profilePopupForm = document.querySelector('.popup__form');
const popupAddCardForm = document.querySelector('.add-popup__form');

const cardsContainer = document.querySelector('.elements');
const cardPopup = document.querySelector('.card-open');
const cardPopupImage = cardPopup.querySelector('.card-open__image');
const cardPopupLabel = cardPopup.querySelector('.card-open__label');

function closeEsc(evt){
  if (evt.keyCode == 27){
    const openedWind = document.querySelector('.popup_opened');
    closePopup(openedWind)
  } 
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown',closeEsc);
}
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',closeEsc);
}

function openProfilePopup(){
  openPopup(profilePopup)
  person.value = profileName.textContent;
  activity.value = profileActivity.textContent;
}

function handleProfileFormSubmit(event){
  event.preventDefault();
  profileName.textContent = person.value;
  profileActivity.textContent = activity.value;
  closePopup(profilePopup);
}
profileEditButton.addEventListener('click', openProfilePopup);
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);

profileAddButton.addEventListener('click', function(){
  openPopup(popupAddCard);
});

popupAddCardForm.addEventListener('submit', addCard);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const initialCards = [
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

document.addEventListener('DOMContentLoaded', function(){
  for (let i = 0; i < initialCards.length; i++){
    const element = createCard(initialCards[i].name,initialCards[i].link)
    cardsContainer.append(element);
  }
})

const placeName = document.querySelector('.add-popup__input_type_place');
const placeLink = document.querySelector('.add-popup__input_type_link');

function addCard (event) {
  event.preventDefault();
  const element = createCard(placeName.value, placeLink.value)
  cardsContainer.prepend(element);
  placeName.value = '';
  placeLink.value = '';
  closePopup(popupAddCard);
  cardPopupSubmitButton.classList.add('popup__button_inactive');
  cardPopupSubmitButton.disabled = true;
};

function createCard(text,photo){
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const placePhoto = element.querySelector('.element__place-photo');
  const placeName = element.querySelector('.element__place-name');
  const cardPopupImage = cardPopup.querySelector('.card-open__image');
  const cardPopupLabel = cardPopup.querySelector('.card-open__label');
  
  
  placeName.textContent = text;
  placePhoto.alt = text + ' фото';
  placePhoto.src = photo;

  element.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  });

  element.querySelector('.element__delite').addEventListener('click',function(evt){
    evt.target.closest('article').remove('element');
  });

  placePhoto.addEventListener('click', function(evt){
    openPopup(cardPopup)
    cardPopupImage.src = placePhoto.src;
    cardPopupImage.alt = placePhoto.alt;
    cardPopupLabel.textContent = placeName.textContent;
  })
  return element
};

/*Закрытие оверлей*/

function closeOverlay(evt){
  closePopup(evt.target.closest('section'))
}

overlayEdditPopup.addEventListener('click',closeOverlay);
overlayAddPopup.addEventListener('click',closeOverlay);
cardOverlay.addEventListener('click',closeOverlay);