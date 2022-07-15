import React from 'react'

const Header = () => {
  const logout = ()=>{
    if(localStorage.getItem('token')){
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      window.location.reload()
    }
  }
  return (
    <header className='header'>
        <h3>Jobs</h3>
        <button className='basic-button' onClick={()=>logout()}>Logout</button>
    </header>
  )
}

export default Header