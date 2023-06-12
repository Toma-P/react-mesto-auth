import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import Header from './Header';

function Login({onAuthorization}) {
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
    if(!formValue.email || !formValue.password) {
        console.log("Не оставляйте поля пустыми");
        return;
    }
    onAuthorization(formValue);
  }
  
  return (
    <>
      <Header link="/sign-up" linkText="Регистрация" />
      <PopupWithForm 
        type="auth"
        name="login" 
        title="Вход" 
        buttonText="Войти"
        onSubmit={handleSubmit} 
        //isLoading={}    
      >
        <input  className="auth__form-item"
          type="email" 
          name="email" 
          value={formValue.email} 
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
          value={formValue.password} 
          onChange={handleInputsChange} 
          placeholder="Пароль" 
          required 
        />
      </PopupWithForm>  
    </>
  )
}

export default Login;