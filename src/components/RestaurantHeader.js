import React from 'react';
import './RestaurantHeader.css';

const RestaurantHeader = () => {
    return (
            <div className="headerBox">
                <div>ORDER FOOD ONLINE FROM</div>
                <div>
                    <div>Hot And Hot </div>
                    <div>2.9</div>
                </div>
                <div>Kormangala, Bangalore<span>.</span> Cosr Rs 500 for two</div>
                <div className="headerInfoContainer">
                    <div>
                        <div>Delivery Time</div>
                        <div>30 mins</div>
                    </div>
                    <div>
                        <div>Minimum Order</div>
                        <div>30 mins</div>
                    </div>
                    <div>
                        <div>Payment Methods</div>
                        <div>30 mins</div>
                    </div>
                </div>
            </div>
   
   )
}

export default RestaurantHeader;