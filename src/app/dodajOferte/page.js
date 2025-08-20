'use client';
import { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CategoryMenu from '@/components/HamburgerCategory/CategoryMenu';
import { useRouter } from 'next/navigation';
import './ofertyadd.css'; // reuse your CSS

import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WatchIcon from '@mui/icons-material/Watch';

export default function DodajOferte() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    { name: "Nieruchomości", icon: <HomeIcon className='homeIcon' style={{ fontSize: 40, cursor: 'pointer'}} /> },
    { name: "Biżuteria", icon: <WatchIcon className='watchIcon' style={{color:'black', fontSize: 40, cursor: 'pointer'}} /> },
    { name: "Samochody", icon: <DirectionsCarIcon className='carIcon' style={{color:'black', fontSize: 40, cursor: 'pointer'}} /> },
  ];
  const router = useRouter();
  

  // state for the form
  const [formData, setFormData] = useState({
    nazwa: '',
    cena: '',
    opis: '',
    lokalizacja: '',
    imageKey: '',
    kategoria: ''
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // handlers
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);

    let uploadedFileName = "";

    try {
      // 1. Upload to S3 first
      if (file) {
        const uploadForm = new FormData();
        uploadForm.append('file', file);

        const uploadRes = await fetch('/api/s3-upload', {
          method: 'POST',
          body: uploadForm,
        });

        const uploadResult = await uploadRes.json();

        if (uploadRes.ok) {
          uploadedFileName = uploadResult.fileName;
        } else {
          alert("Błąd podczas przesyłania zdjęcia.");
          setUploading(false);
          return;
        }
      }

      // 2. Send data to MongoDB
      const res = await fetch('/api/oferta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          imageKey: uploadedFileName,
        }),
      });

      if (res.ok) {
        alert('Oferta dodana!');
        setFormData({ nazwa: '', cena: '', opis: '', lokalizacja: '', imageKey: '', kategoria: '' });
        setFile(null);

        // redirect back to /oferty after success
        router.push('/oferty');
      } else {
        alert('Wystąpił błąd przy dodawaniu oferty.');
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("Coś poszło nie tak.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="OfertaAddContainer">
        <div className='wybierzOferteContainer'>
          <div className='wybierzOferteText'>
            <h2>Wybierz ofertę</h2>
          </div>
          <div className='wybierzOferteButtons'>
            <button type='button' className='goToNieruchomosci' onClick={() => {
              setSelectedCategory("Nieruchomosci");
              router.push('/nieruchomosci');
            }}><HomeIcon className='homeIcon' sx={{
      fontSize: 40,
      color: "white",
      transition: "all 0.3s ease",
      ".goToNieruchomosci:hover &": {
        color: "black",
        
      },
    }} />Nieruchomości</button>
            <button type='button' className='goToBizuteria'>
              <WatchIcon className='watchIcon' sx={{
      fontSize: 40,
      color: "white",
      transition: "all 0.3s ease",
      ".goToBizuteria:hover &": {
        color: "black",
        
      },
    }}/>Biżuteria
            </button>
            <button type='button' className='goToSamochody' onClick={() => router.push('/samochody')}>
              <DirectionsCarIcon className='carIcon' sx={{
      fontSize: 40,
      color: "white",
      transition: "all 0.3s ease",
      ".goToSamochody:hover &": {
        color: "black",
        
      },
    }} />Samochody
            </button>
          </div>
        </div>
          {/* <div className="Photo1">
            <input
              className="Photo1input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <AddPhotoAlternateIcon
              className="addPhotoIcon"
              style={{ fontSize: 60, color: 'black' }}
            />
          </div> */}
          
        

        {/* <div className="nazwacenaopis">
          <div className="kategoriaMainInfo">
            <div className="kategoria">
              
            </div>
            <div className="mainInfo">
              <input
                type="text"
                name="nazwa"
                placeholder="Nazwa"
                className="nazwa"
                value={formData.nazwa}
                onChange={handleChange}
              />

              <input
                type="text"
                name="cena"
                placeholder="Cena"
                className="cena"
                value={formData.cena}
                onChange={handleChange}
              />

              <input
                type="text"
                name="opis"
                placeholder="Opis"
                className="opis"
                value={formData.opis}
                onChange={handleChange}
              />

              <input
                type="text"
                name="lokalizacja"
                placeholder="Lokalizacja"
                className="lokalizacja"
                value={formData.lokalizacja}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="houseInfo">
            <input type="text" name="powierzchnia" className="housePowierzchnia" placeholder="Powierzchnia" onChange={handleChange} />
            <input type="text" name="liczbaPokoi" className="houseLiczbaPokoi" placeholder="Liczba pokoi" onChange={handleChange} />
            <input type="text" name="rokBudowy" className="houseRokBudowy" placeholder="Rok budowy" onChange={handleChange} />
            <input type="text" name="rodzajZabudowy" className="houseRodzajZabudowy" placeholder="Rodzaj zabudowy" onChange={handleChange} />
          </div>
        </div> */}

        {/* <button type="submit" className="SubmitOferta" disabled={uploading}>
          {uploading ? "Dodawanie..." : "Dodaj Ogłoszenie"}
        </button> */}
      </div>
    </form>
  );
}
