import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecordPage = () => {
    const { codigo, linkngrok, name, address, description, alternative } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        codigo: codigo || '',
        name: name || '',
        address: address || '',
        description: description || '',
        alternative: alternative || ''
    });


    useEffect(() => {
        const newUrl = window.location.pathname.split('/').slice(0, 2).join('/');
        window.history.replaceState(null, '', newUrl);
    }, [codigo, linkngrok, name, address, description, alternative, navigate]);

   // Manejar cambios en los inputs
   const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualiza el estado
    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }));

    // Aquí puedes imprimir el valor actual que se está procesando
    console.log(`Actualizando campo: ${name} con valor: ${value}`);
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
    <div>
        <h1>Formulario de Registro</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Dirección:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Descripción:
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Alternativo:
                    <input
                        type="text"
                        name="alternative"
                        value={formData.alternative}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button type="submit">Enviar</button>
        </form>
    </div>
);
};

export default RecordPage;
