
import { type } from '@testing-library/user-event/dist/type';
import '../styles/create.css';
import { useEffect, useState } from 'react';


const Create = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [contentCount, setContentCount] = useState(0);
    const [contentList,setContentList] = useState([]);

    const PhotoDiv = (ind) => 
    <div className='blog-content-img' key={ind}> <img src='./assests/test.jpg'/> </div>;
    const CodeDiv = (ind) => 
    <div className='blog-content-code' key={ind}>
        <textarea autoFocus={true} placeholder='Enter your code.....'></textarea>
    </div>;
    const SubDiv = (ind) => 
    <div className='blog-content-sub'  key={ind}>
        <textarea autoFocus={true} placeholder='Sub-title'></textarea>
    </div>;
    const ParaDiv = (ind) => 
    <div className='blog-content-para' key={ind}>
        <textarea autoFocus={true} placeholder='Description'></textarea>
    </div>;

    const addPhoto = () => {
        setContentCount(contentCount + 1);
        setContentList([...contentList,PhotoDiv(contentCount)]);
    };
    const addCode = () => {
        setContentCount(contentCount + 1);
        setContentList([...contentList,CodeDiv(contentCount)]);

    };
    const addSub = () => {
        setContentCount(contentCount + 1);
        setContentList([...contentList,SubDiv(contentCount)]);
    };
    const addPara = () => {
        setContentCount(contentCount + 1);
        setContentList([...contentList,ParaDiv(contentCount)]);
    };


    return (
        <div className="dis1">
            <div className='create-page-tit'>
                <h1>Craft Your Story, Share Your Voice<br />Start Blogging Today!</h1>
            </div>


            {/* <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img src='./assests/create.png' style={{height: "400px", width: "400px"}}>
                    </img>
                </div>
                <button className='get-started-btn'>Get Started</button> */}

            <div className='main-component1'>
                <div className='head-top'>
                    <textarea type="text" className='blog-title' autoFocus={true} placeholder='Title'></textarea>
                    <textarea type="text" className='blog-subtext' placeholder='Subline'></textarea>
                </div>
                <div className='blog-main'>
                    {contentList}

                    <div className='multiple-button'>
                        <div className='fixed-button'>
                            <button onClick={() => setIsOpen(!isOpen)} className='source-button'>
                                {isOpen ? <img src='./assests/cross.png' /> : <img src='./assests/plus.png' />}
                            </button>
                        </div>
                        <div className='move-button'>
                            {isOpen && (<div className='buttons-div'>
                                <button  onClick={addPhoto}><img src='./assests/photo.png' className='icon' /> </button>
                                <button onClick={addCode}><img src='./assests/code.png' className='icon' /></button>
                                <button onClick={addSub}><img src='./assests/sub.png' className='icon' /></button>
                                <button onClick={addPara}><img src='./assests/para.png' className='icon' /></button>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Create;