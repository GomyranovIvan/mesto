import Popup from './Popup.js';
export default class PopupWithDelete extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__button-submit');
        this._defaultButtonText = this._submitButton.textContent;
    };

    setupDefaultText() {
        this._submitButton.textContent = this._defaultButtonText;
    };

    setEventListener() {
        super.setEventListener();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitButton.textContent = `${this._submitButton.textContent}...`;
            this._submitFunction({ card: this._element, cardId: this._cardId });
        });
    };

    open = ({ card, cardId }) => {
        super.open();
        this._element = card;
        this._cardId = cardId;
    };
}
