import './NotesContent.css'
import Dashbord from './Dashbord/Dashbord'
import AIChat from './AIChat/AIChat'




const NotesContent = () => {


  return(
    <main className='notes__content'>
        <div className='notes__content__container'>
            <Dashbord />
            <AIChat />  
        </div>
    </main>
  )
  
}

export default NotesContent