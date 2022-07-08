import './sort.scss'
const Sort = ({sort,setSort}) => {

    const sortOptions = [
        {
            id:1,
            value: "Name ( A-Z )"
        },
        {
            id:2,
            value: "Name ( Z-A )"
        },
        {
            id:3,
            value: "Date ( Latest )"
        },
        {
            id:4,
            value: "Date ( Oldest )"
        },
        {
            id:5,
            value: "Star ( Increase )"
        },
        {
            id:6,
            value: "Star ( Decrease )"
        },
    ]
  return (
    <div className="sort">
        <div className="sortWrapper">
            <label htmlFor="sortBy">Sort By :</label>
            <select name="sortBy" id='sortBy' onChange={(e) => setSort(e.target.value)}>
                {sortOptions && sortOptions.map(e => (
                    <option value={e.value}>{e.value}</option>
                ))}
            </select>
        </div>
    </div>
  )
}

export default Sort