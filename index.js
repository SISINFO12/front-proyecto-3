const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

// 1. Configuración de la Conexión a la Base de Datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Tu usuario (normalmente root)
    password: '1234',  // Tu contraseña
    database: 'sys'   // El nombre exacto de tu BD
});

// Conectar a MySQL
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('¡Conectado exitosamente a la base de datos Cars!');
});

// 2. Ruta para mostrar tu interfaz de carros
app.get('/', (req, res) => {
    // Esto enviará el archivo HTML que creaste (asegúrate de que se llame interfaz.html)
    res.sendFile(path.join(__dirname, 'interfaz.html'));
});

// 3. Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});