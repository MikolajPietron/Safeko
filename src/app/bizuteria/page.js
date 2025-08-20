"use client";

import "./bizuteria.css";
import ApartmentIcon from '@mui/icons-material/Apartment';
import HouseIcon from '@mui/icons-material/House';
import UserIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeckIcon from '@mui/icons-material/Deck';
import { useState } from "react";
import { set } from "mongoose";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TuneIcon from '@mui/icons-material/Tune';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useRouter } from 'next/navigation';
import DiamondIcon from '@mui/icons-material/Diamond';
import {useSession,signOut} from 'next-auth/react';
export default function BizuteriaPage() {
  const [isShowDane, setShowDane] = useState(false);
  const [isShowKontakt, setShowKontakt] = useState(false);
  const [isShowPhoto, setShowPhoto] = useState(false);
  const [isShowTytul, setShowTytul] = useState(false);
  const [isShowCena, setShowCena] = useState(false);

  const {data : session} = useSession();


    const [formData, setFormData] = useState({
    category: 'bizuteria',
          imie: '',
          email: '',
          numer: '',
          dodanePrzez: '',
          rodzaj: '',
          proba: '',
          waga: '',
          rozmiar: '',
          material: '',
          stan: '',
          rok: '',
          tytul: '',
          opis: '',
          cena: '',
          imageKey: ''
  });

  
  const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
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
        const res = await fetch('/api/bizuteria', {
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
          setFormData({ category: 'bizuteria',
          imie: '',
          email: '',
          numer: '',
          dodanePrzez: '',
          rodzaj: '',
          proba: '',
          waga: '',
          rozmiar: '',
          material: '',
          stan: '',
          rok: '',
          tytul: '',
          opis: '',
          cena: '',
          imageKey: ''});
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
    <div className="bizuteriaContainer">
      <div className="header">
              {session && (
                <button
                  className="Logout"
                  type="button"
                  onClick={() => signOut({ callbackUrl: '/oferty' })}
                >
                  Wyloguj się
                </button>
              )}
              <img src="Safeko-header-logo.png" className="header-logo" />
              {session?.user ? (
                <>
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="UserProfileImage"
                  />
                  <span className="UserName">{session.user.name}</span>
                </>
              ) : (
                <UserIcon style={{ fontSize: 50, color: 'Black' }} className="UserIcon" />
              )}
            </div>
      <form className="bizuteriaForm">
        <div className="coChceszZrobic">
          CO CHCESZ SPRZEDAĆ?
        </div>
        <div className="coChceszZrobicButtons">
          <select className="rodzaj" name="rodzaj" value={formData.rodzaj} onChange={ (e) => {
            handleChange(e);
            setShowDane(true);
          }}>
            <option value="" disabled >Rodzaj Biżuterii</option>
            <option value="pierscionek">Pierścionek</option>
            <option value="naszyjnik">Naszyjnik</option>
            <option value="bransoletka">Bransoletka</option>
            <option value="kolczyki">Kolczyki</option>
            <option value="zegarek">Zegarek</option>
            <option value="sygnet">Sygnet</option>
          </select>
        </div>

        <div className={`daneModal ${isShowDane ? 'show' : ''}`}>
                    <button type="button"  onClick={() => setShowKontakt(true)} className="dalej2">Dalej</button>
                    <div className='daneModalText'>
                        <DiamondIcon style={{fontSize:50, color:"black"}}/>
                        DANE TECHNICZNE
                    </div>
                    <div className='daneModalContent'>
                        <input type='text' name='rok' className='rok' placeholder='Rok produkcji' value={formData.rok} onChange={handleChange} />
                        <input type='number' name='proba' className='proba' placeholder='Próba' value={formData.proba} onChange={handleChange} />
                        <input type='number' name='waga' className='waga' placeholder='Waga (w g)' value={formData.waga} onChange={handleChange} />
                        <input type='number' name='rozmiar' className='rozmiar' placeholder='Rozmiar/Długość' value={formData.rozmiar} onChange={handleChange} />
                        <select className='material'  name="material" value={formData.material} onChange={handleChange}>
                            <option value="" disabled >Materiał</option>
                            <option value="zloto">Złoto</option>
                            <option value="srebro">Srebro</option>
                            <option value="platyna">Platyna</option>
                            <option value="stal">Stal</option>
                            <option value="braz">Brąz</option>
                            <option value="stalnierdzewna">Stal Nierdzewna</option>
                            <option value="miedz">Miedź</option>
                        </select>
                        <select className='stan'  name="stan" value={formData.stan} onChange={handleChange}>
                            <option value="" disabled >Stan</option>
                            <option value="Nowy">Nowy</option>
                            <option value="Uzywany">Używany</option>
                        </select>
                    </div>
                </div>

        <div className={`kontaktModal ${isShowKontakt ? 'show' : ''}`}>
        <button type = "button" className="dalej" onClick={() => setShowPhoto(true)}>Dalej</button>
        <div className="kontaktZTobaText">
          <PersonAddIcon style={{fontSize:50, color:"black"}}/>
          DAJ KONTAKT DO SIEBIE!
        </div>
        <div className="kontaktZTobaInput">
          <input type="text" name="imie"  className ="imie"  placeholder="Imię" value={formData.imie} onChange={handleChange} />
          <input type="number" name="numer" className ="telefon"  placeholder="Numer telefonu" value={formData.numer} onChange={handleChange} />
          <input type="email" name="email" className ="email"  placeholder="E-mail" value={formData.email} onChange={handleChange} />
          <select required
          name="dodanePrzez"
          value={formData.dodanePrzez} onChange={handleChange}
          >
            <option value="Wybierz">Dodane przez *</option>
            <option value="Osoba prywatna">Osoba prywatna</option>
            <option value="Firma">Firma</option>
            <option value="Deweloper">Deweloper</option>
          </select>
        </div>
        </div>
        <div className={`photosModalContainer ${isShowPhoto ? 'show' : ''}`}>
          <button type="button" className="dalej3" onClick={() => setShowTytul(true)} >Dalej</button>
          <div className="photosModalText">
          <AddAPhotoIcon style={{fontSize:50, color:"black"}}/>
          <h1>DODAJ ZDJĘCIA</h1>
        </div>
        <div className="photosModal">
          
            <input
              className="Photo1input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              
            />
            <AddPhotoAlternateIcon
              className="addPhotoIcon"
              style={{ fontSize: 60, color: 'white' }}
            />
          
        </div>
        </div>
        <div className={`tytulModal ${isShowTytul ? 'show' : ''}`}>
          <button type="button" className="dalej4" onClick={() => setShowCena(true)}>Dalej</button>
          <div className="tytulModalText">
            <FormatColorTextIcon style={{fontSize:50, color:"black"}}/>
            <h1>TYTUŁ I OPIS</h1>
          </div>
          <div className="tytulModalContent">
            <input type="text" name="tytul" className="tytul" placeholder="Tytuł*" value={formData.tytul} onChange={handleChange} /> 
            <input type="text" name="opis" className="tytul" placeholder="Opis" value={formData.opis} onChange={handleChange} />
          </div>

           
        </div>
        <div className={`cenaModal ${isShowCena ? 'show' : ''}`}>
          <div className="cenaModalText">
            <AttachMoneyIcon style={{fontSize:50, color:"black"}}/>
            <h1>CENA</h1>
          </div>
          <div className="cenaModalContent">
            <input type="number" name="cena" className="cena" placeholder="Cena*" value={formData.cena} onChange={handleChange} />
          </div>
        </div>
        <div className="dodajModal">
          <button type="submit"  onClick={handleSubmit} className="dodajOgłoszenie">Dodaj Ogłoszenie</button>
        </div>
      </form>
    </div>
  );
}
