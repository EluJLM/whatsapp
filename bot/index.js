const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const ngrok = require('ngrok');
const cors = require('cors')
const bodyParser = require('body-parser');
const { getLogs } = require('./database');

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
    const { codigo, name, address, description, alternative } = req.body;

    // Verificar si faltan datos
    if (!codigo || !name || !address || !description || !alternative) {
        return res.status(400).json({ error: 'Faltan datos en el formulario' });
    }

    // Imprimir los datos recibidos en la consola
    console.log('Datos recibidos:');
    console.log(`Código: ${codigo}`);
    console.log(`Nombre: ${name}`);
    console.log(`Dirección: ${address}`);
    console.log(`Descripción: ${description}`);
    console.log(`Alternativo: ${alternative}`);

    // Responder al cliente
    res.json({ message: 'Datos recibidos correctamente', data: req.body });
});

// Inicializar WhatsApp Web client
const client = new Client({
    authStrategy: new LocalAuth(),
});

// Variable para almacenar la URL de ngrok
let ngrokUrl = '';
const baseUrl = 'http://192.168.1.23:3001/record';

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
    console.log(`Mensaje recibido de ${message.from}: ${message.body}`);
    const formattedLink = `${baseUrl}/null/${ngrokUrl}/null/null/null/null`;

    getLogs(message.from, async (dt) => {
        console.log("en base" + dt.state);
    })
    if (message.body.toLowerCase() === 'hola' && ngrokUrl) {
        //client.sendMessage(message.from, `¡Hola! Accede a nuestro servicio en: ${formattedLink}`);
    } else if (!ngrokUrl) {
        console.log('Aún no se ha obtenido la URL de ngrok.');
    }
});

// Manejar errores
client.on('auth_failure', () => console.error('Fallo en la autenticación. Reintenta.'));
client.on('disconnected', () => console.log('WhatsApp desconectado.'));

// Iniciar cliente
client.initialize();

// Ruta para recibir datos del formulario
app.post('/formulario', async (req, res) => {
    const { telefono, mensaje } = req.body;

    if (!telefono || !mensaje) {
        return res.status(400).send('Faltan campos en el formulario.');
    }

    try {
        const numeroConFormato = `${telefono}@c.us`; // Formato requerido por WhatsApp
        await client.sendMessage(numeroConFormato, mensaje);
        res.send('Mensaje enviado correctamente.');
    } catch (error) {
        console.error('Error enviando mensaje:', error);
        res.status(500).send('Error enviando mensaje.');
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


// generador de codigos para la verificcion
const codigosGenerados = [];

function generarCodigoUnico() {
  const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~';
  let codigo;

  do {
    codigo = '';
    for (let i = 0; i < 4; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
      codigo += caracteresPermitidos[indiceAleatorio];
    }
  } while (codigosGenerados.includes(codigo)); // Repetir si el código ya existe

  // Agregar el código único al array
  codigosGenerados.push(codigo);
  console.log(`Código generado: ${codigo}`);

  // Programar eliminación del código después de 5 segundos
  setTimeout(() => {
    eliminarCodigo(codigo, true); // Intentar eliminar el código (silencioso si ya no existe)
  }, 5000);

  return codigo;
}
function obtenerUltimoCodigo() {
    if (codigosGenerados.length > 0) {
      return codigosGenerados[codigosGenerados.length - 1];
    } else {
      return null; // Si el array está vacío
    }
  }
function eliminarCodigo(codigo, silencioso = false) {
  const index = codigosGenerados.indexOf(codigo);
  if (index !== -1) {
    codigosGenerados.splice(index, 1); // Eliminar el código del array
    console.log(`Código eliminado: ${codigo}`);
  } else if (!silencioso) {
    console.error(`Error: El código "${codigo}" no existe o ya fue eliminado.`);
  }
}