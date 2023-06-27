export default class Card{
  constructor(elementTemplate,name ,link, cardPopupImage, cardPopupLabel, cardPopup, imageSelector, handleCardClick){
      this.elementTemplate= elementTemplate;
      this.imageLink = link;
      this.name = name;
      this.cardPopupImage = cardPopupImage;
      this.cardPopupLabel = cardPopupLabel;
      this.openCardConteiner = cardPopup;
      this.imageSelector = imageSelector
      this._handleCardClick = handleCardClick;
  }
  
  _getTemplateElement(){
    return this.elementTemplate.querySelector('.element').cloneNode(true);
  }
  
  _setIventListeners(element,placePhoto,placeName,cardPopupImage,cardPopupLabel,cardPopup,openPopup){
    this._toggleLike(element);
    this._deleteCard(element);
    placePhoto.addEventListener('click', () => this._handleCardClick());
  };
  
  createCard(){
      const element = this._getTemplateElement();
      const placePhoto = element.querySelector(this.imageSelector);
      const placeName = element.querySelector('.element__place-name');

      placeName.textContent = this.name;
      placePhoto.alt = this.name + ' фото';
      placePhoto.src = this.imageLink;
      this._setIventListeners(element,placePhoto,placeName,this.cardPopupImage,this.cardPopupLabel,this.openCardConteiner,this.openPopup)
      
      return element;
  }

  _toggleLike(element){
    element.querySelector('.element__button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__button_active');
    });
  };

  _deleteCard(element){
    element.querySelector('.element__delite').addEventListener('click',function(evt){
      evt.target.closest('article').remove('element');
    });
  };

  _handleImageClick(placePhoto,placeName,cardPopupImage,cardPopupLabel){
    placePhoto.addEventListener('click', function(){
      cardPopupImage.src = placePhoto.src;
      cardPopupImage.alt = placePhoto.alt;
      cardPopupLabel.textContent = placeName.textContent;
    });
  };
};