import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Content.css'

const Content =(props) => {
    const{
        chat,
        preloader
    } = props

    return (
        <div className='chat__content'>
            <div className='chat__container'>
                {chat.map((el, index) => (
                    <div key={index} className={`message__wrapper ${el.role}`}>
                        <div className='message'>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{el.message}</ReactMarkdown>
                        </div>
                    </div>
                ))}
            </div>
            <div className={preloader ? 'chat__preloader' : 'chat__preloader hidden'}>
                <div className='chat__preloader-container'>
                    <h3>Здраствуй, Султан!</h3>
                    <h4>C чего начнем?</h4>
                </div>
            </div>
        </div>
    )
}

export default Content