import React, { useContext, useState } from 'react'
import '../App.css'
import { DataContext } from '../Components/Context/DataContext'
import Item from '../Components/Item/Item'

const Female = () => {
  const {groupedItems} = useContext(DataContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  const femaleItems = Object.keys(groupedItems).flatMap((plantKey) => groupedItems[plantKey].filter(item => item.gender === "FEMALE"))
  
  const filteredItems = selectedCategory
  ? femaleItems.filter(item => item.category === selectedCategory)
  : femaleItems;

  return (
    <div className='female'>
      <div className='category'>
        <div className={selectedCategory === "BOTTOMS" ? "cat-active" : "cat"}>
          <h4 onClick={() => setSelectedCategory('BOTTOMS')}>Bottom</h4>
        </div>
        <div className={selectedCategory === "TOPS" ? "cat-active" : "cat"}>
          <h4 onClick={() => setSelectedCategory('TOPS')}>Top</h4>
        </div>
      </div>
      <div className='female-items'>
        {/*Rendered filtered items */}
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <Item
              key={`${item.plant}-${index}`}
              plant={item.plant}
              pc9={item.pc9}
              desc={item.desc}
              category={item.category}
              gender={item.gender}
              cz={item.cz}
              pl={item.pl}
              hu={item.hu}
              ro={item.ro}
              sizes={item.sizes}
            />
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  )
}

export default Female
