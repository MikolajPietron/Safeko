'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import "./ofertadetails.css";
import { MdMarkEmailUnread } from "react-icons/md";
import { BsFillTelephoneForwardFill } from "react-icons/bs";

import UserIcon from '@mui/icons-material/Person';
export default function OfertaDetailsPage() {
  const { id } = useParams();
  const [oferta, setOferta] = useState(null);
  const {data: session} = useSession();
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);
  
  
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
  function toggleProfileMenu() {
    setIsShowProfileMenu(prev => !prev);
  }

  if (!oferta) return <p>Ładowanie...</p>;

  return (
    <div className='ofertaDetailsContainer'>
      <div className="header">
        <div className="headerText">
          <a href="Kontakt">Kontakt</a>
          <a href="O-nas">O nas</a>
        </div>
        <img src= "/default_logo.svg" className="LogoIcon"/>
        
        
        {session?.user ? (
          <>
          <button className="UserProfileButton" onClick={toggleProfileMenu}>
            <img
              src={session.user.image}
              alt={session.user.name}
              className="UserProfileImage"
            />
          </button>
            
          </>
        ) : (
          <UserIcon style={{ fontSize: 50, color: 'Black' }} className="UserIcon" />
        )}
      </div>
      
          
          <div className='photosContainer'>
            <img
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${oferta.imageKey}`}
              alt={oferta.tytul}
              
            />
            {oferta.kategoria === 'bizuteria' && (
              <img
                src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${oferta.imageKey}`}
                alt={oferta.tytul}
                className='bizuteriaFoto'
              />
            )}
          </div>
          <div className='photosContainerText'>
            <h2 className='tytulOfertaDetails'>{oferta.tytul}</h2>
            <p className='cenaOfertaDetails'>{oferta.cena} zł</p>
          </div>
          <div className='descriptionContainer'>
            <div className='descriptionContainerImg'>
              <img
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${oferta.imageKey}`}
              alt={oferta.tytul}
              
            />
            </div>
            <div className='descriptionContainerText'>
              <h1 className='descriptionContainerh1'>Najważniejsze Informacje</h1>
              <div className='descriptionContainerTextContent'>
                {oferta.kategoria === 'nieruchomosc' && (
                  <>
                    <p className='ofertaDetailsMetraz'>Metraż : {oferta.metraz} m²</p>
                    <p className='ofertaDetailsLiczbaPokoi'>Liczba pokoi : {oferta.liczbaPokoi}</p>
                  </>
                )}
                {oferta.kategoria === 'samochod' && (
                  <>
                  <p className='ofertaDetailsPrzebieg'>{oferta.przebieg} przejechanych kilometrów</p>
                  <p className='ofertaDetailsPojemnosc'>{oferta.pojemnosc} cm3 pojemności silnika</p>
                  <p className='ofertaDetailsMoc'>{oferta.moc} koni mechanicznych</p>
                  <p className='ofertaDetailsRok'>Rok produkcji : {oferta.rok}</p>
                  <p className='ofertaDetailsPaliwo'>{oferta.paliwo}</p>
                  </>
                  
                )}
                {oferta.kategoria === 'bizuteria' && (
                  <>
                  <p className='ofertaDetailsMaterial'>Materiał : {oferta.material}</p>
                  <p className='ofertaDetailsProba'>Próba: {oferta.proba}</p>
                  <p className='ofertaDetailsRozmiar'>Rozmiar : {oferta.rozmiar}</p>
                  <p className='ofertaDetailsWaga'>Waga : {oferta.waga} g</p>
                  </>
                )}
              </div>
              
            </div>
            
          </div>
          <div className='lokalizacjaOfertyDetailsContainer'>
            <div className='lokalizacjaContainerImg'>
              <img
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${oferta.imageKey}`}
              alt={oferta.tytul}
              
            />
            <div className='lokalizacjaContainerText'>
              <div className='lokalizacjah1'>
                <h1>Lokalizacja</h1>
              </div>
              
              <div className='lokalizacjaContainerTextContent'>
                  <p className='lokalizacjaPanstwo'>Polska</p>
                  <p className='lokalizacjaWojewodztwo'>Lubelskie</p>
                  <p className='lokalizacjaMiasto'>Lublin, Wojenna 1</p>
              </div>
              <div className='lokalizacjaButtonContainer'>
                <button type='button' className='lokalizacjaButton'>Zobacz na mapie</button>
              </div>
              
            </div>
            </div>
            <div className='kontaktOfertyDetails'>
              <div className='kontaktOfertyDetailsOpisContainer'>
                <div className='kontaktOfertyDetailsOpis'>
                  <h1>Opis</h1>
                </div>
                <div className='kontaktOfertyDetailsOpisContent'>
                  <p>{oferta.opis}</p>
                </div>
              </div>
              <div className='kontaktOfertyDetailsImg'>
                <img
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${oferta.imageKey}`}
              alt={oferta.tytul}
              
            />
              </div>
              
              
            </div>
            <div className='kontaktWithSellerContainer'>
              <h1>Kontakt z Sprzedawcą</h1>
              <div className='kontaktWithSeller'>
                <div className='kontaktWithSellerIcon'>
                  <FaUserCircle style={{ color: '#1d1d1b' , fontSize : 45}} />
                </div>
                <div className='kontaktWithSellerImie'>
                  <h1>{oferta.imie}</h1>
                  <p>{oferta.dodanePrzez}</p>

                </div>
                <div className='kontaktWithSellerEmailandPhone'>
                  <div className='kontaktWithSellerEmail'>
                    <MdMarkEmailUnread style={{ color: '#1d1d1b' , fontSize :25}} />
                    <p> {oferta.email}</p>
                  </div>
                  <div className='kontaktWithSellerPhone'>
                    <BsFillTelephoneForwardFill style={{ color: '#1d1d1b' , fontSize : 20}} />
                    <p> {oferta.numer}</p>
                  </div>
                  
                  
                </div>
                <div className='kontaktWithSellerButtonContainer'>
                  <button type='button' className='kontaktWithSellerButton'>Skontaktuj się</button>
                </div>
                
                
              </div>
                
              </div>
          </div>
          
            
            

        </div>
        


      
      
      
      
  );
}
