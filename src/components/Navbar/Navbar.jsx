import { AiFillBug, AiFillFilter } from 'react-icons/ai';
import { VscTasklist } from 'react-icons/vsc';
import { BiBarChartSquare } from 'react-icons/bi';
import { GoPlus } from 'react-icons/go';
import styles from './Navbar.module.scss';

const Navbar = ({ createIssue, showBoard, showStatics }) => (
  <nav className={styles.nav}>
    <div className={styles.brand}>
      <AiFillBug />
      <h1>Easyodo</h1>
    </div>
    <div className={styles.navi}>
      <button onClick={createIssue}>
        <GoPlus />
      </button>
      <input type="text" placeholder="Search for bugs.." />
      <button onClick={showBoard}>
        <VscTasklist /> Board
      </button>
      <button onClick={showStatics}>
        <BiBarChartSquare /> Statics
      </button>
    </div>
  </nav>
);

export default Navbar;
