import './client/styles/App.css';
import Navbar from './client/components/navbar';
import { useState } from 'react';
import axios from 'axios';
import { Route,Routes } from 'react-router-dom';



function App() {


  // //Defining state variables
  // const [username,setUserName] = useState('');
  // const [password,setPassword] = useState('');

  // //SignUP Handler
  // const handleClick = () =>{
  //   //For POST request body
  //   let userData = {
  //     username: username,
  //     password: password
  //   }
  //   //Request to server to add data
  //   axios.post('http://localhost:5000/auth/signup', userData)
  //   .then((response)=>{
  //     console.log(response.data);
  //     })
  //   .catch((err)=>{
  //      window.alert("Username already Exist!!");
  //     })
  // }

  // return (
  //   <div className="App">
  //       <h1>Blogging</h1>
  //       <p>welcome to my first blog post</p>
  //       <input type='text' onChange={(e) => setUserName(e.target.value)}></input>
  //       <input type='text' onChange={(e) => setPassword(e.target.value)}></input>
  //       <button onClick={handleClick}>Click Me</button>
  //  </div>
  // );

  return(
    <Routes>
        <Route path="/" >
        </Route>
    </Routes>
  )
}

export default App;
