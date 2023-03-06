const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const formElement = document.querySelector('.popup__content');
const nameInput = formElement.querySelector('.popup__input_name');
const jobInput = formElement.querySelector('.popup__input_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const openPopup = function () {
    popupElement.classList.add('popup_opened');
    const AddNamefromProfil = profileName.textContent;
    const AddDescriptionfromProfil = profileDescription.textContent;
    nameInput.value = AddNamefromProfil;
    jobInput.value = AddDescriptionfromProfil;

};

const closePopup = function () {
    popupElement.classList.remove('popup_opened');
};

const saveValuesToProfile = function() {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
};

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupOpenButtonElement.addEventListener('click', openPopup,);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
