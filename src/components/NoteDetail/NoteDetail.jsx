import "./NoteDetail.css";
import React,{useState} from "react";

function NoteDetail(props) {
    const [likes,setLikes] = useState(props.likes);

    // Boton para actualizar la varible de estado
    const handleLikes = () =>{
        console.log("Button of like clicked");
        setLikes(likes +1);
    };
    const noLikes = () =>{
        if (likes === 0){
          return "0";
        }else if(likes > 0){
          return likes ;
        }
      };
    
    
    return (

    <div className="card">
        
        <h1 className="title">{props.title}</h1>

        <a href={props.contenido} className="image-link" >
        <img src={props.image} alt="" className="image" />
        </a>
        <p className="descriptionReview">{props.description}{' '}{props.reseñas}</p>

        


        <div className="images">
            
            <div className="ReviewComment">
                <img src={props.imageIconReview} variant="primary"onClick={handleLikes}  alt="" className="imageIconReview" />
            </div>

            <div className="ReviewComment">
                <h1>{noLikes()}</h1>
            </div> 

        </div>
        
    </div>
        
    );
}

export default NoteDetail;