import React, { useState } from "react";
import "./style.css";

const Input = ({ 
  value, 
  onChange, 
  name, 
  type, 
  label, 
  placeholder, 
  validationRule, 
  onValidate 
}) => {

  const [isValid, setIsValid] = useState(null); // null: sin validar, true: válido, false: inválido

  const handleBlur = () => {
    if (validationRule) {
      const regex = new RegExp(validationRule.exp); // Crear regex con la regla proporcionada
      const valid = regex.test(value); // Validar el valor
      setIsValid(valid); // Actualizar el estado interno
      onValidate(name, valid); // Notificar al padre sobre el estado de validación
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
      {isValid === false && <span className="alert-text">{validationRule.text}</span>} {/* Mostrar alerta si no es válido */}
    </div>
  );
};

export default Input;
