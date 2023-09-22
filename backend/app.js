require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const auth = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');

const { login, createUser } = require('./controllers/users');
const {
  validateUserCreate,
  validateUserLogin,
} = require('./middlewares/celebrateErrors');
const validationErrorServer = require('./middlewares/validationErrorServer');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(cors({
  origin: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(limiter);

app.post('/signin', validateUserLogin, login);
app.post('/signup', validateUserCreate, createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());

app.use(validationErrorServer);

app.listen(PORT);
