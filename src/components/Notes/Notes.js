import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import CreateNote from "../CreateNote/CreateNote";
import "./Notes.css";
import SearchBar from "../SearchBar/SearchBar";
import { Col } from "react-bootstrap";
import NotesContainer from "../NotesContainer/NotesContainer";
import React, {useState } from "react";

export default function Notes({}) {

  const [searchValue, setSearchValue] = useState("");
  
  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const [filterValue, setFilterValue] = useState("");

  const handleFilter = (value) => {
    setFilterValue(value);
  };
  

  return (
    <div className="notes">
      <Col>
        <Nav> </Nav>
        <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
        <NotesContainer courseName={searchValue} filterValue={filterValue}/>
        <Footer></Footer>
      </Col>
    </div>
  );
}
