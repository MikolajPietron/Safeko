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
                <span>Filtry</span>
                <button className='filtryButton' onClick={() => setOpen(prev => !prev)}>
                    <TuneIcon className='filtryIcon' style={{ fontSize: 40, color: 'white' }} />
                </button>
            </div>
            <div className={`filtryModal ${open ? 'open' : ''}`}>
                <button className='nieruchomosci' onClick={() => setSelectedCategory('Nieruchomości')}>
                    <HomeIcon style={{ fontSize: 30, color: 'white' }} />
                </button>
                <button className='bizuteria' onClick={() => setSelectedCategory('Biżuteria')}>
                    <DirectionsCarIcon style={{ fontSize: 30, color: 'white' }} />
                </button>
                <button className='samochody' onClick={() => setSelectedCategory('Samochody')}>
                    <WatchIcon style={{ fontSize: 30, color: 'white' }} />
                </button>
                <button  className = 'wszystkie' onClick={() => setSelectedCategory(null)}>
                    <CancelIcon style={{ fontSize: 30, color: 'white' }} />
                </button>
            </div>
        </>
    );
}
