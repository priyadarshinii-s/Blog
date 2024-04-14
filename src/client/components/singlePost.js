import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/singlePost.css';
import { useParams } from "react-router-dom";

const Singlepost = () => {
    const [title, setTitle] = useState('');
    const [subText, setSubText] = useState('');
    const [author, setAuthor] = useState('');
    const [tag, setTag] = useState('');
    const [content, setContent] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://blog-4-7bie.onrender.com/posts?id=${id.replaceAll('-','/')}`);
                const postData = response.data[0];
                
                setTitle(postData.Title);
                setAuthor(postData.Author);
                setSubText(postData.Subtext);
                setTag(postData.tag);
                setContent(postData.content);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData(); 
    }, []); 

    return (
        <div className="dis2">
            <div className='main-component2'>
                <div className='head-top1'>
                    <h1 className='blog-title1'>{title}</h1>
                    <p className='blog-subtext1'>{subText}</p>
                    <div className='theme-div1'>
                        <div>
                        {tag && <p className='theme1'>Tag : {tag} </p>}
                        </div>
                        <div style={{border: "none"}}>
                        {tag && <p className='theme1'>Author : {author} </p>}
                        </div>
                    </div>
                </div>

                <div className='blog-main1'>

                {content.length > 0 && content.map((e) => {
                        if (e.title) {
                            let type = e.title;
                           
                            if (type === 'image') {
                                return (
                                    <div className='blog-content-img' id={e.id}>
                                        <img src={e.data} alt="Invalid url / paste the Image address" />
                                    </div>
                                )
                            }
                            if (type === 'code') {
                                return (
                                    <div className='blog-content-code' id={e.id} key={e.id}>
                                        <p>{e.data}</p>
                                    </div>
                                )
                            }
                            if (type === 'subTitle') {
                                return (
                                    <div className='blog-content-sub1' id={e.id} key={e.id}>
                                        <h2>{e.data}</h2>
                                    </div>
                                )
                            }
                            if (type === 'para'){
                                return  (
                                    <div className='blog-content-para1' id={e.id} key={e.id}>
                                        <p>{e.data}</p>
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
            </div>
        </div>

    )
}

export default Singlepost;
