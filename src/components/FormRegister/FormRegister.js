import Input from '../Input/Input'
import Button from '../Button/Button'
import LogoIniciSesion from '../../assets/images/usuarios.png'
import './FormRegister.css'
import { FormattedMessage, useIntl } from "react-intl";

import { Link, useNavigate  } from 'react-router-dom';

const { useEffect, useState } = require("react");

const API_URL = 'http://localhost:3000/api/v1';

export default function FormRegister() {

  const intl = useIntl();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      
      console.log("Enviar datos de registro", { name, email, password, confirmPassword, userType });
      sendData();
    } else {
      setErrors(errors);
    }
  };

  const validate = () => {
    const errors = {};
    if (!name) errors.name = <FormattedMessage id="name_required" />;
    if (!email) errors.email = <FormattedMessage id="email_required" />;
    if (!password) errors.password = <FormattedMessage id="user_password" />;
    if (password.length < 6) errors.password = <FormattedMessage id="password_length" />;
    if (password !== confirmPassword) errors.confirmPassword = <FormattedMessage id="password_match" />;
    if (!userType) errors.userType = <FormattedMessage id="select_role" />;
    return errors;
  };

  const sendData = async () => {
    if (name !== "" && email !== "" && password !== "" && userType !== "") {

      if (password.length < 6) {
        setErrors({ password: <FormattedMessage id="password_match" /> });
        return;
      }
      const data = { name, email, image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYrxQvllTdzDn5i8SVqtD_FRp4cV5fq8oaJRCAJWPUAFY-jPFMBOsST3iCLxQZlHssJ40&usqp=CAU', password, user:'', userType };
      fetch(`${API_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("La red no responde");
        }

        navigate('/login');
        return response.json();
      })
      .then(data => { 
        console.log(data)
      })
      .catch(error => {
        console.error("Tenemos un problema con el registro:", error);
      });
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);


  return (
    
        <div className='container'>
          <img src={LogoIniciSesion} alt="Logo" className='logo_inicio_sesion' />
          <p className='texto_inicio_sesion'> <FormattedMessage id="sign_up" /> </p>
          <form onSubmit={handleSubmit}>
  
            <Input type={'text'} id={'nombre'} text={intl.formatMessage({ id: 'name_user' })} value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <span>{errors.name}</span>}
    
  
            <Input type={'email'} id={'email'} text={intl.formatMessage({ id: 'email' })} value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <span>{errors.email}</span>}
  
            <Input type={'password'} id={'password'} text={intl.formatMessage({ id: 'password' })} value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <span>{errors.password}</span>}
  
  
            <Input type={'password'} id={'confirmPassword'} text={intl.formatMessage({ id: 'confirm_password' })}  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
  
  
            <div className="form__radio">
              <p><FormattedMessage id="select_role" /></p>
              <label>
                <input type="radio" value="Estudiante"  name="rol" onChange={(e) => setUserType(e.target.value)} />
                <FormattedMessage id="student" />
              </label>
              <label>
                <input type="radio" value="Profesor" name="rol" onChange={(e) => setUserType(e.target.value)} />
                <FormattedMessage id="teacher" />
              </label>
              {errors.userType && <span className="roles">{errors.userType}</span>}
            </div>
  
            <Button name={"form__account"} id={'bt'} type="submit" text={intl.formatMessage({ id: 'sign_up' })} />
  
  
            <div className="form__help">
              <Link to="/login"> <FormattedMessage id="suggest_login" /> </Link>
            </div>
          </form>
        </div>
      )
}


