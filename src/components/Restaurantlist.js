import React, {useState, useEffect } from 'react';
import './RestaurantList.css';
import axios from 'axios';
import {A, navigate} from 'hookrouter';

const Restaurantlist = () => {
    const [restaurantList, setRestaurantList] = useState([]);
    useEffect(() => {
        const graphqlRestaurantQuery = {
            query : `
              {
                restaurantList
                {
                    restaurants {
                        name
                        
                    }
                    totalRestaurants
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
            data: graphqlRestaurantQuery
          };

          axios(options)
            .then(res => {
                console.log(res);
                setRestaurantList(res.data.data.restaurantList.restaurants);
            });
    },[]);
    const handleClick = (key, event) => {
        navigate(`/restaurantDetail/${key}`);
    }
    return(
    <div className="Main-container">
        <ul>
        {restaurantList && 
            restaurantList.map((restaurant, index) => {
                return (
                    <li key={restaurant.name} onClick={(event)=> handleClick(restaurant.name, event)}>
                        <div className="block box">
                            <div className="image">
                                <img style={{width:"100px", height:"100px", margin:"10px"}} src="https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg" alt="Not found" />
                            </div>
                            <div className="contentFlex">
                            <div>
                                <a href="#">{restaurant.name}</a>
                                <div>
                                    <div>{restaurant.foodType}</div>
                                    <div>Cost Rs {restaurant.estimatedCost} for two </div>
                                    <div>
                                        <span>Min Rs {restaurant.minAmountToOrder}</span>
                                        <span>Upto {restaurant.deliveryTimeEstimate} mins</span>
                                    </div>
                                    <div>Accept {restaurant.modeOfPaymentAccepted} payment</div>
                                </div>
                            </div>
                        <div>
                            <div>
                                4.1
                            </div>
                            <div>
                                687 votes
                            </div>
                            <div>
                                372 reviews
                            </div>
                        </div>
                    </div>
                        </div>
                    </li>
                )
            })
        }
           </ul> 
        </div> 
    )
}

export default Restaurantlist;