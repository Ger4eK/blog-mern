import React, { useEffect, useState } from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { useParams } from 'react-router-dom';
import axios from '../axios';

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Помилка при отриманні статті');
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  console.log(data);

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>{data.text}</p>
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
