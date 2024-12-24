import React, { useState, useContext } from 'react';
import { MenuContext } from './MenuContext';

const PlateEdit = ({ plate, onCancel }) => {
  const { addPlate, menu } = useContext(MenuContext); // Contexto para actualizar la información
  const [updatedPlate, setUpdatedPlate] = useState({ ...plate });

  const handleEditPlate = () => {
    if (updatedPlate.name && updatedPlate.section) {
      // Agregar el plato actualizado a la sección correspondiente
      addPlate(updatedPlate.section, updatedPlate);
      alert('Plato actualizado con éxito');
    }
  };

  return (
    <div>
      <h2>Editar Plato</h2>
      <input
        type="text"
        placeholder="Nombre del plato"
        value={updatedPlate.name}
        onChange={(e) => setUpdatedPlate({ ...updatedPlate, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={updatedPlate.description}
        onChange={(e) => setUpdatedPlate({ ...updatedPlate, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio"
        value={updatedPlate.price}
        onChange={(e) => setUpdatedPlate({ ...updatedPlate, price: e.target.value })}
      />
      <select
        value={updatedPlate.section}
        onChange={(e) => setUpdatedPlate({ ...updatedPlate, section: e.target.value })}
      >
        <option value="">Seleccionar sección</option>
        {menu.map((section, index) => (
          <option key={index} value={section.title}>
            {section.title}
          </option>
        ))}
      </select>
      <div>
        <button onClick={handleEditPlate}>Guardar Cambios</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default PlateEdit;
