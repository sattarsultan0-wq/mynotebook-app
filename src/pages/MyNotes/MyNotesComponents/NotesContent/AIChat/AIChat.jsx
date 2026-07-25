import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './AIChatComponents/Header'
import Content from './AIChatComponents/Content'
import Input from './AIChatComponents/Input'
import './AIChat.css'

const AIChat =() => {
    const[chat, setChat] = useState([])
    const[inputPlain, setInputPlain] = useState(false)
    const[preloader,  setPreloader] = useState(true)
    const[isMenuOpen, setIsMenuOpen] = useState(false)
    const[isProfileOpen, setIsProfileOpen] = useState(false)
    const navigate = useNavigate()

    const URL = "https://mnb-server.onrender.com/message"

    const handleProfileAction = () => {
        setIsProfileOpen(false)
        navigate('/auth')
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsProfileOpen(false)
        navigate('/auth')
    }

    const userMessage = (el) => {
    setPreloader(false)
    setInputPlain(true)
    setTimeout(() => setInputPlain(false), 700)
    const user_token = localStorage.getItem('token');
    const user_message = {
        id: `user-${Date.now()}`,
        role: "user",
        message: el
    };

    setChat((prev) => [...prev, user_message])

    const assistant_message = {
        id: `model-${Date.now() + 1}`,
        role: "model",
        message: ""
    }

    setChat((prev) => [...prev, assistant_message])

    fetch(URL, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${user_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ role: "user", message: el })
    })
    .then((res) => res.json())
    .then((data) => {
        const aiResponseText = typeof data === 'string' ? data : data.message || '';

        let index = 0
        const streamChunk = () => {
            if (index >= aiResponseText.length) {
                return
            }

            const nextLength = Math.min(index + 2, aiResponseText.length)
            const chunk = aiResponseText.slice(index, nextLength)

            setChat((prev) => prev.map((msg) =>
                msg.id === assistant_message.id
                    ? { ...msg, message: `${msg.message}${chunk}` }
                    : msg
            ))

            index = nextLength
            setTimeout(streamChunk, 22)
        }

        streamChunk()
    })
    .catch(err => console.error("Ошибка API:", err));
}


    const hasMessages = chat.length > 0

    return(
        <div className={`notes__chat ${hasMessages ? 'notes__chat--active' : 'notes__chat--empty'}`}>
            <Header 
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                isProfileOpen={isProfileOpen}
                setIsProfileOpen={setIsProfileOpen}
                onOpenProfile={handleProfileAction}
                onLogout={handleLogout}
            />
            <Content preloader={preloader} setChat={setChat} chat={chat}/>
            <Input inputPlain={inputPlain} userMessage={userMessage} hasMessages={hasMessages}/>
        </div>
    )
}

export default AIChat