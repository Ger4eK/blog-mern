import jwt from 'jsonwebtoken';

//! next потрібний дял того шоб відправлялась відповідь

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      //! в нашому токені зберігається айдішка
      const decoded = jwt.verify(token, 'secret123');

      //! замість userId може бути що завгодно 
      req.userId = decoded._id;
      //! якшо все пройшло гуд то завдяки next ми виконуєм наступну функцію res.send(token);
      next();
    } catch (error) {
      return res.status(403).json({
        message: 'Немає доступу',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Немає доступу',
    });
  }
};
