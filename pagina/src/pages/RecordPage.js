import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/Inputs';
import "./style.css"

const RecordPage = () => {
    const { linkngrok, codigo, number, name, alternative, email, address, description} = useParams();
    const navigate = useNavigate();
    
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
    <div className='conten'>
        <h1>Formulario de Registro</h1>
        <form onSubmit={handleSubmit}>
            <div>
                {formData.number}
            </div>
            <Input 
                label="Nombre:"
                type="text"
                name="name"
                placeholder={"Pedro Perez"}
                value={formData.name}
                onChange={handleChange}
            />
            <Input 
                label="Alternativo:"
                type="text"
                name="alternative"
                placeholder={"otro numero"}
                value={formData.alternative}
                onChange={handleChange}
            />
            <Input 
                label="email:"
                type="email"
                name="email"
                placeholder={"predroperes@gmail.com"}
                value={formData.email}
                onChange={handleChange}
            />
            <Input
                label="Dirreción:"
                type="text"
                name="address"
                placeholder={"calle 30 #41-41"}
                value={formData.address}
                onChange={handleChange}
            />
            <Input  
                label="Descripción:"
                type="text"
                name="description"
                placeholder={"apartamento 501 torre 5"}
                value={formData.description}
                onChange={handleChange}
            />
            <button type="submit">Enviar</button>
        </form>
    </div>
);
};

export default RecordPage;
