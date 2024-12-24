import React, { createContext, useState } from 'react';

// Crear el contexto
export const MenuContext = createContext();

// Proveedor del contexto
export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([
    { title: 'Entradas', plates: [{ name: 'Ensalada', description: 'Fresca', price: 5 }, { name: 'Ensalada2', description: 'Fresca', price: 5 },] },
    { title: 'Postres', plates: [{ name: 'Tarta', description: 'Dulce', price: 7, section: "Postres" }] },
  ]);

  // Función para agregar una nueva sección
  const addSection = (section) => {
    setMenu((prevMenu) => [...prevMenu, section]);
  };

  // Función para agregar un plato a una sección específica
  const addPlate = (sectionTitle, plate) => {
    setMenu((prevMenu) =>
      prevMenu.map((section) =>
        section.title === sectionTitle
          ? { ...section, plates: [...section.plates, plate] }
          : section
      )
    );
  };
  
  // Función para actualizar los datos de un plato
  const updatePlate = (sectionTitle, plateName, updatedPlate) => {
    setMenu((prevMenu) =>
      prevMenu.map((section) => {
        if (section.title === sectionTitle) {
          return {
            ...section,
            plates: section.plates.map((plate) =>
              plate.name === plateName ? { ...plate, ...updatedPlate } : plate
            ),
          };
        }
        return section;
      })
    );
    
  };

  return (
    <MenuContext.Provider value={{ menu, addSection, addPlate, updatePlate }}>
      {children}
    </MenuContext.Provider>
  );
};
