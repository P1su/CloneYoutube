import styles from './BtnSubmit.module.css';

const BtnSubmit = ({ onClick, children }) => {
  return (
    <button type='submit' className={styles.btnSubmit} onClick={onClick}>
      {children}
    </button>
  );
};

export default BtnSubmit;
