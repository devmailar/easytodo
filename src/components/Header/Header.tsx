import './Header.css';

export const Header = ({ icon, paragraphIcon }: any) => (
  <div className="app-header">
    <div className="app-logo">
      {icon}
      <h1>
        Easy<span>odo</span>
      </h1>
    </div>
    <div className="app-text">
      <p>
        Effortlessly manage your todos with powerful todo app.
        <br /> Built with React + Typescript + Vite {paragraphIcon}
      </p>
    </div>
  </div>
);
