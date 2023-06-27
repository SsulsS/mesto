import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popup.querySelector('.form');
  }

  getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    
    return this._formValues;
  }

  getFormElement() {
    return this._formElement;
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  setEventListener() {
    this._formElement.addEventListener('submit', (evt) => this._handleSubmitForm(evt));
    super.setEventListener();
  }

}