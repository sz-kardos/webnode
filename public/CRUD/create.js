const express = require('express');
const mysql = require('mysql');
const router = express.Router();

// GET útvonal a form megjelenítéséhez
router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE HTML>
    <html lang="hu">
    <head>
      <title>Új üzenet létrehozása</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <link rel="stylesheet" href="/assets/css/main.css" />
      <noscript><link rel="stylesheet" href="/assets/css/noscript.css" /></noscript>
    </head>
    <body class="is-preload" style="background: url('/images/hatter.jpg') no-repeat center center fixed; background-size: cover; color: #000; position: relative;">

      <!-- Wrapper -->
      <div id="wrapper" class="fade-in">

        <!-- Header -->
        <header id="header">
          <a href="/" class="logo"> Mozi Műsor</a>
        </header>

        <!-- Nav -->
        <nav id="nav">
          <ul class="links">
            <li><a href="/">Főoldal</a></li>
            <li><a href="/adatbazis">Adatbázis</a></li>
            <li><a href="/kapcsolat">Kapcsolat</a></li>
            <li><a href="/uzenetek">Üzenetek</a></li>
            <li class="active"><a href="/crud">CRUD</a></li>
            <li><a href="/oop">OOP</a></li>
          </ul>
        </nav>

        <!-- Main -->
        <div id="main">
          <article class="post featured">
            <header class="major">
              <h2><a href="#">Új üzenet létrehozása</a></h2>
            </header>
            <form method="POST" action="/crud/create">
              <label for="nev">Név:</label>
              <input type="text" id="nev" name="nev" required>
              <label for="uzenet">Üzenet:</label>
              <textarea id="uzenet" name="uzenet" required></textarea>
              <button type="submit">Létrehozás</button>
            </form>
          </article>
        </div>

        <!-- Footer -->
        <footer id="footer">
          <section class="split contact">
            <section class="alt">
              <h3>Készítette: </h3>
              <p>Kardos Szabina</p>
            </section>
          </section>
        </footer>
      </div>

      <!-- Scripts -->
      <script src="/assets/js/jquery.min.js"></script>
      <script src="/assets/js/browser.min.js"></script>
      <script src="/assets/js/breakpoints.min.js"></script>
      <script src="/assets/js/util.js"></script>
      <script src="/assets/js/main.js"></script>
    </body>
    </html>
  `);
});

// POST útvonal az új rekord hozzáadásához
router.post('/', (req, res) => {
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'studb023',
    password: '',
    database: 'db023'
  });

  con.connect(function(err) {
    if (err) {
      console.error('Database connection failed:', err.stack);
      res.status(500).send('Database connection failed');
      return;
    }

    const { nev, uzenet } = req.body;
    const query = 'INSERT INTO uzenetek (nev, uzenet, idopont) VALUES (?, ?, NOW())';
    con.query(query, [nev, uzenet], (err, results) => {
      if (err) {
        console.error('Query execution failed:', err.stack);
        res.status(500).send('Query execution failed');
        return;
      }
      res.redirect('/crud');
    });
  });
});

module.exports = router;
