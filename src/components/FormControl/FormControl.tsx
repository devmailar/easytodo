import './FormControl.css';

export const FormControl = ({ addIcon, filterIcon, handleAddClick, handleFilterClick }: any) => (
  <div className="app-form-control">
    <button onClick={handleAddClick}>{addIcon}Add new</button>
    <button onClick={handleFilterClick}>{filterIcon}Filter</button>
  </div>
);
