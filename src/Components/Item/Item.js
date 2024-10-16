import React, { useContext, useState} from 'react'
import '../../App.css'
import './Item.css'
import { DataContext } from '../Context/DataContext'

const Item = ({plant, pc9, desc, category, gender, cz, pl, hu, ro, sizes}) => {
  const { updateOrder } = useContext(DataContext);

  const formatPC9 = (pc9) => {
    return pc9.replace(/-/g, "");
  };


  const [currentFallbackIndex, setCurrentFallbackIndex] = useState(0);

  //handle input
  const handleOrderChange = (index, event, avail) => {
    let newOrder = parseInt(event.target.value, 10);  // Convert input value to an integer
    if (isNaN(newOrder) || newOrder < 0) {
      newOrder = 0;  // If not a valid number or less than 0, set to 0
    }
    if(newOrder > avail) {
      newOrder = avail;
    }
    updateOrder(plant, pc9, index, newOrder);
  }


  return (
    <div className='item'>
      <div className='item-left'>
        <div className='item-left-top'>
          <a 
            href={`https://www.google.cz/search?sca_esv=fbc98ab7d72b3cc1&sca_upv=1&hl=cs&sxsrf=ADLYWILn-EvDOSgM52JpAyDsM0ampVW92g:1722253097194&q=levis+${pc9}&udm=2&fbs=AEQNm0Dg3jL7_nUV4_inb0jRKZuKOZox_nAKrm9Pv5yKp2DJnyDU-l04jFJMSzqwBJoLTkw19hqbAdy_84CFTudxdtle1vZzBFgz2pKjmWfkkdJ4_WLcvREge2uXudwK5JJTKtndft95wi_PKic7OwRke_F4OWAX0qeC4qR-YhVPHTsSMzthHGultqFOcGCVnA6PpFNrzO7Y&sa=X&ved=2ahUKEwiM38jglMyHAxUEgf0HHZOYDXwQtKgLegQIEhAB&biw=1879&bih=928&dpr=1`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              src={`https://lsco.scene7.com/is/image/lsco/${formatPC9(pc9)}-front-pdp?fmt=webp&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=880&hei=880`}
              alt={pc9}
            />
          </a>
        </div>
        <div className='item-left-bottom'>
          <h3>{pc9}</h3>
          <p>{desc}</p>
          <div className='item-left-bottom-container'>
            <div className='container-left'>
              <h4>{category}/{gender}</h4>
            </div>
            <div className='container-right'>
              <p>{cz} Kč</p>
            </div>
          </div>
        </div>
      </div>
      <div className='item-right'>
        <div className='item-right-container bold'>
          <p>Size</p>
          <p>Avail</p>
          <p>Order</p>
        </div>
          {sizes.map((size, index) => {

            return(
            <div className='item-right-container'>
              <p key={index}>{size.width}/{size.length}</p>
              <p className='avail'>{size.avail}</p>
              <input type='number' id="number" value={size.order} onChange={(e) => handleOrderChange(index, e, size.avail)}/>
            </div>)
            }
          )}
      </div>
    </div>
  )
}

export default Item
