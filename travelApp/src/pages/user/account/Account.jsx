import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../../context/Context'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import app from '../../../firebase'
import celesteImg from '../../../assets/celesteImg.png'
import {IoMdCloudDownload} from 'react-icons/io'



import './account.scss'
import axios from 'axios'

const Account = () => {

    const {user, dispatch} = useContext(Context)
    const [file, setFile] = useState()
    
    const [tab, setTab] = useState('Resume')


    const handleInput = (e) => {
      setFile(e.target.files[0])
    }
    const handleSubmit = async() => {
      const data = {
        userId: user._id,
        profilPic:'',
      }
      if(file){
        const fileName = new Date().getTime() + file.name
        const storage = getStorage(app)
        const storageRef =  ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
          }, 
          async() => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            const url = await getDownloadURL(uploadTask.snapshot.ref)
            data.profilPic = url
            const res = await axios.put(process.env.REACT_APP_PROXY + '/api/users/updateAcc/'+ user._id, data)
            console.log(res)
            dispatch({type:"UPDATE_ACCOUNT", payload:res.data})
          })
      }
    }
    
  return (
    <div className="account">

      {user && (
        <>
          <div className="accountTop">
              {file ? (
                <img src={URL.createObjectURL(file)} alt="" className="topImg" />
                ) : (
                <img className='topImg' src={user.profilPic ? user.profilPic : celesteImg}   alt='profil' />
                )}
                  <label htmlFor="fileInput" className='fileInput'>
                    Change Profil Picture
                      <IoMdCloudDownload className='inputIcon'/>
                  </label>
                  <input type="file" id="fileInput" style={{display:"none"}}  onChange={handleInput} />
                  <span className='fileSubmit' onClick={handleSubmit}>Confirm Changes</span>
          </div>
          {/* <div className="accountCenter">
            <div className="selectMode">
                <span onClick={() => setTab('Resume')} className={tab === 'Resume' && 'actif'}>Resume</span>
                <span onClick={() => setTab('Infos')} className={tab === 'Infos' && 'actif'}>Infos</span>
                <span onClick={() => setTab('Settings')} className={tab === 'Settings' && 'actif'}>Settings</span>
            </div>
          </div> */}
          {/* <div className="accountBottom">
          {tab === 'Resume' && (
            <div className="resume">
              Resume
            </div>
          )}
          {tab === 'Infos' && (
            <div className="infos">
              Infos
            </div>
          )}
          {tab === 'Settings' && (
            <div className="infos">
              Settings
            </div>
          )}
          </div> */}
        </>
      )}
      

    </div>
  )
}

export default Account