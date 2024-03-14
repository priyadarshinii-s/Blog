import '../styles/profilepage.css';
import '../styles/profile-created.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

const Created = () =>{
    const [content, setContent] = useState([]);
    const loggedUser = localStorage.getItem('username')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/saved?user=${loggedUser}`);
                const postData = response.data;
                setContent(postData);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleClick = (e) => {
        window.location = `/editpost/id/${e.replaceAll('/','-')}`;
    }

    const createDate = (d) =>{   
    var months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];
        let da = `${d.getUTCDate()}, ${d.getUTCMonth() + 1}, ${d.getUTCFullYear()}`
        let j = da.split(',');

        return `${j[0]} ${months[ j[1] - 1 ]} ${j[2]}`;
    }

    const handleDelete = async(id) =>{
        try {
            const response = await axios.delete(`http://localhost:5000/deletepost?id=${id}`);
            if(response.data.message === "Deleted"){
                window.location.reload();
            }
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    }


    return(
        <div className="changable-div">
            <div className='main-container'>
                <div className='heading1'>
                    <h1> CREATED BLOGS </h1>
                </div>

                <div className='content-show'>

                    {content.map((e) => {
                        let date = createDate(new Date(e.dateCreated));

                        return(
                        <div className="container2">
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
                                        <button className='follow-btn' onClick={()=>handleDelete(e.id)}>Delete</button>                                
                                </div>
                                <div className="details">
                                    <div className="details-container">
                                        <div className="heading3">
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

export default Created;
