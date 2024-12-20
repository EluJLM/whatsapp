const expRegulares = {
    name: {exp: /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+)+$/, text: "Debes ingresar tu nombre y apellido"},
    email: {exp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, text: "Debes ingresar un correo Ej: nombre@dominio.com"},
    address: {exp: /^([a-zA-Z0-9.,#-]+\s+){2,}[a-zA-Z0-9.,#-]+$/, text: "Debes ingrsar por lo menos 3 palabras que describan tu dirrecion Ej: calle 30 #41-41"},
    number: {exp: /^\d{10}$/, text: "Debes ingresar un numero de 10 digitos"},
    option: {exp: /^\w{3,}$/, text: "puedes enviar este campo vacio"}
  };
  
export default expRegulares;
  