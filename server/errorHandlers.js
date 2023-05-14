module.exports = {
  handleInternalError: (res, err) => {
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  },

  handleMissingCredentials: (res) => {
    res.status(400).json({error: 'Username and password are required'});
  },

  handleInvalidCredentials: (res) => {
    res.status(401).json({error: 'Invalid username or password'});
  }
};