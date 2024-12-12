const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/:id', (req, res) => {
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

    const { id } = req.params;
    const query = 'DELETE FROM uzenetek WHERE id = ?';
    con.query(query, [id], (err, results) => {
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
