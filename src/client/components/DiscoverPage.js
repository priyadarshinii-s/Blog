
import { useState, useEffect } from 'react';
import '../styles/discover.css';
import axios from 'axios';

const DiscoverPage = () => {


    const [content, setContent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://blog-2-orjh.onrender.com/allposts');
                const postData = response.data;
                setContent(postData);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const handleClick = (e) => {
        window.location = `/post/id/${e.replaceAll('/','-')}`;
    }

    const createDate = (d) =>{   
    var months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];
        let da = `${d.getUTCDate()}, ${d.getUTCMonth() + 1}, ${d.getUTCFullYear()}`
        let j = da.split(',');

        return `${j[0]} ${months[ j[1] - 1 ]} ${j[2]}`;
    }

    const clickedBtn = async(val)=>{

        if(val === 'All'){
            try {
                const response = await axios.get('http://localhost:5000/allposts');
                const postData = response.data;
                setContent(postData);
            } catch (error) {
                console.log("Error fetching data:", error);
            } 
            }
        else{
            try {
                const response = await axios.get(`http://localhost:5000/post?tag=${val}`);
                const postData = response.data;
                setContent(postData);
            } catch (error) {
                console.log("Error fetching data:", error);
            }  
        } 
    }

    const search = async() =>{
         let keyword = document.getElementById('search-ele').value;
         try {
            const response = await axios.get(`http://localhost:5000/search?keyword=${keyword}`);
            const postData = response.data;
            setContent(postData);
        } catch (error) {
            console.log("Error fetching data:", error);
        }  
    }

    return (
        <div className="dis">
            <div className='main-component'>
                <div className='search-topic-div'>
                    <div className="inp-sec">
                        <input type="text" className='search-box' id='search-ele'></input>
                        <div className='search-div'>
                            <button className='search-btn' onClick={search}>
                                <img src='./assests/search.png' className='search-icon' />
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className='themes-div'>
                    <button onClick={() => clickedBtn('All')}>For You</button>
                    <button onClick={() => clickedBtn('Lifestyle')}>Lifestyle</button>
                    <button onClick={() => clickedBtn('Coding')}>Coding</button>
                    <button onClick={() => clickedBtn('Motivation')}>Motivation</button>
                    <button onClick={() => clickedBtn('Health')}>Health</button>
                    <button onClick={() => clickedBtn('Sports')}>Sports</button>
                    <button onClick={() => clickedBtn('Travel')}>Travel</button>
                    <button onClick={() => clickedBtn('Social Media')}>Social Media</button>
                </div>
                <div className='content-show'>

                    {content.map((e) => {
                        let date = createDate(new Date(e.dateCreated));

                        return(
                        <div className="container1">
                            <div className="boxItems">
                                <div className="title">
                                    <div style={{display: "flex", alignItems: "center"}}>
                                    <div className="authorpic">
                                        <img className='pic' src="https://imgs.search.brave.com/E_17xhYQCDoNB1Z9kyV2--HCbBOFtxD1n2XMKrgwSfg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/dGVhaHViLmlvL3Bo/b3Rvcy9mdWxsLzM5/LTM5NjQ1Ml9hbmlt/ZS1wcm9maWxlLXBp/Y3R1cmUtZ2lybC5q/cGc" alt="Profile" />
                                    </div>
                                    <div className="authorname">
                                        <p>{e.Author}</p>
                                    </div>
                                    </div>
                                    
                                </div>
                                <div className="details">
                                    <div className="details-container">
                                        <div className="heading">
                                            <h1 onClick={() => handleClick(e.id)}>{e.Title}</h1>
                                        </div>
                                        <div className="content">
                                            <p>{e.Subtext}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="footer">
                                    <div className="footer-left">
                                        <div className="tags-container">
                                            <a className='tags'>{e.tag}</a>
                                        </div>
                                    </div>

                                    <div className="footer-right">
                                    <p>Created on :</p>
                                    <p>{date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </div>
    )
}


export default DiscoverPage;
