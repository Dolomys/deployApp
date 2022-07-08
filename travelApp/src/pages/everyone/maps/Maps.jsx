import './maps.scss'
import Map from '../../../components/map/Map'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Filters from '../../../components/filters/Filters'

export default function Maps() {


  const [post, setPost] = useState([])
  const [filters, setFilters] = useState()
  const [filteredPost , setFilteredPost] = useState()
  
  
  const filterList = [
    {
      id:1,
      name:"region",
      type:"select",
      options: ["Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Centre-Val de Loire", "Corse","Grand Est", "Hauts-de-France", "Île-de-France", "Normandie", "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire"]
    },
    {
        id:2,
        name:"type",
        type:"select",
        options: ["Hike" ,"Bivouac", "Parking", "Trek"],
    },
    {
        id:3,
        name:"categories",
        type:"select",
        options: ["Mountain" ,"Beach", "City", "River", "Lake" ],
    },
  ]


  useEffect(()=> {
    const data = async() => {
      const res = await axios.get(process.env.REACT_APP_PROXY + '/api/posts/cat/')
      const publishedSpot = res.data.filter((spot) => spot.isPublished === 'published')
      setPost(publishedSpot)
    }
    data()

    // Clear filters on first render
    setFilters()
 
    
  },[])

    //Re-Render when filter update
    useEffect(() => {
      filters && setFilteredPost(
        post.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  },[filters])

  
  return (
    <div className='map'>
      <Filters filter={filters} setFilters={setFilters} filterList={filterList} />
      <div className='mapContainer'> 
  
          {filteredPost ? 
          <Map post={filteredPost}/>
          :
          <Map post={post}/>
          }
      </div>
    </div>
  )
}
