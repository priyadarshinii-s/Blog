import { useState } from 'react';
import '../styles/profilepage.css';
import Profile from './profile';
import Created from './Profile-Created';



const Profilepage = () => {
    const [isProfile, setProfile] = useState(true);
    const [isSaved, setSaved] = useState(false);
    const [isFollowing, setFollowing] = useState(false);
    const [isCreated,setCreated] = useState(false);


    const handleSignOut = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="main-div-ele">
            <div className='changable-div'>
                {isProfile &&
                <Profile/>
                }
                 {isCreated&&
                <Created/>
                }
            </div>


            <div className='static-div'>
                <button onClick={() =>{setProfile(true);setSaved(false);setCreated(false);setFollowing(false)}}><img src='./assests/profile.png' className='btn-img'></img>Profile</button>
                <hr></hr>
                <button onClick={() =>{setProfile(false);setSaved(false);setCreated(true);setFollowing(false)}}><img src='https://img.icons8.com/?size=100&id=6697&format=png' className="btn-img"
                    style={{ height: "28px", width: "28px" }}>
                </img>Created</button>
                <hr></hr>
                <button onClick={handleSignOut}><img src='./assests/signout.png' className='btn-img' style={{ height: "24px", width: "26px" }}></img>Sign Out</button>
                <div style={{height: "300px"}}></div>
            </div>
        </div>
    )
}


export default Profilepage;