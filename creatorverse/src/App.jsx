import './App.css';
import { Link } from "react-router-dom";
import AppRoutes from "./components/routes";

function App() {
  const navButtonStyle = {
    fontSize: '1.3rem',
    padding: '0.75rem 2rem',
    margin: '0 1rem',
    border: '2px solid #333',
    borderRadius: '8px',
    background: '#fff',
    color: '#222',
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    transition: 'background 0.2s, color 0.2s',
  };

  return (
    <>
      <header>
        <h1>CreatorVerse</h1>
        <nav style={{ margin: '2rem 0' }}>
          <Link to="/" style={navButtonStyle}>Home</Link>
          <Link to="/add" style={navButtonStyle}>Add Creator</Link>
        </nav>
      </header>
      <main>
        <AppRoutes />
      </main>
    </>
  );
}

export default App
