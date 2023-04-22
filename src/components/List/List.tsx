import { FC } from "react";
import styles from './List.module.css';
import { TList } from './types';

const List: FC<TList> = ({ children }) => {
    return <ul className={styles.list}>{children}</ul>;
};

export default List;
