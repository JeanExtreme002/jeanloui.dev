import React, { useContext } from 'react'
import './Footer.css'
import { ThemeContext } from '../../contexts/ThemeContext'

function Footer() {

    const { theme }  = useContext(ThemeContext)

    return (
        <div className="footer" style={{backgroundColor: theme.secondary}}>
            <p style={{color: theme.tertiary}}>
                At the intersection of <span style={{color: theme.primary}}>logic</span> and <span style={{color: theme.primary}}>creativity</span>, we find the true magic of <span style={{color: theme.primary}}>computing</span>.
            </p>
        </div>
    )
}

export default Footer

