import './sidebar.scss'


import { BsFacebook, BsTwitter, BsLinkedin, BsInfoCircle, BsPersonPlus, BsFillHeartFill, BsPinMapFill } from "react-icons/bs";
import { MdLogin, MdOutlineAccountCircle,MdTravelExplore, MdOutlineMessage, MdLocalPolice } from "react-icons/md";
import { RiRoadMapLine } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaMapSigns } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import {motion} from 'framer-motion'



const Sidebar = ({actif, setActif}) => {


  const {user, dispatch} = useContext(Context)

  const handleLogout = () => {
    console.log('hi')
    dispatch({type: "LOGOUT"})
    handleActif()
  }

  const handleActif = () => {
    setActif(!actif)
  }

  return (
    <div className={actif ? 'sidebar actif' : 'sidebar'}>
        <div className="top">
          <div className="photoAndClose">
            <Link to="/" className='link'>
              {user ? 
                <img src={user.profilPic}
                className="topImage" 
                alt="topimage"
                />
                :
                <h1 className='topTitle'>LW<span className='dot'>.</span></h1>
              }
            
            </Link>
            <motion.div 
            whileHover={{scale:'1.1'}}
            whileTap={{scale:'0.9'}}
            onClick={handleActif}
            >
              <AiOutlineCloseCircle className='closeIcon'/>
            </motion.div>
            
          </div>
         
          {/* <div className="topOptions">
            <BsMoonStars className='icon day' />
            <span className='language'>FR</span>
          </div> */}
          <ul>
            <p className="title">Account</p>
            {!user ?  
            <>
            <Link to="/login" className='link' onClick={handleActif}>
              <li>
                  <MdLogin className='icon'/>
                  <span>Login</span>
              </li>
            </Link> 
            <Link to="/register" className='link' onClick={handleActif}>
              <li>
                <BsPersonPlus className='icon'/>
                <span>Register</span>
              </li>
            </Link>
            </>
            :
            <>
            <Link to="/account" className='link' onClick={handleActif}>
              <li>
                <MdOutlineAccountCircle className='icon' />
                My Account
              </li>
            </Link>
           <Link to='/account/myspots' className='link'onClick={handleActif}>
             <li>
                <MdTravelExplore className='icon' />
                My Spots
             </li>
            </Link>
            <Link to='/account/favoris' className='link' onClick={handleActif}>
              <li>
                <BsFillHeartFill className='icon' />
                Favorites
              </li>
            </Link>
            <Link to='/account/add' className='link' onClick={handleActif}>
              <li>
                <BsPinMapFill className='icon' />
                Add a spot
              </li>
            </Link>
            <li className='link' onClick={handleLogout}>
              <CgLogOut className='icon' />
              Logout
            </li>
            </>
            }

            {(user && user.isAdmin) &&
            <>
             <p className="title admin">Admin Tabs</p>
            <Link to='/admin/handlespots' className='link' onClick={handleActif}>
              <li>
                <MdLocalPolice className='icon' />
                Moderate Spots
              </li>
           </Link>
            </>}
           
            <p className="title">Map and tools</p>
            
            <Link to="/maps" className='link' onClick={handleActif}>
              <li>
                <RiRoadMapLine className='icon'/>
                <span>Map</span> 
              </li>
            </Link>
            <Link to="/spots" className='link' onClick={handleActif}>
              <li>
                <FaMapSigns className='icon'/>
                Spots
              </li>
            </Link>
            {/* <p className="title">Other</p>
            <li>
              <BsInfoCircle className='icon' />
              About
            </li> */}
          </ul> 
        </div>
        {/* <div className="bottom">
            <div className="socials">
              <BsFacebook className='socialIcon'/>
              <BsLinkedin className='socialIcon'/>
              <BsTwitter className='socialIcon'/>
            </div>
        </div> */}
    </div>
  )
}

export default Sidebar