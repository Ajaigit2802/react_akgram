import React from 'react'

const Footer = () => {
  const toady=new Date()
  return (
    <footer className='Footer'>
        <p>Copyright &copy; {toady.getFullYear()}</p>
    </footer>
  )
}

export default Footer