import '../styles/profilepage.css';
import '../styles/follow.css';

const Follow = () =>{
    return(
        <div className="changable-div">
        <h1 className='title'>Follow</h1>
        <br/>
            <section className='following'>
                <div className="left-page">
                    <div className="follow">
                        <h1 className='follow-user'>Username</h1>
                        <button className='following-btn'>Following</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Follow;