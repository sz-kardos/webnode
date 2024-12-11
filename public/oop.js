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

    const query = "SELECT DISTINCT mufaj FROM film";
    con.query(query, (err, results) => {
      if (err) {
        console.error('Query execution failed:', err.stack);
        res.status(500).send('Query execution failed');
        return;
      }

      let optionsHtml = `<option value="" disabled selected>Válassz!</option>`;
      optionsHtml += results.map(row => {
        if (row.mufaj === '') {
          return `<option value="nincs">nincs műfajbesorolása</option>`;
        } else {
          return `<option value="${row.mufaj}">${row.mufaj}</option>`;
        }
      }).join('');

      res.send(`
        <!DOCTYPE HTML>
        <html lang="hu">
        <head>
          <title>FILMKERESŐ</title>
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
                <li><a href="/uzenetek">Üzenetek</a></li>
                <li><a href="/crud">CRUD</a></li>
                <li class="active"><a href="/oop">OOP</a></li>
              </ul>
            </nav>

            <!-- Main -->
            <div id="main">
              <article class="post featured">
                <header class="major">
                  <h2><a href="#">FILMKERESŐ</a></h2>
                </header>
                <form id="searchForm">
                  <label for="mufaj">Válassza ki a keresett film műfaját!</label>
                  <select id="mufaj" name="mufaj">
                    ${optionsHtml}
                  </select>
                  <button type="submit">klikk!</button>
                </form>
                <div id="results"></div>
              </article>
            </div>
          </div>

            document.getElementById('searchForm').addEventListener('submit', function(event) {
              event.preventDefault();
              const mufaj = document.getElementById('mufaj').value;
              fetch('/oop/search?mufaj=' + mufaj)
                .then(response => response.json())
                .then(data => {
                  let resultsHtml = '<table><thead><tr><th>Film cím</th><th>Szinkron</th><th>Származás</th><th>Hossz</th></tr></thead><tbody>';
                  data.forEach(film => {
                    resultsHtml += \`
                      <tr>
                        <td><a href="#" class="film-link" data-fkod="\${film.fkod}">\${film.filmcim}</a></td>
                        <td>\${film.szinkron}</td>
                        <td>\${film.szarmazas}</td>
                        <td>\${film.hossz}</td>
                      </tr>\`;
                  });
                  resultsHtml += '</tbody></table>';
                  document.getElementById('results').innerHTML = resultsHtml;

                  document.querySelectorAll('.film-link').forEach(link => {
                    link.addEventListener('click', function(event) {
                      event.preventDefault();
                      const fkod = this.getAttribute('data-fkod');
                      fetch('/oop/locations?fkod=' + fkod)
                        .then(response => response.json())
                        .then(data => {
                          let locationsHtml = '<table><thead><tr><th> itt vetítik:</th><th>Itt hely:</th><th>Telefonszáma:</th></tr></thead><tbody>';
                          data.forEach(location => {
                            locationsHtml += \`
                              <tr>
                                <td>\${location.mozinev}</td>
                                <td>\${location.irszam} \${location.cim}</td>
                                <td>\${location.telefon}</td>
                              </tr>\`;
                          });
                          locationsHtml += '</tbody></table>';
                          document.getElementById('results').innerHTML = locationsHtml;
                        });
                    });
                  });
                });
            });
          </script>
        </body>
        </html>
      `);
    });
  });
});

router.get('/search', (req, res) => {
  const mufaj = req.query.mufaj === 'nincs' ? '' : req.query.mufaj;
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

    const query = "SELECT fkod, filmcim, szinkron, szarmazas, hossz FROM film WHERE mufaj = ?";
    con.query(query, [mufaj], (err, results) => {
      if (err) {
        console.error('Query execution failed:', err.stack);
        res.status(500).send('Query execution failed');
        return;
      }

      res.json(results);
    });
  });
});

router.get('/locations', (req, res) => {
  const fkod = req.query.fkod;
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

    const query = `
      SELECT mozi.mozinev, mozi.irszam, mozi.cim, mozi.telefon
      FROM hely
      JOIN mozi ON hely.moziazon = mozi.moziazon
      WHERE hely.fkod = ?
    `;
    con.query(query, [fkod], (err, results) => {
      if (err) {
        console.error('Query execution failed:', err.stack);
        res.status(500).send('Query execution failed');
        return;
      }

      res.json(results);
    });
  });
});

module.exports = router;
