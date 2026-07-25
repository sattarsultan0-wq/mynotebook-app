import './NotesContent.css'
import AIChat from './AIChat/AIChat'




const NotesContent = () => {


  return(
    <main className='notes__content'>
        <div className='notes__content__container'>
            <AIChat />  
        </div>
    </main>
  )
  
}

export default NotesContent