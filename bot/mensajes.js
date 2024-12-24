let primeraBienvenida = `🌟 *¡Bienvenido a TU BOT!* 🌟
👋 ¿En qué te puedo ayudar hoy? Envia:

    1️⃣ *Registrarte o Editar* 
    2️⃣ *Hacer un Pedido*
    3️⃣ *Menú* 
    4️⃣ *Redes Sociales*

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




const RegistroExitoso = (dt) => `✅ *¡Registro Exitoso!* ✅
🎉 Holaaa, *${dt.name}*.

📍 Hemos registrado tu dirección:  
*${dt.address}*  
📌 Descripción: ${dt.description}

📞 Tu teléfono de contacto: ${dt.number}
📞 Tu teléfono alternativo: ${dt.alternative}

Opciones adicionales:  
2️⃣ *Hacer un Pedido* 
3️⃣ *Redes Sociales*
4️⃣ *Solicitar Soporte*

🚀 ¿En qué más podemos ayudarte hoy?  

Gracias por registrarte. 😊 ¡Estamos aquí para servirte!`;


const Adios = () => {
    return`adios si deseas seguir con el bot envia un hello`;
}

let mensajeDefault = `Este menu no esta listo`;

module.exports = {
    primeraBienvenida,
    Adios,
    link,
    RegistroExitoso
}