import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import './favoris.scss'
import { Context } from '../../../context/Context'
import axios from 'axios'
import Spots from '../../../components/spots/Spots'

const Favoris = () => {

    const [spots, setSpots] = useState()
    const {user} = useContext(Context)

   
    useEffect(()=>{

        const data = async() => {
          const res = await axios.get(process.env.REACT_APP_PROXY + '/api/posts/fav/'+user._id)
          setSpots(res.data)
        }
        data()
    
      },[])

  return (
    <div className="favoris">
      <h1 className='favorisTitle'>Favorites</h1>
      <Spots spots={spots} />
    </div>
  )
}

export default Favoris