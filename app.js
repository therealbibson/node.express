const express = require('express')
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const compression = require('compression');


const app = express()
const port = 3000


app.use(express.json());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { error: 'Too many requests, please try again after 15 minutes' }
});

app.use(express.static('public'));
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(limiter);
app.use(compression());



// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.post('/about', (req, res) => {
//   res.send('Hello World!')
// })

// app.put('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.patch('/', (req, res) => {
//   res.send('Hello World!')
// })




let recipes = [
  { id: 1, food: 'Rice', ingredients: 'rice, water, salt' },
  { id: 2, food: 'Beans', ingredients: 'beans, water, salt, red oil' },
  { id: 3, food: 'Eggs', ingredients: 'eggs, water, salt' },
  { id: 4, food: 'Potatoes', ingredients: 'potatoes, water, salt' },
];

app.get('/api', (req, res) => {
  res.json(recipes);
});


function getRecipes(req, res, next) {
  const auth_key = req.headers['x-vault-key'];
  if (auth_key == '12345') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.post('/api', getRecipes, (req, res) => {
  const { food, ingredients } = req.body;

  const newRecipe = { id: recipes.length + 1, food, ingredients };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

app.delete('/api/:id', (req, res) => {
  const recipeId = req.params.id;
  const recipeIndex = recipes.findIndex(r => r.id === parseInt(recipeId));

  if (recipeIndex === -1) {
    return res.status(404).json({ error: 'Recipe not found' });
  }

  recipes.splice(recipeIndex, 1);
  res.json({ message: 'Recipe deleted successfully' });
});

app.put('/api/:id', (req, res) => {
  const recipeId = req.params.id;
  const { food, ingredients } = req.bod
  y;

  const recipe = recipes.find(r => r.id === parseInt(recipeId));
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe not found' });
  }

  recipe.food = food;
  recipe.ingredients = ingredients;

  res.json(recipe);
});


app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})