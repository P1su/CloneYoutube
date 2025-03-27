import { useState, useEffect } from 'react';
import styles from './Main.module.css';
import Card from '../../components/Card/Card';

const Main = () => {
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

  return (
    <div className={styles.layout}>
      <span className={styles.titleSpan}>Recommended</span>
      <hr />
      <div className={styles.cardContainer}>
        {videos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Main;
