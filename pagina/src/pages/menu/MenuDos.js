
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";



const MenuDos =  () => {

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
    // Asegurar que sea un array
    const platesArray = Array.isArray(newPlates) ? newPlates : [newPlates];
  
    setMenu(prevMenu =>
      prevMenu.map(section => {
        // Filtrar los platos que pertenecen a esta sección
        const platesForSection = platesArray.filter(plate => plate.section === section.title);
  
        if (platesForSection.length > 0) {
          return {
            ...section,
            plates: [...section.plates, ...platesForSection]
          };
        }
        return section; // Mantener las secciones no afectadas
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
      addPlatesToSection(doc.data());
    });
  }
  
  console.log(menu);
  useEffect(() => {
    fun();
  }, []);
  
  return (
    <div>

    </div>
  )
};

export default MenuDos;
