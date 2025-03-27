import { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert('로그인 실행');
    fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('ACCESS_TOKEN', data.token.token);
        localStorage.setItem('name', data.token.name);
        window.location.href = '/';
      })
      .catch((err) => console.error(err));

    console.log(values);
  };

  return (
    <div className={styles.layout}>
      <Title>Log In</Title>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          className={styles.loginInput}
          name='email'
          value={values.email}
          onChange={handleChange}
          placeholder='Enter email'
        />
        <input
          className={styles.loginInput}
          name='password'
          value={values.password}
          onChange={handleChange}
          placeholder='Enter password'
        />
        <div className={styles.optionContainer}>
          <div className={styles.rememberContainer}>
            <input type='checkbox' />
            <span>Remember me</span>
          </div>
          <Link className={styles.registerLink}>forget password</Link>
        </div>
        <button type='submit' className={styles.btnSubmit}>
          Log In
        </button>
        <span>
          Or{' '}
          <Link to='/register' className={styles.registerLink}>
            register now!
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
