import '../styles/nav.css';
import { Link } from 'react-router-dom';


const Navbar = () =>{


        return(
            <div className="overall-div">
                <div className='logo-div'>
                                
                </div>
                <div className='route-div'>
                    <Link to="/">
                        <button>Home</button>
                    </Link>
                </div>
                <div className='pro-div'>
                        <div></div>
                        <div></div>
                </div>
            </div>
        )
}


export default Navbar;