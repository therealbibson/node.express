function getRecipeMiddleware(req, res, next) {
  const auth_key = req.headers['x-vault-key'];
  if (auth_key == '12345') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = {
  getRecipeMiddleware
}