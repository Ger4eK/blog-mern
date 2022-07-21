import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Некоректний формат пошти').isEmail(),
  body('password', 'Пароль повинен бути довжиною не менше 5 символів').isLength(
    { min: 5 }
  ),
  body('fullName', "Вкажіть Ваше ім'я").isLength({
    min: 3,
  }),
  body('avatarUrl', 'Некоректне посилання на аватарку').optional().isURL(),
];
