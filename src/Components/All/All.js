import React, { useContext } from 'react'
import '../../App.css'
import './All.css'
import '../../App.css'
import { DataContext } from '../Context/DataContext'
import Item from '../Item/Item'

const All = () => {
  const {groupedItems} = useContext(DataContext)

  return (
    <div className='all'>
       {Object.keys(groupedItems).map((plantKey) => (
        // Map through each plantKey (e.g., '3045', '3003', etc.)
        groupedItems[plantKey].map((pc9Item, index) => (
          <Item 
            key={`${plantKey}-${index}`} // Ensure unique key with plantKey + index
            plant={pc9Item.plant}
            pc9={pc9Item.pc9} // Pass down pc9 or other necessary data
            desc={pc9Item.desc}
            category={pc9Item.category}
            gender={pc9Item.gender}
            pl={pc9Item.pl}
            cz={pc9Item.cz}
            hu={pc9Item.hu}
            ro={pc9Item.ro}
            sizes={pc9Item.sizes} // You can pass down sizes array too
          />
        ))
      ))}
    </div>
  )
}

export default All
