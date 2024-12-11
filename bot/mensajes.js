let primeraBienvenida = `🌟 *¡Bienvenido a TU BOT!* 🌟
👋 ¿En qué te puedo ayudar hoy? Envia:

    1️⃣ *Registrarte* para disfrutar de nuestros servicios.
    2️⃣ *Hacer un Pedido* rápido y sencillo.
    3️⃣ *Obtener Información* sobre nuestros productos.
    4️⃣ *Esperar por Atención Humana* o decir *adiós* si deseas finalizar la conversación.

🤖 Este bot está aquí para agilizar tu experiencia, pero siempre puedes esperar para hablar con una persona si prefieres. Solo envía *adiós*.

¡Gracias por elegir Parma! 😊
`;
const link = (link, editar) => {
    if(editar){
return (`Por favor accede a este link

${link}

y actualiza tus datos
`)}
    return (`Por favor accede a este link

${link}

y completa tus datos para registarte
`)};
const Bienvenida = (dt) => `🌟 *¡Te damos la bienvenida a Parma!* 🌟
👋 ¿${dt.name} en qué te puedo ayudar hoy?

    1️⃣ *Hacer un Pedido* rápido y sencillo.
    2️⃣ *Obtener Información* sobre nuestros productos.
    3️⃣ *Ver el menu* en muestra web.
    4️⃣ *Editar informacion* 
    5️⃣ *Esperar por Atención Humana* o decir *adiós* si deseas finalizar la conversación.

🤖 Este bot está aquí para agilizar tu experiencia, pero siempre puedes esperar para hablar con una persona si prefieres. Solo envía *adiós*.

¡Gracias por elegir Parma! 😊
`;

let mensajeInicialRegistro = `📝 *Registro en Parma*
Para completar tu registro, necesitamos los siguientes datos:
    
    *Nombre Completo*
    *Dirección*
    *Teléfono Alternativo*
    *Correo Electrónico*

📌 *Por favor, envía 🚨tu Nombre❗* para iniciar el registro. ¡Gracias! 😊
`;


const verifica = (dt) => {
    return`*Verifica tus datos*

    1️⃣ ${dt.name}
    2️⃣ ${dt.address}
    3️⃣ ${dt.alternate_phone}
    4️⃣ ${dt.email}

Si un dato quedo mal puedes enviar el numero del dato y despues el dato corregido
`;}

const confirma = (dt) => {
    return `🎉 *¡Excelente, ${dt.name}!*

Te atenderemos de la manera más rápida posible. Gracias por tu paciencia. 😊`;
}


const Actualizo = (dt) => {
    return `✅ *Actualización Exitosa*

El valor *${dt}* se ha actualizado correctamente. 

Puedes continuar editando otros valores o, si ya has terminado, envía *OK* para finalizar y guardar todos tus datos.`;
}

const Adios = () => {
    return`adios si deseas seguir con el bot envia un hello`;
}

let mensajeDefault = `Este menu no esta listo`;

module.exports = {
    primeraBienvenida,
    mensajeInicialRegistro,
    mensajeDefault,
    verifica,
    Actualizo,
    confirma,
    Bienvenida,
    Adios,
    link
}