import axios from 'axios'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../context/Context'
import './mySpots.scss'

const MySpots = () => {

    const { user } = useContext(Context)

    const [spots, setSpots] = useState()
  

    useEffect(()=>{
        const data = async() => {
          const res = await axios.get(process.env.REACT_APP_PROXY + '/api/posts/cat/'+ user.username)
          setSpots(res.data)
        }
        data()
    
      },[])

      console.log(spots)
  return (
    <div className="mySpots">
        <h1>My Spots</h1>
        <div className="spotsContainer">
            {spots && spots.map((data) => (
                    <div className="singleSpot">
                         <Link to={`/post/${data._id}`} className='link'>
                         {data.photo && (
                         <img src={data.photo}
                          alt="Spot Image" 
                          className="postImg" />
                         )}
                         <div className="postInfo">
                            {!data.isPublished && <span className='drafted'>Draft</span>}
                             <span className="postTitle">
                                 {data.title}
                             </span>
                             <span className='postType'>{data.type}</span>
                             <span className="postDate">{new Date(data.createdAt).toDateString()}</span>
                         </div>
                         <span className='spotStatus'>
                           
                            <span className={data.isPublished}>{data.isPublished}</span>
               
                         </span>
                         </Link>
                    </div>
            ))}
        </div>
    </div>
  )
}

export default MySpots