const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 8023;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL adatbázis kapcsolat
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db023',
});

// Adatbázis kapcsolódás ellenőrzése
db.connect(err => {
  if (err) {
    console.error('Adatbázis kapcsolat hiba:', err);
    process.exit();
  }
  console.log('Sikeres adatbázis kapcsolat!');
});

// Kapcsolat oldal GET route
app.get('/kapcsolat', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'kapcsolat.html');
  console.log('Kapcsolat fájl elérési út:', filePath);
  res.sendFile(filePath);
});

// Kapcsolat adatbeküldés POST route
app.post('/kapcsolat', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send('Minden mezőt ki kell tölteni!');
  }

  const sql = 'INSERT INTO messages (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, NOW())';
  db.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error('Hiba az adatbázisban:', err);
      return res.status(500).send('Adatbázis hiba történt!');
    }
    res.send('Üzenet sikeresen elküldve!');
  });
});

// Főoldal GET route
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'home.html');
  res.sendFile(filePath);
});

// Szerver indítása
app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
});
