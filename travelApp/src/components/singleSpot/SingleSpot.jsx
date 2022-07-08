import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {motion} from 'framer-motion'
import './singleSpot.scss'

import {BsFillClockFill, BsFillHeartFill, BsHeart, BsStarFill} from 'react-icons/bs'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import Select from "react-select";
import Comments from '../comments/Comments'

const SingleSpot = () => {

    const [spot, setSpot] = useState()
    const [resume, setResume] = useState(true)
    const [heart, setHeart] = useState(false)
    const [status, setStatus] = useState()
    const [update, setUpdate] = useState(false)

    const {user, dispatch} = useContext(Context)
    let { id } = useParams()

    const typeOptions = [
        { value: 'pending', label: 'pending' },
        { value: 'published', label: 'published' },
        { value: 'deleted', label: 'deleted' },
        ]

    useEffect(()=>{
        const getSpot = async() => {
            let call = await axios.get(process.env.REACT_APP_PROXY + `/api/posts/${id}`)  
            setSpot(call.data)
            setStatus({status: call.data.isPublished})
          }

        const isLiked = () => {
            if(user.liked.includes(id)) setHeart(true)
        }  

        getSpot()
        if(user) isLiked()
    },[update, id])

    const handleHeart = async() => {
        setHeart(!heart)
        const data = {
            userId: user._id
        }
        if(!heart) {
            let call = await axios.put(process.env.REACT_APP_PROXY + '/api/users/liked/' + id, data )
            dispatch({type:"UPDATE_ACCOUNT", payload:call.data})
        }
        else {
            let call = await axios.put(process.env.REACT_APP_PROXY + '/api/users/removeLiked/' + id, data)
            dispatch({type:"UPDATE_ACCOUNT", payload:call.data})
        }
        
       
    }

    const handleStatus = (type) => {
          setStatus({ status: type.value });
        };

    const handleChangeOfStatus = async() => {

        const data = {
            isPublished: status.status,
            isAdmin: true
        }
        try {
            let call = await axios.put(process.env.REACT_APP_PROXY + '/api/posts/' + id, data)
            console.log(call)
        }
        catch(err) {
            console.log(err)
        }
    }


  return (
    <div className="singleSpot">
      
            {spot && (
                  <div className="spotContainer">
                    <img src={spot.photo} alt="" className='spotPhoto'/>
                    <h1>{spot.title}</h1>
                    {(user && user.isAdmin) && (
                        <div className="adminOptions">
                               <Select
                                options={typeOptions}
                                onChange={handleStatus}
                                className={status.status}
                                placeholder='Select Status'
                                defaultValue={{label: status.status, value: status.status}}
                                />
                                <button className='confirmChanges' onClick={handleChangeOfStatus} >Confirm Change</button>
                        </div>
                    )}
                    <div className="selectMode">
                        <span onClick={() => setResume(true)} className={resume ? 'actif': ''}>Resume</span>
                        <span onClick={() => setResume(false)} className={resume ? '': 'actif'}>Comments</span>
                    </div>
                    {/* If trek / hike duration there may be a duration */}
                    {resume ? 
                        <div className='resumeContent'>  
                            <div className="resumeInfos">
                               <div className="spotInfos">
                                <BsFillClockFill className='icon'/>
                                <div>
                                    <span className='title'>Duration</span>
                                    <span className='number'>{spot.duration ? spot.duration : 'Unknow timing'} </span>
                                </div>
                               </div>
                                {/* <div className="spotInfos">
                                    <BsStarFill className='icon' />
                                    <div>
                                        <span className='title'>Rating</span>
                                        <span className='number'>{spot.stars ? spot.stars : 5} out of 5</span>
                                    </div>
                                </div> */}
                                {/* Like button only display if user connected */}
                                {user &&
                                <motion.div 
                                className="like" 
                                onClick={handleHeart}
                                whileHover={{scale:"1.1"}}
                                whileTap={{scale:'0.9'}}
                                >
                                    {heart ? 
                                    <BsFillHeartFill className='fillHeart'/>
                                    :
                                    <BsHeart className='emptyHeart'/>
                                    }
                                  <span>Like</span>
                                </motion.div>
                                }
                                
                            </div>
                            <span className="spotDesc">{spot.desc}</span>
                        </div>
                        :
                        <>
                            <Comments id={id} update={update} setUpdate={setUpdate} spot={spot} />
                        </>
                    }

                </div>
            )}

         
        
    </div>
  )
}

export default SingleSpot