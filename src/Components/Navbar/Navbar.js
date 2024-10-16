import React, {useContext, useState, useEffect} from 'react'
import * as XLSX from 'xlsx';
import '../../App.css'
import './Navbar.css'
import { DataContext } from '../Context/DataContext'

import logo from '../../Assets/logo.png'
import reset from '../../Assets/reset.svg'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [navBackground, setNavBackground] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const {setIsUploaded, groupedItems, data, caluculateTotal} = useContext(DataContext);

  const handleEasterEgg = () => {
    setClickCount(prevCount  => {
      const newCount = prevCount + 1;

      if(newCount === 5) {
        alert('THIS APP WAS CREATED BY: Tomas Handzel(659687)')
        return 0
      }
      return newCount;
    })
    
    console.log(clickCount);
  }
  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 50) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDownload = () => {
    console.log("data");
    console.log(data);
    console.log("groupedItems");
    console.log(groupedItems);

    let toDownload = [];

    Object.keys(groupedItems).forEach(key => {
      const items = groupedItems[key];
      
      items.forEach(item => {
        item.sizes.forEach(size => {
          toDownload.push({
            plant: key,
            pc9: item.pc9,
            width: size.width,
            length: size.length,
            order: size.order
          });
        });
      });
    });

    console.log(toDownload);

    //creating worksheet
    const ws = XLSX.utils.json_to_sheet(toDownload);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Order to send");
    const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for(let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xff;
      }
      return buf;
    }
    const blob = new Blob([s2ab(wbout)], {type: "application/octet-stream"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Order_to_send.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className={`navbar ${navBackground ? 'navbar-scrolled' : ''}`}>
      <div className='nav-left'>
        <img src={logo} alt='logo' onClick={handleEasterEgg}/>
      </div>
      <div className='nav-middle'>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "navlink active" : "navlink"} 
            >
              All
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/male"  
              className={({ isActive }) => isActive ? "navlink active" : "navlink"} 
            >
              Men
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/female" 
              className={({ isActive }) => isActive ? "navlink active" : "navlink"}
            >
              Women
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='nav-right'>
        <h4><NavLink className='summary' to="/total">Total: {caluculateTotal()}</NavLink></h4>
        <button onClick={handleDownload}>DOWNLOAD</button>
        <img src={reset} alt='reset' onClick={() => setIsUploaded(false)}/>
      </div>
    </div>
  )
}

export default Navbar
