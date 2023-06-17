export default class FormValidator {
    constructor(parameters, form) {
        //Параметр селектора инпута
        this._inputSelector = parameters.inputSelector;
        //Параметр селектора кнопки отправки
        this._submitButtonSelector = parameters.submitButtonSelector;
        //Параметр селектора "спанчика"
        this._errorTemplateSelector = parameters.errorTemplateSelector;
        //Параметр селектора неактивной кнопки
        this._inactiveButtonClass = parameters.inactiveButtonClass;
        //Параметр селектора красной подсветки ошибки
        this._inputErrorClass = parameters.inputErrorClass;
        //Параметр Форма
        this._form = form;
        //Элемент кнопка отправки в форме
        this._button = form.querySelector(this._submitButtonSelector);
        //Элементы инпуты форм
        this._inputs = form.querySelectorAll(this._inputSelector);
    };

    // 3 МЕТОД где скрываем ошибку\
    //удаляем селектор 'popup__input_invalid' у задейственного инпута\
    //в элемент 'Спанчик' с ошибкой присваиваем пустую строку\
    _hideInputError() {
        this._input.classList.remove(this._inputErrorClass);
        this._errorElement.textContent = '';
    };

    // 3 МЕТОД где показываем ошибку\
    //добавляем селектор 'popup__input_invalid' к задейственному инпуту\
    //в элемент 'Спанчик' с ошибкой присваиваем браузерную ошибку валидации\
    _showInputError() {
        this._input.classList.add(this._inputErrorClass);
        this._errorElement.textContent = this._input.validationMessage;
    };

    // 2 МЕТОД где определили элемент "Спанчик с ошибкой"\
    //если задейственный с помощью слушателя ИНПУТ валидный, срабатывает функция скрытия ошибки\
    //если НЕ валидный, работает функция показывания ошибки
    _checkInputValidity() {
        this._errorElement = this._form.querySelector(`${this._errorTemplateSelector}${this._input.id}`);
        if (this._input.validity.valid) {
            this._hideInputError()
        } else {
            this._showInputError()
        };
    };

    // 4 МЕТОД где дизейблится кнопка\
    //добавляется класс элементу кнопки 'popup__button-submit_disable'\
    //блокируем элемент методом .disabled\
    _disableButton() {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.disabled = true;
    };

    // 4 МЕТОД где задействуется кнопка\
    //удаляет класс элемента кнопки 'popup__button-submit_disable'\
    //разблокируем элемент методом .disabled\
    _enableButton() {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.disabled = false;
    };

    // 3 МЕТОД где коллбэк функция проверяет у инпута не валидный ли он\
    _hasInValidInput() {
        return Array.from(this._inputs).some(function (input) {
            return !input.validity.valid;
        });
    };

    // 2 МЕТОД где тогглится кнопка в задейственном попапе\
    //если инпут не валидный, срабатывает функция дизейбла кнопки\
    //иначе, срабатывает функция задействования кнопки\
    _toggleButtonState() {
        if (this._hasInValidInput()) {
            this._disableButton(this._button);
        } else {
            this._enableButton();
        };
    };

    // 1 МЕТОД логики слушателей\
    // По всем инпутам пробегаемся циклом и навешиваем слушатель инпута
    _setEventListener() {
        this._inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._input = input;
                this._checkInputValidity();
                this._toggleButtonState();
            });
        });
    };

    // ПУБЛИЧНЫЙ МЕТОД для навешивания слушателей формам
    enableValidation() {
        this._setEventListener();
    };

    // ПУБЛИЧНЫЙ МЕТОД ресета ошибок
    resetErrorForOpenForm() {
        this._inputs.forEach((input) => {
            this._input = input;
            this._errorElement = this._form.querySelector(`${this._errorTemplateSelector}${this._input.id}`);
            if (!input.validity.valid) {
                this._hideInputError()
            };
        });
        this._disableButton()
    };
}