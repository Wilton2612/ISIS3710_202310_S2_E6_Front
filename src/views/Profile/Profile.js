
import './Profile.css'
import FotoPerfil from '../../assets/images/foto_avatar.png'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import Modal from '../../components/ChangeAttribute/ChangeAttribute';
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

const API_URL = 'http://localhost:3000/api/v1';

const { useEffect, useState } = require("react");

export default function Profile() {

  const intl = useIntl();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [hidden, setHidden] = useState('');
  const [attributeToChange, setAttributeToChange] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
    user: '',
    userType: '',
  });

  useEffect(() => {

    if (!navigator.onLine) {
      if (localStorage.getItem('userData') === null) {
        setUser({ ...user, name: 'Loading...' });
      } else {
        const userData = JSON.parse(localStorage.getItem('userData'));

        const { password, ...userDataWithoutPassword } = userData;
        const asterisks = '*'.repeat(Math.min(password.length, 10));
        console.log("contraseña offline: ", asterisks)
        setHidden(asterisks);
        setUser(userDataWithoutPassword);
        
      }
    }
          else {
        const token = sessionStorage.getItem('token');
        const decodedToken = decodeToken(token);
        const userId = decodedToken.sub;


        fetch(`${API_URL}/users/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => response.json())
          .then(data => {

            console.log('Información del usuario:', data, data.password)
            const asterisks = '*'.repeat(Math.min(data.password.length, 10));
            setHidden(asterisks);
            setUser(data);
            localStorage.setItem('userData', JSON.stringify(data));
          })
          .catch(error => {
            console.error('Error al obtener la información del usuario:', error);
          });



      }
    }, []);

  const openModal = (attribute) => {
    setAttributeToChange(attribute);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChangeAttribute = (attributeName, newValue) => {
    const token = sessionStorage.getItem('token');
    console.log('Tokensssssssssssss:', token);
    const decodedToken = decodeToken(token);
    console.log("token decodificado: ", decodedToken)
    const userId = decodedToken.sub;

    console.log('Atributo a actualizar:', userId);
    const data = {
      id: userId,
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image,
      user: user.user,
      userType: user.userType
    };


    if (attributeName === 'contraseña' || attributeName === 'password') {
      data.password = newValue;

    }
    else if (attributeName === 'correo' || attributeName === 'email') {
      data.email = newValue;

    }
    else {
      data.user = newValue;
    }

    fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Atributo actualizado:', data);

        setUser(data);
        closeModal();
      })
      .catch(error => {
        console.error('Error al actualizar el atributo:', error);
      });
  };


  const decodeToken = token => {

    const tokenParts = token.split('.');
    const base64Url = tokenParts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = JSON.parse(window.atob(base64));
    return decodedData;
  };


  const onLogout = () => {
    sessionStorage.removeItem("token");
    navigate('/');
  };

  return (
    <div>
      <Nav />
      <div className='conten_principal'>
        <h3 className='my_profile'><FormattedMessage id="my_profile" /></h3>
        <div className='contenido_perfil'>
          <div className='foto_cambiar'>
            <img src={user.image} alt="Logo" className='perfil_avatar' />
            <p><FormattedMessage id="change_picture" /></p>
          </div>
          <div className='datos_personales'>
            <div className='datos'>
              <p className='nombres'><FormattedMessage id="name_user" /></p>
              <p>{user.name}</p>
            </div>

            <div className='datos'>
              <p className='nombres'><FormattedMessage id="user_name" /></p>
              <p>{user.user}</p>
            </div>

            <div className='datos'>
              <p className='nombres'><FormattedMessage id="rol_user" /></p>
              <p>{user.userType}</p>
            </div>

          </div>
          <div className='botones_cambiar'>
            <button className='btn_cambiar' onClick={() => openModal(intl.formatMessage({ id: 'user' }))}><FormattedMessage id="change_atributes" /></button>
          </div>
        </div>

        <h3 className='security'><FormattedMessage id="account_security" /></h3>
        <div className='account_security'>
          <div className='datos_personales1'>
            <div className='datos1'>
              <p className='nombres1'><FormattedMessage id="email" /></p>
              <p>{user.email}</p>
            </div>
            <div className='datos1'>
              <p className='nombres1'><FormattedMessage id="password" /></p>
              <p>{hidden}</p>
            </div>
          </div>

          <div className='botones_cambiar2'>
            <button className='btn_abajo' onClick={() => openModal(intl.formatMessage({ id: 'email_v2' }))}><FormattedMessage id="change_atributes" /></button>
            <button className='btn_abajo' onClick={() => openModal(intl.formatMessage({ id: 'password_v2' }))}><FormattedMessage id="change_atributes" /></button>
          </div>


        </div>
        {showModal && (
          <Modal
            attributeToChange={attributeToChange}
            closeModal={closeModal}
            handleChangeAttribute={handleChangeAttribute}
          />
        )}
        <button className="salir" onClick={onLogout}>
          <FormattedMessage id="log_ut" />
        </button>
      </div>

      <Footer />
    </div>

  );
}