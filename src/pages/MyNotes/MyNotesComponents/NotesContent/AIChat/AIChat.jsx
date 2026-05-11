import { useState } from 'react'
import Header from './AIChatComponents/Header'
import Content from './AIChatComponents/Content'
import Input from './AIChatComponents/Input'
import './AIChat.css'

const AIChat =() => {
    const[chat, setChat] = useState([])
    const[inputPlain, setInputPlain] = useState(false)
    const[preloader,  setPreloader] = useState(true)

    const URL = "https://mnb-server.onrender.com/message"

    const userMessage = (el) => {
    setPreloader(false)
    setInputPlain(true)
    setTimeout(() => setInputPlain(false), 700)
    const user_token = localStorage.getItem('token');
    const user_message = {
        role: "user",
        message: el
    };

    setTimeout(() => setChat((prev) => [...prev, user_message]), 500)

    fetch(URL, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${user_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user_message)
    })
    .then((res) => res.json())
    .then((data) => {

        const aiResponseText = typeof data === 'string' ? data : data.message;

        const req = {
            role: "model",
            message: aiResponseText
        };


        setChat((prev) => [...prev, req]);
    })
    .catch(err => console.error("Ошибка API:", err));
}


    return(
        <div className='notes__chat'>
            <Header />
            <Content preloader={preloader} setChat={setChat} chat={chat}/>
            <Input inputPlain={inputPlain} userMessage={userMessage}/>
        </div>
    )
}

export default AIChat