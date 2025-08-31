
import { Link } from 'react-router-dom';
import './navbar.css';
import RawMaterials from '../pages/Inventory/raw-materials/RawMaterials';
const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Fujicraft ERP</div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Dashboard</Link>
        <div className="navbar-link navbar-dropdown">
          Inventory
          <div className="navbar-dropdown-content">
            <Link to="/inventory/raw-material" className="navbar-link">Raw Materials</Link>
            <Link to="/inventory/master-batch" className="navbar-link">Master Batch</Link>
            <Link to="/inventory/bags" className="navbar-link">Bags</Link>
            <Link to="/inventory/paint-work-items" className="navbar-link">Paint Work Items</Link>
          </div>
        </div>
        <Link to="/expenses" className="navbar-link">Expenses</Link>
      </div>
    </nav>
  );
};

export default Navbar;
