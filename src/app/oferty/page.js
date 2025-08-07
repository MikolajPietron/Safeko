'use client';
import './oferty.css';
import UserIcon from '@mui/icons-material/Person';
import { useState, useEffect } from 'react';

export default function Oferty() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    nazwa: '',
    cena: '',
    opis: ''
  });
  const [ofertyList, setOfertyList] = useState([]); 

  useEffect(() => {
    async function fetchOferty() {
      const res = await fetch('/api/oferta');
      const data = await res.json();
      setOfertyList(data);
    }

    fetchOferty();
  }, []);

  function showModal() {
    setVisible(prev => !prev);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/oferta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Oferta dodana!');
      setFormData({ nazwa: '', cena: '', opis: '' });
      setVisible(false);
    } else {
      alert('Wystąpił błąd.');
    }
  }

  return (
    <div className="OfertyPageContainer">
      <div className="header">
        <img src="Safeko-header-logo.png" className="header-logo" />
        <UserIcon style={{ fontSize: 50, color: "Black" }} className='UserIcon' />
      </div>

      <button className='dodajOferte' onClick={showModal}>Dodaj Oferte</button>
            <div className='OfertyList'>
        {ofertyList.map((oferta, index) => (
          <div key={index} className='OfertaItem'>
            <img src= '/Szafa.png'></img>
            <h3>{oferta.nazwa}</h3>
            <p className='cena'>{oferta.cena} Zł</p>
            {/* <p className='opis'>{oferta.opis}</p> */}
            <button className='Kup'>Dodaj do koszyka</button>
            <span className='szczegoly'>Szczególy</span>
          </div>
        ))}
      </div>


      <form onSubmit={handleSubmit}>
        <div className={`OfertaAddModal ${visible ? 'visible' : ''}`}>
          <div className='Photos'>
            <div className='Photo1'></div>
            <div className='Photo2'></div>
            <div className='Photo3'></div>
            <div className='Photo4'></div>
          </div>
          <input
            type='text'
            name='nazwa'
            placeholder='Nazwa'
            className='nazwa'
            value={formData.nazwa}
            onChange={handleChange}
          />
          <input
            type='text'
            name='cena'
            placeholder='Cena'
            className='cena'
            value={formData.cena}
            onChange={handleChange}
          />
          <input
            type='text'
            name='opis'
            placeholder='Opis'
            className='opis'
            value={formData.opis}
            onChange={handleChange}
          />
          <button type='submit' className='SubmitOferta'>Dodaj Oferte</button>
        </div>
      </form>
    </div>
  );
}
