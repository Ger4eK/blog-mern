import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/auth/login', (req, res) => {
  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: 'Дай боже!!!',
    },
    'secret123'
  );
  res.json({
    success: true,
    token,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
