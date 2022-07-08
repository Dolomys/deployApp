import { Link } from 'react-router-dom'
import './home.scss'

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="topContainer">
          <h1 className="homeTitle">LocaWave</h1>
          <Link to='/spots' className='homeLink'>See Spots</Link>
        </div>
      </div>
    </div>
  )
}

export default Home