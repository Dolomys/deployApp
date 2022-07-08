import { AiOutlineMenu } from 'react-icons/ai'
import './mobileMenu.scss'

const MobileMenu = ({actif, setActif}) => {
  return (
    <div className="mobileMenu">
        <AiOutlineMenu className='menuIcon' onClick={() => setActif(!actif)}/>
    </div>
  )
}

export default MobileMenu