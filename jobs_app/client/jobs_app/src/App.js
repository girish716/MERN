import './App.css';
import Jobs from './pages/Jobs';
import { Routes, Route, Navigate} from 'react-router-dom'
import Register from './pages/Register';

function App() {
  const token = localStorage.getItem('token')
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={token ? <Navigate to="/jobs"/> : <Register />}/>
        <Route path='/login' element={token ? <Navigate to="/jobs"/> : <Register />}/>
        <Route path='/jobs' element={token ? <Jobs/> : <Navigate to="/login"/>}/>
        <Route path='/' element={token ? <Jobs/> : <Navigate to="/login"/>}/>
      </Routes>
    </div>
  );
}

export default App;
