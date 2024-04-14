import '../styles/create.css';
import {  useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from './loggedUser';


const Create = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [contentList, setContentList] = useState([]);
    const [isImageClicked, setIsImageClicked] = useState(false);
    const [isstat, setStat] = useState(false);

    const { loggedUser } = useUser();

    const postClicked = async () => {
        let tit = document.getElementById('title').value;
        let sub = document.getElementById('subtext').value;
        let the = document.getElementById('theme').value;
        let postData;
        if(loggedUser){
             postData = {
                Title: tit,
                Subtext: sub,
                tag: the,
                Author: loggedUser,
                content: contentList
            }
        }
        else{
            window.alert("Login First to create post");

        }
        await axios.post('https://blog-4-7bie.onrender.com/post/upload',postData)
        .then((response) => {
            window.alert("Upload Success");
            window.location.reload();
        })
        .catch((err) => {
            window.alert("Username already Exist!!", err);
        })

    }

    const handleDelete = (id) => {
        setContentList(contentList.filter((item) => {
            if (item.id.i !== id.i) return item;
        }));
    };


    const Clicked = (type) => {
        let c = contentList;
        let i = uuidv4();
        c.push(
            { title: type, data: '', id:`${i}` }
        );
        setContentList(c);
        setStat(!isstat);
    }


    return (
        <div className="dis1">
            <div className='create-page-tit'>
                <h1>Craft Your Story, Share Your Voice<br />Start Blogging Today!</h1>
            </div>
            <div className='main-component1'>
                <div className='head-top'>
                    <textarea type="text" className='blog-title' id="title" autoFocus={true} placeholder='Title'></textarea>
                    <textarea type="text" className='blog-subtext'id="subtext" placeholder='Subline' key="56758"></textarea>
                    <div className='theme-div'>
                        <p className='theme'>Theme : &nbsp;</p>
                        <input className ="theme-input" id="theme" placeholder="Enter the theme" type='text'></input>
                    </div>
                </div>

                <div className='blog-main'>
                    {contentList.map((e) => {
                        if (e.title) {
                            let type = e.title;
                            if (type === 'image') {
                                return (
                                    <div className='blog-content-img' id={e.id}>
                                        <img src={e.data} alt="Invalid url / paste the Image address" />
                                        <button onClick={() => handleDelete(e.id)} className='dlt-btn'>
                                            <img src='./assests/delete.png'></img>
                                        </button>
                                    </div>
                                )
                            }
                            if (type === 'code') {
                                return (
                                    <div className='blog-content-code' id={e.id} key={e.id}>
                                        <textarea autoFocus={true} placeholder='Enter your code.....' id='code-text'></textarea>
                                        <button onClick={() => {
                                            e.data = document.getElementById('code-text').value;
                                            setStat(!isstat)
                                        }} className='add-btn'>
                                            {e.data.length > 0 ? <img src='./assests/tick-fill.png'></img> : <img src='./assests/add.png'></img>} 
                                        </button>
                                        <button className='dlt-btn' onClick={() => handleDelete(e.id)}>
                                            <img src='./assests/delete.png'></img>
                                        </button>
                                    </div>
                                )
                            }
                            if (type === 'subTitle') {
                                return (
                                    <div className='blog-content-sub' id={e.id} key={e.id}>
                                        <textarea autoFocus={true} placeholder='Sub-title' id="sub-title" className='subTitle-Des'></textarea>
                                        <button onClick={() => {
                                            e.data = document.getElementById('sub-title').value;
                                            setStat(!isstat);
                                        }} className='add-btn'>

                                        {e.data.length > 0 ? <img src='./assests/tick-fill.png'></img> : <img src='./assests/add.png'></img>}

                                        </button>
                                        <button className='dlt-btn' onClick={() => handleDelete(e.id)}>
                                            <img src='./assests/delete.png'></img>
                                        </button>
                                    </div>
                                )
                            }
                            if (type === 'para'){
                                return  (
                                    <div className='blog-content-para' id={e.id} key={e.id}>
                                    <textarea autoFocus={true} id='des-text' placeholder='Description'></textarea>
                                    <button onClick={() => {
                                            e.data = document.getElementById('des-text').value;
                                            setStat(!isstat);
                                        }} className='add-btn'>

                                        {e.data.length > 0 ? <img src='./assests/tick-fill.png'></img> : <img src='./assests/add.png'></img>}

                                        </button>
                                        <button className='dlt-btn' onClick={() => handleDelete(e.id)}>
                                            <img src='./assests/delete.png'></img>
                                        </button>
                                    </div>
                                )
                            }
                        }
                    })}


                    {isImageClicked &&
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <p style={{ fontFamily: "Roboto, sans-serif", color: "#6c6c6c", fontSize: '18px' }}>
                                Paste the Image Address :&nbsp;</p>
                            <input type='text' id="img-link" style={{ height: "40px", width: "60%" }} />
                            <button onClick={() => {
                                let c = contentList;
                                let i = uuidv4();
                                c.push(
                                    { title: 'image', data: document.getElementById('img-link').value, id: { i } }
                                );
                                setContentList(c);
                                setIsImageClicked(false);
                            }} className='add-btn'>
                                <img src='./assests/add.png'></img>
                            </button>
                        </div>
                    }

                    <div className='multiple-button'>
                        <div className='fixed-button'>
                            <button onClick={() => setIsOpen(!isOpen)} className='source-button'>
                                {isOpen ? <img src='./assests/cross.png' /> : <img src='./assests/plus.png' />}
                            </button>
                        </div>
                        <div className='move-button'>
                            {isOpen && (<div className='buttons-div'>
                                <button onClick={() => setIsImageClicked(true)}><img src='./assests/photo.png' className='icon' /></button>
                                <button onClick={() => Clicked('code')}><img src='./assests/code.png' className='icon' /></button>
                                <button onClick={() => Clicked('subTitle')}><img src='./assests/sub.png' className='icon' /></button>
                                <button onClick={() => Clicked('para')}><img src='./assests/para.png' className='icon' /></button>
                            </div>)}
                        </div>

                        <div style={{ position: "absolute", bottom: 1, right: 0 }}>
                            <button className='post-btn' onClick={postClicked}>Post</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Create;
