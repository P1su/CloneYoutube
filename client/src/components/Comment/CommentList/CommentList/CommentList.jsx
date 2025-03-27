import styles from './CommentList.module.css';

const CommentList = ({ comments }) => {
  return (
    <div className={styles.layout}>
      {comments.map((comment) => (
        <div className={styles.commentContainer} key={comment._id}>
          <span className={styles.writerSpan}>{comment.writer}</span>
          <span className={styles.contentSpan}>{comment.content}</span>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
