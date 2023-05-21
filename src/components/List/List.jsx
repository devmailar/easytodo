import styles from './List.module.scss';

const List = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};

export default List;
