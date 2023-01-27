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
    editForm.classList.add('popup_opened');
}

function openPopup(){
    editForm.classList.remove('popup_opened');
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
