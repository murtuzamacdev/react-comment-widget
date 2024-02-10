import { useContext } from 'react';
import { foodappContext } from '../../context/foodapp.context'

const DishCard = ({ dish, action }) => {
    const faContext = useContext(foodappContext)

    const handleAddToCart = () => {
        if(action === 'ADD'){
            faContext.cartDispatch({
                type: "ADD",
                payload: dish
            });
            
        }else{
            faContext.cartDispatch({
                type: "DELETE",
                payload: {dishId: dish.dishId}
            });

        }        
    }

    const getQuantity = () => {
        const x = faContext.cart[faContext.cart.findIndex((item) => item.dishId === dish.dishId)]
        return x ? x.quantity : null
    }

    return (<div className="mr-3 cursor-pointer flex content-evenly justify-between mb-3 mt-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
        <div>
            {dish.dishName} {action === "REMOVE" && (getQuantity() || 0)}
            <button onClick={handleAddToCart} className="text-white ml-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{action === 'ADD' ? "Add to card" : "Remove"}</button>
        </div>
    </div>);
}

export default DishCard;