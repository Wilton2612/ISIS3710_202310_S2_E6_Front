import React, { useState } from 'react';
import './ChangeAttribute.css';
import Input from '../Input/Input';
import { FormattedMessage, useIntl } from "react-intl";

export default function ChangeAttribute({ attributeToChange, closeModal, handleChangeAttribute }) {
  
  const intl = useIntl();
  const [newUsuario, setNewUsuario] = useState('');
  const [newCorreo, setNewCorreo] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});


  const handleSave = () => {
    let newValue = '';
    if (attributeToChange === 'contraseña' || attributeToChange === 'password') {
      if (!password || !confirmPassword) {

        setErrors({
          password: <FormattedMessage id="user_password" />,
          confirmPassword: <FormattedMessage id="user_password" />
        });
      }
      else if (password !== confirmPassword) {
        setErrors({ confirmPassword: <FormattedMessage id="password_match" />});
      } else if (password.length < 6) {
        setErrors({ confirmPassword: <FormattedMessage id="password_length" /> });
      } else {
        newValue = password;
        handleChangeAttribute(attributeToChange, newValue);
        closeModal();
      }

    }
    
    else if (attributeToChange === 'usuario' || attributeToChange === 'user'){
      
      if (!newUsuario) {

        setErrors({ newUsuario: <FormattedMessage id="user_required" /> });
        
     }
     else{
      newValue = newUsuario;
      handleChangeAttribute(attributeToChange, newValue);
      closeModal();
     }
     
    
    }
    else if (attributeToChange === 'correo' || attributeToChange === 'email') {

      if (!newCorreo ) {

          setErrors({ newCorreo: <FormattedMessage id="email_required" /> });
       }
       else{
        newValue = newCorreo;
        handleChangeAttribute(attributeToChange, newValue);
      closeModal();

       }
        
      }
      
  };


  const handleInputChangeUsuario = (event) => {
    setNewUsuario(event.target.value);
  };

  const handleInputChangeCorreo = (event) => {
    setNewCorreo(event.target.value);
  };

  const handleConfirmInputChangePassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  
  const handleInputChangePassword = (event) => {
    setPassword(event.target.value);
  };




  const renderInputFields = () => {
    if ( attributeToChange === 'correo' || attributeToChange === 'email') {
      return (
        <div>
          
          <Input name={'entrada'} type="text" value={newCorreo} onChange={handleInputChangeCorreo}   />
          {errors.newCorreo && <span className='nuevos_datos'>{errors.newCorreo}</span>}
        </div>
      );
    } 
    if (attributeToChange === 'usuario' || attributeToChange === 'user') {
      return (
        <div>
          
          <Input name={'entrada'} type="text" value={newUsuario} onChange={handleInputChangeUsuario}   />
          {errors.newUsuario && <span className='nuevos_datos' >{errors.newUsuario}</span>}
        </div>
      );
    } 
    
    else if (attributeToChange === 'contraseña' || attributeToChange === 'password') {
      return (
        <div>
          <label><FormattedMessage id="new_password" /></label>
          <Input name={'entrada'} type="password" value={password} onChange={handleInputChangePassword}   />
          {errors.confirmPassword && <span className='nuevos_datos' >{errors.confirmPassword}</span>}
          <label><FormattedMessage id="confirm_password" /></label>
          <Input name={'entrada'} type="password" value={confirmPassword} onChange={handleConfirmInputChangePassword}   />
          {errors.confirmPassword && <span className='nuevos_datos' >{errors.confirmPassword}</span>}
        </div>
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3><FormattedMessage id="change_atributes" /> {attributeToChange}</h3>
        {renderInputFields()}
        <button onClick={handleSave}><FormattedMessage id="save_changes" /></button>
        <button onClick={closeModal}><FormattedMessage id="cancel" /></button>
      </div>
    </div>
  );
}
