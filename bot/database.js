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
        alternative TEXT,
        email TEXT,
        address TEXT,
        description TEXT,
        location TEXT
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


//Make users
const getUsers = (phone, callback) => {
    db.get(`SELECT * FROM users WHERE phone = ?`, [phone], (err, row) =>{
        if (!row) {
            db.run(`INSERT INTO users (phone, name, alternative, email, address, description, location) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [phone, "", "", "", "", "", ""],
                (insertErr) => {
                if (insertErr) {
                    console.error("Error en la inserción User:", insertErr.message);
                    return callback(null);
                }
                return callback({ name: "", alternative: "", email: "", address: "", description: "", location: ""});
            });
        } else {
            // Si el usuario ya existe, devuelve el registro encontrado
            return callback(row);
        }
        if (err) {
            // Si hay un error en la consulta inicial, muestra el error y devuelve null
            console.error("Error en la consulta users SELECT:", err.message);
            return callback(null);
        }
    });
};
const setUsers = (phone, name, alternative, email, address, description) => {
    console.log(phone, name, alternative, email, address, description);
    db.run(`UPDATE users SET name = ?, alternative = ?, email = ?, address = ?, description = ? WHERE phone = ?`,
        [name, alternative, email, address, description, phone],
        (err) => {
        if (err) {
            console.error("Error al actualizar Users", err.message);
        } else {
            console.log(`User actuaizado para: ${phone}`);
        }
    });
};
const setUserslocation = (phone, location) => {
    db.run(`UPDATE users SET location = ? WHERE phone = ?`,
        [location, phone],
        (err) => {
        if (err) {
            console.error("Error al actualizar Users Location", err.message);
        } else {
            console.log(`User location actuaizado para: ${phone}`);
        }
    });
};



// Creando los logs
const getLogs = (phone, callback) => {
    db.get(`SELECT state FROM logs WHERE phone = ?`, [phone], (err, row) => {
        if (err) {
            console.error("Error en la consulta logs SELECT:", err.message);
            return callback(null); // Devuelve null si hay un error
        }

        if (!row) {
            db.run(`INSERT INTO logs (phone, state) VALUES (?, ?)`, [phone, "hello"], function(insertErr) {
                if (insertErr) {
                    console.error("Error en la inserción:", insertErr.message);
                    return callback(null);
                }
                return callback({ state: "hello" });
            });
        } else {
            return callback(row); // Devuelve el registro encontrado
        }
    });
};


const setLogs = (phone, state) => {
    db.run(`UPDATE logs SET state = ? WHERE phone = ?`, [state, phone], (err) => {
        if (err) {
            console.error("Error al cambiar estado", err.message);
        } else {
            console.log(`estado actuaizado para: ${phone}`);
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
    getLogs,
    setLogs,
    getUsers,
    setUsers,
    setUserslocation
};
