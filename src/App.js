import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import FormLogin from "../src/components/FormLogin/FormLogin";
import FormRegister from "../src/components/FormRegister/FormRegister";
import Home from "../src/views/Home/Home";
import Notes from "./components/Notes/Notes";
import Profile from "../src/views/Profile/Profile";
import PadreDetail from "./pages/PadreDetail";
import Courses from "./components/Courses/Courses";
import CreateNote from "./components/CreateNote/CreateNote";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Inicio from "./views/Inicio/Inicio";



function App() {

  return (
    <div>
      <Router>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/signup" element={<FormRegister />} />
          <Route path="/create-note" element={<ProtectedRoute> <CreateNote /> </ProtectedRoute>} />
          <Route path="notes/noteDetail/:noteId" element={  <ProtectedRoute><PadreDetail /></ProtectedRoute>} />
          <Route path='/courses' element={<ProtectedRoute> <Courses /> </ProtectedRoute>} />
          <Route path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          <Route path='/notes' element={<ProtectedRoute> <Notes /> </ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
