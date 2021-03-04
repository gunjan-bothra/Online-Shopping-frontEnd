import React from 'react';
import './RestaurantMain.css';

const RestaurantMenu = () => {
    return (
        <div className="uiBlock">
            <div className="filter">
                 <input type="checkbox" />Veg Only
            </div>
            <div className="menu">
                <div>
                    <a>Best Sellers</a>
                    <a>Combos</a>
                    <a>Subs</a>
                    <a>Pizza</a>
                    <a>Garlic Bread</a>
                    <a>Snacks</a>
                    <a>Deserts and Beverages</a>
                </div>
                <div>
                    <input type="text" placeholder="search"></input>
                </div>
            </div>
        </div>
    )
}

export default RestaurantMenu;