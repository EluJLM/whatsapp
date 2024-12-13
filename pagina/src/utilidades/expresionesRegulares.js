const expRegulares = {
    name: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    adrress: /^[a-zA-Z0-9\s.,#-]+$/,
    number: /^\d{10}$/
  };
  
export default expRegulares;
  