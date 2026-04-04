const express = require('express');
const path = require('path');
const db = require('./db'); 
const app = express();

app.use(express.json());

// Servir la interfaz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'interfaz.html'));
});

// Obtener autos
app.get('/autos', (req, res) => {
    // IMPORTANTE: Asegúrate que la tabla se llame 'autos' en Aiven
    const sql = "SELECT * FROM autos ORDER BY Autos ASC"; 
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al leer de la nube:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Insertar auto
app.post('/insertar', (req, res) => {
    const { coche, precio } = req.body;
    // IMPORTANTE: Los nombres de las columnas deben ser idénticos (Autos, Precio)
    const sql = "INSERT INTO autos (Autos, Precio) VALUES (?, ?)";
    db.query(sql, [coche, precio], (err) => {
        if (err) {
            console.error("Error al insertar en la nube:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.sendStatus(200);
    });
});

app.listen(3050, () => {
    console.log('Servidor corriendo en http://localhost:3050');
});