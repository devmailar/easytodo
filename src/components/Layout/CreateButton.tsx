export const CreateButton = ({ icon, handleAddNew }: any) => (
  <div className="openform">
    <button className="button" onClick={handleAddNew}>
      Add New {icon}
    </button>
  </div>
);
