'use client';
import './oferty.css';
import UserIcon from '@mui/icons-material/Person';
import { useState, useEffect } from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';

export default function Oferty() {
  // USESTATY ------------------ USESTATY ------------------ USESTATY ------------------ USESTATY ------------------ USESTATY ------------------ USESTATY ------------------
  const {data: session, status } = useSession();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    nazwa: '',
    cena: '',
    opis: '',
    imageKey: '' 
  });
  const [ofertyList, setOfertyList] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  // FETCH DLA DETALI OFERT Z MONGODB ------------------------ FETCH DLA DETALI OFERT Z MONGODB ------------------------ FETCH DLA DETALI OFERT Z MONGODB ------------------------
  useEffect(() => {
    async function fetchOferty() {
      const res = await fetch('/api/oferta');
      const data = await res.json();
      setOfertyList(data);
    }
    fetchOferty();
  }, []);
  // MODAL SHOWN ------------- // MODAL SHOWN ------------- // MODAL SHOWN ------------- // MODAL SHOWN ------------- // MODAL SHOWN ------------- // MODAL SHOWN -------------
  function showModal() {
    setVisible(prev => !prev);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  //SUBMIT DLA FORM WYSYŁANIE NAJPIERW DO S3 POTEM DO MONGODB ------------------------------------ SUBMIT DLA FORM WYSYŁANIE NAJPIERW DO S3 POTEM DO MONGODB ------------------------------------
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

      // 2. Send all data (including image key) to MongoDB2s
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
  setOfertyList(prev => [...prev, { ...formData, imageKey: uploadedFileName }]); 
  setFormData({ nazwa: '', cena: '', opis: '', imageKey: '' });
  setFile(null);
  setVisible(false);
}
 else {
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
    <div className="OfertyPageContainer">
      <div className="header">
        {session && (
          <button
            className='Logout'
            type='button'
            onClick={() => signOut({ callbackUrl: '/oferty' })}
          >
            Wyloguj się
          </button>
        )}
  <img src="Safeko-header-logo.png" className="header-logo" />
  {session?.user ? (
    <>
      <img src={session.user.image}
        alt={session.user.name}
        className="UserProfileImage">
        
      </img>
      
      <span className="UserName">{session.user.name}</span>
    </>
  ) : (
    <UserIcon style={{ fontSize: 50, color: "Black" }} className='UserIcon' />
  )}
</div>
      {session ? (
        <button className='dodajOferte' onClick={showModal}>Dodaj Oferte</button>
      ) : (
         <button className='dodajOferte' onClick={() => signIn()}>Zaloguj się, aby dodać ofertę</button>
      )}
      

      <div className='OfertyList'>
        {ofertyList.map((oferta, index) => (
          <div key={index} className='OfertaItem'>
            <img src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${oferta.imageKey}`} className='OfertaPhoto1'/>
            <div className='detailsContainer'>
            <h3 className='nazwa1'>{oferta.nazwa}</h3>
            <p className='cena1'>{oferta.cena} Zł</p>
            <button className='kup'>Dodaj do koszyka</button>
            <span className='szczegoly'>Szczególy &rsaquo;</span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className={`OfertaAddModal ${visible ? 'visible' : ''}`}>
          <div className='Photos'>
            <div className='Photo1'>
              <input type='file' accept='image/*' onChange={handleFileChange} />
            </div>
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
          <button type='submit' className='SubmitOferta' disabled={uploading}>
            {uploading ? "Dodawanie..." : "Dodaj Ogłoszenie"}
          </button>
        </div>
      </form>
    </div>
  );
}
