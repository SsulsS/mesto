let editButton = document.querySelector('.profile__edit-button');
let editForm = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let profileInfo = document.querySelector('.profile__info')
let profileName = document.querySelector('.profile__name')
let profileActivity = document.querySelector('.profile__activity')
let person = document.querySelector('.popup__input_type_name');
let activity = document.querySelector('.popup__input_type_activity');
let formPopup = document.querySelector('.popup__form')



function close() {
    editForm.classList.remove('popup_opened');
}

function openPopup(){
    editForm.classList.add('popup_opened');
    person.value = profileName.textContent;
    activity.value = profileActivity.textContent;
}

function save(event){
    event.preventDefault();
    profileName.textContent = person.value;
    profileActivity.textContent = activity.value;
    close()
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', close);
formPopup.addEventListener('submit', save)

let addButton = document.querySelector('.profile__add-button');
let addPopup = document.querySelector('.add-popup');
let closeAddButton = document.querySelector('.add-popup__close-button');




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
const placeName = document.querySelector('.add-popup__input_type_place');
const placeLink = document.querySelector('.add-popup__input_type_link');
const cardOpen = document.querySelector('.card-open');
const closeCardButton = document.querySelector('.card-open__button');

function openPage(){
  const elementTemplate = document.querySelector('#element-template').content;

  for (let i = 0; i < initialCards.length; i++){
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__place-name').textContent = initialCards[i].name;
    element.querySelector('.element__place-photo').src = initialCards[i].link;

    element.querySelector('.element__button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__button_active');
  });

  element.querySelector('.element__delite').addEventListener('click',function(evt){
    evt.target.parentElement.remove('element')
  });

  element.querySelector('.element__place-photo').addEventListener('click', function(evt){
    cardOpen.classList.add('card-open_active');
    cardOpen.querySelector('.card-open__image').src = initialCards[i].link;
    cardOpen.querySelector('.card-open__label').textContent = initialCards[i].name;
  })

    elements.append(element);
  }
}

document.addEventListener('DOMContentLoaded', openPage)

function openAddPopup(){
  addPopup.classList.add('add-popup_opened');
}

function closeAddpopup() {
  addPopup.classList.remove('add-popup_opened');
  placeName.value = ''
  placeLink.value = ''
}

function addCard (event) {
  event.preventDefault();
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  
  element.querySelector('.element__place-name').textContent = placeName.value;
  element.querySelector('.element__place-photo').src = placeLink.value;

  elements.prepend(element);

  element.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
});

element.querySelector('.element__delite').addEventListener('click',function(evt){
  evt.target.parentElement.remove('element')
});

element.querySelector('.element__place-photo').addEventListener('click', function(evt){
  cardOpen.classList.add('card-open_active');
  cardOpen.querySelector('.card-open__image').src = element.querySelector('.element__place-photo').src;
  cardOpen.querySelector('.card-open__label').textContent = element.querySelector('.element__place-name').textContent;
})+

  closeAddpopup();
};

function closeCard(){
  cardOpen.classList.remove('card-open_active');
}


addButton.addEventListener('click', openAddPopup);
closeAddButton.addEventListener('click', closeAddpopup );
document.querySelector('.add-popup__form').addEventListener('submit', addCard);
closeCardButton.addEventListener('click',closeCard)