export default class Popup {
    constructor(popupSelector) {
       this._popup = document.querySelector(popupSelector);
       this._popupCloseButton = this._popup.querySelector('.popup__close');
    };

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
          }
    };
    
    _handleCloseButton = () => {
        this.close()
    };

    _handleClosePopupByClickOnOverlay = (event) => {
        if (event.currentTarget == event.target) {
            this.close();
          }
    }

    setEventListener() {
        this._popupCloseButton.addEventListener('click', this._handleCloseButton);
        this._popup.addEventListener('click', this._handleClosePopupByClickOnOverlay);
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };
}

