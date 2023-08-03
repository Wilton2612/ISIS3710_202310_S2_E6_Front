import Input from '../Input/Input'
import Button from '../Button/Button'
import './FormLogin.css'
import LogoIniciSesion from '../../assets/images/usuarios.png'
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from "react-intl";

const { useEffect, useState } = require("react");

const API_URL = 'http://localhost:3000/api/v1';

export default function FormLogin() {
  const intl = useIntl();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [errorsSearch, setErrorsSearch] = useState({});
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {

      console.log("Enviar datos de registro", { email, password });
      sendData();
    } else {
      setErrors(errors);
    }
  };


  const validate = () => {
    const errors = {};
    if (!email) errors.email = <FormattedMessage id="email_required" />;
    if (!password) errors.password = <FormattedMessage id="user_password" />;
    if (password.length < 6) errors.password =<FormattedMessage id="password_length" />;
    return errors;
  };



  const sendData = async () => {
    if (email !== "" && password !== "") {

      if (password.length < 6) {
        setErrors({ password: <FormattedMessage id="password_length" />});
        return;
      }

      try {


        const datosEnviados = { email, password };

        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(datosEnviados),
          headers: {
            'Content-Type': 'application/json'
          }
        })


        if (response.status === 404) {

          setErrorsSearch({ email_password: <FormattedMessage id="email_password_incorrect" /> });
          return;
        }


        if (!response.ok) {

          throw new Error("La red no responde");

        }

        const data = await response.json();
        sessionStorage.setItem('token', data.token);
        console.log("Por Dios bendito: ", data);
        navigate('/home');

      } catch (error) {
        console.error("Tenemos un problema con el inicio de sesión:", error);
      }
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
      <p className='texto_inicio_sesion'><FormattedMessage id="login" /></p>
      <form onSubmit={handleSubmit}>
        <div>
          <Input type="text" id="usuario" text={intl.formatMessage({ id: 'email' })} value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && !errorsSearch.email_password && <span>{errors.email}</span>}
        </div>
        <div>
          <Input type="password" id="password" text={intl.formatMessage({ id: 'password' })} value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && !errorsSearch.email_password && <span>{errors.password}</span>}
        </div>
        {errorsSearch.email_password && (
          <span>{errorsSearch.email_password}</span>
        )}
        <div>
          <Button name="form__account" id="bt" type="submit" text={intl.formatMessage({ id: 'login' })}  />
        </div>

        <div className="form__help">
          <Link to="/signup"><FormattedMessage id="suggest_register" /></Link>
        </div>
      </form>
    </div>
  );


}
