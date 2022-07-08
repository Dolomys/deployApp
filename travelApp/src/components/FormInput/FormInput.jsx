import { useState } from 'react'
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import './formInput.scss'

export default function FormInput(props) {

    const [focus, setFocus] = useState(false)
    const {id,errorMessage, onChange,handleFilters, handleRegion,catOptions,typeOptions,handleType,regionOptions,label,type,...inputProps} = props

    //Toggle eye password - login and register pages only
    const [pass, setPass] = useState(type)
    const [eye] = useState("fa-solid fa-eye")

    const handleFocus = (e) => {
        setFocus(true)
    }

    // Login and register page only
    const handleClick = (e) => {
        if(e.target.id === "pass1"){
          if(e.target.className === 'fa-solid fa-eye' ){
            e.target.className = 'fa-solid fa-eye-slash'
            setPass('text')
          }
          else {
            e.target.className = 'fa-solid fa-eye'
            setPass('password')
          }
        }
      }

  return (
    <div className="formInput">
        <label>{label}</label>
        {label === "Filters" ? 
            <CreatableSelect
                  isMulti
                  options={catOptions}
                  onChange={handleFilters}
                  placeholder='Categories, Select or Create'
                />
            : label === "Type" ? 
            <Select
            options={typeOptions}
            onChange={handleType}
            placeholder='Select Type'
            />
            : label === 'Region' ?
            <Select
            options={regionOptions}
            onChange={handleRegion}
            placeholder='Select Region'
            />
            :
            <>
            <input 
              type={pass}
              {...inputProps}
              onChange={onChange}
              onBlur={handleFocus}
              // onFocus={() => inputProps.name==="confirmPassword" && setFocus(true)}
              focused={focus.toString()} />
              {(inputProps.name === "password" ||inputProps.name === "confirmPassword") && (
                  <i id="pass1" className={eye} onClick={handleClick}></i>
              )}
            <span className='errorMsg'>{errorMessage}</span>
            </>}
        
    </div>
   
  )
}
