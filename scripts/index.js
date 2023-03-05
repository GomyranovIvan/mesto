const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__button-edit");
const formElement = document.querySelector(".popup__content");
const nameInput = formElement.querySelector(".popup__name");
const jobInput = formElement.querySelector(".popup__description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popupSaveButtonElement = popupElement.querySelector(".popup__save")

const openPopup = function () {
    popupElement.classList.add("popup_is-opened");
    const AddName = profileName.textContent;
    const AddDescription = profileDescription.textContent;
    nameInput.value = AddName;
    jobInput.value = AddDescription;

};

const closePopup = function () {
    popupElement.classList.remove("popup_is-opened");
};

const closePopupByClickOnOverlay = function (event) {
    if (event.currentTarget !== event.target) {
        return;
    }
    closePopup()
};

const saveValuesToProfile = function() {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
};

popupOpenButtonElement.addEventListener('click', openPopup,);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
popupSaveButtonElement.addEventListener('click', saveValuesToProfile);

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector(".profile__name");
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    

let profileDescription = document.querySelector(".profile__description");

    profileDescription.textContent = jobInput.value;

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
