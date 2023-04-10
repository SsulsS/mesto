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
    const formList = Array.from(document.querySelectorAll(this.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });  
      const fieldsetList = Array.from(formElement.querySelectorAll(this.fieldsetSelector));  
      fieldsetList.forEach((fieldSet) => {
        this.setEventListeners(fieldSet , this.inputSelector , this.submitButtonSelector , this.inactiveButtonClass , this.inputErrorClass , this.errorClass);
      });         
    });
  };

  setEventListeners(formElement,inputSelector,submitButtonSelector,inactiveButtonClass,inputErrorClass,errorClass){
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    this.toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
        this.toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  };

  toggleButtonState(inputList, buttonElement, inactiveButtonClass){
    if (this.hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  checkInputValidity(formElement, inputElement, inputErrorClass, errorClass){
    if (!inputElement.validity.valid) {
      this.showInputError(formElement, inputElement, inputElement.validationMessage,inputErrorClass);
    } else {
      this.hideInputError(formElement, inputElement,inputErrorClass,errorClass);
    }
  };

  showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  hideInputError(formElement, inputElement, inputErrorClass, errorClass){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  hasInvalidInput (inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
};


