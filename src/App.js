import './App.css';
import { DataProvider } from './Components/Context/DataContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Root from './Pages/Root';
import Home from './Pages/Home';
import Male from './Pages/Male';
import Female from './Pages/Female';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Root/>}>
            <Route index element={<Home/>}/>
            <Route path='/male' element={<Male/>}/>
            <Route path='/female' element={<Female/>}/>
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
