import './App.css';
import HeaderComponent from './components/HeaderComponent';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import LettersPage from './pages/LettersPage';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/letters" element={<LettersPage />} />
      </Routes>
    </div>
  );
}

export default App;
