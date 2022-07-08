import axios from 'axios'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Filters from '../../../components/filters/Filters'
import { Context } from '../../../context/Context'
import './handleSpots.scss'

const HandleSpots = () => {

    const { user } = useContext(Context)

    const [spots, setSpots] = useState()
    const [filters, setFilters] = useState()
    const [filteredSpots, setFilteredSpots] = useState()

    const filterList = [
      {
        id: 1,
        name: 'isPublished',
        type: 'select',
        options: ['pending','published','deleted']
      }
    ]
  

    useEffect(()=>{
        const data = async() => {
          const res = await axios.get(process.env.REACT_APP_PROXY + '/api/posts/cat/')
          setSpots(res.data)
        }
        data()
    
      },[])

        //Re-Render when filter update
      useEffect(() => {
          filters && setFilteredSpots(
            spots.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
              )
            )
          );
      },[filters])
  return (
    <div className="mySpots">
        <h1>Moderate Spots</h1>
        <Filters filters={filters} setFilters={setFilters} filterList={filterList} />
        <div className="spotsContainer">
          {spots && (<>
            {filteredSpots && filteredSpots.map((data) => (
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
                            {/* TODO Delete fake data */}            
                         </span>
                         </Link>
                    </div>
            ))}
            {!filteredSpots && spots.map((data) => (
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
                            {/* TODO Delete fake data */}            
                         </span>
                         </Link>
                    </div>
            ))}
          </>)}
         
        </div>
    </div>
  )
}

export default HandleSpots