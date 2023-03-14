/*Кнопки*/
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const editPopupOverlay = document.querySelector('.profile-popup__overlay'); 
const addPopupOverlay = document.querySelector('.add-popup__overlay');
const cardOverlay = document.querySelector('.card-open__overlay')

/*POPUPы*/
const editPopup = document.querySelector('.profile-popup');
const addPopup = document.querySelector('.add-popup');

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const person = document.querySelector('.popup__input_type_name');
const activity = document.querySelector('.popup__input_type_activity');

const profilePopupForm = document.querySelector('.popup__form');
const addPopupForm = document.querySelector('.add-popup__form');

const elements = document.querySelector('.elements');
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
  openPopup(editPopup)
  person.value = profileName.textContent;
  activity.value = profileActivity.textContent;
  enableValidation()
}

function handleProfileFormSubmit(event){
  event.preventDefault();
  profileName.textContent = person.value;
  profileActivity.textContent = activity.value;
  closePopup(editPopup)
}
editButton.addEventListener('click', openProfilePopup);
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', function(){
  openPopup(addPopup);
  enableValidation()
});

addPopupForm.addEventListener('submit', addCard);

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
    elements.append(element);
  }
})

const placeName = document.querySelector('.add-popup__input_type_place');
const placeLink = document.querySelector('.add-popup__input_type_link');

function addCard (event) {
  event.preventDefault();
  const element = createCard(placeName.value, placeLink.value)
  elements.prepend(element);
  placeName.value = '';
  placeLink.value = '';
  closePopup(addPopup);
};

function createCard(text,photo){
  const elementTemplate = document.querySelector('#element-template').content;
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

editPopupOverlay.addEventListener('click',closeOverlay);
addPopupOverlay.addEventListener('click',closeOverlay);
cardOverlay.addEventListener('click',closeOverlay);


/* валид-------------------------------------------*/

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__set'));

fieldsetList.forEach((fieldSet) => {
  setEventListeners(fieldSet);
}); 
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive');
  } else {
    buttonElement.classList.remove('popup__button_inactive');
  }
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

function hasInvalidInput (inputList){
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}