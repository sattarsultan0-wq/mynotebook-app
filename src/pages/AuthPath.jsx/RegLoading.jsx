import { useState, useEffect } from 'react'
import './RegLoading.css'

const RegLoading = (props) => {
    const{
        regLoading,
        onComplete
    } = props

    useEffect(() => {
        if (regLoading) {
            const timer = setTimeout(() => {
                onComplete(); 
            }, 4500);

            return () => clearTimeout(timer);
        }
    }, [regLoading, onComplete]);


    return (
        <div className={`registration__loading-container ${regLoading ? 'active' : ''}`}>
            <div className='loading-content'>
                <img 
                    className={`loading-image ${regLoading ? 'show' : ''}`} 
                    src='/loading-logo.png' 
                    alt="Logo"
                />
                
                <div className='loading-process'>
                    <span className='loading-process-1'>Connecting...</span>
                    <span className='loading-process-2'>Registration...</span>
                    <span className='loading-process-3'>Welcome...</span>
                </div>
            </div>
        </div>
    )
}

export default RegLoading