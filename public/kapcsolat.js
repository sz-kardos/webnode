const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE HTML>
    <html lang="hu">
    <head>
      <title>Kapcsolat</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <style>
        /* Általános stílusok */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background: url('/assets/img/hatter.jpg') no-repeat center center fixed;
          background-size: cover;
          color: #fff;
          text-align: center;
        }

        /* Wrapper */
        #wrapper {
          max-width: 960px;
          margin: 2rem auto;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        /* Header */
        #header .logo {
          font-size: 2rem;
          color: #fff;
          text-decoration: none;
          font-weight: bold;
        }

        #header .logo:hover {
          color: #ffcc00;
        }

        /* Navigáció */
        #nav .links {
          list-style: none;
          padding: 0;
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        #nav .links a {
          color: #fff;
          text-decoration: none;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border: 2px solid transparent;
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        #nav .links a:hover,
        #nav .links .active a {
          border: 2px solid #ffcc00;
          color: #ffcc00;
        }

        /* Fő tartalom */
        #main {
          margin-top: 2rem;
        }

        #main h2 {
          font-size: 2rem;
          color: #ffcc00;
        }

        form label {
          display: block;
          margin-top: 1rem;
          font-size: 1.2rem;
          color: #fff;
        }

        form input,
        form textarea {
          width: 90%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border: none;
          border-radius: 5px;
        }

        form button {
          background: #ffcc00;
          color: #000;
          border: none;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        form button:hover {
          background: #e6b800;
          transform: scale(1.05);
        }
      </style>
    </head>
    <body>
      <!-- Wrapper -->
      <div id="wrapper">
        <!-- Header -->
        <header id="header">
          <a href="/" class="logo">Mozi Világ</a>
        </header>

        <!-- Nav -->
        <nav id="nav">
          <ul class="links">
            <li><a href="/">Főoldal</a></li>
            <li><a href="/adatbazis">Adatbázis</a></li>
            <li class="active"><a href="/kapcsolat">Kapcsolat</a></li>
            <li><a href="/uzenetek">Üzenetek</a></li>
            <li><a href="/crud">CRUD</a></li>
            <li><a href="/oop">OOP</a></li>
          </ul>
        </nav>

        <!-- Main -->
        <div id="main">
          <h2>Kapcsolat oldal</h2>
          <form action="/kapcsolat" method="POST">
            <label for="nev">Név:</label>
            <input type="text" id="nev" name="nev" required>
            <label for="uzenet">Üzenet:</label>
            <textarea id="uzenet" name="uzenet" required></textarea>
            <button type="submit">Küldés</button>
          </form>
        </div>
      </div>
    </body>
    </html>
  `);
});

router.post('/', (req, res) => {
  const { nev, uzenet } = req.body;
  const idopont = new Date().toISOString().slice(0, 19).replace('T', ' ');

  var con = mysql.createConnection({
    host: 'localhost',
    user: 'studb023',
    password: 'PaSsWoRd23',
    database: 'db023'
  });

  con.connect(function (err) {
    if (err) {
      console.error('Database connection failed:', err.stack);
      res.status(500).send('Database connection failed');
      return;
    }
    var query = "INSERT INTO uzenetek (nev, uzenet, idopont) VALUES (?, ?, ?)";
    con.query(query, [nev, uzenet, idopont], function (err, result) {
      if (err) {
        console.error('Query execution failed:', err.stack);
        res.status(500).send('Query execution failed');
        return;
      }
      res.send(`
        <!DOCTYPE HTML>
        <html lang="hu">
        <head>
          <title>Kapcsolat</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              margin: 0;
              padding: 0;
            }
          </style>
        </head>
        <body>
          <h1>Sikeresen elküldted az üzeneted!</h1>
          <a href="/kapcsolat">Vissza</a>
        </body>
        </html>
      `);
    });
  });
});

module.exports = router;
