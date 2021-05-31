import React from 'react'

function Nav() {
  return (
    <div className='nav'>
      <img src='stackline_logo.svg' className='logo' alt='' />
      <style jsx='true'>
        {`
        .nav {
          background-color: #052849;
          height: 30px;
          display: flex;
          padding: 20px;
        }

        .logo {
          height: 30px;
          margin: auto 0px;
        }
        `}
      </style>
    </div>
  )
}

export default Nav
