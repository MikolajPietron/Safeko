"use client";
import "./nieruchomosci.css";
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
import { useSession, signOut } from "next-auth/react";
import { useRef, useEffect } from "react";

export default function Nieruchomosci() {
  const kontaktRef = useRef(null);
  const metrazRef = useRef(null);
  const photosRef = useRef(null);
  const tytulRef = useRef(null);
  const cenaRef = useRef(null);
  const [isShownKontakt, setShownKontakt] = useState(false);
  const [isShownMetraz, setShownMetraz] = useState(false);
  const [isShownPhotos, setShownPhotos] = useState(false);
  const [isShownTytul, setShownTytul] = useState(false);
  const [isShownCena, setShownCena] = useState(false);

  const {data: session} = useSession();
  useEffect(() => {
    if (isShownKontakt && kontaktRef.current) {
      kontaktRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (isShownMetraz && metrazRef.current) {
      metrazRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (isShownPhotos && photosRef.current) {
      photosRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (isShownTytul && tytulRef.current) {
      tytulRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (isShownCena && cenaRef.current) {
      cenaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isShownKontakt, isShownMetraz, isShownPhotos, isShownTytul, isShownCena]);
  function showKontaktModal(){
    setShownKontakt(true);
  }
  function showMetrazModal(){
    setShownMetraz(true);
  }
  function showPhotosModal(){
    setShownPhotos(true);
  }
  function showTytulModal(){
    setShownTytul(true);
  }
  function showCenaModal(){
    setShownCena(true);
  }
  const [formData, setFormData] = useState({
  typ: '',           // mieszkanie / dom / działka
  imie: '',
  email: '',
  numer: '',
  dodanePrzez: '',   // select field
  metraz: '',
  liczbaPokoi: '',
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
    <div className="nieruchomosciContainer">
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
      <form className="nieruchomosciForm">
        <div className="coChceszZrobic">
          CO CHCESZ SPRZEDAĆ?
        </div>
        <div className="coChceszZrobicButtons">
          <button type="button" className = "mieszkanieButton" name="wybierzNieruchomosc" onClick={() => {
            showKontaktModal();
            setFormData({ ...formData, typ: "Mieszkanie" })
          }}><ApartmentIcon sx={{
      fontSize: 40,
      color: "white",
      transition: "all 0.3s ease",
      ".mieszkanieButton:hover &": {
        color: "black",
        
      },
    }} />Mieszkanie</button>
          <button type="button" className="domButton" name="wybierzNieruchomosc" onClick={() => {
            showKontaktModal();
            setFormData({ ...formData, typ: "Dom" })
          }}><HouseIcon sx={{
      fontSize: 40,
      color: "white",
      transition: "all 0.3s ease",
      ".domButton:hover &": {
        color: "black",

      },
    }} />Dom</button>
          <button type="button" className="dzialkaButton" name="wybierzNieruchomosc" onClick={() => {
            showKontaktModal();
            setFormData({ ...formData, typ: "Działka" })
          }}><DeckIcon sx={{
      fontSize: 40,
      color: "white",
      transition: "all 0.3s ease",
      ".dzialkaButton:hover &": {
        color: "black",

      },
    }} /> Działka</button>
        </div>
        
        <div ref={kontaktRef} className={`kontaktModal ${isShownKontakt ? "show" : ""}`}>
        <button type = "button" className="dalej" onClick={() => setShownMetraz(true)}>Dalej</button>
        <div className="kontaktZTobaText">
          <PersonAddIcon style={{fontSize:50, color:"black"}}/>
          DAJ KONTAKT DO SIEBIE!
        </div>
        <div className="kontaktZTobaInput">
          <input type="text" name="imie"  className ="imie" value={formData.imie} onChange={handleChange} placeholder="Imię" />
          <input type="number" name="numer" className ="telefon" value={formData.numer} onChange={handleChange} placeholder="Numer telefonu" />
          <input type="email" name="email" className ="email" value={formData.email} onChange={handleChange} placeholder="E-mail" />
          <select required
          name="dodanePrzez"
          value={formData.dodanePrzez}
          onChange={handleChange}
          >
            <option value="Wybierz">Dodane przez *</option>
            <option value="Osoba prywatna">Osoba prywatna</option>
            <option value="Firma">Firma</option>
            <option value="Deweloper">Deweloper</option>
          </select>
        </div>
        </div>
        <div ref={metrazRef} className={`metrazModalContainer ${isShownMetraz ? "show" : ""}`}>
          <button className="dalej2"  type = "button"onClick={showPhotosModal}>Dalej</button>
          <div className="metrazModalText">
          <TuneIcon style={{fontSize:50, color:"black"}}/>
          <h1>GŁÓWNE INFORMACJE</h1>
        </div>
        <div className= "metrazModal" >
          <input type="number" name="metraz" className="metraz" placeholder="Metraż (m2)" value={formData.metraz} onChange={handleChange} />
          <input type="number" name="liczbaPokoi" className="liczbapokoi" placeholder="Liczba pokoi" value={formData.liczbaPokoi} onChange={handleChange} />
        </div>
        </div>

        <div ref={photosRef} className={`photosModalContainer ${isShownPhotos ? "show" : ""}`}>
          <button type="button" className="dalej3" onClick={showTytulModal}>Dalej</button>
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

        <div ref={tytulRef} className={`tytulModal ${isShownTytul ? "show" : ""}`}>
          <button type="button" className="dalej4" onClick={showCenaModal}>Dalej</button>
          <div className="tytulModalText">
            <FormatColorTextIcon style={{fontSize:50, color:"black"}}/>
            <h1>TYTUŁ I OPIS</h1>
          </div>
          <div className="tytulModalContent">
            <input type="text" name="tytul" className="tytul" placeholder="Tytuł*" value={formData.tytul} onChange={handleChange} /> 
            <input type="text" name="opis" className="tytul" placeholder="Opis" value={formData.opis} onChange={handleChange} />
          </div>

           
        </div>
        <div ref={cenaRef} className={`cenaModal ${isShownCena ? "show" : ""}`}>
          <div className="cenaModalText">
            <AttachMoneyIcon style={{fontSize:50, color:"black"}}/>
            <h1>CENA</h1>
          </div>
          <div className="cenaModalContent">
            <input type="number" name="cena" className="cena" placeholder="Cena*" value={formData.cena} onChange={handleChange} />
          </div>
        </div>
        <div className="dodajModal">
          <button type="submit" onClick={handleSubmit} className="dodajOgłoszenie">Dodaj Ogłoszenie</button>
        </div>
      </form>
      
    </div>
  );
}
