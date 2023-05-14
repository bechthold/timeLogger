module.exports = {
  getUserByUsername: (db, username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
  },

  insertSession: (db, userId, token, issuedAt, expirationTime, callback) => {
    db.query(
      'INSERT INTO sessions (user_id, token, issued_at, expiration_time) VALUES (?, ?, ?, ?)',
      [userId, token, issuedAt, expirationTime],
      callback
    );
  },

  insertUser: (db, username, password, callback) => {
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
      if (err) {
        callback(err);
        return;
      }

      const userId = results.insertId;
      callback(null, userId);
    });
  }
};