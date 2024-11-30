var mysql = require('mysql');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'studb023',
    password: 'jelszo',
    database: 'db023'
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT DISTINCT mozinev FROM mozi;", function (err, result, fields) {
      if (err) throw err;
      var options = '<option value="">Válassz!</option>';
      for (var i = 0; i < result.length; i++) {
        options += `<option value="${result[i].mozinev}">${result[i].mozinev}</option>`;
      }
      res.send(`
        <!DOCTYPE HTML>
        <html lang="hu">
        <head>
          <title>Adatbázis</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="/assets/css/main.css" />
          <noscript><link rel="stylesheet" href="/assets/css/noscript.css" /></noscript>
          <style>
            select, option {
              color: black;
            }
            table th {
              text-align: center;
              color: black;
              font-size: 1.5em; /* Betűméret növelése */
            }
            table td {
              color: black;
            }
          </style>
        </head>
        <body class="is-preload" style="background: url('/images/hatter.jpg') no-repeat center center fixed; background-size: cover; color: #fff; position: relative;">

          <!-- Wrapper -->
          <div id="wrapper" class="fade-in">

            <!-- Header -->
            <header id="header">
              <a href="/" class="logo">Budapesti Mozi Műsor</a>
            </header>

            <!-- Nav -->
            <nav id="nav">
              <ul class="links">
                <li><a href="/">Főoldal</a></li>
                <li class="active"><a href="/adatbazis">Adatbázis</a></li>
                <li><a href="/kapcsolat">Kapcsolat</a></li>
                <li><a href="/uzenetek">Üzenetek</a></li>
                <li><a href="/crud">CRUD</a></li>
                <li><a href="/oop">OOP</a></li>
              </ul>
            </nav>

            <!-- Main -->
            <div id="main">
              <article class="post featured">
                <header class="major">
                  <h2><a href="#">Adatbázis oldal</a></h2>
                </header>
                <form action="/adatbazis/filmek" method="POST">
                  <label for="mozi">Válassz mozit!</label>
                  <select name="mozi" id="mozi">
                    ${options}
                  </select>
                  <button type="submit">Listázd ki a jelenleg itt játszott filmeket!</button>
                </form>
              </article>
            </div>

            <!-- Footer -->
            <footer id="footer">
              <section class="split contact">
                <section class="alt">
                  <h3>Készítette: </h3>
                  <p>Dunai Valéria</p>
                </section>
                <section class="alt">
                  <h3>NJE </h3>
                  <p>webprogramozás II LA-02</p>
                </section>
                <section>
                  <h3>NEPTUN kód: </h3>
                  <p>VVXZPP</p>
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
  });
});

router.post('/filmek', (req, res) => {
  var moziNev = req.body.mozi;
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'studb012',
    password: 'PaSsWoRd13',
    database: 'db012'
  });

  con.connect(function(err) {
    if (err) throw err;
    var query = `
      SELECT film.filmcim 
      FROM film 
      JOIN hely ON film.fkod = hely.fkod 
      JOIN mozi ON hely.moziazon = mozi.moziazon 
      WHERE mozi.mozinev = ?;
    `;
    con.query(query, [moziNev], function (err, result, fields) {
      if (err) throw err;
      var filmek = "";
      if (result.length === 0) {
        filmek = `<tr><td>Jelenleg ebben a moziban nem játszanak filmeket. 😔</td></tr>`;
      } else {
      for (var i = 0; i < result.length; i++) {
        filmek += `<tr><td>${result[i].filmcim}</td></tr>`;
        }
      }
      res.send(`
        <!DOCTYPE HTML>
        <html lang="hu">
        <head>
          <title>Adatbázis</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="/assets/css/main.css" />
          <noscript><link rel="stylesheet" href="/assets/css/noscript.css" /></noscript>
          <style>
            select, option {
              color: black;
            }
            table th {
              text-align: center;
              color: black;
              font-size: 1.5em; /* Betűméret növelése */
            }
            table td {
              color: black;
            }
          </style>
        </head>
        <body class="is-preload" style="background: url('/images/hatter.jpg') no-repeat center center fixed; background-size: cover; color: #fff; position: relative;">

          <!-- Wrapper -->
          <div id="wrapper" class="fade-in">

            <!-- Header -->
            <header id="header">
              <a href="/" class="logo">Budapesti Mozi Műsor</a>
            </header>

            <!-- Nav -->
            <nav id="nav">
              <ul class="links">
                <li><a href="/">Főoldal</a></li>
                <li class="active"><a href="/adatbazis">Adatbázis</a></li>
                <li><a href="/kapcsolat">Kapcsolat</a></li>
                <li><a href="/uzenetek">Üzenetek</a></li>
                <li><a href="/crud">CRUD</a></li>
                <li><a href="/oop">OOP</a></li>
              </ul>
            </nav>

            <!-- Main -->
            <div id="main">
              <article class="post featured">
                <header class="major">
                  <h2><a href="#">A jelenleg ${moziNev} helyen játszott filmek listája:</a></h2>
                </header>
                <table>
                  <tr><th>Filmek címei:</th></tr>
                  ${filmek}
                </table>
                <form action="/adatbazis" method="GET">
                  <button type="submit">Vissza</button>
                </form>
              </article>
            </div>
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
  });
});

module.exports = router;