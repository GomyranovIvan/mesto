export default class Card {
    constructor(object, selectorTemplate, handleOpenImageFromCard, openDelete, changeLike) {
        //ЭЛЕМЕНТ массива 
        this._object = object;
        this._caption = object.name;
        this._link = object.link;
        this._likes = object.likes;
        this._likesLength = object.likes.length;
        this._changeLike = changeLike;
        this._openDelete = openDelete;
        this._myId = object.myid;
        this._ownerId = object.owner._id;
        this._cardId = object._id;
        //ЭЛЕМЕНТ контейнера куда кладутся карточки
        this._selectorTemplate = selectorTemplate;
        //ЭЛЕМЕНТ-функция открытия картинки
        this._handleOpenImageFromCard = handleOpenImageFromCard;
        //ЭЛЕМЕНТ клонирующий контент из контейнера
        this._templateCloneElement = document.querySelector(this._selectorTemplate).content.querySelector('.cards__item').cloneNode(true);
        //ЭЛЕМЕНТ картинки
        this._imageElement = this._templateCloneElement.querySelector('.cards__image');
        //ЭЛЕМЕНТ лайка
        this._likeElement = this._templateCloneElement.querySelector('.cards__like');
        //ЭЛЕМЕНТ мусорки
        this._deleteElement = this._templateCloneElement.querySelector('.cards__delete');
        //ЭЛЕМЕНТ подписи под картинкой
        this._captionElement = this._templateCloneElement.querySelector('.cards__caption');
        //ЭЛЕМЕНТ количества лайков
        this._counter = this._templateCloneElement.querySelector('.cards__counter-likes');
    };

    //МЕТОД для клонирования контента из контейнера куда кладутся карточки
    _getTemplateClone() {
        return document.querySelector(this._selectorTemplate).content.querySelector('.cards__item').cloneNode(true)
    };

    //МЕТОД (МУСОРКА)
    _handleDelete = () => {
        this._openDelete({ card: this, cardId: this._cardId })
    };

    //МЕТОД (ЛАЙК)
    _handleLike = () => {
        this._changeLike(this._likeElement, this._cardId)
    };

    //МЕТОД для открытия попапа картинки
    _handleOpenImageFromCardElement = () => {
        this._handleOpenImageFromCard(this._object);
    };

    //МЕТОД для отображения кнопки удаления только у своих карточек
    _changeVisibleButtonDelete() {
        if (this._myId !== this._ownerId) {
            this._deleteElement.remove()
    }
    }

    //МЕТОД для распознования своего лайка в массиве
    _checkLike() {
        this._likes.forEach(element => {
            if (element._id === this._myId) {
                return this._likeElement.classList.add('cards__like_active');
            };
        });
        this._counter.textContent = this._likesLength
    };

    toggleLike(likes) {
        this._likeElement.classList.toggle('cards__like_active');
        this._counter.textContent = likes.length
    };

    //МЕТОД для навешивания слушателей
    _setEventListener() {
        this._likeElement.addEventListener('click', this._handleLike);
        this._deleteElement.addEventListener('click', this._handleDelete);
        this._imageElement.addEventListener('click', this._handleOpenImageFromCardElement);
    };

    removeCardElement() {
        this._templateCloneElement.remove();
        this._templateCloneElement = null;

    };

    //МЕТОД присваивания значений карточке 
    createCard() {
        //ЭЛЕМЕНТЫ где мы присваиваем значение из массива карточке 
        this._imageElement.src = this._link;
        this._imageElement.alt = this._caption;
        this._captionElement.textContent = this._caption;
        this._checkLike()
        this._changeVisibleButtonDelete()
        //Навешиваем слушательи методом
        this._setEventListener()
        //Возвращаем наружу ЭЛЕМЕНТ клонирующий контент из контейнера
        return this._templateCloneElement
    }
}