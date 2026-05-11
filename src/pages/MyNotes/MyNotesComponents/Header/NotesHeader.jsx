import './NotesHeader.css';
import { BiLayer } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const Header = () => {


    return(
        <header className="notes__header">
                <div className="notes__header__container">
                  <div className="notes__header__logo">
                  <div className="notes__header__logo-icon">
                    <BiLayer className="notes__header__logo-icon-bilayer"/>
                  </div>
                  <div className="notes__header__logo-name">
                    <h2>Название блокнота</h2>
                  </div>
                </div>
                <div className="notes__header__nav">
                  <button className="notes__header__nav__button-createnots notes__header__nav__buttons">+ Создать блокнот</button>
                  <button className="notes__header__nav__button-settings notes__header__nav__buttons">Настройки</button>
                  <CgProfile className='header__userprofile-icon'/>
                </div>
                </div>
              </header>
    )
}

export default Header