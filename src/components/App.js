import React, {useState} from 'react';
import Header from "./Header.js";
import Main from './Main.js';
import Footer from "./Footer.js";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from "./ImagePopup.js";
import PopupWithConfirmation from './PopupWithConfirmation.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false); 
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarProfileOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardDelete, setCardDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    api.getUserInfo()
    .then((res) => {
     setCurrentUser(res);
    })
    .catch((err) => {
      console.log("Ошибка страницы:", err);
    });

    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      })
  }, [])

  function handleCardDelete(cardId) {
    setIsLoading(true);
    api.deleteCard(cardId)
      .then(() => {
        setCards((cards) => 
          cards.filter((item) => 
            item._id !== cardId)
        )
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => 
          state.map((item) => 
            item._id === card._id ? newCard : item));
      })
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      });
  } 

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editUserInfo(data)
      .then((res) => {      
        setCurrentUser(res);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api.editAvatar(link)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      })
      .finally(() => setIsLoading(false));
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setAvatarProfileOpen(false);
    setProfilePopupOpen(false);
    setConfirmationPopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditAvatarClick() {
    setAvatarProfileOpen(true);
  };

  function handleEditProfileClick() {
    setProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function handleDeleteConfirmationClick(card) {
    setConfirmationPopupOpen(true);
    setCardDelete(card);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
          initialCards={cards}
          onCardClick={setSelectedCard} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick}
          onCardDelete={handleDeleteConfirmationClick}
          onCardLike={handleCardLike}
        />
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
          isLoading={isLoading}
        />
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
        />
        <PopupWithConfirmation 
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          card={cardDelete}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
          title="Вы уверены?"
          buttonText="Да"
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
