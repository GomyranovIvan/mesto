import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import '../pages/index.css';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import PopupWithForm from './components/PopupWithForm.js';

//---------------------------------------------------------------------------------------------------------------------------
//Элементы профиля\
const profileElement = document.querySelector('.profile');

//---------------------------------------------------------------------------------------------------------------------------
//Элементы попапа редактирования профиля\
const formProfileEditElement = document.forms.popupFormProfileEdit;
//Кнопка открытия\
const popupButtonElementEditProfile = profileElement.querySelector('.profile__button-edit');

//---------------------------------------------------------------------------------------------------------------------------
//Элементы попапа добавления карточек\
const formAddCardElement = document.forms.popupFormAddImage;
//Кнопка открытия\
const popupButtonElementAddCard = profileElement.querySelector('.profile__button-add');

//---------------------------------------------------------------------------------------------------------------------------
//Селекторы для классов\
const selectorTemplate = '#cards-template'
const popupEditProfileSelector = '.popup_content_edit-profile';
const popupAddCardSelector = '.popup_content_card'
const popupImageSelector = '.popup_content_image';
const cardElementSelector = '.cards';

const profileInfo = {
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description'
}
//-----------------------------------------------------------------------------------------------------------------------------------
//Массив по умолчанию\

const initialCards = [
  {
    caption: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    caption: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    caption: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    caption: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    caption: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    caption: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//---------------------------------------------------------------------------------------------------------------------------------
//Общие параметры для валидации отдельно взятой формы\

const validationParameters = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  errorTemplateSelector: '.popup__error_type_',
  inactiveButtonClass: 'popup__button-submit_disable',
  inputErrorClass: 'popup__input_invalid',
};

//---------------------------------------------------------------------------------------------------------------------------------
//ФУНКЦИЯ\
//oткрытие ПОПАПА ДОБАВЛЕНИЯ КАРТОЧЕК\
//ресета инпутов при повторном открытии попапа\
//ресета ошибок валидации\
const openPopupAddCard = function () {
  formAddCardElement.reset()
  formAddCardValidator.resetErrorForOpenForm();
  popupAddCard.open();
};

//---------------------------------------------------------------------------------------------------------------------------------
//ФУНКЦИЯ открытия попапа редактирования профиля\
//ресета инпутов при повторном открытии попапа\
//ресета ошибок валидации\
const openPopupEditProfile = function () {
  formProfileEditValidator.resetErrorForOpenForm();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  popupProfile.open()
};

//---------------------------------------------------------------------------------------------------------------------------------
//ЭКЗЕМПЛЯР КЛАССА Отображения информации о пользователе\
const userInfo = new UserInfo(profileInfo);

//---------------------------------------------------------------------------------------------------------------------------------
//ЭКЗЕМПЛЯР КЛАССА отображения картинки открытия попапа\
//навешали слушатели\
const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListener()

//---------------------------------------------------------------------------------------------------------------------------------
//ЭКЗЕМПЛЯР КЛАССА который отвечает за отрисовку элементов на странице\
//Методом берём данные карточек из массива\
const cardContainer = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, selectorTemplate, popupWithImage.open);
    const cardElement = card.createCard()
    return cardElement
  }
}, cardElementSelector)

cardContainer.addCardFromArray()

//---------------------------------------------------------------------------------------------------------------------------------
//ЭКЗЕМПЛЯР КЛАССА для редактирования профиля\
//навешали слушатели\
const popupProfile = new PopupWithForm(popupEditProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputsValue());
  popupProfile.close();
});

popupProfile.setEventListener();

//---------------------------------------------------------------------------------------------------------------------------------
//ЭКЗЕМПЛЯР КЛАССА для добавления карточек\
//навешали слушатели\
const popupAddCard = new PopupWithForm(popupAddCardSelector, (evt) => {
  evt.preventDefault();
  cardContainer.addItem(cardContainer.renderer(popupAddCard.getInputsValue()));
  popupAddCard.close();
});

popupAddCard.setEventListener()

//-----------------------------------------------------------------------------------------------------------------------------------
//ЭКЗЕМПЛЯР класса FormValidation для формы ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ\
//навешали слушатели на форму РЕДАКТИРОВАНИЯ ПРОФИЛЯ\
const formProfileEditValidator = new FormValidator(validationParameters, formProfileEditElement);
formProfileEditValidator.enableValidation()

//ЭКЗЕМПЛЯР класса FormValidation для формы ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ\
//навешали слушатели на форму ДОБАВЛЕНИЯ КАРТОЧЕК\
const formAddCardValidator = new FormValidator(validationParameters, formAddCardElement);
formAddCardValidator.enableValidation()

//------------------------------------------------------------------------------------------------------------------------------------------------
//СЛУШАТЕЛЬ кнопки редактирования профиля\
popupButtonElementEditProfile.addEventListener('click', openPopupEditProfile);

//------------------------------------------------------------------------------------------------------------------------------------------------
//СЛУШАТЕЛЬ кнопки открытия для добавления карточки\
popupButtonElementAddCard.addEventListener('click', openPopupAddCard);



