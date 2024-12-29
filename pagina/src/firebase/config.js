import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const generateRandomPrice = () => {
  return Math.floor(Math.random() * (15 - 5 + 1)) + 5; // Genera un precio entre 5 y 15
};

// Función para generar platos aleatorios
const generateRandomPlate = (sectionName) => {
  const plateNames = {
    "Hamburguesas": ['Hamburguesa Clásica', 'Hamburguesa Doble', 'Hamburguesa Vegetariana', 'Cheeseburger', 'Hamburguesa BBQ'],
    "Pizzas": ['Pizza Margarita', 'Pizza Pepperoni', 'Pizza Vegetariana', 'Pizza Hawaiana', 'Pizza Suprema'],
    "Bebidas": ['Coca-Cola', 'Pepsi', 'Fanta', 'Agua', 'Limonada'],
    "Postres": ['Tarta de Manzana', 'Helado de Vainilla', 'Brownie', 'Tarta de Chocolate', 'Galletas']
  };

  const descriptions = {
    "Hamburguesas": ['Deliciosa y jugosa', 'Perfecta para los amantes de la carne', 'Vegetariana y saludable', 'Con queso fundido', 'Salsa barbacoa especial'],
    "Pizzas": ['Sencilla pero deliciosa', 'Con mucho queso', 'Ideal para vegetarianos', 'Con piña y jamón', 'Con una mezcla de ingredientes'],
    "Bebidas": ['Refrescante', 'Ideal para acompañar tu comida', 'Con mucho gas', 'Perfecta para los días calurosos', 'Refrescante y dulce'],
    "Postres": ['Dulce y tentadora', 'Ideal para el postre', 'Acompañado de chocolate', 'El toque dulce perfecto', 'Suave y cremosa']
  };

  const plateList = plateNames[sectionName];
  const descriptionList = descriptions[sectionName];

  const name = plateList[Math.floor(Math.random() * plateList.length)];
  const description = descriptionList[Math.floor(Math.random() * descriptionList.length)];

  return {
    name: name,
    description: description,
    price: generateRandomPrice(),
    section: sectionName
  };
};

// Función para agregar secciones y platos
const addSectionsAndPlates = async () => {
  // Definimos las secciones
  const sections = ['Hamburguesas', 'Pizzas', 'Bebidas', 'Postres'];

  // Iteramos sobre cada sección para agregarla a Firestore y generar platos
  for (const section of sections) {
    try {
      // Primero agregamos la sección a la colección "secciones"
      const sectionRef = await addDoc(collection(db, "secciones"), {
        name: section
      });
      console.log(`Sección "${section}" agregada con ID: `, sectionRef.id);

      // Generamos platos para esta sección (por ejemplo, 5 platos por sección)
      const numberOfPlates = 5;
      for (let i = 0; i < numberOfPlates; i++) {
        const plate = generateRandomPlate(section);
        // Luego agregamos los platos a la colección "platos"
        await addDoc(collection(db, "platos"), plate);
        console.log(`Plato agregado: ${plate.name} - ${plate.description} - $${plate.price}`);
      }

    } catch (error) {
      console.error("Error al agregar sección o plato: ", error);
    }
  }
};

// Llamamos a la función para agregar secciones y platos
//addSectionsAndPlates();


export {db, auth};