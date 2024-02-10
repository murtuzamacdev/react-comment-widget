import { useState } from 'react';
import data from '../../data/restaurants.json';
import ResCard from './ResCard'



const RestaurantsListing = () => {
    const [filteredData, setFilteredData] = useState(data.restaurants);
    const [searchText, setSearchText] = useState("");
    const [user, setUser] = useState({name: "Josh"})

    const handleSearch = (e) => {
        e.preventDefault();
        let _resArr = data.restaurants.filter((item) => item.resName.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredData(_resArr)
    }

    const handleCuisineClick = (e) => {
        let cId = e.target.dataset.id;
        console.log(cId);
        if (cId !== undefined || cId !== null) {
            if (cId == 0) {
                setFilteredData(data.restaurants)
            } else {
                let result = [];

                for (const res of data.restaurants) {
                    if (res.category.includes(parseInt(cId))) {
                        result.push(res)
                    }
                }

                setFilteredData(result);
            }

        }
    }

    return (<div>
        <button onClick={() => { 
            setUser({...user, name: "Mike"})  
        }}> Click me</button>
        <p>{user.name}</p>
        <form onSubmit={handleSearch} className='mb-1 mt-1'>
            <input value={searchText} placeholder='Search Restaurant' onChange={(e) => { setSearchText(e.target.value) }} />
        </form>

        <div onClick={(e) => handleCuisineClick(e)} className='flex'>
            {data.cuisine.map((item) => <div key={item.cId} data-id={item.cId} className='mr-3 mb-3'>{item.cName}</div>)}
        </div>


        <div className='flex flex-wrap'>
            {filteredData.map((card) => <ResCard key={card.resId} card={card} />)}
        </div>

    </div>);
}

export default RestaurantsListing;