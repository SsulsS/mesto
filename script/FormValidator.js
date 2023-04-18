export default class FormValid{    
  constructor(config){
    this.formSelector = config.formSelector;
    this.fieldsetSelector = config.fieldsetSelector;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorClass = config.inputErrorClass;
    this.errorClass = config.errorClass;
  }

  enableValidation(){
    this.formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })

    const fieldSet = this.formSelector.querySelector(this.fieldsetSelector);
    this._setEventListeners(fieldSet , this.inputSelector , this.submitButtonSelector , this.inactiveButtonClass , this.inputErrorClass , this.errorClass);
  };

  _setEventListeners(formElement,inputSelector,submitButtonSelector,inactiveButtonClass,inputErrorClass,errorClass){
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
        this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  };

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass){
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _checkInputValidity(formElement, inputElement, inputErrorClass, errorClass){
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage,inputErrorClass);
    } else {
      this._hideInputError(formElement, inputElement,inputErrorClass,errorClass);
    }
  };

  _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  _hideInputError(formElement, inputElement, inputErrorClass, errorClass){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput (inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
};