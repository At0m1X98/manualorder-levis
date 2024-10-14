import React, { useContext } from 'react'
import '../../App.css'
import './Upload.css'
import * as XLSX from 'xlsx'

import back from '../../Assets/back.jpg'
import { DataContext } from '../Context/DataContext'

const Upload = ({ onUploadSuccess }) => {
  const { setData, groupedByPlant,groupedItems } = useContext(DataContext);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if(!file) {
      console.error("No file selected");
      return;
    }
    if (file) {
      // Simulate upload process (you can replace this with actual logic)
      console.log('File uploaded:', file);
      // Once the file is successfully uploaded, call the success callback
      onUploadSuccess();
    }

    //getting data from the file
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, {type: "binary" });
        const sheetName = workbook.SheetNames[0];
        if(!sheetName) {
          console.error("No sheet found in the workbook");
          return;
        }
        const sheet = workbook.Sheets[sheetName];
        if(!sheet) {
          console.error("Sheet is underfined");
          return;
        }
        const parseData = XLSX.utils.sheet_to_json(sheet);

        const groupedData = {};
        parseData.forEach((row, index) => {
          groupedData[index] = {
            pc9: row['PC9 '],
            desc: row['Desc'],
            width: row['W'],
            length: row['L'],
            avail: row['AVAIL NOW'],
            category: row['Bottoms/Tops'],
            gender: row['Gender'],
            order: row['ORDER'],
            plant: row['Plant'],
            pl: row['FO PL'],
            cz: row['FO CZ'],
            hu: row['FO HU'],
            ro: row['FO RO'],
          }
        });

        const uniqueData = Object.values(groupedData);
        console.log(uniqueData);
        groupedByPlant(uniqueData);
        console.log(groupedItems);
        setData(uniqueData);
      } catch(error) {
        console.log("error reading or parsing file:", error);
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className='upload'>
        <div className='upload-back'>
            <img src={back} alt='back'/>
        </div>
        <h2>Upload Stock Availability</h2>
        <form>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload}/>
        </form>
    </div>
  )
}

export default Upload
