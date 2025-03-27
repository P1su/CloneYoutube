import { useState } from 'react';
import styles from './Register.module.css';
import BtnSubmit from '../../components/buttons/Submit/BtnSubmit';
import Title from '../../components/Title/Title';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    alert('Sign Up 실행');
    navigate(-1);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.layout}>
      <Title>Sign Up</Title>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        {Object.keys(values).map((key) => (
          <div key={key} className={styles.inputContainer}>
            <label key={`${key}Label`} className={styles.registerLabel}>
              {key}
            </label>
            <input
              key={key}
              className={styles.registerInput}
              name={key}
              value={values[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
        <BtnSubmit>Sign Up</BtnSubmit>
      </form>
    </div>
  );
};

export default Register;
