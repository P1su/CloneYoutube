import styles from './Video.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SideVideo from '../../components/Video/SideVideo/SideVideo';
import Comment from '../../components/Comment/Comment';
import BtnSubscribe from '../../components/buttons/Subscribe/BtnSubscribe';

const Video = () => {
  const [video, setVideo] = useState([]);
  const { videoId } = useParams();

  console.log(videoId);
  useEffect(() => {
    fetch(`http://localhost:5000/api/video/getVideo/${videoId}`, {
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
        setVideo(data.video);
      });
  }, [videoId]);

  return (
    <div className={styles.layout}>
      <div className={styles.temp}>
        <video
          src={`http://localhost:5000/uploads/${video.filePath}`}
          className={styles.video}
          controls
        />
        <div className={styles.infoContainer}>
          <div className={styles.videoInfoContainer}>
            <span className={styles.titleSpan}>{video.writer}</span>
            <span className={styles.titleSpan}>{video.title}</span>
            <span className={styles.descriptionSpan}>{video.description}</span>
          </div>
          <div>
            <span>좋아요</span>
            <span>싫어요</span>
            <BtnSubscribe />
          </div>
        </div>
        <Comment videoId={videoId} writer={video.writer} />
      </div>
      <SideVideo />
    </div>
  );
};

export default Video;
