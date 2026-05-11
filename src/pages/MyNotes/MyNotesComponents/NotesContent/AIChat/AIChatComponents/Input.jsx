import { useState } from 'react'
import { HiPaperAirplane } from "react-icons/hi2";
import './Input.css'

const Input =(props) => {
    const{
        userMessage,
        inputPlain
    } = props
    const[input, setInput] = useState("")

    return(
        <div className='chat__input'>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='Спроси у меня...'/>
                <HiPaperAirplane onClick={()=>{
                    setInput("")
                    userMessage(input)
                }} className={inputPlain ? 'input__icon show' : 'input__icon'}/>
        </div>
    )
}

export default Input