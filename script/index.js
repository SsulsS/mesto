/*Кнопки*/
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const allCloseButton = document.querySelectorAll('.popup__close-button');
const profileCloseButton = allCloseButton[0];
const addCloseButton = allCloseButton[1];
const cardCloseButton = allCloseButton[2];

/*POPUPы*/
const editForm = document.querySelector('.profile-popup');
const addPopup = document.querySelector('.add-popup');

const profileInfo = document.querySelector('.profile__info')
const profileName = document.querySelector('.profile__name')
const profileActivity = document.querySelector('.profile__activity');
const person = document.querySelector('.popup__input_type_name');
const activity = document.querySelector('.popup__input_type_activity');
const profilePopupForm = document.querySelector('.popup__form');
const addPopupForm = document.querySelector('.add-popup__form');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openProfilePopup(){
  openPopup(editForm)
  person.value = profileName.textContent;
  activity.value = profileActivity.textContent;
}
function save(event){
    event.preventDefault();
    profileName.textContent = person.value;
    profileActivity.textContent = activity.value;
    closePopup(editForm)
}
editButton.addEventListener('click', openProfilePopup);
profilePopupForm.addEventListener('submit', save);

function openAddPopup(){
  addPopup.classList.add('add-popup_opened');
}

function closeAddpopup() {
  closePopup(addPopup);
  placeName.value = '';
  placeLink.value = '';
}

addButton.addEventListener('click', function(){
  openPopup(addPopup);
});

addPopupForm.addEventListener('submit', addCard);

allCloseButton.forEach((button) => {
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

const elements = document.querySelector('.elements');
const cardPopup = document.querySelector('.card-open');

document.addEventListener('DOMContentLoaded', function(){
  for (let i = 0; i < initialCards.length; i++){
    const element = createCard(initialCards[i].name,initialCards[i].link)
    elements.append(element);
  }
})

const placeName = document.querySelector('.add-popup__input_type_place');
const placeLink = document.querySelector('.add-popup__input_type_link');

function addCard (event) {
  event.preventDefault();
  const element = createCard(placeName.value, placeLink.value)
  elements.prepend(element);
  closeAddpopup();
};

function createCard(text,photo){
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const placePhoto = element.querySelector('.element__place-photo');
  const PlaceName = element.querySelector('.element__place-name');
  
  
  PlaceName.textContent = text;
  placePhoto.alt = text + ' фото';
  placePhoto.src = photo;

  element.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
});

element.querySelector('.element__delite').addEventListener('click',function(evt){
  evt.target.parentElement.remove('element');
});

placePhoto.addEventListener('click', function(evt){
  openPopup(cardPopup)
  cardPopup.querySelector('.card-open__image').src = placePhoto.src;
  cardPopup.querySelector('.card-open__label').textContent = PlaceName.textContent;
})
return element
};