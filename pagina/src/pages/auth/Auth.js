import React, { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { auth } from "../../firebase/config";

const Auth = ({ setEstado }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuario logueado");
        setEstado(true); // Actualiza el estado del padre a true
      })
      .catch((error) => {
        console.error(`Error al iniciar sesión: ${error.code} - ${error.message}`);
        setEstado(false); // Mantiene el estado en false si falla
      });
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      //const uid = user.uid;
      setEstado(true);
      // ...
    } else {
      // User is signed out
      // ...
      setEstado(false);
    }
  });

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default Auth;
