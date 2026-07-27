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
    const[activeChatId, setActiveChatId] = useState(null)
    const navigate = useNavigate()

    const API_BASE_URL = import.meta.env.VITE_API_URL

    const handleProfileAction = () => {
        setIsProfileOpen(false)
        navigate('/auth')
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsProfileOpen(false)
        navigate('/auth')
    }

    const userMessage = async (el) => {
    const trimmedInput = el.trim()
    if (!trimmedInput) return

    setPreloader(false)
    setInputPlain(true)
    setTimeout(() => setInputPlain(false), 700)
    const user_token = localStorage.getItem('token');
    const user_message = {
        id: `user-${Date.now()}`,
        role: "user",
        message: trimmedInput
    };

    setChat((prev) => [...prev, user_message])

    const assistant_message = {
        id: `model-${Date.now() + 1}`,
        role: "model",
        message: ""
    }

    setChat((prev) => [...prev, assistant_message])

    let chatId = activeChatId

    if (!chatId) {
        try {
            const chatResponse = await fetch(`${API_BASE_URL}/chats`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: 'Новый чат' })
            })

            if (!chatResponse.ok) {
                throw new Error('Не удалось создать чат')
            }

            const createdChat = await chatResponse.json()
            chatId = createdChat.id
            setActiveChatId(chatId)
        } catch (error) {
            console.error('Ошибка создания чата:', error)
            return
        }
    }

    fetch(`${API_BASE_URL}/chats/${chatId}/message`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${user_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: trimmedInput })
    })
    .then(async (res) => {
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ error: 'Ошибка сервера' }))
            throw new Error(errorData.error || 'Ошибка сервера')
        }

        return res.json()
    })
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
    .catch(err => {
        console.error("Ошибка API:", err)
        setChat((prev) => prev.map((msg) =>
            msg.id === assistant_message.id
                ? { ...msg, message: err.message || 'Не удалось получить ответ от ИИ.' }
                : msg
        ))
    });
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