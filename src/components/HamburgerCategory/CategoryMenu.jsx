'use client';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

// Icons for categories
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WatchIcon from '@mui/icons-material/Watch';

import './categoryMenu.css';

export default function CategoryMenu({ selectedCategory, setSelectedCategory }) {
  const [open, setOpen] = useState(false);

  const categories = [
    { name: "Nieruchomości", icon: <HomeIcon className='homeIcon' style={{color:'black', fontSize: 40, cursor: 'pointer'}} /> },
    { name: "Biżuteria", icon: <WatchIcon className='watchIcon' style={{color:'black', fontSize: 40, cursor: 'pointer'}} /> },
    { name: "Samochody", icon: <DirectionsCarIcon className='carIcon' style={{color:'black', fontSize: 40, cursor: 'pointer'}} /> },
  ];

  return (
    <div className="hamburger-container">
      <button
        className="hamburger-btn"
        onClick={() => setOpen(!open)}
        type='button'
      >
        Kategoria
        {open 
          ? <CloseIcon className='closeIconModal' style={{color:'black', fontSize: 25}}/> 
          : <KeyboardDoubleArrowDownIcon className='arrowDownModal' style={{color:'black', fontSize: 30}} />
        }
      </button>

      <div className="menu-panel">
        {categories.map(cat => (
          <button
            key={cat.name}
            className={selectedCategory === cat.name ? 'active' : ''}
            onClick={() => {
              console.log('Selected category:', cat.name);
              setSelectedCategory(cat.name);
              setOpen(false);
            }}
            type="button"
          >
            {cat.icon}
            
          </button>
        ))}
      </div>
    </div>
  );
}
