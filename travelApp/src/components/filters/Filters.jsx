import { useState } from "react"
import "./filters.scss"

const Filters = ({ filterList, filters,setFilters}) => {

    // Special way to set selected to null on clear
    // When on clearFitler set selected to option[0] -> reset the visual
    // Then on change set to null again ( if not its not working after)
    const [selected, setSelected] = useState('')



    const handleFilters = (e) => {
        const value = e.target.value
        setFilters({
            ...filters,
           [e.target.name]:value 
        })
        // see comment over select state
        setSelected('')
    }

    const clearFilters = () => {
        setFilters({})
        // see comment over select state
        setSelected('selected')
     
    }

  return (
    <div className="filterContainer">
        <div className="filters">
            <div className="wrapperFilters">            
                {filterList && filterList.map(e => (
                <>
                <label htmlFor={e.name}>{e.name}</label>
                    <select 
                    name={e.name}
                    key={e.name} 
                    onChange={handleFilters}
                    >
                        {e.options.map((option, index) => (
                            // see comment over select state
                            index === 0 ?
                            <option value={option} key={option} selected={selected}>{option}</option>
                            :
                            <option value={option} key={option}>{option}</option>
                        ))}
                    </select>
                    </>
                ))}
                <span onClick={clearFilters} className="clearFilters">Clear Filters</span>
            </div>
        </div>
    </div>
  )
}


export default Filters