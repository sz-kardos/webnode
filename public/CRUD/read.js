const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/', (req, res) => {
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

    const query = "SELECT id, nev, uzenet, DATE_FORMAT(idopont, '%Y. %m. %d. (%H:%i)') AS formatted_idopont FROM uzenetek ORDER BY idopont DESC";
    con.query(query, (err, results) => {
      if (err) {
        console.error('Query execution failed:', err.stack);
        res.status(500).send('Query execution failed');
        return;
      }

      let messagesHtml = results.map(message => `
        <tr>
          <td>${message.nev}</td>
          <td>${message.uzenet}</td>
          <td>${message.formatted_idopont}</td>
          <td>
            <a href="/crud/edit/${message.id}" style="margin-right: 10px;">Edit</a>
            <a href="/crud/delete/${message.id}">Delete</a>
          </td>
        </tr>
      `).join('');

      res.send(`
        <!DOCTYPE HTML>
        <html lang="hu">
        <head>
          <title>CRUD</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="/assets/css/main.css" />
          <noscript><link rel="stylesheet" href="/assets/css/noscript.css" /></noscript>
          <style>
            th, td {
              text-align: center;
            }
          </style>
        </head>
        <body class="is-preload" style="background: url('/images/hatter.jpg') no-repeat center center fixed; background-size: cover; color: #000; position: relative;">

          <!-- Wrapper -->
          <div id="wrapper" class="fade-in">

            <!-- Header -->
            <header id="header">
              <a href="/" class="logo">Mozi Műsor</a>
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
                  <h2><a href="#">CRUD oldal</a></h2>
                </header>
                <table>
                  <thead>
                    <tr>
                      <th>Név</th>
                      <th>Üzenet</th>
                      <th>Időpont</th>
                      <th>Műveletek</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${messagesHtml}
                  </tbody>
                </table>
                <a href="/crud/create">Create</a>
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
  });
});

module.exports = router;
