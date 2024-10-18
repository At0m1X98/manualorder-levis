import React, { createContext, useState } from 'react'

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [isUploaded, setIsUploaded] = useState(false);
    const [data, setData] = useState([]);
    const [groupedItems, setGroupedItems] = useState({});
    const [currency, setCurrency] = useState("cz")

    //function to groupedData by plant and then pc9
    const groupedByPlant = (data) => {
        const grouped = {};
    
        data.forEach((item) => {
            const { plant, pc9, desc, category, gender, pl, cz, hu, ro, width, length, avail, order } = item;
    
            if (!grouped[plant]) {
                // Initialize an empty array for each plant
                grouped[plant] = [];
            }
    
            // Check if the pc9 already exists in the plant array
            const existingPC9 = grouped[plant].find(group => group.pc9 === pc9);
    
            if (!existingPC9) {
                // Create a new entry for the pc9 and push it into the plant array
                grouped[plant].push({
                    plant,
                    pc9,  // include pc9 for identification
                    desc,
                    category,
                    gender,
                    pl,
                    cz,
                    hu,
                    ro,
                    sizes: [] // This will hold the array of sizes
                });
            }
    
            // Find the updated or newly created pc9 object
            const pc9Item = grouped[plant].find(group => group.pc9 === pc9);
    
            // Push the sizes into the sizes array of the found pc9 object
            pc9Item.sizes.push({
                width,
                length,
                avail,
                order
            });
        });
    
        setGroupedItems(grouped);
    }

    //handle input
    const handleOrderChange = (index, event, avail, plant, pc9) => {
        let newOrder = parseInt(event.target.value, 10);  // Convert input value to an integer
        if (isNaN(newOrder) || newOrder < 0) {
          newOrder = 0;  // If not a valid number or less than 0, set to 0
        }
        if(newOrder > avail) {
          newOrder = avail;
        }
        updateOrder(plant, pc9, index, newOrder);
      }

    //updateOrder
    const updateOrder = (plant, pc9, sizeIndex, newOrder) => {
        const updatedGroupedItems = {...groupedItems};//create copy of the item

        //find the specific plant and pc9
        const plantGroup = updatedGroupedItems[plant];
        if(!plantGroup) return;

        const pc9Item = plantGroup.find(group => group.pc9 === pc9);
        if(!pc9Item) return;

        //update the order
        pc9Item.sizes[sizeIndex].order = newOrder;

        //set the updated groupedItems
        setGroupedItems(updatedGroupedItems);
    }
    
    const caluculateTotal = () => {
        let total = 0;
        Object.values(groupedItems).forEach(plantGroup => {
            plantGroup.forEach(pc9Item => {
                pc9Item.sizes.forEach(size => {
                    total += size.order || 0;
                })
            })
        })
        return total
    }

    return (
        <DataContext.Provider value={{ data, setData, isUploaded, setIsUploaded, groupedItems, setGroupedItems, groupedByPlant, updateOrder, caluculateTotal, handleOrderChange, setCurrency, currency }}>
            {children}
        </DataContext.Provider>
    )
}
