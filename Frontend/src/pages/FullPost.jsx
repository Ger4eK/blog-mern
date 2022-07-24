import React from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

export const FullPost = () => {
  return (
    <>
      <Post
        id={1}
        title='Пост'
        imageUrl='https://c.tenor.com/cBmz8RTK_JsAAAAC/typing-anime.gif'
        user={{
          avatarUrl:
            'https://play-lh.googleusercontent.com/uh-YyABDPOU_NdZno8Eq11YkNu6BGNButL4YApda9rzc1YAHcLJyFYv7_yEy-s9Tbg',
          fullName: 'Keff',
        }}
        createdAt={'12 липня 2022 г.'}
        viewsCount={150}
        commentsCount={3}
        tags={['react', 'fun', 'typescript']}
        isFullPost
      >
        <p>
          Дуже важливий текст. Дуже важливий текст. Дуже важливий текст. Дуже
          важливий текст. Дуже важливий текст. Дуже важливий текст. Дуже
          важливий текст. Дуже важливий текст. Дуже важливий текст.
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Марк Фейсбуковенко',
              avatarUrl:
                'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcShQJEHvsNjP9TcJybCNJhC06D_XpMuehyGx7ildCuo2qb07DFVqVCtc8w9N3xTQU15',
            },
            text: 'Ого, такий гарний блог... Я в шокови!',
          },
          {
            user: {
              fullName: 'Джефф Амазонів',
              avatarUrl:
                'https://eimg.pravda.com/images/doc/c/a/cacb656-------2.jpg',
            },
            text: 'Заходіт шось купляйте троха!',
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
