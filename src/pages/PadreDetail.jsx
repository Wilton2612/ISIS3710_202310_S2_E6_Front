import NoteDetail from "../components/NoteDetail/NoteDetail";
import review from "../components/images/me-gusta.png";
import "../components/NoteDetail/NoteDetail.css";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import React, {useState,useEffect} from 'react';
import axios from "axios";
import { FormattedMessage } from "react-intl";


function PadreDetail(){

    const [notes,setNotes] = useState([]);

    useEffect(() => {

        const getNotas = async () => {
            try{
            //Online Mode
            if(navigator.onLine){
                const token = sessionStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/api/v1/notes/",{
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                setNotes(res.data);
                localStorage.setItem("notes",JSON.stringify(res.data));
            }
            //Offline Mode
            else{
              if(localStorage.getItem("notes")){
                setNotes(JSON.parse(localStorage.getItem("notes")))
              }
            }
            }catch(err){
    
                console.error(err);
                
            }
        }

        getNotas()

        },[])

    let aporte = <FormattedMessage id="Aporte"/>;

    if(aporte === "Contribution Date"){
        aporte="Contribution by: "
    }else{
        aporte = "Fecha de Contribución: "
    }
    /*
    <NoteDetail

    title = {note.title}
    contenido = {note.text}
    image = {note.icon}
    description = {aporte + note.publicationDate}

    imageIconReview = {review} 
    likes = {0}/>
    ))}

*/
    return(

        <div>
            <Nav> </Nav>
                <div className="container">
                {notes.map((note) => (

                    <NoteDetail

                    title = {note.title}
                    contenido = {note.text}
                    image = {note.icon}
                    description = {aporte + note.publicationDate}

                    imageIconReview = {review} 
                    likes = {0}/>
                    ))}
                    
                </div>
            <Footer></Footer>

        </div>

    );
}

export default PadreDetail