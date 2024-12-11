const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/', (req, res) => {
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'studb023',
    password: 'abc123',
    database: 'db023'
  });

  con.connect(function(err) {
    if (err) {
      console.error('Database connection failed:', err.stack);
      res.status(500).send('Database connection failed');
      return;
    }

    var query = "SELECT uzenet, DATE_FORMAT(idopont, '%Y. %m. %d. (%H:%i)') AS formatted_idopont FROM uzenetek ORDER BY idopont DESC";
    con.query(query, function (err, results) {
      if (err) {
        console.error('Query execution failed:', err.stack);
        res.status(500).send('Query execution failed');
        return;
      }

      let messagesHtml = results.map(message => `
        <tr>
          <td>${message.uzenet}</td>
          <td>${message.formatted_idopont}</td>
        </tr>
      `).join('');

      res.send(`
        <!DOCTYPE HTML>
        <html lang="hu">
        <head>
          <title>Üzenetek</title>
          <style>
            th {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <!-- Wrapper -->
          <div id="wrapper" class="fade-in">

            <!-- Header -->
            <header id="header">
              <a href="/" class="navbar-brand">Mozi Világ</a>
            </header>

            <!-- Nav -->
            <nav id="nav">
              <ul class="links">
                <li><a href="/">Főoldal</a></li>
                <li><a href="/adatbazis">Adatbázis</a></li>
                <li><a href="/kapcsolat">Kapcsolat</a></li>
                <li class="active"><a href="/uzenetek">Üzenetek</a></li>
                <li><a href="/crud">CRUD</a></li>
                <li><a href="/oop">OOP</a></li>
              </ul>
            </nav>

            <!-- Main -->
            <div id="main">
              <article class="post featured">
                <header class="major">
                  <h2><a href="#">Üzenetek</a></h2>
                </header>
                <table>
                  <thead>
                    <tr>
                      <th>Üzenetek</th>
                      <th>Időpontok</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${messagesHtml}
                  </tbody>
                </table>
              </article>
            </div>
          </div>
        </body>
        </html>
      `);
    });
  });
});

module.exports = router;
