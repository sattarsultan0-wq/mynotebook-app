import './styles/Header.css'
import { HiMiniBars3 } from "react-icons/hi2";
import { CiPause1 } from "react-icons/ci";

const Header =() => {


    return(
        <div className='dashbord__header'>
                        <div className='dashbord__header-left'>
                          <div className='dashbord__header-left__icon__container'>
                            <HiMiniBars3 className='dashbord__header-left__icon'/>
                          </div>
                          <h3>MyNotes</h3>
                        </div>
                        <div className='dashbord__header-right__icon__container'>
                          <CiPause1 className='dashbord__header-right__icon'/>
                        </div>
                      </div>
    )
}

export default Header
