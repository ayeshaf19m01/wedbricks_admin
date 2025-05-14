import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="text-white vh-100 p-3 position-fixed" style={{ width: '250px',backgroundColor: '#6f42c1'  }}>
      <h4 className="mb-4">Admin Dashboard</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link
            to="/users"
            className={`nav-link text-white ${pathname === '/users' ? 'active text-primary fw-bold rounded' : ''}`}
          >
            Users
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/vendors"
            className={`nav-link text-white ${pathname === '/vendors' ? 'active  text-primary fw-bold rounded' : ''}`}
          >
            Vendors
          </Link>
        </li>
      </ul>
    </div>
  );
}
