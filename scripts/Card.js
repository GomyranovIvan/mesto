export default class Card {
    constructor(object, selectorTemplate, handleOpenImageFromCard) {
        //ЭЛЕМЕНТ массива 
        this._object = object;
        //ЭЛЕМЕНТ контейнера куда кладутся карточки
        this._selectorTemplate = selectorTemplate;
        //ЭЛЕМЕНТ-функция открытия картинки
        this._handleOpenImageFromCard = handleOpenImageFromCard;
    }

    //МЕТОД для клонирования контента из контейнера куда кладутся карточки
    _getTemplateClone() {
        return document.querySelector(this._selectorTemplate).content.querySelector('.cards__item').cloneNode(true)
    }

    //МЕТОД для тоггла селектора 'cards__like_active' (ЛАЙК)
    _handleLike = () => {
        this._likeElement.classList.toggle('cards__like_active');
    }

    //МЕТОД для удаления селектора '.cards__item' (МУСОРКА)
    _handleDelete = () => {
        this._deleteElement.closest('.cards__item').remove();
    }

    //МЕТОД для открытия попапа картинки
    _handleOpenImageFromCardElement = () => {
        this._handleOpenImageFromCard(this._object)
    }

    //МЕТОД для навешивания слушателей
    _setEventListener() {
        this._likeElement.addEventListener('click', this._handleLike);
        this._deleteElement.addEventListener('click', this._handleDelete);
        this._imageElement.addEventListener('click', this._handleOpenImageFromCardElement)
    }

    createCard() {
        //ЭЛЕМЕНТ клонирующий контент из контейнера
        this._templateCloneElement = this._getTemplateClone();
        //ЭЛЕМЕНТ картинки
        this._imageElement = this._templateCloneElement.querySelector('.cards__image');
        //ЭЛЕМЕНТ лайка
        this._likeElement = this._templateCloneElement.querySelector('.cards__like');
        //ЭЛЕМЕНТ мусорки
        this._deleteElement = this._templateCloneElement.querySelector('.cards__delete');
        //ЭЛЕМЕНТ подписи под картинкой
        this._captionElement = this._templateCloneElement.querySelector('.cards__caption');
        //ЭЛЕМЕНТЫ где мы присваиваем значение из массива карточке 
        this._imageElement.src = this._object.link;
        this._imageElement.alt = this._object.name;
        this._captionElement.textContent = this._object.name;
        //Навешиваем слушательи методом
        this._setEventListener()
        return this._templateCloneElement
    }
}