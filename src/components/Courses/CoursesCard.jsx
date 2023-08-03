import React from 'react'
import {Link} from "react-router-dom"
import { FormattedMessage } from "react-intl";


export default function CoursesCard({name,image,code,section}) {
  return (
    
    <div className="card">

        
      {/* name */}
      <h1 className="name">{name}</h1>

      {/* imagen */}
      <img src={image} alt="carta ciudad" className="imagen" />


    <div class="row">
        <div class="column">
            <div className = "titulos">
              <FormattedMessage id="Code" />
            </div>
            <div className = "titulos">
              <FormattedMessage id="Section" />
            </div>
        </div>
          <div class="column">
              <div className = "titulos">
                <p className="titulosvalor">{code}</p>
                </div>
                <div className = "titulos">
                <p className="titulosvalor">{section}</p>
              </div>
          </div>
        </div>
      <div>
            {/* button */}
            <Link to={"/notes"} className="boton">
              <p className="textoBoton"><FormattedMessage id="textoBoton" /></p>
            </Link>

      </div>



    </div>
  )
}
