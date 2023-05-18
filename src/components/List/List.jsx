import styles from './styles/List.module.css';

const List = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};

export default List;
