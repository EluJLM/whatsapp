const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const ngrok = require('ngrok');
const cors = require('cors')
const bodyParser = require('body-parser');
const { getLogs, setLogs, getUsers, setUsers } = require('./database');
const { primeraBienvenida, Adios, link } = require('./mensajes');

const app = express();
const port = 3100;

// Middleware para analizar datos JSON y formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
/*
app.use(cors({
    origin: 'https://tu-dominio-autorizado.com'
}));

*/

app.post('/record', (req, res) => {
    const { codigo, name, number, alternative, email, address, description } = req.body;


    //if (!codigo || !name || !address || !description|| !number || !alternative || !email) {
    //    return res.status(400).json({ error: 'Faltan datos en el formulario' });
    //}

    if(codigosGenerados.findIndex(([element]) => element === codigo) === -1){
        return res.status(400).json({ error: 'ese codigo es falso' });
    }

    // Imprimir los datos recibidos en la consola
    console.log('Datos recibidos:');
    console.log(`Código: ${codigo}`);
    console.log(`Nombre: ${name}`);
    console.log(`Numero: ${number}`);
    console.log(`Alternativo: ${alternative}`);
    console.log(`Dirección: ${address}`);
    console.log(`Descripción: ${description}`);
    console.log(`Email: ${email}`);

    // Responder al cliente
    res.json({ message: 'Datos recibidos correctamente', data: req.body });
    console.log(`despues del la respuesta`);

    setUsers(number+"", name, alternative+"", email, address, description);
    client.sendMessage(`57${number}@c.us`, `Hola ${name}, tu registro a sido exitoso! `);
    eliminarCodigo(codigo);
});

// Inicializar WhatsApp Web client
const client = new Client({
    authStrategy: new LocalAuth(),
});

// Variable para almacenar la URL de ngrok
let ngrokUrl = '';
const baseUrl = 'http://rusbel.web.app/record';

// Mostrar código QR para autenticar
client.on('qr', (qr) => {
    console.log('Escanea el siguiente código QR para conectarte a WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Confirmar autenticación
client.on('ready', () => {
    console.log('WhatsApp está listo.');

    // Obtener la URL de ngrok solo una vez cuando el cliente esté listo
    ngrok.connect(port).then((url) => {
        ngrokUrl = url.replace("https://", '').replace(".ngrok-free.app", "").replace(/-/g, "p");  // Guardar la URL de ngrok

        console.log('URL de ngrok:', ngrokUrl);
    }).catch((err) => {
        console.error('Error al obtener la URL de ngrok:', err);
    });
});

client.on('message', (message) => {
    
    const number = message.from.replace("57", "").replace("@c.us", "");
    const receivedMessage = message.body.toLowerCase();
    if(number !== "3022547603"){
        return;
    }
    console.log(`Mensaje recibido de ${message.from}: ${message.body}`);
    if(receivedMessage === noEnviarMensaje){
        setLogs(number, noEnviarMensaje);
        message.reply(Adios);
        return;
    }
    if(receivedMessage === EnviarMensaje){
        setLogs(number, EnviarMensaje);
    }

    getLogs(number, (dt) => {
        console.log("en base " + dt.state);
        
        if(dt.state === noEnviarMensaje){
            return;
        }
        if(receivedMessage === "1"){
            //grsistar o editar
            getUsers(number, (dt) => {
                if(dt.name === ""){
                    const linktosend = `${baseUrl}/${ngrokUrl}/${generarCodigo(number)}/${decimalToHex(number*1)}`;
                    client.sendMessage(message.from, link(linktosend, false));
                }else{
                    const linktosend = `${baseUrl}/${ngrokUrl}/${generarCodigo(number)}/${decimalToHex(number*1)}/${dt.name}/${decimalToHex(dt.alternative*1)}/${dt.email}/${dt.address}/${dt.description}`;
                    client.sendMessage(message.from, link(linktosend.replace(/ /g, "_").replace("#", "XZ"), true));
                }
            });
            return;
        }

        if(dt.state === EnviarMensaje){
            message.reply("Por favor seleciona una de las opciones");
            client.sendMessage(message.from, primeraBienvenida);
        }
        
    })
});

// Manejar errores
client.on('auth_failure', () => console.error('Fallo en la autenticación. Reintenta.'));
client.on('disconnected', () => console.log('WhatsApp desconectado.'));

// Iniciar cliente
client.initialize();

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


// generador de codigos para la verificcion
const codigosGenerados = [];

function generarCodigo(parametro) {
  const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~';
  let codigo;

  do {
    codigo = '';
    for (let i = 0; i < 4; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
      codigo += caracteresPermitidos[indiceAleatorio];
    }
  } while (codigosGenerados.some(([cod]) => cod === codigo)); // Repetir si el código ya existe

  // Agregar el código único y el parámetro al array
  codigosGenerados.push([codigo, parametro]);
  console.log(codigosGenerados);

  // Programar eliminación del código después de 5 segundos
  setTimeout(() => {
    eliminarCodigo(codigo, true); // Intentar eliminar el código (silencioso si ya no existe)
  }, 1000*60*5);

  return codigo;
}

function obtenerUltimoCodigo() {
  if (codigosGenerados.length > 0) {
    const [codigo, parametro] = codigosGenerados[codigosGenerados.length - 1];
    return { codigo, parametro }; // Retornar el último código y parámetro
  } else {
    return null; // Si el array está vacío
  }
}

function eliminarCodigo(codigo, silencioso = false) {
  const index = codigosGenerados.findIndex(([cod]) => cod === codigo);
  if (index !== -1) {
    const eliminado = codigosGenerados.splice(index, 1)[0]; // Eliminar el código y parámetro del array
    console.log(`Código eliminado: ${eliminado[0]}, Parámetro: ${eliminado[1]}`);
  } else if (!silencioso) {
    console.error(`Error: El código "${codigo}" no existe o ya fue eliminado.`);
  }
}
const decimalToHex = (decimal) => {
    return decimal.toString(16).toUpperCase(); // Convierte decimal a hexadecimal
};
const hexToDecimal = (hex) => {
    return parseInt(hex, 16); // Convierte hexadecimal a decimal
};

const noEnviarMensaje = "bay";
const EnviarMensaje = "hello";