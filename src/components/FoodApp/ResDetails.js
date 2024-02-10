import {useLocation} from 'react-router';
import DishCard from './DishCard'

const ResDetails = () => {
    const location = useLocation();
    console.log("location", location)

    return ( <div className='flex'>{location.state.dishes.map((dish) => <DishCard action="ADD" dish={dish}></DishCard>)}</div> );
}
 
export default ResDetails;