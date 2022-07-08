import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import axios from 'axios'
import FormInput from '../../../components/FormInput/FormInput'
import './add.scss'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import app from '../../../firebase'
import { useContext } from 'react'
import { Context } from '../../../context/Context'

const Add = () => {

  const {user} = useContext(Context)

  const username = user.username

    const [values,setValues] = useState({
      title:'',
      position:'',
      cats:[],
      desc:'',
      username: username
    })
    
    const [image, setImage] = useState('')
    const [position, setPosition] = useState(null)
    const [error, setError] = useState()

    //Array for filters
    const catOptions = [
    { value: 'Mountain', label: 'Mountain' },
    { value: 'Beach', label: 'Beach' },
    { value: 'City', label: 'City' },
    { value: 'River', label: 'River' },
    { value: 'Lake', label: 'Lake' },
    ]

    const typeOptions = [
    { value: 'Hike', label: 'Hike' },
    { value: 'Bivouac', label: 'Bivouac' },
    { value: 'Trek', label: 'Trek' },
    { value: 'Parking', label: 'Parking' }
    ]
    const regionOptions = [
    { value: 'Auvergne-Rhône-Alpes', label: 'Auvergne-Rhône-Alpes' },
    { value: 'Bourgogne-Franche-Comté', label: 'Bourgogne-Franche-Comté' },
    { value: 'Bretagne', label: 'Bretagne' },
    { value: 'Centre-Val de Loire', label: 'Centre-Val de Loire' },
    { value: 'Corse', label: 'Corse' },
    { value: 'Grand Est', label: 'Grand Est' },
    { value: 'Hauts-de-France', label: 'Hauts-de-France' },
    { value: 'Île-de-France', label: 'Île-de-France' },
    { value: 'Normandie', label: 'Normandie' },
    { value: 'Nouvelle-Aquitaine', label: 'Nouvelle-Aquitaine' },
    { value: 'Occitanie', label: 'Occitanie' },
    { value: 'Pays de la Loire', label: 'Pays de la Loire' },
    { value: "Provence-Alpes-Côte d'Azur", label: "Provence-Alpes-Côte d'Azur" },
    ]
    // Add all the inputs you want,
    // You can add required, errorMessage and pattern for error handling
    const inputs = [
      {
        id:1,
        name:"title",
        type:"text",
        placeholder:'Spot name',
        errorMessage:'Please enter a Name for this spot',
        label:'Name',
        required:true,
      },
      {
        id:2,
        name:"type",
        type:"text",
        placeholder:'type',
        errorMessage:'Please select a type for this spot',
        label:'Type',
        required:true,
      },
      {
        id:3,
        name:"region",
        type:"text",
        placeholder:'region',
        errorMessage:'Please select a region for this spot',
        label:'Region',
        required:true,
      },
      {
        id:4,
        name:"cats",
        type:"text",
        placeholder:'filters',
        label:'Filters'
      },
      {
        id:5,
        name:"desc",
        type:"text",
        placeholder:'Description',
        errorMessage:'Please enter a description',
        required:true,
        label:'Description'
      },
      {
        id:6,
        name:"image",
        type:"file",
        required:true,
        label:'Spot picture'
      },
    ]

    //TODO unquote to get all existing filters
    // And handle logic
    // const getCats = async () => {
    //     const res = await axios.get(process.env.REACT_APP_PROXY + '/api/posts/cat/')
    //     const resCategories = []
    //     const a = res.data.filter(e => e.isPublished === true)
    //     a.forEach(e => {e.categories.forEach(e=> resCategories.push(e))})
    //     const cat = [...new Set(resCategories)]
    //     console.log(cat)
    //     cat.map(e => options.push({value:e, label:e}))
    //   }
    //   getCats()

    const HandleSubmit = async(e) => {
      e.preventDefault()

      if(position){
        values.position = position
        // Upload image sur firebase
        // Voir Doc ---> https://firebase.google.com/docs/storage/web/upload-files

        if(image){
          const imageName = new Date().getTime() + image.name
          const storage = getStorage(app)
          const storageRef =  ref(storage, imageName)
          const uploadTask = uploadBytesResumable(storageRef, image);
    
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
              values.photo = url
              const res = await axios.post(process.env.REACT_APP_PROXY + '/api/posts/add', values)
              window.location.replace("/post/"+res.data._id)
            })
        }
        else {
          setError('Image')
        }
      }
      else {
        setError('Position')
      }
    }

    // Add filters to array ( multiple choices)
    const handleFilters = (newValue, actionMeta) => {
        const newValuesArr = newValue ? newValue.map(item => item.value) : [];
        setValues({...values, cats: newValuesArr });
      };

    const handleType = (type) => {
        setValues({...values, type: type.value });
      };
    const handleRegion = (type) => {
      console.log(type)
        setValues({...values, region: type.value });
      };

    const onChange = (e) => {
        //If file input , different method
      if(e.target.name === "image") {
        setImage(e.target.files[0])
      }
      else {
        setValues({...values, [e.target.name]: e.target.value})
      }
    }


    function LocationMarker() {
        const map = useMapEvents({
          click(e) {
            setPosition(e.latlng)
          },
        })
      
        return position === null ? null : (
          <Marker position={position}>
            <Popup>Votre Spot est ici !</Popup>
          </Marker>
        )
      }

  return (
    <div className="add">
      <div className="addContainer">
      {image && (
        <div className="Imagecontainer">
         <img src={URL.createObjectURL(image)} alt="" className="writeImg" />
        </div>
        )}
        
        <h1 className='addTitle'>Add Spot</h1>
          <form action="POST" className="addForm" onSubmit={HandleSubmit}>
              {inputs.map(e => (
                <FormInput 
                key={e.id} 
                {...e} 
                value={values[e.name]} 
                onChange={onChange} 
                handleFilters={handleFilters} 
                handleType={handleType}
                catOptions={catOptions}
                typeOptions={typeOptions}
                regionOptions={regionOptions}
                handleRegion={handleRegion}
                />
              ))}
              <button className="submitBtn" type='submit'>Add Spot</button>
          </form>
          {error && <span className='error'>You need to add a {error} !</span> }
          <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{height:"100%"}}>
             <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             ></TileLayer>
           
            <LocationMarker />

        </MapContainer>
      </div>
    </div>
  )
}


export default Add