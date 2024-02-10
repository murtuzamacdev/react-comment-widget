import { useContext } from "react";
import { foodappContext } from "../../context/foodapp.context";
import DishCard from './DishCard'

const Card = () => {
    const faContext = useContext(foodappContext)

    return ( <div className='flex'>{faContext.cart.map((dish) => <DishCard action="REMOVE" dish={dish}></DishCard>)}</div> );
}
 
export default Card;