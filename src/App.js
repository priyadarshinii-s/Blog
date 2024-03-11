import './client/styles/App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './client/components/Home';
import SharedLayout from './client/components/SharedLayout';
import DiscoverPage from './client/components/DiscoverPage';
import Profilepage from './client/components/Profilepage';


function App() {
  return(
    <Routes>
      <Route path="/" element={<SharedLayout/>}>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/discover" element={<DiscoverPage/>}></Route>
        <Route path="/profile" element={<Profilepage/>}></Route>
      </Route>
    </Routes>
  )
}

export default App;
