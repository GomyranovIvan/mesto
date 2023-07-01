export default class Card {
    constructor(object, selectorTemplate, handleOpenImageFromCard, openDelete, changeLike) {
        //ЭЛЕМЕНТ массива 
        const {name, link, _id, owner, likes, myid} = object
        this._object = object;
        this._caption = name;
        this._link = link;
        this._likes = likes;
        this._changeLike = changeLike;
        this._openDelete = openDelete;
        this._myId = myid;
        this._ownerId = owner;
        this._cardId = _id;
        //ЭЛЕМЕНТ контейнера куда кладутся карточки
        this._selectorTemplate = selectorTemplate;
        //ЭЛЕМЕНТ-функция открытия картинки
        this._handleOpenImageFromCard = handleOpenImageFromCard;
    };

    //МЕТОД для клонирования контента из контейнера куда кладутся карточки
    _getTemplateClone() {
        return document.querySelector(this._selectorTemplate).content.querySelector('.cards__item').cloneNode(true)
    };

    //МЕТОД (МУСОРКА)
    _handleDelete = () => {
        this._openDelete({ card: this, cardId: this._cardId })
    };

    

    //МЕТОД для открытия попапа картинки
    _handleOpenImageFromCardElement = () => {
        this._handleOpenImageFromCard(this._object);
    };

    //МЕТОД для отображения кнопки удаления только у своих карточек
    _changeVisibleButtonDelete() {
        if (this._myId !== this._ownerId._id) {
            this._deleteElement.remove()
    }
    }

    updateLikesCount(likes) {
        this._likes = likes;
        this._counterLike.textContent = likes.length
    }
    isLikedByMy() {
        return this._likes.find(like => like._id === this._myId)
    }
    //МЕТОД для распознования своего лайка в массиве
    _checkLike() {
        this._likes.forEach(element => {
            if (element._id === this._myId) {
                return this._likeElement.classList.add('cards__like_active');
            };
        });
    };

    toggleLike() {
        this._likeElement.classList.toggle('cards__like_active');
    };

    //МЕТОД для навешивания слушателей
    _setEventListener() {
        this._likeElement.addEventListener('click', this._changeLike);
        this._deleteElement.addEventListener('click', this._handleDelete);
        this._imageElement.addEventListener('click', this._handleOpenImageFromCardElement);
    };

    removeCardElement() {
        this._templateCloneElement.remove();
        this._templateCloneElement = null;

    };

    //МЕТОД присваивания значений карточке 
    createCard() {
        this._templateCloneElement = this._getTemplateClone()
        this._imageElement = this._templateCloneElement.querySelector('.cards__image');
        this._deleteElement = this._templateCloneElement.querySelector('.cards__delete');
        this._captionElement = this._templateCloneElement.querySelector('.cards__caption');
        this._likeElement = this._templateCloneElement.querySelector('.cards__like');
        this._counterLike = this._templateCloneElement.querySelector('.cards__counter-likes');
        this._imageElement.src = this._link;
        this._imageElement.alt = this._caption;
        this._captionElement.textContent = this._caption;
        this._counterLike.textContent = this._likes.length;
        this._checkLike()
        this._changeVisibleButtonDelete()
        //Навешиваем слушательи методом
        this._setEventListener()
        //Возвращаем наружу ЭЛЕМЕНТ клонирующий контент из контейнера
        return this._templateCloneElement
    }
}