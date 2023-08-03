import './Inicio.css'
import CreateNote from '../../components/CreateNote/CreateNote';
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import { FormattedMessage } from 'react-intl';
import ImagePortada from '../../assets/images/imagen_home.jpg';
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";


export default function Inicio() {

    return (
        <>
            <Nav />
            <div className="contenedor1">

                <div class="imagenss">
                    <img src={ImagePortada} alt="Logo" className='imagen_bienvenida' />
                </div>

                <div className="home">
                    <p className="texto_pa">
                        <FormattedMessage id="create_notes_id" />
                    </p>

                    <button className="crear" id="bt" type="button" onClick={() => { window.location.href = "/login" }}>
                        <FormattedMessage id="create_note_id" />
                    </button>
                </div>

            </div>
            <Footer />
        </>


    );
}
