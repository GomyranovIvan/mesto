export default class Card {
    constructor(object, selectorTemplate, handleOpenImageFromCard) {
      this._object = object;
      this._selectorTemplate = selectorTemplate;
      this._handleOpenImageFromCard = handleOpenImageFromCard;
    }
  
    _getTemplateClone() {
      return document.querySelector(this._selectorTemplate).content.querySelector('.cards__item').cloneNode(true)
    }
  
    _handleLike = () => {
      this._likeElement.classList.toggle('cards__like_active');
    }
    
    _handleDelete = () => {
      this._deleteElement.closest('.cards__item').remove();
    }
  
    _handleOpenImageFromCardElement = () => {
      this._handleOpenImageFromCard(this._object)
    }
  
    _setEventListener() {
      this._likeElement.addEventListener('click', this._handleLike);
      this._deleteElement.addEventListener('click', this._handleDelete);
      this._imageElement.addEventListener('click', this._handleOpenImageFromCardElement)
    }
  
    createCard() {
      this._templateCloneElement = this._getTemplateClone();
      this._imageElement = this._templateCloneElement.querySelector('.cards__image');
      this._likeElement = this._templateCloneElement.querySelector('.cards__like');
      this._deleteElement = this._templateCloneElement.querySelector('.cards__delete');
      this._captionElement = this._templateCloneElement.querySelector('.cards__caption');
      this._imageElement.src = this._object.link;
      this._imageElement.alt = this._object.name;
      this._captionElement.textContent = this._object.name;
      this._setEventListener()
      return this._templateCloneElement
    }
  }