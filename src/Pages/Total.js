import React, { useContext } from 'react'
import '../App.css'
import { DataContext } from '../Components/Context/DataContext'

const Total = () => {
    const {groupedItems, setGroupedItems, handleOrderChange} = useContext(DataContext);

    const orderItems = Object.keys(groupedItems).flatMap((plantKey) => groupedItems[plantKey].filter(item => item.sizes.some(size => size.order > 0)));

    const resetOrder = (item) => {
        const updatedGroupedItems = {...groupedItems};

        const plantKey = Object.keys(updatedGroupedItems).find(plant => updatedGroupedItems[plant].includes(item));
        const foundItem = updatedGroupedItems[plantKey].find(group => group.pc9 === item.pc9);

        if(foundItem) {
            foundItem.sizes.forEach(size => {
                size.order = 0;
            })
        }

        setGroupedItems(updatedGroupedItems);
    }

    //increase
    const incrementOrder = (sizeIndex, plant, pc9) => {
        const updatedGroupedItems = { ...groupedItems };

        const plantItems = updatedGroupedItems[plant];
        const foundItem = plantItems.find(item => item.pc9 === pc9);

        if (foundItem) {
            foundItem.sizes[sizeIndex].order = Math.min(foundItem.sizes[sizeIndex].order + 1, foundItem.sizes[sizeIndex].avail);
        }

        setGroupedItems(updatedGroupedItems);
    };
    //decrease
    const decrementOrder = (sizeIndex, plant, pc9) => {
        const updatedGroupedItems = { ...groupedItems };

        const plantItems = updatedGroupedItems[plant];
        const foundItem = plantItems.find(item => item.pc9 === pc9);

        if (foundItem) {
            foundItem.sizes[sizeIndex].order = Math.max(foundItem.sizes[sizeIndex].order - 1, 0); // Ensure order doesn't go below 0
        }

        setGroupedItems(updatedGroupedItems);
    };

    const formatPC9 = (pc9) => {
        return pc9.replace(/-/g, "");
      };

  return (
    <div className='total'>
       <div className='rules'>
            <h2>Order requirements:</h2>
            <ol>
                <li>Minimum 100 units ordered</li>
                <li>Minimum 20 units per pc9 on tops</li>
                <li>Minimum 30 units per pc9 on bottoms, unless you replenish existing in the store pc9</li>
                <li>BESTSELLING SIZES IS A MUST, HIGHER QUANTITIES</li>
                <li>Fringe sizes – very carefully/only when really needed</li>
            </ol>
        </div>
        <div className='total-items-container'>
            {orderItems.length > 0 ? (
                orderItems.map((item, index) => (
            <div className='total-item'>
                <div className='total-img-container'>
                    <a 
                        href={`https://www.google.cz/search?sca_esv=fbc98ab7d72b3cc1&sca_upv=1&hl=cs&sxsrf=ADLYWILn-EvDOSgM52JpAyDsM0ampVW92g:1722253097194&q=levis+${item.pc9}&udm=2&fbs=AEQNm0Dg3jL7_nUV4_inb0jRKZuKOZox_nAKrm9Pv5yKp2DJnyDU-l04jFJMSzqwBJoLTkw19hqbAdy_84CFTudxdtle1vZzBFgz2pKjmWfkkdJ4_WLcvREge2uXudwK5JJTKtndft95wi_PKic7OwRke_F4OWAX0qeC4qR-YhVPHTsSMzthHGultqFOcGCVnA6PpFNrzO7Y&sa=X&ved=2ahUKEwiM38jglMyHAxUEgf0HHZOYDXwQtKgLegQIEhAB&biw=1879&bih=928&dpr=1`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img 
                            className='total-item-img'
                            src={`https://lsco.scene7.com/is/image/lsco/${formatPC9(item.pc9)}-front-pdp?fmt=webp&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=880&hei=880`}
                            alt={item.pc9}
                        />
                    </a>
                </div>
                <div className='total-item-info'>
                    <div className='total-item-info-pc9'>
                        <h4>{item.pc9}</h4>
                    </div>
                    <div className='total-item-info-name'>
                        <p>{item.desc}</p>
                    </div>
                </div>
                <div className='total-item-size'>
                    <div className='total-item-size-order'>
                        {item.sizes.map((size, index) => {
                            return(
                                <div className='order-container'>
                                    <label key={index}>
                                        {size.width}
                                        {size.length !== "-" ? `/${size.length}` : ""}
                                    </label>
                                    <div className='custom-input'>
                                        <i className="fas fa fa-angle-up arr-up" onClick={() => incrementOrder(index, item.plant, item.pc9)}/>
                                        <input value={size.order} type='number' className='num-input' onChange={(e) => handleOrderChange(index, e, size.avail, item.plant, item.pc9)}/>
                                        <i className="fas fa fa-angle-down arr-down" onClick={() => decrementOrder(index, item.plant, item.pc9)}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='total-item-size-total'>
                        <h5>Total:</h5>
                        <p>
                            {item.sizes.reduce((total, size) => total + (Number(size.order) || 0),0)}
                        </p>
                    </div>
                </div>
                <div className='total-item-del'>
                    <h2 onClick={() => resetOrder(item)}>X</h2>
                </div>
            </div>
            ))
            ) : (
                <p>no data</p>
            )}
        </div>
    </div>
  )
}

export default Total
