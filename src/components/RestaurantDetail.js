import React, { useState, useEffect } from 'react';
import RestaurantHeader from './RestaurantHeader';
import RestaurantMenu from './RestaurantMenu';
import RestaurantDishes from './RestaurantDishes';
import axios from 'axios';

const RestaurantDetail = (props) => {
    const {name} = props;
    const [restaurantDetail, setRestaurantDetail] = useState([]);
    useEffect(() => {
        let value =  name.split("%20");
        value = value.join(' ');
        const graphqlRestaurantDetailQuery = {
            query : `
            {
                restaurantDetail(name:"${value}"){
                    _id
                    name
                    address
                    estimatedCost
                    rating
                    deliveryTime
                    minOrderAmount
                    paymentMode
                    city
                    dishes {
                        dishName
                        ingrediants
                        votes
                        price
                    }
                    
                }
            }
          ` 
          }

        const options = {
            url: 'http://localhost:8080/graphql',
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: graphqlRestaurantDetailQuery
          };

          axios(options)
          .then(res => {
              console.log(res);
              setRestaurantDetail(res.data.data.restaurantDetail);
          });
    },[name]);
    return (
        <div>
            <RestaurantHeader></RestaurantHeader>
            <RestaurantMenu></RestaurantMenu>
            <RestaurantDishes></RestaurantDishes>
        </div>
    )
}
export default RestaurantDetail;