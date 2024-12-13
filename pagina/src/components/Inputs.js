import React, { useState } from "react";
import "./style.css";

const Input = ({ 
  value, 
  onChange, 
  name, 
  type, 
  label, 
  placeholder, 
  alertText, 
  validationRule 
}) => {
  const [isValid, setIsValid] = useState(null); // null: sin validar, true: válido, false: inválido

  const handleBlur = () => {
    if (validationRule) {
      const regex = new RegExp(validationRule); // Crear regex con la regla proporcionada
      setIsValid(regex.test(value)); // Validar el valor y actualizar el estado
    }
  };

  return (
    <div className={`inputs-conten ${isValid === true ? "valid" : isValid === false ? "invalid" : ""}`}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur} // Validar al perder el foco
      />
      {isValid === false && <span className="alert-text">{alertText}</span>} {/* Mostrar alerta si no es válido */}
    </div>
  );
};

export default Input;
