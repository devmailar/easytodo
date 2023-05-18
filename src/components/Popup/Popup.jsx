import styles from './styles/Popup.module.css';

const Popup = ({ children }) => {
  return <div className={styles.popup}>{children}</div>;
};

export default Popup;
