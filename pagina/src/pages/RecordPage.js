import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/Inputs';
import "./style.css"
import expRegulares from '../utilidades/expresionesRegulares';

const RecordPage = () => {
    const { linkngrok, codigo, number, name, alternative, email, address, description} = useParams();
    const navigate = useNavigate();
    const whatsapp = "3169525151";
    const [formData, setFormData] = useState({
        codigo: codigo || '',
        name: name || '',
        number: number || '',
        alternative: alternative || '',
        email: email || '',
        address: address || '',
        description: description || '',
    });

    useEffect(() => {
        const newUrl = window.location.pathname.split('/').slice(0, 2).join('/');
        window.history.replaceState(null, '', newUrl);
    }, [codigo, linkngrok, name, address, description, alternative, navigate]);

   const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualiza el estado
    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }));

    };

// Manejar el envío del formulario
const handleSubmit = (e) => {
    console.log(formData);
    if(formData.name === ""){

    }
    e.preventDefault();
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
    codigo !== undefined ?
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
                placeholder={"Pedro Perez"}
                value={formData.name}
                onChange={handleChange}
                validationRule={expRegulares.name}
                alertText="Debes ingresar tu nombre y apellido"
            />
            <Input 
                label="Numero Alternativo"
                type="text"
                name="alternative"
                placeholder={"otro numero"}
                value={formData.alternative}
                onChange={handleChange}
            />
            <Input 
                label="email"
                type="email"
                name="email"
                placeholder={"predroperes@gmail.com"}
                value={formData.email}
                onChange={handleChange}
            />
            <Input
                label="Dirreción"
                type="text"
                name="address"
                placeholder={"calle 30 #41-41"}
                value={formData.address}
                onChange={handleChange}
            />
            <Input  
                label="Descripción"
                type="text"
                name="description"
                placeholder={"apartamento 501 torre 5"}
                value={formData.description}
                onChange={handleChange}
            />
            <button type="submit">Enviar</button>
        </form>
    </div> : <div>Hola por favor ve a este whatsapp <a href={`https://wa.me/57${whatsapp}?text=Hola`}>{whatsapp}</a> y seleciona opcion 1 para tener un formulario valido</div>

    
);
};

export default RecordPage;
