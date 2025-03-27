import styles from './SideVideo.module.css';
import { useState, useEffect } from 'react';

const SideVideo = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/video/getVideos', {
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
        setVideos(data.videos);
      });
  }, []);

  if (videos.length === 0) {
    return <div>Loading...</div>;
  }

  console.log(videos);
  return (
    <div className={styles.layout}>
      {videos.map((video) => (
        <div className={styles.videoContainer} key={video._id}>
          <a href={`/video/${video._id}`} className={styles.videoLink}>
            <img
              style={{ width: '100%' }}
              src={`http://localhost:5000${video.thumbnail}`}
              alt='thumbnail'
            />
          </a>

          <a href={`/video/${video._id}`} className={styles.videoLink}>
            <span className={styles.titleSpan}>{video.title} </span>
            <br />
            <span>{video.views}</span>
            <br />
            <span></span>
            <br />
          </a>
        </div>
      ))}
    </div>
  );
};

export default SideVideo;
