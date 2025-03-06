import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CrisisManagementApp from './components/CrisisManagementApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<CrisisManagementApp />} />
      </Routes>
    </Router>
  );
}

export default App;