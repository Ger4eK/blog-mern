import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    //! populate('user').exec() -  передає об'єкт з інформаціє про юзера (таким чином ми робимо зв'язок між постом і юзером який той пост зробив). Без цього ми бдуем отримувати тільки айді юзера який зробив цей пост.
    const posts = await PostModel.find().populate('user').exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не вдалося отримати статті',
    });
  }
};
export const getOne = async (req, res) => {
  try {
    //! params витягує динамічний параметр (id можна замінити на будь яку назву)
    const postId = req.params.id;

    //! тепер нам треба найти статтю і її вернути. Так як нам потрібно збільшувати кількість переглядів цієї статті то ми будем отримувати її, оновляти (перегляди) і тоді вертати. Для збільшення використовують $inc
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },

      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не вдалося отримати статтю',
          });
        }
        //! перевірка на те чи є взагалі ця стаття (наприклад її видалили, а ми її шукаєм -_-)
        if (!doc) {
          return res.status(404).json({
            message: 'Стаття не знайдена',
          });
        }

        //! якшо всьо гуд повертаєм статтю
        res.json(doc);
      }
    ).populate('user');
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не вдалося отримати статті',
    });
  }
};
export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(','),
      user: req.userId, //! робить бек
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не вдалося створити статтю',
    });
  }
};
export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags.split(','),
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалось оновити статтю',
    });
  }
};
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не вдалося видалити статтю статтю',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Стаття не знайдена',
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не вдалося отримати статті',
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не вдалося отримати статті',
    });
  }
};
