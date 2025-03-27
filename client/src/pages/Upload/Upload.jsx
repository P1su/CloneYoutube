import Title from '../../components/Title/Title';
import styles from './Upload.module.css';
import BtnSubmit from './../../components/buttons/Submit/BtnSubmit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const privates = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' },
];

const categories = [
  { value: 0, label: 'Film & Animation' },
  { value: 0, label: 'Autos & Vehicles' },
  { value: 0, label: 'Music' },
  { value: 0, label: 'Pets & Animals' },
  { value: 0, label: 'Sports' },
];

const Upload = () => {
  const [values, setValues] = useState({
    writer: localStorage.getItem('name'),
    title: '',
    description: '',
    privacy: 0,
    filePath: '',
    category: 'Film & Animation',
    views: 0,
    duration: '',
    thumbnail: '',
  });
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [thumbnailPath, setThumbnailPath] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setFilePath(e.target.value);

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch('http://localhost:5000/api/video/uploadfiles', {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setValues((prevValues) => ({
            ...prevValues,
            filePath: data.fileName,
          }));
          const variables = {
            filePath: `${data.filePath}`,
            fileName: data.fileName,
          };
          fetch('http://localhost:5000/api/video/thumbnail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // JSON 데이터임을 명시
            },
            body: JSON.stringify(variables),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
              setValues((prevValues) => ({
                ...prevValues,
                duration: data.fileDuration,
                thumbnail: data.thumbsFilePath,
              }));
              setThumbnailPath(data.thumbsFilePath);
              console.log(thumbnailPath);
            });
        })
        .catch((err) => console.error(err));
    }
    alert('동영상 선택');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/video/uploadVideo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        alert('Video Upload 성공');
        setValues({
          title: '',
          description: '',
          privacy: 0,
          filePath: '',
          category: '',
          views: 0,
          duration: '',
          thumbnail: '',
        });
        setFile(null);
        setFilePath('');
        setThumbnailPath('');
        navigate('/');
      });
  };

  return (
    <div className={styles.layout}>
      <Title>Upload Video</Title>
      <form className={styles.uploadForm} onSubmit={handleSubmit}>
        <div className={styles.videoContainer}>
          <label htmlFor='videoInput' className={styles.videoInputLabel}>
            +
          </label>
          <input
            type='file'
            id='videoInput'
            className={styles.videoInput}
            value={filePath}
            onChange={handleFile}
          />
          {thumbnailPath && (
            <img
              className={styles.thumbnail}
              src={`http://localhost:5000${thumbnailPath}`}
              alt='Thumbnail'
            />
          )}
        </div>
        <div className={styles.inputContainer}>
          <span>title</span>
          <input
            className={styles.titleInput}
            name='title'
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <span>description</span>
          <textarea
            className={styles.describeTextarea}
            name='description'
            value={values.description}
            onChange={handleChange}
          />
        </div>

        <select onChange={handleChange} name='privacy' value={values.privacy}>
          {privates.map((privateItem) => (
            <option key={privateItem.label} value={privateItem.value}>
              {privateItem.label}
            </option>
          ))}
        </select>
        <select onChange={handleChange} name='category' value={values.category}>
          {categories.map((category) => (
            <option key={category.label} value={category.label}>
              {category.label}
            </option>
          ))}
        </select>
        <BtnSubmit>Upload</BtnSubmit>
      </form>
    </div>
  );
};

export default Upload;
