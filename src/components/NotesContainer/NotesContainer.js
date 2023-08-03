import React, { useEffect, useState } from "react";
import "./NotesContainer.css";
import NoteCard from "../NoteCard/NoteCard";
import { Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

export default function NotesContainer({ courseName, filterValue }) {
  const [notes, setNotes] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    let URL = "http://localhost:3000/api/v1/notes";
    let isCourseNamePresent = courseName !== undefined && courseName !== "";

    if (isCourseNamePresent && filterValue == "course") {
      URL = `http://localhost:3000/api/v1/course/${courseName}/name`;
    }
    else if (isCourseNamePresent && filterValue == "date") {
      URL = `http://localhost:3000/api/v1/notes/date/${courseName}`;
    }

    if(navigator.onLine){
      fetch(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching course");
          }
          return response.json();
        })
        .then((data) => {
          if (isCourseNamePresent && filterValue == "course") {
            const URL2 = `http://localhost:3000/api/v1/courses/${data.id}/notes`;
  
            fetch(URL2, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error fetching notes for course");
                }
                return response.json();
              })
              .then((data) => {
                setNotes(data);
                localStorage.setItem("notes", JSON.stringify(data));
              })
              .catch((error) => {
                setNotes([]); // Reset notes to an empty array
              });
          } else {
            localStorage.setItem("notes", JSON.stringify(data));
            setNotes(data);
          }
        })
        .catch((error) => {
          setNotes([]); // Reset notes to an empty array
        });
    }
    else {
      if(localStorage.getItem("notes") !== null) {
        setNotes(JSON.parse(localStorage.getItem("notes")));
      } 
    }

    
  }, [courseName, token]);

  const rows = [];
  for (let i = 0; i < notes.length; i += 3) {
    rows.push(
      <Row key={i} className="fila_total">
        <Col className="columna1">
          <NoteCard
            title={notes[i].title}
            createdDate={notes[i].publicationDate}
            noteLogo={notes[i].icon}
          />
        </Col>
        {i + 1 < notes.length && (
          <Col className="columna1">
            <NoteCard
              title={notes[i + 1].title}
              createdDate={notes[i + 1].publicationDate}
              noteLogo={notes[i + 1].icon}
            />
          </Col>
        )}
        {i + 2 < notes.length && (
          <Col className="columna1">
            <NoteCard
              title={notes[i + 2].title}
              createdDate={notes[i + 2].publicationDate}
              noteLogo={notes[i + 2].icon}
            />
          </Col>
        )}
      </Row>
    );
  }

  return (
    <div className="container2">
      <h1 className="title2">
        <FormattedMessage id="my_notes" />
      </h1>
      <hr></hr>
      <Col xs={8}>
          {rows}
        </Col>
    </div>
  );
}
