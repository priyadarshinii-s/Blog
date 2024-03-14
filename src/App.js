import './client/styles/App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './client/components/Home';
import SharedLayout from './client/components/SharedLayout';
import DiscoverPage from './client/components/DiscoverPage';
import Profilepage from './client/components/Profilepage';
import Create from './client/components/create';
import Singlepost from './client/components/singlePost';
import { LoggedUserProvider } from './client/components/loggedUser';



function App() {
  return(
    <LoggedUserProvider>
    <Routes default="/home">
      <Route path="/" element={<SharedLayout/>}>
        <Route index element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path="/discover" element={<DiscoverPage/>}></Route>
        <Route path="/profile" element={<Profilepage/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path="/post/id/:id" element={<Singlepost/>}></Route>

      </Route>
    </Routes>
    </LoggedUserProvider>
  )
}

export default App;
