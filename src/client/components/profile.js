import { useEffect, useState } from 'react';
import '../styles/profilepage.css';
import '../styles/profile.css';
import axios from 'axios';

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
    const [editProfileData, setEditProfileData] = useState(null);

    useEffect(() => {
        fetchData('arul'); 
    }, []);

    async function fetchData(name) {
        try {
            const response = await axios.get(`http://localhost:6010/user?name=${name}`);
            const data = response.data;
            console.log(data);
            setUser(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleOpen = () => {
        setShowModal(true);
        setEditProfileData(user);
    };
    
    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className="changable-div">
                {showModal && (
                    <div className="modal-container">
                        <div className="modal-content-update">
    
                            <h1 className='card-h1'>Update</h1>
    
                            <div className='div-update'>
                                
                                <div className='update-div-left'>
                                    <label htmlFor='profilepic' className='card-label'>Picture</label> <br/>
                                    <input type="text" id="profilepic" className='card-input' defaultValue={editProfileData?.profilepic}/> <br/><br/>
                                    <label htmlFor="username" className='card-label card-username'>Username</label> <br/>
                                    <input type="text" id="username" className='card-input' defaultValue={editProfileData?.username}/> <br/>
                                </div>
    
                                <div className='update-div-right'>
                                    <label htmlFor="about" style={{ marginTop: "6%" }} className='card-label'>About</label> <br/>
                                    <textarea className='card-input card-input-about' defaultValue={editProfileData?.about}></textarea>
                                </div>
                                
                            </div>
                            
                            <button className="btn">Update</button>
    
                            <div className='btn-div'>
                                <img src="./assests/exit.png" alt="close" className='exit-btn' onClick={handleClose}></img>
                            </div>
                        </div>
                    </div>
                )}
            <div className='profile-card'>
                <div className='profile-picture'>
                    <img src='./assests/elon.jpg' alt="Profile" />
                </div>
                <div className='user-name'>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p>{user && user.username}</p>
                    </div>
                    <div className='join-div'>
                        <p><img src='./assests/calendar.png' alt="Calendar" style={{ height: "18px", width: "18px" }} /> Joined on: {user && user.joined}</p>
                    </div>
                </div>
                <button className='edit-btn' onClick={handleOpen}>Edit Profile</button>
            </div>
            <div className='about'>
                <div className='about-me'>
                    <h4>ABOUT</h4>
                </div>
                <div className='content'>
                    <p>{user && user.about}</p> 
                </div>
            </div>
        </div>
    )
}

export default Profile;