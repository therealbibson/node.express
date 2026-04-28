const { getRecipes, createRecipe, deleteRecipe, putRecipe } = require('../controllers/recipes.controller');
const { getRecipeMiddleware } = require('../middlewares/recipes.middleware');
const router = require('express').Router();

router.get('/get', getRecipes);

router.post('/post', getRecipeMiddleware, createRecipe);

router.delete('/delete/:id', deleteRecipe);

router.put('/put/:id', getRecipeMiddleware, putRecipe);

module.exports = router;