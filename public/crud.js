const express = require('express');
const mysql = require('mysql');
const router = express.Router();

// CRUD műveletek importálása
router.use('/create', require('./CRUD/create'));
router.use('/read', require('./CRUD/read'));
router.use('/update', require('./CRUD/update'));
router.use('/delete', require('./CRUD/delete'));

// Alapértelmezett útvonal átirányítása a read műveletre
router.get('/', (req, res) => {
  res.redirect('/crud/read');
});

module.exports = router;