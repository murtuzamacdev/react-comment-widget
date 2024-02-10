import {useLocation} from 'react-router';
import DishCard from './DishCard'

const ResDetails = () => {
    const location = useLocation();

    return ( <div className='flex'>{location.state.dishes.map((dish) => <DishCard key={dish.dishId} action="ADD" dish={dish}></DishCard>)}</div> );
}
 
export default ResDetails;