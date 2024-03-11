import '../styles/home.css'
import { Link } from 'react-router-dom';
const Home = () =>{
    return(
        <>
            <div className="main-div">
                <div className='content-div'>
                    <h1 className='main-head'>Discover, Explore, and Share</h1>
                    <h1 className='main-subhead'>Your Journey Begins Here!</h1>
                    <div className='sub-text'>
                    <p>Join our vibrant community of readers and contributors as we explore the boundless possibilities of knowledge and creativity together. 
                        Let your curiosity lead the way as you embark on a journey of discovery with us.</p>
                    </div>
                    <div>
                      <Link to="/discover">
                         <button className='get-button'>Get Started</button>
                       </Link>
                    </div>
                    <div style={{height: "19px"}}></div>
                </div>
                <div className='pic-div'>
                    <div style={{height: "1000px"}}></div>
                    <img src='./assests/blog1.png' className='main-img'></img>
                </div>
            </div>     
        </>
    )
}


export default Home;