const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'mysql-12584df1-dylanroma308.a.aivencloud.com',
    port: 15056,
    user: 'avnadmin',
    password: 'AVNS_UzAyOK7hzNOfiT6yFXO',
    database: 'defaultdb', 
    ssl: {
        rejectUnauthorized: false 
    }
});

db.connect(err => {
    if (err) {
        console.log("Algo falló al conectar:", err.message);
    } else {
        console.log("¡ÉXITO TOTAL! Conectado a mi propia nube en Aiven.");
        
        const sql = `CREATE TABLE IF NOT EXISTS autos (
            idAutos INT AUTO_INCREMENT PRIMARY KEY,
            Autos VARCHAR(100) NOT NULL,
            Precio DECIMAL(10,2) NOT NULL,
            EquivalenciaPeta VARCHAR(50)
        );`;
        
        db.query(sql, (err) => {
            if (!err) {
                console.log("Tabla 'autos' lista para recibir carros.");
            } else {
                console.log("Error al verificar la tabla:", err.message);
            }
        });
    }
});

module.exports = db;