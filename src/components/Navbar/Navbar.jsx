import { useState } from 'react';
import { AiFillBug, AiFillFilter } from 'react-icons/ai';
import { BiBarChartSquare } from 'react-icons/bi';
import { CgMenuMotion } from 'react-icons/cg';
import { GoPlus } from 'react-icons/go';
import { VscTasklist } from 'react-icons/vsc';

const Navbar = ({ createIssue, showBoard, showStatics }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="phone:justify-between tablet:justify-start flex flex-wrap items-center gap-8 p-8 bg-[#333333] shadow-md">
        <div className="flex items-center gap-2">
          <AiFillBug className="text-5xl font-normal text-[#e27065]" />
          <h1 className="font-[system-ui] text-4xl font-bold text-[#dddddd]">
            Easyodo
          </h1>
        </div>
        <div className="phone:flex tablet:hidden text-6xl font-bold text-[#e27065]">
          <CgMenuMotion onClick={toggleMenu} />
        </div>
        <div className="phone:hidden tablet:flex flex-wrap items-center gap-4">
          <button
            className="flex items-center gap-4 bg-[#e27065] border-solid border-[0.1rem] border-[#202020] font-['Lato'] text-2xl font-bold text-[#202020] p-4 cursor-pointer rounded-full"
            onClick={createIssue}
          >
            <GoPlus />
          </button>
          <input
            className="font-['Lato'] text-xl font-semibold text-[#dddddd] p-4 bg-[#202020] border-solid border-[0.1rem] border-[#202020] rounded-lg"
            type="text"
            placeholder="Search for bugs.."
          />
          <button
            className="flex items-center gap-2 font-['Lato'] text-xl font-bold text-[#dddddd] p-4 bg-[#202020] border-solid border-[0.1rem] border-[#202020] rounded-lg"
            onClick={showBoard}
          >
            <VscTasklist /> Board
          </button>
          <button
            className="flex items-center gap-2 font-['Lato'] text-xl font-bold text-[#dddddd] p-4 bg-[#202020] border-solid border-[0.1rem] border-[#202020] rounded-lg"
            onClick={showStatics}
          >
            <BiBarChartSquare /> Statics
          </button>
        </div>
      </nav>

      {showMenu && (
        <div className="phone:flex tablet:hidden flex-col  gap-2 p-2 bg-[#1c1c1c]">
          <button
            className="flex items-center gap-2 font-['Lato'] text-xl font-bold text-[#dddddd] p-4 bg-[#202020] border-solid border-[0.1rem] border-[#333232] rounded-lg"
            onClick={() => {
              createIssue();
              setShowMenu(false);
            }}
          >
            <GoPlus /> Add
          </button>
          <button
            className="flex items-center gap-2 font-['Lato'] text-xl font-bold text-[#dddddd] p-4 bg-[#202020] border-solid border-[0.1rem] border-[#333232] rounded-lg"
            onClick={() => {
              showBoard();
              setShowMenu(false);
            }}
          >
            <VscTasklist /> Board
          </button>
          <button
            className="flex items-center gap-2 font-['Lato'] text-xl font-bold text-[#dddddd] p-4 bg-[#202020] border-solid border-[0.1rem] border-[#333232] rounded-lg"
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
