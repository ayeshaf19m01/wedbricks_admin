import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Users from './pages/Users';
import Vendors from './pages/Vendors';

function App() {
  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar with purple background */}
        <div className="bg-primary text-white vh-100" style={{ width: '250px' }}>
          <Sidebar />
        </div>

        {/* Main content area with padding and light background */}
        <div className="flex-grow-1 p-4 bg-light" style={{ marginLeft: '2px', minHeight: '100vh' }}>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/" element={<Users />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
