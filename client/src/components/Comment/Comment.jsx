import { useState, useEffect } from 'react';
import styles from './Comment.module.css';
import Title from '../Title/Title';
import CommentList from './CommentList/CommentList/CommentList';

const Comment = ({ videoId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/comment/saveComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        writer: localStorage.getItem('name'),
        postId: videoId,
        content: comment,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        setComment('');
      });
    console.log('댓글 제출');
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    //useEffect 최적화 필요. 지금 댓글 달 때마다 호출됨
    fetch(`http://localhost:5000/api/comment/getComments/${videoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setComments(data.comments);
      });
  }, [comment, videoId]);

  return (
    <div className={styles.layout}>
      <Title>Comment</Title>
      <CommentList comments={comments} />
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <textarea
          className={styles.commentTextarea}
          placeholder='Enter comment'
          name='comment'
          value={comment}
          onChange={handleChange}
        />
        <button className={styles.btnComment} type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comment;
