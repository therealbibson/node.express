const express = require('express')
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const userRouter = require('./routes/user.route')
const recipesRouter = require('./routes/recipes.route');


const app = express()
const port = 3000


app.use(express.json());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { error: 'Too many requests, please try again after 15 minutes' }
});

app.use(express.static('public'));
// app.use(cors());
// app.use(morgan('dev'));
// app.use(helmet());
// app.use(limiter);
// app.use(compression());


app.use('/users', userRouter.userRouter);
app.use('/recipes', recipesRouter)


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

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