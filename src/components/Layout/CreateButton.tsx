export const CreateButton = ({ icon, handleOpen }: any) => (
  <div className="form-control">
    <button className="button" onClick={handleOpen}>
      {icon}Add new
    </button>
  </div>
);
