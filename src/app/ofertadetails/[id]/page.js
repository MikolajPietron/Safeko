'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import "./ofertadetails.css";
import { MdBedroomParent } from "react-icons/md";
import { GiResize } from "react-icons/gi";
import { GiHawkEmblem } from "react-icons/gi";
import { IoLogoModelS } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRoad } from "react-icons/fa";
import { SiGoogleearthengine } from "react-icons/si";
import { GiHorseHead } from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdAssistantPhoto } from "react-icons/md";
import { FaCarOn } from "react-icons/fa6";
import { GiJewelCrown } from "react-icons/gi";
import { FaFlag } from "react-icons/fa";
import { AiFillGold } from "react-icons/ai";
import { GiWeight } from "react-icons/gi";
import { GiBigDiamondRing } from "react-icons/gi";
import { GiGoldBar } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
export default function OfertaDetailsPage() {
  const { id } = useParams();
  const [oferta, setOferta] = useState(null);

  useEffect(() => {
    async function fetchOferta() {
      const res = await fetch(`/api/ofertadetails/${id}`);
      if (res.ok) {
        const data = await res.json();
        setOferta(data);
      }
    }
    fetchOferta();
  }, [id]);

  if (!oferta) return <p>Ładowanie...</p>;

  return (
    <div className='ofertaDetailsContainer'>
      <div className='ofertaDetailsInside '>
        <div className='photosandtytulcena'>
          
          <div className='photosContainer'>
            <img
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${oferta.imageKey}`}
              alt={oferta.tytul}
              
            />
          </div>
            <div className='tytulCena'>
              <div className='tytul'>
                <h1>{oferta.tytul}</h1>
              </div>
              <div className='cena'>
                <p>{oferta.cena} zł</p>
              </div>
              
            </div>
            <div className='saleContainer'>
              <div className='przezKogo'>
                <p>{oferta.dodanePrzez}</p>
              </div>
              <div className='imieOferty'>
                <FaUserTie style={{ fontSize: 30, color: '#000' }} />
                <h1>{oferta.imie}</h1>
              </div>
              <div className='kontaktOferty'>
                <FaPhoneAlt style={{ fontSize: 20, color: '#000' }} />
                <h2>{oferta.numer}</h2>
              </div>
              <div className='emailOferty'>
                <FaEnvelope style={{ fontSize: 15, color: '#000' }} />
                <h2>{oferta.email}</h2>
              </div>
              <div className='kontaktprzycisk'>
                <button className='kontaktButton' type='button'>Skontaktuj się</button>
              </div>
          </div>
            

        </div>
        <div className='ofertaDetailsSzczegoly'>
          <div className='szczegolyContainer'>

          
          <div className='szczegoly'>
            {oferta.kategoria === 'nieruchomosc' && (
        <>
          <div className='metraz'>
            <GiResize style={{ fontSize: 30, color: '#000' }} />
            <p>Metraż: {oferta.metraz} m²</p>
          </div>
          <div className='liczbaPokoi'>
            <MdBedroomParent style={{ fontSize: 35, color: '#000' }} />
            <p>Liczba pokoi: {oferta.liczbaPokoi}</p>
          </div>
        </>
      )}
          {oferta.kategoria === 'samochod' && (
        <>
        <div className='marka'>
          <GiHawkEmblem style={{ fontSize: 30, color: '#000' }} />
          <p>Marka: {oferta.marka}</p>
        </div>
        <div className='model'>
          <IoLogoModelS style={{ fontSize: 30, color: '#000' }} />
          <p>Model: {oferta.model}</p>
        </div>
        <div className='rok'>
          <FaCalendarAlt style={{ fontSize: 30, color: '#000' }} />
          <p>Rok: {oferta.rok}</p>
          </div>
          <div className='przebieg'>
          <FaRoad style={{ fontSize: 30, color: '#000' }} />
          <p>Przebieg: {oferta.przebieg} km</p>
          </div>
          <div className='pojemnosc'>
          <SiGoogleearthengine style={{ fontSize: 30, color: '#000' }} />
          <p>Pojemność: {oferta.pojemnosc} cm³</p>
          </div>
          <div className='moc'>
            <GiHorseHead style={{ fontSize: 30, color: '#000' }} />
          <p>Moc: {oferta.moc} KM</p>
          </div>
          <div className='paliwo'>
            <BsFillFuelPumpFill style={{ fontSize: 30, color: '#000' }} />
            <p>Paliwo: {oferta.paliwo}</p>
          </div>
          <div className='stan'>
            <MdAssistantPhoto style={{ fontSize: 30, color: '#000' }} />
            <p>Stan: {oferta.stan}</p>
          </div>
          <div className='typ'>
            <FaCarOn style={{ fontSize: 30, color: '#000' }} />
            <p>Typ: {oferta.pojazdTyp}</p>
          </div>
          
        </>
        
      )}
      {oferta.kategoria === 'bizuteria' && (
        <>
        <div className='rodzaj'>
            <GiJewelCrown style={{ fontSize: 30, color: '#000' }} />
          <p>Rodzaj: {oferta.rodzaj}</p>
        </div>
        <div className='stan'>
          <FaFlag style={{ fontSize: 30, color: '#000' }} />
          <p>Stan: {oferta.stan}</p>
        </div>
        <div className='rok'>
          <FaCalendarAlt style={{ fontSize: 30, color: '#000' }} />
          <p>Rok: {oferta.rok}</p>
        </div>
        <div className='proba'>
          <AiFillGold style={{ fontSize: 30, color: '#000' }} />
          <p>Próba: {oferta.proba}</p>
          </div>
          <div className='waga'>
            <GiWeight style={{ fontSize: 30, color: '#000' }} />
            <p>Waga: {oferta.waga} g</p>
          </div>
          <div className='rozmiar'>
            <GiBigDiamondRing style={{ fontSize: 30, color: '#000' }} />
            <p>Rozmiar: {oferta.rozmiar}</p>
          </div>
          <div className='material'>
            <GiGoldBar style={{ fontSize: 30, color: '#000' }} />
            <p>Materiał: {oferta.material}</p>
          </div>
          
        </>
      )}





          </div>
          </div>
          <div className='opisContainer'>
            <div className='opish2'>
              <h2>Opis</h2>
            </div>
            <div className='opis'>
              <p>{oferta.opis}</p>
            </div>
          </div>
      

      
      

      
      
      {/* <p>{oferta.opis}</p>
      <p>Dodane przez: {oferta.dodanePrzez}</p>
      <p>Kontakt: {oferta.imie} | {oferta.email} | {oferta.numer}</p> */}
        </div>
      


      
      
      
      </div>
      
      
    </div>
  );
}
