let editButton = document.querySelector(".profile__edit-button");
let saveButton = document.querySelector(".form__button");
let editForm = document.querySelector(".edit-form");
let closeButton = document.querySelector(".form__close-button");
let profileInfo = document.querySelector(".profile__info")
let profileName = document.querySelector(".profile__name")
let profileActivity = document.querySelector(".profile__activity")

function openForm(){
    editForm.classList.remove('edit-form_disabled');
    let person = document.querySelector(".form__input_type_name");
    let activity = document.querySelector(".form__input_type_activity");
    person.value = profileName.textContent;
    activity.value = profileActivity.textContent;
}

function save(){
    let person = document.querySelector(".form__input_type_name");
    let activity = document.querySelector(".form__input_type_activity");



    profileName.textContent = person.value;
    profileActivity.textContent = activity.value;
    editForm.classList.add('edit-form_disabled');
}

function close() {
    editForm.classList.add('edit-form_disabled');
}

editButton.addEventListener('click', openForm);
saveButton.addEventListener('click', save);
closeButton.addEventListener('click', close);
