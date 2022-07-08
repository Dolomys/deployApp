import './spots.scss'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Spots = ({spots, filteredSpots}) => {




  return (
    <div className="spots">

      {spots && (

        <>
            {filteredSpots && filteredSpots.map((data)=> (
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
               <ul className='catList'>
                {data.categories && data.categories.map((cat)=> (
                  <li className='singleCat'>{cat}</li>
                ))}
               </ul>
               </Link>
          </div>
        ))}
        
        {/* If no filter , and on first Render --> */}
        {!filteredSpots && spots.map((data)=> (
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
               <ul className='catList'>
                {data.categories && data.categories.map((cat)=> (
                  <li className='singleCat'>{cat}</li>
                ))}
               </ul>
               </Link>
          </div>
        ))}
        
        
        </>


      )}
    

    </div>
  )
}

export default Spots