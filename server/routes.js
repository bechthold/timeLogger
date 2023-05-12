const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('./db');
const {handleInternalError, handleMissingCredentials, handleInvalidCredentials} = require('./errorHandlers');

const secretKey = process.env.SECRET_KEY;

const router = express.Router();

router.use(express.json());

// Custom middleware to send token in response
const sendTokenMiddleware = (req, res, next) => {
  const token = req.token;
  if (token) {
    res.setHeader('Authorization', `Bearer ${token}`);
  }
  next();
};

router.post('/login', (req, res, next) => {
  const {username, password} = req.body;

  if (!username || !password) {
    handleMissingCredentials(res); // 400
    return;
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      handleInternalError(res, err); // 500
      return;
    }

    if (results.length === 0) {
      handleInvalidCredentials(res); // 401
      return;
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        handleInternalError(res, err); // 500
        return;
      }

      if (!result) {
        handleInvalidCredentials(res); // 401
        return;
      }

      const token = jwt.sign({userId: user.id}, secretKey);

      // Вычисление времени выпуска и времени истечения токена
      const issuedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const expirationTime = new Date(issuedAt);
      expirationTime.setHours(expirationTime.getHours() + 1);

      console.log(issuedAt);

      // Сохранение токена, времени выпуска и времени истечения в базе данных
      db.query('INSERT INTO sessions (user_id, token, issued_at, expiration_time) VALUES (?, ?, ?, ?)', [user.id, token, issuedAt, expirationTime], (err) => {
        if (err) {
          handleInternalError(res, err); // 500
          return;
        }

        req.token = token;
        next();

        res.json({
          userId: user.id,
          message: 'Login successful'
        });
      });
    });
  });
});

router.use(sendTokenMiddleware);

module.exports = router;