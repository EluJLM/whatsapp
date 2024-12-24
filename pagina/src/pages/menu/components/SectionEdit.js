import React, { useState } from 'react';
import PlateEdit from './PlateEdit';

const SectionEdit = ({ section, onSave, onCancel }) => {
  const [updatedSection, setUpdatedSection] = useState({ ...section });
  const [editingPlate, setEditingPlate] = useState(null);

  const handleSaveSection = () => {
    onSave(updatedSection); // Guardar la sección editada
  };

  const handleEditPlate = (updatedPlate) => {
    setUpdatedSection((prevSection) => ({
      ...prevSection,
      plates: prevSection.plates.map((plate) =>
        plate.name === updatedPlate.name ? updatedPlate : plate
      ),
    }));
    setEditingPlate(null); // Salir del modo de edición de plato
  };

  return (
    <div>
      <h2>Editar Sección</h2>
      <input
        type="text"
        value={updatedSection.title}
        onChange={(e) => setUpdatedSection({ ...updatedSection, title: e.target.value })}
        placeholder="Nombre de la sección"
      />

      <h3>Platos en esta sección</h3>
      {editingPlate ? (
        <PlateEdit
          plate={editingPlate}
          onCancel={() => setEditingPlate(null)}
          onSave={handleEditPlate}
        />
      ) : (
        <ul>
          {updatedSection.plates.map((plate, index) => (
            <li key={index}>
              <span>{plate.name} - ${plate.price}</span>
              <button onClick={() => setEditingPlate(plate)}>Editar</button>
            </li>
          ))}
        </ul>
      )}

      <div>
        <button onClick={handleSaveSection}>Guardar Cambios</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default SectionEdit;
