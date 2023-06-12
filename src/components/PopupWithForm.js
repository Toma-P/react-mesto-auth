import React from "react";
import { Link } from "react-router-dom";

function PopupWithForm({type, isOpen, onClose, name, title, buttonText, questionText, onSubmit, isLoading, children}) {
 
  function handleSubmitClick(e) {
    onSubmit(e);
  }
  
  return (
    <section className={`${type} ${type}_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`${type}__container`}>
        {isOpen && <button type="button" onClick={onClose} aria-label="Закрыть" className="popup__close-button"></button>}
        <h2 className={`${type}__title`}>{title}</h2>
        <form className={`${type}__form`} name={name} onSubmit={handleSubmitClick} noValidate>
          {children}
          <button type="submit" className={`${type}__form-submit`}>{isLoading ? 'Сохранение...' : buttonText}</button>
          {questionText && 
            <p className={`${type}__form-question`}>{questionText}<Link className={`${type}__form-link`} to="/sign-in">Войти</Link></p>} 
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;