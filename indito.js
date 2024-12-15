// Updated Node.js code with corrected SQL queries based on the database structure

const express = require('express');
const path = require('path');
const mysql = require('mysql2'); 
const cors = require('cors');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',      
  user: 'studb023',        
  password: '',     
  database: 'db023'          
});

connection.connect(err => {
  if (err) {
    console.error('Hiba a kapcsolódásban: ' + err.stack);
    return;
  }
  console.log('Kapcsolódva az adatbázishoz, ID: ' + connection.threadId);
});

// API Endpoints

// Fetch all films
app.get('/film', (req, res) => {
  const sql = `
    SELECT fkod AS id, filmcim AS title, mufaj AS genre, hossz AS duration
    FROM film;
  `;

  connection.query(sql, (err, rows) => {
    if (err) {
      console.error('Hiba az SQL lekérdezés során:', err);
      res.status(500).json({ error: 'Adatbázis hiba' });
      return;
    }
    res.json(rows);  
  });
});

// Fetch all prices
app.get('/ar', (req, res) => {
  const sql = `
    SELECT ar.id, ar.sutiid, ar.ertek, ar.egyseg
    FROM ar;
  `;

  connection.query(sql, (err, rows) => {
    if (err) {
      console.error('Hiba az SQL lekérdezés során:', err);
      res.status(500).json({ error: 'Adatbázis hiba' });
      return;
    }
    res.json(rows); 
  });
});

// Fetch all messages
app.get('/uzenetek', (req, res) => {
  connection.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Sikertelen kiolvasás' });
      return;
    }
    res.json(results);
  });
});

// Update a message by ID
app.put('/uzenetek/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Minden mező kitöltése szükséges' });
  }

  const sql = `UPDATE messages SET name = ?, email = ?, subject = ?, message = ? WHERE id = ?`;

  connection.query(sql, [name, email, subject, message, id], (err, results) => {
    if (err) {
      console.error('Hiba a frissítés során:', err);
      res.status(500).json({ error: 'Hiba a frissítés során' });
      return;
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Nem található üzenet ilyen ID-vel' });
    }

    res.json({ message: 'Sikeres frissítés' });
  });
});

// Delete a message by ID
app.delete('/uzenetek/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM messages WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Hiba a törlés során.' });
      return;
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Nincs ilyen ID-vel rendelkező sor' });
    }

    res.json({ message: 'Üzenet sikeresen törölve' });
  });
});

// Add a new message
app.post('/uzenetek', (req, res) => {
  const { name, email, subject, message } = req.body;
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Minden mező kitöltése szükséges' });
  }

  const sql = `INSERT INTO messages (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?)`;

  connection.query(sql, [name, email, subject, message, createdAt], (err, results) => {
    if (err) {
      console.error('Hiba a beillesztés során:', err);
      res.status(500).json({ error: 'Hiba a küldés során' });
      return;
    }

    res.json({ message: 'Sikeres küldés', id: results.insertId });
  });
});

// Server
const PORT = 8023;
app.listen(PORT, () => {
  console.log(`Szerver fut a http://localhost:${PORT} címen`);
});
