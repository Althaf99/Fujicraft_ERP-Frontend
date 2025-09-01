
function Bags() {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h2>Bags</h2>
      <p>This is the Bags page.</p>
    </div>
  );
}

function PaintWorkItems() {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h2>Paint Work Items</h2>
      <p>This is the Paint Work Items page.</p>
    </div>
  );
}

import { Routes, Route, Link } from 'react-router-dom';


import Navbar from './components/Navbar';
import Login from './pages/login/login';
import { useState } from 'react';
import RawMaterials from './pages/Inventory/raw-materials/RawMaterials';
import MasterBatch from './pages/Inventory/master-batch/MasterBatch';

function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome to Fujicraf ERP</h1>
      <Link to="/login" style={{ marginTop: 24, padding: '12px 24px', background: '#2563eb', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 600 }}>Go to Login</Link>
    </div>
  );
}


function Inventory() {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h2>Inventory</h2>
      <p>This is the Inventory page.</p>
    </div>
  );
}

function Expenses() {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h2>Expenses</h2>
      <p>This is the Expenses page.</p>
    </div>
  );
}

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/inventory" element={isAuthenticated ? <Inventory /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/inventory/raw-material" element={isAuthenticated ? <RawMaterials /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/inventory/master-batch" element={isAuthenticated ? <MasterBatch /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/inventory/bags" element={isAuthenticated ? <Bags /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/inventory/paint-work-items" element={isAuthenticated ? <PaintWorkItems /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/expenses" element={isAuthenticated ? <Expenses /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
      </Routes>
    </>
  );
}

export default App;
