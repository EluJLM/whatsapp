const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/db.db', (err) => {
    if (err) {
        console.error("Error"+ err.message);
    }
});

// Crear tablas si no existen
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS logs (
        phone TEXT PRIMARY KEY,
        state TEXT
        )`);
    db.run(`CREATE TABLE IF NOT EXISTS users (
        phone TEXT PRIMARY KEY,
        name TEXT,
        address TEXT,
        alternate_phone TEXT,
        email TEXT,
        last_order TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS chat_logs (
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        phone TEXT,
        message TEXT,
        type TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS Ventas (
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productos TEXT,
        valor TEXT
    )`);    
});

// Creando los logs
const getLogs = (phone, callback) => {
    const sq = `SELECT state FROM logs WHERE phone = ?`;

    db.get(sq, [phone], (err, row) => {
        if (!row) {
            const sqInsert =  `INSERT INTO logs (phone, state) VALUES (?, ?)`;
            db.run(sqInsert, [phone, "new"], function(insertErr) {
                if (insertErr) {
                    console.error("Error en la inserción:", insertErr.message);
                    return callback(null);
                }
                return callback({ state: "new"});
            });
        } else {
            // Si el usuario ya existe, devuelve el registro encontrado
            return callback(row);
        }
        if (err) {
            // Si hay un error en la consulta inicial, muestra el error y devuelve null
            console.error("Error en la consulta SELECT:", err.message);
            return callback(null);
        }

    });
};


// Función para registrar los chats
function logChat(timestamp, message, type) {
    db.run(`INSERT INTO chat_logs (timestamp, message, type) VALUES (?, ?, ?)`, [timestamp, message, type], (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

module.exports = {
    logChat,
    getLogs
};
