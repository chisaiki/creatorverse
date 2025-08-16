import './App.css';
import { Link } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <header>
        <h1>Creatorverse</h1>
        <nav>
          <Link to="/">Home</Link> 
          <Link to="/view">View Creator</Link> 
          <Link to="/edit">Edit Creator</Link>    
          <Link to="/add">Add Creator</Link>
        </nav>  
      </header>
      <main>
        <AppRoutes />
      </main>
    </>
  );
}

export default App
