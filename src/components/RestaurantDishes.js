import React from 'react';
import './RestaurantDishes.css';

const RestaurantDishes = () => {
    return (
        <div className="dishesBody">
            <div className="contentBorder">Best Sellers</div>
            <div className="items">
                <div> 
                    <div>Classic Sub</div>
                    <div>Rs 75</div>
                    <div>Onion, Tomato</div>
                </div>
                <div>
                    <button>Add</button>
                </div>
            </div>
        </div>
    )
}

export default RestaurantDishes;