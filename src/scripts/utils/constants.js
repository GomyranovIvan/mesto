//Общие параметры для валидации отдельно взятой формы\

const validationParameters = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  errorTemplateSelector: '.popup__error_type_',
  inactiveButtonClass: 'popup__button-submit_disable',
  inputErrorClass: 'popup__input_invalid',
};

const popupButtonElementEditAvatar = document.querySelector('.profile__avatar')
const popupButtonElementEditProfile = document.querySelector('.profile__button-edit');
const popupButtonElementAddCard = document.querySelector('.profile__button-add');
const formProfileEditElement = document.forms.popupFormProfileEdit;
const formAddCardElement = document.forms.popupFormAddImage;
const formAvatarEditElement = document.forms.popupFormAvatarEdit;

//Селекторы для классов\
const selectorTemplate = '#cards-template'
const popupEditProfileSelector = '.popup_content_edit-profile';
const popupAddCardSelector = '.popup_content_card'
const popupImageSelector = '.popup_content_image';
const popupEditAvatarSelector = '.popup_content_avatar'
const cardElementSelector = '.cards';
const popupDeleteSelector = '.popup_content_delete'

const profileInfo = {
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description',
  profileAvatarSelector: '.profile__avatar'
}

export {
  popupButtonElementEditProfile,
  popupButtonElementEditAvatar,
  formAvatarEditElement,
  formProfileEditElement,
  popupButtonElementAddCard,
  formAddCardElement,
  selectorTemplate,
  popupEditProfileSelector,
  popupAddCardSelector,
  popupImageSelector,
  popupEditAvatarSelector,
  cardElementSelector,
  popupDeleteSelector,
  profileInfo,
  validationParameters
}