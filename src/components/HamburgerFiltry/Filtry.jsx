import { useState } from 'react';
import './Filtry.css'
import TuneIcon from '@mui/icons-material/Tune';

import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WatchIcon from '@mui/icons-material/Watch';
import Home from '@/app/page';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Filtry({ setSelectedCategory }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="filtry">
                
                <button className='filtryButton' onClick={() => setOpen(prev => !prev)}>
                    Filtry
                </button>
            </div>
            <div className={`filtryModal ${open ? 'open' : ''}`}>
                <button className='nieruchomosci' onClick={() => setSelectedCategory('nieruchomość')}>
                    <HomeIcon style={{ fontSize: 30, color: 'white' }} />
                </button>
                <button className='bizuteria' onClick={() => setSelectedCategory('bizuteria')}>
                    <WatchIcon style={{ fontSize: 30, color: 'white' }} />
                </button>
                <button className='samochody' onClick={() => setSelectedCategory('samochód')}>
                    <DirectionsCarIcon style={{ fontSize: 30, color: 'white' }} />
                </button>
                <button  className = 'wszystkie' onClick={() => setSelectedCategory(null)}>
                    <CancelIcon style={{ fontSize: 30, color: 'white' }} />
                </button>
            </div>
        </>
    );
}
