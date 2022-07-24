import express from 'express';
import mongoose from 'mongoose';
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import { getMe, login, register } from './controllers/UserController.js';
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from './controllers/PostController.js';
import multer from 'multer';
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose
  .connect(
    'mongodb+srv://admin:wwwwww@cluster0.axu866w.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

//! створюємо сховище наших картинок
const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    //! callback функція говорить шо вона не вертає ніяких помилок 'null' і зберігає всі файли(фото) які будем завантажувати в папку 'uploads'
    callback(null, 'Backend/uploads');
  },
  //! перед тим як файл зберегти в папку 'uploads' тут ми вказуємо назву цьому файлу і вже тоді зберігаєм
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
//! тепер пояснюємо експресу шо в нас є спеціальна папка в якій зберігаються статичні файли з фото. І тепер експре буде розуміти шо ми робимо get запит на статичний файл
app.use('/uploads', express.static('Backend/uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, login);
app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  register
);
app.get('/auth/me', checkAuth, getMe);

//! перед тим як виконати запит будем використовувати мідлвор з мультера. Якшо прийде картинка тільки тоді буде виконуватись все інше
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `uploads/${req.file.originalname}`,
  });
});

app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  create
);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  update
);
app.delete('/posts/:id', checkAuth, remove);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
