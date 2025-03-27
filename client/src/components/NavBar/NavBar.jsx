import styles from './NavBar.module.css';
import logo from '../../assets/image/HappyTubeLogo.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('name');
    window.location.href = '/';
  };

  const handleAlert = () => {
    alert('구현 중입니다.');
  };

  return (
    <div className={styles.layout}>
      <div className={styles.navList}>
        <img className={styles.logoImage} src={logo} />
        <Link to='/'>Video</Link>
        <Link onClick={handleAlert}>Subscription</Link>
      </div>
      <div className={styles.navList}>
        {localStorage.getItem('ACCESS_TOKEN') ? (
          <>
            <Link to='/upload'>Upload</Link>
            <Link onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to='/login'>Signin</Link>
            <Link to='/register'>Signup</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
