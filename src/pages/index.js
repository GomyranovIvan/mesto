import Api from '../scripts/components/Api.js'
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import './index.css';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithDelete from '../scripts/components/PopupWithDelete.js';
import {
  popupButtonElementEditProfile,
  popupButtonElementEditAvatar,
  formProfileEditElement,
  formAvatarEditElement,
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
} from '../scripts/utils/constants.js'


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: 'fbe9b2e0-1fe5-42c6-8343-9e1f997b5c6b',
    'Content-Type': 'application/json'
  }
});

//---------------------------------------------------------------------------------------------------------------------------------
//ФУНКЦИЯ\
//oткрытие ПОПАПА ДОБАВЛЕНИЯ КАРТОЧЕК\
//ресета инпутов при повторном открытии попапа\
//ресета ошибок валидации\
const openPopupAddCard = function () {
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

const openPopupEditAvatar = function () {
  formAvatarEditValidator.resetErrorForOpenForm();
  popupEditAvatar.open()
}

//---------------------------------------------------------------------------------------------------------------------------------
//ЭКЗЕМПЛЯР КЛАССА Отображения информации о пользователе\
const userInfo = new UserInfo(profileInfo);

//---------------------------------------------------------------------------------------------------------------------------------
//ЭКЗЕМПЛЯР КЛАССА отображения картинки открытия попапа\
//навешали слушатели\
const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListener()

//---------------------------------------------------------------------------------------------------------------------------------
function createNewCard(item) {
  const card = new Card(item, selectorTemplate, popupWithImage.open, popupDelete.open, () => {
    const isLiked = card.isLikedByMy();
    if (isLiked) {
      api.deleteLike(item._id)
        .then((res) => {
          card.updateLikesCount(res.likes)
          card.toggleLike()
        })
        .catch(((error) => console.error(`Error removing like ${error}`)))
        .finally()
    } else {
      api.addLike(item._id)
        .then((res) => {
          card.updateLikesCount(res.likes)
          card.toggleLike()
        })
        .catch(((error) => console.error(`Error adding like ${error}`)))
        .finally()
    }
  });
  return card.createCard()

}

const cardConteiner = new Section((item) => {
  cardConteiner.addItemAppend(createNewCard(item))
}, cardElementSelector)

//---------------------------------------------------------------------------------------------------------------------------------
//ЭКЗЕМПЛЯР КЛАССА для редактирования профиля\
//навешали слушатели\
const popupProfile = new PopupWithForm(popupEditProfileSelector, (data) => {
  api.setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo({ username: res.name, description: res.about, avatar: res.avatar })
      popupProfile.close();
    })
    .catch(((error) => console.error(`Error while editing profile ${error}`)))
    .finally(() => popupProfile.setupDefaultText())
});

popupProfile.setEventListener();

//---------------------------------------------------------------------------------------------------------------------------------
//ЭКЗЕМПЛЯР КЛАССА для добавления карточек\
//навешали слушатели\
const popupAddCard = new PopupWithForm(popupAddCardSelector, (element) => {
  // cardConteiner.addItemPrepend(element);
  api.addCard(element)
    .then((dataCard) => {
      dataCard.myid = userInfo.getId();
      cardConteiner.addItemPrepend(createNewCard(dataCard))
      popupAddCard.close();
    })
    .catch(((error) => console.error(`Error adding new card ${error}`)))
    .finally(() => popupAddCard.setupDefaultText())

});

popupAddCard.setEventListener()

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, (element) => {
  api.setNewAvatar(element)
    .then((res) => {
      console.log(res)
      userInfo.setUserInfo({ username: res.name, description: res.about, avatar: res.avatar })
      popupEditAvatar.close()
    })
    .catch(((error) => console.error(`Error while editing avatar ${error}`)))
    .finally(() => popupEditAvatar.setupDefaultText())
})
popupEditAvatar.setEventListener()

const popupDelete = new PopupWithDelete(popupDeleteSelector, ({ card, cardId }) => {
  api.deleteCard(cardId)
    .then(() => {
      card.removeCardElement()
      popupDelete.close()
    })
    .catch(((error) => console.error(`Error while removing card ${error}`)))
    .finally(() => popupDelete.setupDefaultText())
})
popupDelete.setEventListener()
//-----------------------------------------------------------------------------------------------------------------------------------
//ЭКЗЕМПЛЯР класса FormValidation для формы ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ\
const formProfileEditValidator = new FormValidator(validationParameters, formProfileEditElement);
formProfileEditValidator.enableValidation();

//ЭКЗЕМПЛЯР класса FormValidation для формы ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ\
const formAddCardValidator = new FormValidator(validationParameters, formAddCardElement);
formAddCardValidator.enableValidation();

//ЭКЗЕМПЛЯР класса FormValidation для формы ПОПАПА РЕДАКТИРОВНИЯ АВАТАРА\
const formAvatarEditValidator = new FormValidator(validationParameters, formAvatarEditElement);
formAvatarEditValidator.enableValidation();

//------------------------------------------------------------------------------------------------------------------------------------------------
//СЛУШАТЕЛЬ кнопки редактирования профиля\
popupButtonElementEditProfile.addEventListener('click', openPopupEditProfile);

//------------------------------------------------------------------------------------------------------------------------------------------------
//СЛУШАТЕЛЬ кнопки редактирования аватара\
popupButtonElementEditAvatar.addEventListener('click', openPopupEditAvatar);

//------------------------------------------------------------------------------------------------------------------------------------------------
//СЛУШАТЕЛЬ кнопки открытия для добавления карточки\
popupButtonElementAddCard.addEventListener('click', openPopupAddCard);


Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach((item) => item.myid = dataUser._id)
    userInfo.setUserInfo({ username: dataUser.name, description: dataUser.about, avatar: dataUser.avatar })
    userInfo.setId(dataUser._id)
    cardConteiner.addCardFromArray(dataCard)
  })
  .catch(((error) => console.error(`error while creating page initial data ${error}`)))