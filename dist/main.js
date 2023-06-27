(()=>{"use strict";const e=document.querySelector("#element-template").content,t=document.querySelector(".profile-popup"),s=document.querySelector(".add-popup"),r=document.querySelector(".profile__edit-button"),n=document.querySelector(".profile__add-button"),o=document.querySelector(".card-open"),i=o.querySelector(".card-open__image"),l=o.querySelector(".card-open__label");class a{constructor(e,t,s,r,n,o,i,l){this.elementTemplate=e,this.imageLink=s,this.name=t,this.cardPopupImage=r,this.cardPopupLabel=n,this.openCardConteiner=o,this.imageSelector=i,this._handleCardClick=l}_getTemplateElement(){return this.elementTemplate.querySelector(".element").cloneNode(!0)}_setIventListeners(e,t,s,r,n,o,i){this._toggleLike(e),this._deleteCard(e),t.addEventListener("click",(()=>this._handleCardClick()))}createCard(){const e=this._getTemplateElement(),t=e.querySelector(this.imageSelector),s=e.querySelector(".element__place-name");return s.textContent=this.name,t.alt=this.name+" фото",t.src=this.imageLink,this._setIventListeners(e,t,s,this.cardPopupImage,this.cardPopupLabel,this.openCardConteiner,this.openPopup),e}_toggleLike(e){e.querySelector(".element__button").addEventListener("click",(function(e){e.target.classList.toggle("element__button_active")}))}_deleteCard(e){e.querySelector(".element__delite").addEventListener("click",(function(e){e.target.closest("article").remove("element")}))}_handleImageClick(e,t,s,r){e.addEventListener("click",(function(){s.src=e.src,s.alt=e.alt,r.textContent=t.textContent}))}}class c{constructor(e){this.formSelector=e.formSelector,this.fieldsetSelector=e.fieldsetSelector,this.inputSelector=e.inputSelector,this.submitButtonSelector=e.submitButtonSelector,this.inactiveButtonClass=e.inactiveButtonClass,this.inputErrorClass=e.inputErrorClass,this.errorClass=e.errorClass,this.closeButton=e.closeButton,this.inputList=Array.from(this.formSelector.querySelectorAll(this.inputSelector)),this.buttonElement=this.formSelector.querySelector(this.submitButtonSelector)}enableValidation(){this.formSelector.addEventListener("submit",(function(e){e.preventDefault()}));const e=this.formSelector.querySelector(this.fieldsetSelector);this._setEventListeners(e,this.inputSelector,this.inputErrorClass)}_setEventListeners(e,t,s){const r=Array.from(e.querySelectorAll(t));this._toggleButtonState(),r.forEach((t=>{t.addEventListener("input",(()=>{this._checkInputValidity(e,t,s),this._toggleButtonState()}))}))}_toggleButtonState(){this._hasInvalidInput(this.inputList)?(this.buttonElement.classList.add(this.inactiveButtonClass),this.buttonElement.disabled=!0):(this.buttonElement.classList.remove(this.inactiveButtonClass),this.buttonElement.disabled=!1)}_checkInputValidity(e,t,s){t.validity.valid?this._hideInputError(t):this._showInputError(e,t,t.validationMessage,s)}_showInputError(e,t,s,r,n){const o=e.querySelector(`.${t.id}-error`);t.classList.add(r),o.textContent=s,o.classList.add(n)}_hideInputError(e){const t=this.formSelector.querySelector(`.${e.id}-error`);e.classList.remove(this.inputErrorClass),t.classList.remove(this.errorClass),t.textContent=""}_hasInvalidInput(e){return e.some((e=>!e.validity.valid))}resetValidation(){this._toggleButtonState(),this.inputList.forEach((e=>{this._hideInputError(e)}))}}class u{constructor(e){this._popup=document.querySelector(e)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose.bind(this))}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose.bind(this))}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListener(){this._popup.addEventListener("mousedown",(e=>{e.target.classList.contains("popup__close-button")&&this.close(),e.target.classList.contains("popup__overlay")&&this.close()}))}}class p extends u{constructor(e,t){super(e),this._handleSubmitForm=t,this._formElement=this._popup.querySelector(".form")}_getInputValues(){return this._inputList=this._formElement.querySelectorAll(".form__input"),this._formValues={},this._inputList.forEach((e=>{this._formValues[e.name]=e.value})),this._formValues}getFormValues(){return this._getInputValues()}getFormElement(){return this._formElement}close(){this._formElement.reset(),super.close()}setEventListener(){this._formElement.addEventListener("submit",(e=>this._handleSubmitForm(e))),super.setEventListener()}}class m extends u{_popupImage=this._popup.querySelector(".card-open__image");open(e,t){this._popupImage.src=e,this._popupImage.alt=t,this._popup.querySelector(".card-open__label").textContent=t,super.open()}}const d=new c({formSelector:t,fieldsetSelector:".popup__set",inputSelector:".form__input",submitButtonSelector:".form__submit",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"});d.enableValidation();const h=new c({formSelector:s,fieldsetSelector:".popup__set",inputSelector:".form__input",submitButtonSelector:".form__submit",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"});h.enableValidation();const _=new class{constructor({profileNameSelector:e,profileActivitySelector:t}){this._userNameElement=document.querySelector(e),this._userActivityElement=document.querySelector(t)}getUserInfo(){return{userName:this._userNameElement.textContent,userActivity:this._userActivityElement.textContent}}setUserInfo({userName:e,userActivity:t}){this._userNameElement.textContent=e,this._userActivityElement.textContent=t}}({profileNameSelector:".profile__name",profileActivitySelector:".profile__activity"});function v(t){return new a(e,t.name,t.link,i,l,o,".element__place-photo",(()=>{const e=new m(".card-open");e.setEventListener(),e.open(t.link,t.name)})).createCard()}const f=new class{constructor({items:e,renderer:t},s){this._items=e,this._renderer=t,this._containerElement=document.querySelector(s)}renderItems(){this._items.forEach((e=>{this._renderer(e)}))}addNewItem(e){this._containerElement.prepend(e)}addItem(e){this._containerElement.append(e)}}({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:e=>{const t=v(e);f.addItem(t)}},".elements");f.renderItems();const S=new p(".profile-popup",(e=>{e.preventDefault();const t=S.getFormValues();_.setUserInfo({userName:t.name,userActivity:t.activity}),S.close()}));S.setEventListener();const E=new p(".add-popup",(e=>{e.preventDefault();const t=E.getFormValues(),s=v({name:t.name,link:t.url});f.addNewItem(s),E.close()}));E.setEventListener(),r.addEventListener("click",(()=>{const e=_.getUserInfo(),t=S.getFormElement();t.elements.name.value=e.userName,t.elements.activity.value=e.userActivity,d.resetValidation(),S.open()})),n.addEventListener("click",(()=>{h.resetValidation(),E.open()}))})();