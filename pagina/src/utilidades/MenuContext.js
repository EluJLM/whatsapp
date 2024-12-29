import React, { createContext, useState, useEffect } from 'react';

import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";


// Crear el contexto
export const MenuContext = createContext();

// Proveedor del contexto
export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);

  const addNewTitle = (newTitle) => {
    setMenu(prevMenu => {
      // Verificar si el título ya existe
      if (prevMenu.some(section => section.title === newTitle)) {
        return prevMenu; // No hacer nada si el título ya está
      }
      return [
        ...prevMenu,
        {
          title: newTitle,
          plates: []
        }
      ];
    });
  };

  const addPlatesToSection = (newPlates) => {
    const platesArray = Array.isArray(newPlates) ? newPlates : [newPlates];
    setMenu(prevMenu =>
      prevMenu.map(section => {
        const platesForSection = platesArray.filter(plate => plate.section === section.title);
        if (platesForSection.length > 0) {
          const updatedPlates = platesForSection.filter(newPlate =>
            !section.plates.some(existingPlate => existingPlate.id === newPlate.id)
          );
          if (updatedPlates.length > 0) {
            return {
              ...section,
              plates: [...section.plates, ...updatedPlates]
            };
          }
        }
        return section;
      })
    );
  };
  

  const fun = async () => {
    
    const querySnapshot2 = await getDocs(collection(db, "secciones"));
    querySnapshot2.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data().name);
      addNewTitle(doc.data().name);
    });
    const querySnapshot = await getDocs(collection(db, "platos"));
    querySnapshot.forEach( async (doc, index) => {
      
      //console.log(doc.id, " => ", doc.data());
      const plateData = { id: doc.id, ...doc.data() };
      addPlatesToSection(plateData);
    });
  }
  useEffect(() => {
    fun();
  }, []);
  
  
  const updatePlate = ( plateid, updatedPlate) => {
    
    setMenu((prevMenu) =>
      prevMenu.map((section) => {
          return {
            ...section,
            plates: section.plates.map((plate) =>
              plate.id === plateid
                ? { ...plate, ...updatedPlate }
                : plate
            ),
          };
      })
    );
  };
  

  return (
    <MenuContext.Provider value={{ menu, addNewTitle, addPlatesToSection, updatePlate }}>
      {children}
    </MenuContext.Provider>
  );
};
