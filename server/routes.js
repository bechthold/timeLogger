const express = require('express');
const bcrypt = require('bcrypt');

const userQueries = require('./userQueries');
const tokenManagement = require('./tokenManagement');
const errorHandlers = require('./errorHandlers');

const db = require('./db');

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

// check user by login
router.post('/login', (req, res, next) => {
  const {username, password} = req.body;

  if (!username || !password) {
    errorHandlers.handleMissingCredentials(res);
    return;
  }

  userQueries.getUserByUsername(db, username, (err, results) => {
    if (err) {
      errorHandlers.handleInternalError(res, err);
      return;
    }

    if (results.length === 0) {
      errorHandlers.handleInvalidCredentials(res);
      return;
    }
    // save user
    const user = results[0];
    // check user password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        errorHandlers.handleInternalError(res, err);
        return;
      }

      if (!result) {
        errorHandlers.handleInvalidCredentials(res);
        return;
      }
      // create token
      const token = tokenManagement.generateToken(user.id);

      const issuedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const expirationTime = tokenManagement.calculateExpirationTime(issuedAt);
      //save session in database
      userQueries.insertSession(db, user.id, token, issuedAt, expirationTime, (err) => {
        if (err) {
          errorHandlers.handleInternalError(res, err);
          return;
        }

        req.token = token;
        next();
        // send response
        res.json({
          userId: user.id,
          message: 'Login successful'
        });
      });
    });
  });
});

router.post('/signup', (req, res, next) => {
  const {username, password} = req.body;
  const saltRounds = Number(process.env.SALT_ROUNDS);

  if (!username || !password) {
    errorHandlers.handleMissingCredentials(res);
    return;
  }

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      errorHandlers.handleInternalError(res, err);
      return;
    }

    // Save the user in the database
    userQueries.insertUser(db, username, hashedPassword, (err, userId) => {
      if (err) {
        errorHandlers.handleInternalError(res, err);
        return;
      }

      // Generate token
      const token = tokenManagement.generateToken(userId);

      const issuedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const expirationTime = tokenManagement.calculateExpirationTime(issuedAt);

      // Save session in the database
      userQueries.insertSession(db, userId, token, issuedAt, expirationTime, (err) => {
        if (err) {
          errorHandlers.handleInternalError(res, err);
          return;
        }

        req.token = token;
        next();

        // Send response
        res.json({
          userId,
          message: 'Signup successful'
        });
      });
    });
  });
});



router.use(sendTokenMiddleware);

module.exports = router;