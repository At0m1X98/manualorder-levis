import React, { useContext, useState } from 'react'
import '../App.css'
import { DataContext } from '../Components/Context/DataContext'
import Item from '../Components/Item/Item'

const Male = () => {
  const {groupedItems} = useContext(DataContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  const maleItems = Object.keys(groupedItems).flatMap((plantKey) => groupedItems[plantKey].filter(item => item.gender === "MALE"))
  
  const filteredItems = selectedCategory
  ? maleItems.filter(item => item.category === selectedCategory)
  : maleItems;

  return (
    <div className='male'>
      <div className='category'>
        <div className={selectedCategory === "" ? "cat-active" : "cat"}>
          <h4 onClick={() => setSelectedCategory('')}>All</h4>
        </div>
        <div className={selectedCategory === "BOTTOMS" ? "cat-active" : "cat"}>
          <h4 onClick={() => setSelectedCategory('BOTTOMS')}>Bottom</h4>
        </div>
        <div className={selectedCategory === "TOPS" ? "cat-active" : "cat"}>
          <h4 onClick={() => setSelectedCategory('TOPS')}>Top</h4>
        </div>
      </div>
      <div className='male-items'>
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

export default Male
