"use client";
import "./nieruchomosci.css";
import ApartmentIcon from '@mui/icons-material/Apartment';
import HouseIcon from '@mui/icons-material/House';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeckIcon from '@mui/icons-material/Deck';
import { useState } from "react";
import { set } from "mongoose";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TuneIcon from '@mui/icons-material/Tune';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function Nieruchomosci() {

  const [isShownKontakt, setShownKontakt] = useState(false);
  const [isShownMetraz, setShownMetraz] = useState(false);
  

  function showKontaktModal(){
    setShownKontakt(true);
  }
  function showMetrazModal(){
    setShownMetraz(true);
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
      <form className="nieruchomosciForm">
        <div className="coChceszZrobic">
          CO CHCESZ ZROBIĆ?
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
        <div className={`kontaktModal ${isShownKontakt ? "show" : ""}`}>
        <button type = "button" className="dalej" onClick={() => setShownMetraz(true)}>Dalej</button>
        <div className="kontaktZTobaText">
          <PersonAddIcon style={{fontSize:40, color:"white"}}/>
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
        <div className={`metrazModalContainer ${isShownMetraz ? "show" : ""}`}>
          <div className="metrazModalText">
          <TuneIcon style={{fontSize:40, color:"white"}}/>
          <h1>GŁÓWNE INFORMACJE</h1>
        </div>
        <div className= "metrazModal" >
          <input type="number" name="metraz" className="metraz" placeholder="Metraż (m2)" value={formData.metraz} onChange={handleChange} />
          <input type="number" name="liczbaPokoi" className="liczbapokoi" placeholder="Liczba pokoi" value={formData.liczbaPokoi} onChange={handleChange} />
        </div>
        </div>
        
        <div className="photosModalContainer">
          <div className="photosModalText">
          <AddAPhotoIcon style={{fontSize:40, color:"white"}}/>
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
        
        <div className="tytulModal">
          <div className="tytulModalText">
            <FormatColorTextIcon style={{fontSize:40, color:"white"}}/>
            <h1>TYTUŁ I OPIS</h1>
          </div>
          <div className="tytulModalContent">
            <input type="text" name="tytul" className="tytul" placeholder="Tytuł*" value={formData.tytul} onChange={handleChange} /> 
            <input type="text" name="opis" className="tytul" placeholder="Opis" value={formData.opis} onChange={handleChange} />
          </div>

           
        </div>
        <div className="cenaModal">
          <div className="cenaModalText">
            <AttachMoneyIcon style={{fontSize:40, color:"white"}}/>
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
      <div className="placeholder"></div>
    </div>
  );
}
