import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import PublicProfile from './pages/PublicProfile';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
