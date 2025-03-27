import styles from './BtnSubscribe.module.css';

const BtnSubscribe = ({ onClick }) => {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      Subscribe
    </button>
  );
};

export default BtnSubscribe;
