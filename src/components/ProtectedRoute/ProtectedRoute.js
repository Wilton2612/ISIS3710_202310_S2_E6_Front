import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("Toke22222222222222222n:", token);
    if (token) {
        console.log("hatsa ciando: ", token)
      setLoggedIn(true);
    } else {
        console.log("mira veeee: ", token)
      setLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    console.log("ehhhhhhhh pero que vaina: ", isLoggedIn)
    console.log("el usuario no está logueado: ")
    return <Navigate to="/login" />;
  }
  console.log("el usuario está logueado: ")
  return children;
}

export default ProtectedRoute;
