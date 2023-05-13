import styles from "./styles/Board.module.css";

const Board = ({ children }) => {
  return <div className={styles.board}>{children}</div>;
};

export default Board;
