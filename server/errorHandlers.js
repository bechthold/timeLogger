const handleInternalError = (res, err) => {
  console.log(err);
  res.status(500).json({ error: 'Internal server error' });
};

const handleMissingCredentials = (res) => {
  res.status(400).json({ error: 'Username and password are required' });
};

const handleInvalidCredentials = (res) => {
  res.status(401).json({ error: 'Invalid username or password' });
};

module.exports = {
  handleInternalError,
  handleMissingCredentials,
  handleInvalidCredentials
};