import React from 'react'
<<<<<<< HEAD

function Header() {
  return (
    <header className='header'>
        {/* Header vide - tout contenu a été supprimé */}
=======
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>

        <div className='header-right'>
            <BsPersonCircle className='icon'/>
        </div>
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
    </header>
  )
}

export default Header