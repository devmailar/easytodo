import styles from './Category.module.scss';

const Category = ({ children }) => {
  return <ul className={styles.category}>{children}</ul>;
};

export default Category;
