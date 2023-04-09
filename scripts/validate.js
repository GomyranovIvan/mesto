const validationConfig = {
    allforms: document.forms,
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    errorSelectorTemplate: '.popup__error_type_',
    disableButtonClass: 'popup__submit_disable',
    inputErrorClass: 'popup__input_invalid',
    textErrorClass: 'popup__error_active'
};
const log = console.log;

enableValidation(validationConfig)

function enableValidation(config) {
    const forms = Array.from(config.allforms)
    forms.forEach((form) => {
        const inputList = form.querySelectorAll(config.inputSelector);
        const button = form.querySelector(config.submitButtonSelector);
        hangEventListener(inputList, button, config.errorSelectorTemplate, config.disableButtonClass, config.inputErrorClass, config.textErrorClass);
    })  
}

function hangEventListener(inputList, button, errorSelectorTemplate, disableButtonClass, inputErrorClass, textErrorClass) {
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(input, errorSelectorTemplate, inputErrorClass, textErrorClass);
        // toggleButtonState(input, button, disableButtonClass);
      })
    })
}

function checkInputValidity(input, errorSelectorTemplate, inputErrorClass, textErrorClass) {
    const errorTextElement = document.querySelector(`${errorSelectorTemplate}${input.name}`);
    if (input.validity.valid) {
        
    } else {
        
    }
}
