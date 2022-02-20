import React,{useEffect,useState} from 'react'
import './Navbar.css'


const Navbar = () => {
    const [show,handleShow]=useState(false)
    useEffect(() => {
        window.addEventListener('scroll',()=>{
            if(window.scrollY>100){
                handleShow(true)
            }else handleShow(false)
        });
        return()=>{
            window.removeEventListener('scroll')
        }
    }, [])
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        alt="NetFlix Logo"
        src="https://pngimg.com/uploads/netflix/netflix_PNG11.png"
      ></img>
      <img
        className="nav__avatar"
        alt="NetFlix Logo"
        src="https://pngimg.com/uploads/mouth_smile/mouth_smile_PNG42.png"
      ></img>
    </div>
  );
}

export default Navbar