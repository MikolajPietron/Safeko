import { useState } from 'react';
import './Filtry.css'
import TuneIcon from '@mui/icons-material/Tune';

import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WatchIcon from '@mui/icons-material/Watch';
import Home from '@/app/page';

export default function Filtry(){
    const [open, setOpen] = useState(false);
    
    return(
        <>
        <div className="filtry">
            <span>Filtry</span>
            <button className='filtryButton' onClick={() =>setOpen(prev => !prev)}>
                <TuneIcon className = 'filtryIcon' style={{fontSize:40, color:'white'}}></TuneIcon>
            </button>
            
            
        </div>
        <div className={`filtryModal ${open ? 'open' : ''}`}>
                <button className='nieruchomosci'>
                    <HomeIcon style={{fontSize: 30, color:'white'}}></HomeIcon>
                </button>
                <button className='bizuteria'>
                    <DirectionsCarIcon style={{fontSize: 30, color:'white'}}></DirectionsCarIcon>
                </button>
                <button className='samochody'>
                    <WatchIcon style={{fontSize: 30, color:'white'}}></WatchIcon>
                </button>
            </div>
        </>
        
    )
}