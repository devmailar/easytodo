export const Button = ({ icon, handleClick }: any) => (
  <div className="app-form-control">
    <button onClick={handleClick}>{icon}Add new</button>
  </div>
);
