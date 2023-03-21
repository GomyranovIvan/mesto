//Поиск
const popupElement = document.querySelector('.popup');
const popupElementEditProfile = document.querySelector('.popup_content_edit-profile');
const popupElementAddCard = document.querySelector('.popup_content_card');
const formElement = document.querySelector('.popup__form');
const formElementContentAdd = document.querySelector('.popup__form_content_add');
const formElementContentEdit = document.querySelector('.popup__form_content_edit')
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

//Закрытие popup
const popupCloseButtonElementEditProfil = popupElementEditProfile.querySelector('.popup__close');
const popupCloseButtonElementCard = popupElementAddCard.querySelector('.popup__close')
//const popupCloseButtonElementCard = document.getElementById('btnCardClose')
//const popupCloseButtonElementEditProfil = document.getElementById('btnEditClose')

//Открытие popup
const popupEditButtonElement = document.querySelector('.profile__button-edit');
const popupAddButtonElement = document.querySelector('.profile__button-add');

//Инпуты
const nameInput = formElementContentEdit.querySelector('.popup__input_text_name');
const descriptionInput = formElementContentEdit.querySelector('.popup__input_text_description');
const cardNameInput = formElementContentAdd.querySelector('.popup__input_text_card-name');
const cardLinkInput = formElementContentAdd.querySelector('.popup__input_text_card-link');
//Cards
const cardsTemplate = document.querySelector('.cards-template').content;
const cardsList = document.querySelector('.cards');



//Массив cards
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

//Добавление template-cards
initialCards.forEach(function (element){
  renderItem(element)
});

function renderItem(item) {
  const initialCardsElement = cardsTemplate.cloneNode(true);
  initialCardsElement.querySelector('.cards__caption').textContent = item.name;
  initialCardsElement.querySelector('.cards__image').src = item.link;
  initialCardsElement.querySelector('.cards__image').alt = item.name;
  // setEventListeners(initialCardsElement);
  cardsList.append(initialCardsElement);
};

//Добавлние карточки 
function handleFormSubmitCreate (evt) {
  evt.preventDefault();
  const initialCardsElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);
  let addLink = cardLinkInput.value;
  let addText = cardNameInput.value;
  initialCardsElement.querySelector('.cards__caption').textContent = addText;
  initialCardsElement.querySelector('.cards__image').src = addLink;
  initialCardsElement.querySelector('.cards__image').alt = 'Фотография' + addText;
  cardsList.prepend(initialCardsElement);

  closePopup();
}


//Открытие popupEditProfile
const openPopupEditProfile = function () {
    popupElementEditProfile.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
};

//Открытие popupAddCard
const openPopupAddCard = function () {
    popupElementAddCard.classList.add('popup_opened');
};

//Закрытие popup
const closePopup = function () {
    popupElementAddCard.classList.remove('popup_opened');
    popupElementEditProfile.classList.remove('popup_opened');  
};

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmitSave (evt) {
    evt.preventDefault(); 
    console.log(evt)
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup()
};

//Удаление карточки
// function handleDelete (event) {
//   console.log(event)
//   const card = event.target.closest('cards__item');
//   card.remove();
// }

// // function setEventListeners (initialCardsElement) {
// //   initialCardsElement.querySelector('.cards__delete').addEventListener('click', handleDelete)
// // }
// document.querySelector('.cards__delete').addEventListener('click', handleDelete);

popupEditButtonElement.addEventListener('click', openPopupEditProfile);
popupCloseButtonElementCard.addEventListener('click', closePopup);
popupCloseButtonElementEditProfil.addEventListener('click', closePopup);
popupAddButtonElement.addEventListener('click', openPopupAddCard);
popupElementAddCard.addEventListener('submit', handleFormSubmitCreate)
popupElementEditProfile.addEventListener('submit', handleFormSubmitSave);
