import React, { useState, useContext } from 'react';
import { MenuContext } from '../../utilidades/MenuContext';
import SectionsEdit from './components/SectionsEdit';

const MenuConfig = () => {
  const { addNewTitle, addPlatesToSection, menu } = useContext(MenuContext);
  const [sectionTitle, setSectionTitle] = useState('');
  const [plate, setPlate] = useState({ name: '', description: '', price: '', section: '' });

  const handleAddSection = () => {
    if (sectionTitle) {
        addNewTitle(sectionTitle);
        setSectionTitle('');
    }
  };

  const handleAddPlate = () => {
    if (plate.name && plate.section) {
        addPlatesToSection(plate);
        setPlate({ name: '', description: '', price: '', section: '' });
    }
  };

  return (
    <div>
      <h1>Configurar Menú</h1>

      <div>
        <h2>Agregar Sección</h2>
        <input
          type="text"
          placeholder="Título de la sección"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
        />
        <button onClick={handleAddSection}>Agregar Sección</button>
      </div>

      <div>
        <h2>Agregar Plato</h2>
        <input
          type="text"
          placeholder="Nombre del plato"
          value={plate.name}
          onChange={(e) => setPlate({ ...plate, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={plate.price}
          onChange={(e) => setPlate({ ...plate, price: e.target.value })}
        />
        <textarea
          placeholder="Descripción"
          value={plate.description}
          onChange={(e) => setPlate({ ...plate, description: e.target.value })}
        />
        <select
          value={plate.section}
          onChange={(e) => setPlate({ ...plate, section: e.target.value })}
        >
          <option value="">Seleccionar sección</option>
          {menu.map((section, index) => (
            <option key={index} value={section.title}>
              {section.title}
            </option>
          ))}
        </select>
        <button onClick={handleAddPlate}>Agregar Plato</button>
      </div>
      <div>
        <h2>Editar Platos</h2>
        {menu.map((section) => (
          <SectionsEdit
            key={section.title}
            section={section}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuConfig;
