import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import Header from './Header';

function Register({onRegister}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  
  function handleInputsChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  
  function handleSubmit(e) {
      e.preventDefault();
      onRegister(formValue);
    } 
  
  return (
    <>
      <Header link="/sign-in" linkText="Войти" />
      <PopupWithForm 
        type="auth"
        name="reg" 
        title="Регистрация" 
        buttonText="Зарегистрироваться"
        questionText="Уже зарегистрированы?"
        onSubmit={handleSubmit} 
        //isLoading={}    
      >
      <input  className="auth__form-item"
        type="email" 
        name="email" 
        value={ formValue.email } 
        onChange={handleInputsChange}
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        className="auth__form-item" 
        name="password" 
        minLength="6" 
        maxLength="12" 
        value={ formValue.password } 
        onChange={handleInputsChange} 
        placeholder="Пароль" 
        required 
      />
      </PopupWithForm>
    </>
  )
}

export default Register;