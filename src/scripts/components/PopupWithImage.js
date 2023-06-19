import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
       super(popupSelector);
       this._popupImage = this._popup.querySelector('.popup__image');
       this._imagePopupCaption = this._popup.querySelector('.popup__caption');
       
    }

    open = (object) => {
        this._popupImage.src = object.link;
        this._popupImage.alt = object.caption;
        this._imagePopupCaption.textContent = object.caption;
        super.open()

    }
}