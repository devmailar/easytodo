import styles from './Board.module.scss';

const Board = ({ children }) => {
  return <div className={styles.board}>{children}</div>;
};

export default Board;
