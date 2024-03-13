import { useState } from 'react';
import '../styles/profilepage.css';
import '../styles/profile.css';

const Profile = () =>{
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => {
        setShowModal(true);
    };
    const handleClose = () => {
        setShowModal(false);
    };

    return(
        <div className="changable-div">

{showModal && (
                <div className="modal-container">
                    <div className="modal-content-update">

                        <h1 className='card-h1'>Update</h1>

                        <div className='div-update'>
                            
                            <div className='update-div-left'>
                                <label htmlFor='profilepic' className='card-label'>Picture</label> <br/>
                                <input type="text" id="profilepic" className='card-input'/> <br/><br/>
                                <label htmlFor="username" className='card-label card-username'>Username</label> <br/>
                                <input type="text" id="username" className='card-input'/> <br/>
                            </div>

                            <div className='update-div-right'>
                                <label htmlFor="about" style={{ marginTop: "6%" }} className='card-label'>About</label> <br/>
                                <textarea className='card-input card-input-about'></textarea>
                            </div>
                            
                        </div>
                        
                        <button className="btn"  >Update</button>

                        <div className='btn-div'>
                            <img src="./assests/exit.png" alt="close" className='exit-btn' onClick={handleClose}></img>
                        </div>
                    </div>
                </div>
            )}

                <div className='profile-card'>
                    <div className='profile-picture'>
                        <img src='./assests/elon.jpg'/>
                    </div>
                    <div className='user-name'>
                        <div style={{display: "flex", alignItems: "center"}}>
                        <p>Elon Musk</p>
                       </div>
                        <div className='join-div'>
                            <p><img src='./assests/calendar.png' style={{ height: "18px", width: "18px"}}></img>
                            Joined on : 12 March 2024</p>
                        </div>
                    </div>

                    <button className='edit-btn' onClick={handleOpen}>Edit Profile</button>
                </div>
                <div className='about'>
                    <div className='about-me'>
                        <h4>ABOUT</h4>
                    </div>
                    <div className='content'>
                        <p>Elon Musk cofounded six companies, including electric car maker Tesla, rocket producer SpaceX and tunneling startup Boring Company.
He owns about 21% of Tesla between stock and options, but has pledged more than half his shares as collateral for personal loans of up to $3.5 billion.
SpaceX, founded in 2002, is worth nearly $150 billion after a $750 million tender offer in June 2023; it nearly quintupled its value in four years.
Boring Company, which aims to defeat traffic, raised $675 million in April 2022 at a $5.7 billion valuation.
Twitter's board agreed to sell the company to Musk for $44 billion in April 2022, after he disclosed a 9.1% stake and threatened a hostile takeover.
The deal closed in October 2022 after Musk tried to back out and Twitter sued. Musk owns an estimated 74% of the company, which is now called X.</p>
                    </div>
                </div>
        </div>
    )
}

export default Profile;
