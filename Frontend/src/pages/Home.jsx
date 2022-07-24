import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

export const Home = () => {
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label='basic tabs example'
      >
        <Tab label='Нові' />
        <Tab label='Популярні' />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {[...Array(5)].map(() => (
            <Post
              id={1}
              title='Пост'
              imageUrl='https://c.tenor.com/cBmz8RTK_JsAAAAC/typing-anime.gif'
              user={{
                avatarUrl:
                  'https://ms.detector.media/doc/images/news/25616/ArticleImage_25616.jpg',
                fullName: 'Keff',
              }}
              createdAt={'12 июня 2022 г.'}
              viewsCount={150}
              commentsCount={3}
              tags={['react', 'fun', 'typescript']}
              isEditable
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={['react', 'typescript', 'нотатки']}
            isLoading={false}
          />
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
          />
        </Grid>
      </Grid>
    </>
  );
};
