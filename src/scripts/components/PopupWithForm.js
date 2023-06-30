import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__button-submit');
        this._inputs = this._form.querySelectorAll('.popup__input');
        this._defaultSubmitButtonText = this._submitButton.textContent;
    };

    _getInputsValue() {
        this._values = {};
        this._inputs.forEach((input) => {
            this._values[input.name] = input.value;
        });
        return this._values;
    };

    setInputsValue(userData) {
        this._inputs.forEach((input) => {
            input.value = userData[input.name];
        });
    };

    setupDefaultText() {
        this._submitButton.textContent = this._defaultSubmitButtonText;
    };

    setEventListener() {
        super.setEventListener();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitButton.textContent = `${this._submitButton.textContent}...`;
            this._submitFunction(this._getInputsValue());
        });
    };

    close() {
        super.close();
        this._form.reset();
    };
}