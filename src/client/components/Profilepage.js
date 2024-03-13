import { useState } from 'react';
import '../styles/profilepage.css';
import Profile from './profile';
import Saved from './saved';
import Follow from './follow';
import Created from './Profile-Created';



const Profilepage = () => {
    const [isProfile, setProfile] = useState(true);
    const [isSaved, setSaved] = useState(false);
    const [isFollowing, setFollowing] = useState(false);
    const [isCreated,setCreated] = useState(false);

    const [users, setUsers]=useState([])

    const [profiles, setProfiles]=useState([])

    async function fetchData(username){
    let response=await fetch(`http://localhost:6000/user?name=${username}`);
    let data=await response.json();
    console.log(data);
    }

    return (
        <div className="main-div-ele">
            <div className='changable-div'>
                {isProfile &&
                <Profile/>
                }
                 {isSaved&&
                <Saved/>
                }
                 {isCreated&&
                <Created/>
                }
                 {isFollowing &&
                <Follow/>
                }
            </div>


            <div className='static-div'>
                <button onClick={() =>{setProfile(true);setSaved(false);setCreated(false);setFollowing(false)}}><img src='./assests/profile.png' className='btn-img'></img>Profile</button>
                <hr></hr>
                <button onClick={() =>{setProfile(false);setSaved(true);setCreated(false);setFollowing(false)}}><img src='./assests/save.png' className="btn-img"
                    style={{ height: "18px", width: "18px" }}>
                </img>Saved</button>
                <hr></hr>
                <button onClick={() =>{setProfile(false);setSaved(false);setCreated(true);setFollowing(false)}}><img src='https://img.icons8.com/?size=100&id=6697&format=png' className="btn-img"
                    style={{ height: "28px", width: "28px" }}>
                </img>Created</button>
                <hr></hr>
                <button onClick={() =>{setProfile(false);setSaved(false);setCreated(false);setFollowing(true)}}><img src='./assests/follow.png' className="btn-img"
                    style={{ height: "38px", width: "38px" }}>
                </img>Following</button>
                <hr></hr>
                <button><img src='./assests/signout.png' className='btn-img' style={{ height: "24px", width: "26px" }}></img>Sign Out</button>
                <div style={{height: "300px"}}></div>
            </div>
        </div>
    )
}


export default Profilepage;
