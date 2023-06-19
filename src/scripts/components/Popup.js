export default class Popup {
    constructor(popupSelector) {
       this._popup = document.querySelector(popupSelector);
       this._popupCloseButton = this._popup.querySelector('.popup__close');
    };

    _handleClosePopupButton = () => {
        this.close();
    };

    _handleClosePopupByKeyEscape = (event) => {
        if (event.key === 'Escape') {
            this.close();
          };
    };

    _handleClosePopupByClickOnOverlay = (event) => {
        if (event.currentTarget === event.target) {
            this.close();
          };
    };

    setEventListener() {
        this._popupCloseButton.addEventListener('click', this._handleClosePopupButton);
        this._popup.addEventListener('mousedown', this._handleClosePopupByClickOnOverlay);
    };

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleClosePopupByKeyEscape);
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleClosePopupByKeyEscape);
    };
}

