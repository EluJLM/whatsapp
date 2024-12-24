import React, { useState, useContext } from 'react';
import { MenuContext } from './MenuContext';

const MenuConfig = () => {
  const { addSection, addPlate, menu, updatePlate } = useContext(MenuContext);
  const [sectionTitle, setSectionTitle] = useState('');
  const [plate, setPlate] = useState({ name: '', description: '', price: '', section: '' });

  const handleAddSection = () => {
    if (sectionTitle) {
      addSection({ title: sectionTitle, plates: [] });
      setSectionTitle('');
    }
  };

  const handleAddPlate = () => {
    if (plate.name && plate.section) {
      addPlate(plate.section, plate);
      setPlate({ name: '', description: '', price: '', section: '' });
    }
  };

  const handleUpdatePlate = (sectionTitle, plateName, updatedData) => {
    updatePlate(sectionTitle, plateName, updatedData);
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
          type="text"
          placeholder="Descripción"
          value={plate.description}
          onChange={(e) => setPlate({ ...plate, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={plate.price}
          onChange={(e) => setPlate({ ...plate, price: e.target.value })}
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
          <div key={section.title}>
            <h3>{section.title}</h3>
            {section.plates.map((plate) => (
              <div key={plate.name} style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  value={plate.name}
                  onChange={(e) =>
                    handleUpdatePlate(section.title, plate.name, { name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={plate.description}
                  onChange={(e) =>
                    handleUpdatePlate(section.title, plate.name, { description: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={plate.price}
                  onChange={(e) =>
                    handleUpdatePlate(section.title, plate.name, { price: e.target.value*1 })
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuConfig;
