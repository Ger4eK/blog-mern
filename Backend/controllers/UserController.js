import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
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
};

export const login = async (req, res) => {
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
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Користувача не знайдено',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Немає досутупу',
    });
  }
};
