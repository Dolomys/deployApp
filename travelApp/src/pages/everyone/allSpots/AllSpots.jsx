import './allSpots.scss'
import Filters from '../../../components/filters/Filters'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Spots from '../../../components/spots/Spots'

const AllSpots = () => {

  const [filters, setFilters] = useState()
  const [sort, setSort] = useState("")
  const [spots, setSpots] = useState([])
  const [filteredSpots, setFilteredSpots] = useState()

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

  useEffect(()=>{
    const data = async() => {
      const res = await axios.get(process.env.REACT_APP_PROXY + '/api/posts/cat/')
      const publishedSpot = res.data.filter((spot) => spot.isPublished === 'published')
      setSpots(publishedSpot)
    }
    data()
 
    //reset onfirst render
    setFilters()

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



// Re-Render when sort update
// useEffect(() => {
//     switch(sort) {
//       case 'Name ( A-Z)':
//         filteredSpots ? 
//         setFilteredSpots((prev) =>
//         [...prev].sort((a, b) => a.title - b.title)
//       )
//       :
//         setSpots((prev) =>
//         [...prev].sort((a, b) => a.title - b.title)
//       );

//       case 'Name ( Z-A )':
//         filteredSpots ?
//         setFilteredSpots((prev) =>
//         [...prev].sort((a, b) => b.title - a.title)
//       )
//       :
//       console.log('hi')
//       setSpots((prev) =>
//       [...prev].sort((a, b) => b.title - a.title)
//       )
//     }
// },[sort])


  return (
    <div className="allSpots">
      <h1>Spots</h1>
      <div className="FilterAndSort">
        <Filters setFilters={setFilters} filterList={filterList} setSort={setSort} filters={filters} />
      </div>
      <div className="spotsContainer">
          <Spots spots={spots} filteredSpots={filteredSpots}/>
      </div>
    </div>
  )
}

export default AllSpots