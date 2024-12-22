import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/Inputs';
import "./style.css";
import expRegulares from '../utilidades/expresionesRegulares';

const hexToDecimal = (hex) => {
  return parseInt(hex, 16); // Convierte hexadecimal a decimal
};

const RecordPage = () => {
  const { linkngrok, codigo, number, name, alternative, email, address, description } = useParams();
  const navigate = useNavigate();

  // Estado del formulario
  const [formData, setFormData] = useState({
    codigo: codigo || '',
    name: name ? name.replace(/_/g, " ") : '',
    number: hexToDecimal(number) || '',
    alternative: hexToDecimal(alternative) || '',
    email: email || '',
    address: address ? address.replace(/_/g, " ").replace("XZ", "#") : '',
    description: description ? description.replace(/_/g, " ").replace("XZ", "#") : 'Opcional',
  });

  // Estado de validación
  const [validationStatus, setValidationStatus] = useState({
    name: false,
    alternative: false,
    email: false,
    address: false,
    description: true, // Opcional, puede ser siempre válido
  });

  useEffect(() => {
    const newUrl = window.location.pathname.split('/').slice(0, 2).join('/');
    window.history.replaceState(null, '', newUrl);
  }, [codigo, linkngrok, name, address, description, alternative, navigate]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar la validación de cada campo
  const handleValidation = (name, isValid) => {
    setValidationStatus((prevState) => ({
      ...prevState,
      [name]: isValid,
    }));
  };

  // Manejar el envío del formulario
const handleSubmit = (e) => {
    console.log(validationStatus);
    e.preventDefault();
    if(!Object.values(validationStatus).every((status) => status)){
      alert("por favor corrige tu formulacio");
      handleValidation("name");
      return;
    }
    if (linkngrok) {
        fetch(`https://${linkngrok.replace(/p/g, "-")}.ngrok-free.app/record`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => console.log('Form POST response:', data))
            .catch(error => console.error('Error in form POST:', error));
    }
};

  return (
      <div className='conten'>
        <h2>Formulario de Registro</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Para el {formData.number}
          </div>
          <Input
            label="Nombre"
            type="text"
            name="name"
            placeholder="Pedro Perez"
            value={formData.name}
            onChange={handleChange}
            onValidate={handleValidation}
            validationRule={expRegulares.name}
          />
          <Input
            label="Numero Alternativo"
            type="number"
            name="alternative"
            placeholder="Otro número"
            value={formData.alternative}
            onChange={handleChange}
            onValidate={handleValidation}
            validationRule={expRegulares.number}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="pedro@gmail.com"
            value={formData.email}
            onChange={handleChange}
            onValidate={handleValidation}
            validationRule={expRegulares.email}
          />
          <Input
            label="Dirección"
            type="text"
            name="address"
            placeholder="Calle 30 #41-41"
            value={formData.address}
            onChange={handleChange}
            onValidate={handleValidation}
            validationRule={expRegulares.address}
          />
          <Input
            label="Descripción"
            type="text"
            name="description"
            placeholder="Opcional. Ejemplo: Frente a la cancha."
            value={formData.description}
            onChange={handleChange}
          />
          <button type="submit">
            Enviar
          </button>
        </form>
      </div>
  );
};

export default RecordPage;
