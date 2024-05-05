import './Root.css';
import Header from '../Header/Header';
import Navbar from '../Navbar/navbar';

export const Root = ({ children }) => {
  return (
    <div className="Root-container">
      <Header />
      <div className="Root-content">{children}</div>
    </div>
  );
};
