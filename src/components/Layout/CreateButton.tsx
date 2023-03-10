export const CreateButton = ({ icon, handleOpen }: any) => (
  <div className="form-control">
    <button className="button" onClick={handleOpen}>
      Add New {icon}
    </button>
  </div>
);
