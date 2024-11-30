const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Pontosítva a statikus fájlok útvonalát

// MySQL adatbázis kapcsolat
const db = mysql.createConnection({
  host: 'localhost', // Cseréld ki a megfelelő IP-re, ha nem lokális
  user: 'root', // Adatbázis felhasználónév
  password: '', // Adatbázis jelszó
  database: 'db023', // Adatbázis neve
});

// Adatbázis kapcsolódás ellenőrzése
db.connect(err => {
  if (err) {
    console.error('Adatbázis kapcsolat hiba:', err);
    process.exit();
  }
  console.log('Sikeres adatbázis kapcsolat!');
});

// "Kapcsolatok" oldal route (HTML oldal megjelenítése)
app.get('/kapcsolat', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'kapcsolat.html');
  console.log('Kapcsolat fájl elérési út:', filePath); // Debugginghoz
  res.sendFile(filePath);
});

// "Kapcsolatok" adatbeküldés route (POST metódus)
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

// "Főoldal" route
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'home.html');
  console.log('Főoldal fájl elérési út:', filePath); // Debugginghoz
  res.sendFile(filePath);
});

// Szerver indítása
app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
});
