import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
    constructor(popupSelector, submitFunction) {
       super(popupSelector);
       this._submitFunction = submitFunction;
       this._form = this._popup.querySelector('.popup__form');
       this._inputs = this._form.querySelectorAll('.popup__input');
    };

    getInputsValue() {
        this._values = {};
        this._inputs.forEach((input) => {
            this._values[input.id] = input.value;
        });
        return this._values;
    };

    setInputsValue(userInfo) {
        this._inputs.forEach((input) => {
            input.value = userInfo[input.id];
        });
    };

    setEventListener() {
        super.setEventListener();
        this._form.addEventListener('submit', this._submitFunction);
    };

    close() {
        super.close();
        this._form.reset();
    };
}