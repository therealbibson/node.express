let recipes = [
  { id: 1, food: 'Rice', ingredients: 'rice, water, salt' },
  { id: 2, food: 'Beans', ingredients: 'beans, water, salt, red oil' },
  { id: 3, food: 'Eggs', ingredients: 'eggs, water, salt' },
  { id: 4, food: 'Potatoes', ingredients: 'potatoes, water, salt' },
];

function getRecipes(req, res) {
  res.json(recipes);
}

function createRecipe(req, res) {
  const { food, ingredients } = req.body;

  const newRecipe = { id: recipes.length + 1, food, ingredients };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
}

function deleteRecipe(req, res) {
  const recipeId = req.params.id;
  const recipeIndex = recipes.findIndex(r => r.id === parseInt(recipeId));

  if (recipeIndex === -1) {
    return res.status(404).json({ error: 'Recipe not found' });
  }

  recipes.splice(recipeIndex, 1);
  res.json({ message: 'Recipe deleted successfully' });
}

function putRecipe(req, res) {
  const recipeId = req.params.id;
  const { food, ingredients } = req.body;

  const recipe = recipes.find(r => r.id === parseInt(recipeId));
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe not found' });
  }

  recipe.food = food;
  recipe.ingredients = ingredients;

  res.json(recipe);
}

module.exports = {
  getRecipes,
  createRecipe,
  deleteRecipe,
  putRecipe
}