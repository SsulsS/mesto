export default class Card{
  constructor(elementTemplate,name, link){
      this.elementTemplate= elementTemplate;
      this.imageLink = link;
      this.name = name;
  }
  
  _getTemplateElement(){
    return this.elementTemplate.querySelector('.element').cloneNode(true);
  }
  
  _setIventListeners(element,placePhoto){
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
  }
  
  _createCard(){
      const element = this._getTemplateElement();
      const placePhoto = element.querySelector('.element__place-photo');
      const placeName = element.querySelector('.element__place-name');

      placeName.textContent = this.name;
      placePhoto.alt = this.name + ' фото';
      placePhoto.src = this.imageLink;
      
      this._setIventListeners(element,placePhoto)
      
      return element;
  }
}