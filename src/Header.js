import { Link } from 'react-router-dom'
import React from 'react'

function Header() {
  return (
    <ul>
        <Link to="/" className='m-3'>Home</Link>
        <Link to="/About">About</Link>
    </ul>
  )
}

export default Header