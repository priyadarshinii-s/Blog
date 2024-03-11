
import '../styles/discover.css';

const DiscoverPage = () => {
    return (
        <div className="dis">
            <div className='main-component'>
                <div className='search-topic-div'>
                    <div className="inp-sec">
                        <input type="text" className='search-box'></input>
                        <div className='search-div'>
                            <button className='search-btn'>
                                <img src='./assests/search.png' className='search-icon' />
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className='themes-div'>
                    <button>For You</button>
                    <button>Lifestyle</button>
                    <button>Coding</button>
                    <button>Motivation</button>
                    <button>Health</button>
                    <button>Health</button>
                    <button>Health</button>
                    <button>Health</button>
                </div>
            </div>
        </div>
    )
}


export default DiscoverPage;