import { HiBars3, HiUserCircle, HiArrowRightOnRectangle } from 'react-icons/hi2'
import './Header.css'

const Header = ({ isMenuOpen, setIsMenuOpen, isProfileOpen, setIsProfileOpen, onOpenProfile, onLogout }) => {
    return (
        <div className='chat__header'>
            <div className='chat__header-left'>
                <button
                    className='chat__header-button'
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label='Открыть меню'
                >
                    <HiBars3 size={20} />
                </button>

                <div className='chat__header-title-wrap'>
                </div>
            </div>

            <div className='chat__header-center'>
                <img src='/loading-logo.png' alt='Winston logo' className='chat__header-logo' />
            </div>

            <div className='chat__header-right'>
                <button
                    className='chat__header-button chat__header-button--profile'
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    aria-label='Открыть профиль'
                >
                    <HiUserCircle size={22} />
                </button>

                {isProfileOpen && (
                    <div className='chat__header-popover'>
                        <button className='chat__header-popover-button' onClick={onOpenProfile}>
                            Войти в профиль
                        </button>
                        <button className='chat__header-popover-button chat__header-popover-button--secondary' onClick={onLogout}>
                            <HiArrowRightOnRectangle size={16} />
                            Выйти
                        </button>
                    </div>
                )}
            </div>

            {isMenuOpen && (
                <div className='chat__header-sidepanel'>
                    <button className='chat__header-sidepanel-item'>Заметки</button>
                    <button className='chat__header-sidepanel-item'>Профиль</button>
                    <button className='chat__header-sidepanel-item'>Настройки</button>
                </div>
            )}
        </div>
    )
}

export default Header