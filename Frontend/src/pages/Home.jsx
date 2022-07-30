import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  //! витягуєм дату юзера шоб перевірити чи його айді співпадає з ти яке є в пості
  const UserData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsloading = posts.status === 'loading';
  const isTagsloading = tags.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

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
          {(isPostsloading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsloading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={UserData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsloading} />
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
