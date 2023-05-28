import { useState } from 'react';
import { AiFillBug, AiFillFilter } from 'react-icons/ai';
import { BiBarChartSquare } from 'react-icons/bi';
import { CgMenuMotion } from 'react-icons/cg';
import { GoPlus } from 'react-icons/go';
import { VscTasklist } from 'react-icons/vsc';
import styles from './Navbar.module.scss';

const Navbar = ({ createIssue, showBoard, showStatics }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <AiFillBug />
          <h1>Easyodo</h1>
        </div>
        <div className={styles.menuButton}>
          <CgMenuMotion onClick={toggleMenu} />
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

      {showMenu && (
        <div className={styles.menu}>
          <button
            onClick={() => {
              createIssue();
              setShowMenu(false);
            }}
          >
            <GoPlus /> Add
          </button>
          <button
            onClick={() => {
              showBoard();
              setShowMenu(false);
            }}
          >
            <VscTasklist /> Board
          </button>
          <button
            onClick={() => {
              showStatics();
              setShowMenu(false);
            }}
          >
            <BiBarChartSquare /> Statics
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
