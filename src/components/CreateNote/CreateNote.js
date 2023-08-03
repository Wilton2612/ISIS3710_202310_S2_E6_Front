import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import "./CreateNote.css";
import { FormattedMessage, useIntl } from "react-intl";

const API_URL = "http://localhost:3000/api/v1";

export default function CreateNote() {
  const intl = useIntl();
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [icono, setIcono] = useState("");
  const [portada, setPortada] = useState("");
  const [accesible, setAccesible] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Enviar datos de registro", { titulo, texto, icono, portada, accesible });
      sendData();
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = () => {
    const validationErrors = {};
    if (!titulo) validationErrors.titulo = <FormattedMessage id="title_required" />;
    if (!texto) validationErrors.texto = <FormattedMessage id="write_required" />;
    if (!accesible) validationErrors.accesible = <FormattedMessage id="accessible_required" />;
    return validationErrors;
  };

  const sendData = async () => {
    if (titulo !== "" && texto !== "" && accesible !== "") {
      
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear().toString().slice(-2);
      const formattedDate = `${day}-${month}-${year}`;

      const token = sessionStorage.getItem('token');
      const decodedToken = decodeToken(token);
      const userId = decodedToken.sub;

      console.log('Información del usuario:', titulo, texto, accesible)
      const data = { title:titulo, text:texto, icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYrxQvllTdzDn5i8SVqtD_FRp4cV5fq8oaJRCAJWPUAFY-jPFMBOsST3iCLxQZlHssJ40&usqp=CAU', 
      portada:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYrxQvllTdzDn5i8SVqtD_FRp4cV5fq8oaJRCAJWPUAFY-jPFMBOsST3iCLxQZlHssJ40&usqp=CAU', accessible:accesible,
      publicationDate: formattedDate };

      fetch(`${API_URL}/users/${userId}/notes`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("La red no responde");
          }
          navigate('/notes')
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Tenemos un problema con el registro:", error);
        });
    }
  };


  const decodeToken = token => {

    const tokenParts = token.split('.');
    const base64Url = tokenParts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = JSON.parse(window.atob(base64));
    return decodedData;
};


  return (
    <>
      <Nav />
      <div className="marco">
        <form onSubmit={handleSubmit}>
          <input
            className="boton_titulo"
            placeholder= {intl.formatMessage({ id: 'title' })}
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          {errors.titulo && <span>{errors.titulo}</span>}

          <textarea
            className="texto_grande"
            id="texto"
            placeholder={intl.formatMessage({ id: 'write' })}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
          {errors.texto && <span>{errors.texto}</span>}


          <div className="documentos">
          <input
            className="carga_icono"
            type="file"
            accept="image/*"
            id="icono-input"
            onChange={(e) => setIcono(e.target.files[0])}
          />
          <label htmlFor="icono-input" className="file-label">
            <span><FormattedMessage id="select_icon" /></span>
          </label>

          <input
            className="carga_portada"
            type="file"
            accept="image/*"
            id="portada-input"
            onChange={(e) => setPortada(e.target.files[0])}
          />
          <label htmlFor="portada-input" className="file-label">
            <span><FormattedMessage id="select_portada" /></span>
          </label>

          </div>


          

          <div className="form__visibilidad">
            <p><FormattedMessage id="choose_accessibility" /></p>
            <label>
              <input
                type="radio"
                value="Si"
                name="rol"
                onChange={(e) => setAccesible(e.target.value)}
              />
              <FormattedMessage id="yes" />
            </label>
            <label>
              <input
                type="radio"
                value="NO"
                name="rol"
                onChange={(e) => setAccesible(e.target.value)}
              />
              <FormattedMessage id="no" />
            </label>
            {errors.accesible && <span className="roles">{errors.accesible}</span>}
          </div>

          <button className="crear_note" id="bt" type="submit">
          <FormattedMessage id="send" />
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
