import { useState,useEffect } from 'react';
import '../styles/nav.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './loggedUser';


const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalSignUp, setShowModalSignUp] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(false);

    const { loggedUser,setLoggedUser } = useUser();

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setIsLoggedin(true);
            setLoggedUser(username);
        }
        else{
            setIsLoggedin(false);
        }
    }, []);


    const handleSignupClick = () => {
        let username = document.getElementById('username1').value;
        let password = document.getElementById('pass1').value;
        let d = new Date();

        let j = `${d.getUTCDate()}, ${d.getUTCMonth() + 1}, ${d.getUTCFullYear()}`

        let userData = {
            username: username,
            password: password,
            joined: j
        }

        axios.post('https://blog-4-7bie.onrender.com/auth/signup', userData)
            .then((response) => {
                window.alert("Registered Successfully!!");
                handleCloseModel();
            })
            .catch((err) => {
                window.alert("Username already Exist!!", err);
            })
    }

    const handleLoginClick = () => {
        let username = document.getElementById('username').value;
        let password = document.getElementById('pass').value;
      
        let userData = {
            username: username,
            password: password
        }
       
        axios.post('https://blog-4-7bie.onrender.com/auth/login', userData)
            .then((response) => {
                if (response.data.message === "valid-user") {
                    setIsLoggedin(true);
                    setLoggedUser(response.data.username);
                    localStorage.setItem('username',response.data.username);
                    handleClose();
                }
                
                console.log(response.data.username);
            })
            .catch((err) => {
                window.alert("Invaild username/password");
            })
    }


    const handleOpen = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleOpenModel = () => {
        setShowModalSignUp(true);
    };

    const handleCloseModel = () => {
        setShowModalSignUp(false);
    };


    return (
        <div className="overall-div">
            {showModal && (
                <div className="modal-container">
                    <div className="modal-content">
                        <h1 className='card-h1'>Login</h1>
                        <label htmlFor="username" className='card-label'>Username</label>
                        <input type="text" id="username" className='card-input'/>
                        <label htmlFor="pass" style={{ marginTop: "6%" }} className='card-label'>Password</label>
                        <input type="password" id="pass"  className='card-input'/>
                        <button className="btn" onClick={handleLoginClick} >Login</button>
                        <div className='btn-div'>
                            <img src="./assests/exit.png" alt="close" className='exit-btn' onClick={handleClose}></img>
                        </div>
                    </div>
                </div>
            )}
            {showModalSignUp && (
                <div className="modal-container">
                    <div className="modal-content">
                        <h1 className='card-h1'>Signup</h1>
                        <label htmlFor="username" className='card-label'>Username</label>
                        <input type="text" id="username1" className='card-input'/>
                        <label htmlFor="pass" style={{ marginTop: "6%" }} className='card-label'>Password</label>
                        <input type="password" id="pass1" className='card-input'/>
                        <button className="btn" onClick={handleSignupClick}>Signup</button>

                        <div className='btn-div'>
                            <img src="./assests/exit.png" alt="close" className='exit-btn' onClick={handleCloseModel}></img>
                        </div>
                    </div>
                </div>
            )}

            <div className='logo-div'>
                <h1>H A M S</h1>
            </div>
            <div className='route-div'>
                <Link to="/home">
                    <button className='nav-btn'>Home</button>
                </Link>
                <Link to="/discover">
                    <button className='nav-btn'>Discover</button>
                </Link>
            </div>

            {isLoggedin ?
                <div className='pro-div'>
                    <Link to="/create">
                        <button className='login-div'>Create</button>
                    </Link>
                    <Link to="/profile">
                        <button className='signup-div'>Profile</button>
                    </Link>
                </div>
                :
                <div className='pro-div'>
                    <button className='login-div' onClick={handleOpen}>Login</button>
                    <button className='signup-div' onClick={handleOpenModel}>Signup</button>
                </div>
            }
        </div>
    )
}


export default Navbar;
