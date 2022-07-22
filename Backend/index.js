import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './models/User.js';

mongoose
  .connect(
    'mongodb+srv://admin:wwwwww@cluster0.axu866w.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());

app.post('/auth/login', async (req, res) => {
  try {
    //! шукаємо чи є в бд такий email
    const user = await UserModel.findOne({ email: req.body.email });

    //! якшо нема то вертаєм помилку
    if (!user) {
      return res.status(404).json({
        message: 'Неправильний логін або пароль',
      });
    }

    //! якшо користувач все такий був найдений, провіряємо його чи співпадає пароль який він вписав з тим шо є в бд
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неправильний логін або пароль',
      });
    }

    //! якшо всьо гуд, то створюємо новий токен і тд
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не вдалось авторизуватись',
    });
  }
});

app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    //! salt - це алгоритм завдяки якому буде зашифровуватись наш пароль
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    //! зберігаєм юзера в базі данних
    const user = await doc.save();

    //! після того як ми робимо реєстрацію ми будем повертати JWT
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не вдалося зареєструватися',
    });
  }
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
