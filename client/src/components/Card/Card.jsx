import styles from './Card.module.css';

const Card = ({ video }) => {
  const minutes = Math.floor(video.duration / 60);
  const seconds = Math.floor(video.duration - minutes * 60);

  return (
    <div className={styles.layout}>
      <a href={`/video/${video._id}`}>
        <img
          className={styles.image}
          alt='thumbnail'
          src={`http://localhost:5000${video.thumbnail}`}
        />
        <span className={styles.durationSpan}>
          {minutes} : {seconds}
        </span>
      </a>
      <span className={styles.titleSpan}>{video.writer}</span>
      <br />
      <span className={styles.titleSpan}>{video.title}</span>
      <br />
      <span>{video.description}</span>
      <br />
    </div>
  );
};

export default Card;
