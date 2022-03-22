import './App.css';
import Home from './pages/Home';

function App() {
  console.log(process.env.REACT_APP_SPORIFY_CLIENT_ID);
  return (
    <Home />
  );
}

export default App;
