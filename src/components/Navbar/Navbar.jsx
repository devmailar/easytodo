import { AiFillBug, AiFillFilter } from "react-icons/ai";
import { BiBarChartSquare } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import styles from "./styles/Navbar.module.css";

const Navbar = ({ createIssue }) => (
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
      <button>
        <AiFillFilter /> Filter
      </button>
      <button>
        <BiBarChartSquare /> Statics
      </button>
    </div>
  </nav>
);

export default Navbar;
