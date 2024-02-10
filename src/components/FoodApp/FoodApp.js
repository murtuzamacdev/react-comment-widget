import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantsListing from "./RestaurantsListing";
import Cart from "./Cart";
import ResDetails from './ResDetails';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { foodappContext } from "../../context/foodapp.context";

const RouterOutlet = () => {
    const faContext = useContext(foodappContext);

    const getQuantity = () => {
        let total = faContext.cart.reduce((acc, curr) => {
            acc = acc + curr.quantity;
            return acc;
        }, 0)

        return total
    }

    return (<>
        <div><Link className="text-white ml-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to={'/cart'}> Cart ({getQuantity()}) </Link></div>
        <Outlet />
    </>)
}

const routes = createBrowserRouter([
    {
        element: <RouterOutlet />,
        children: [
            {
                path: '/',
                element: <RestaurantsListing />
            },
            {
                path: '/resDetails',
                element: <ResDetails />
            },
            {
                path: '/cart',
                element: <Cart />
            }
        ]
    },

])



const FoodApp = () => {

    return (<>
        <RouterProvider router={routes} />
    </>);
}

export default FoodApp;