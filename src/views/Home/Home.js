
import './Home.css'

import CreateNote from '../../components/CreateNote/CreateNote';
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import ImagePortada from '../../assets/images/imagen_home.jpg';
import { FormattedMessage } from 'react-intl';

export default function Home() {

    return (
        <>
            <Nav />
            <div className="contenedor1">

                <div className="imagenss">
                    <img src={ImagePortada} alt="Logo" className='imagen_bienvenida' />
                </div>

                <div className="home">
                    <p className="texto_pa">
                        <FormattedMessage id="create_notes_id" />
                    </p>

                    
                    <button className="crear" id="bt" type="button" onClick={() => { window.location.href = "/create-note" }}>
                        <FormattedMessage id="create_note_id" />
                    </button>
                
                </div>

            </div>
            <Footer />
        </>


        

    );
}
