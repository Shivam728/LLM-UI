import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import Frontend from './pages/home/Home';
import './normal.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Frontend/>}/>
        </Routes>
    </Router>
  );
}

export default App;
