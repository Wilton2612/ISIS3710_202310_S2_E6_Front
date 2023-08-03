import React, { useState, useEffect } from "react";
import axios from "axios";
import CoursesCard from "./CoursesCard";
import "./Course.css";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";


export default function Parcial() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {

    const getNotas = async () => {
        try{
          //Online Mode
          if(navigator.onLine){
            const token = sessionStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/api/v1/course",{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
            setCourses(res.data);
            localStorage.setItem("courses",JSON.stringify(res.data));
          }
          //Offline Mode
          else{
            if(localStorage.getItem("courses")){
              setCourses(JSON.parse(localStorage.getItem("courses")))
            }
          }


        }catch(err){

            console.error(err);
            
        }
    }

    getNotas();

    },[])

  return (

    <div>
    <Nav> </Nav>
    
      <div className="contenedor">

      {courses.map((course) => (
        <CoursesCard
        name={course.name}
        image= {course.image}
        code={course.code}
        section={course.section}
    />))}
      </div>
    <Footer></Footer>

    </div>
  );
}