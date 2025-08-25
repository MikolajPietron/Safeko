'use client';
import './oferty.css';

import { FaUser, FaUserCircle } from "react-icons/fa";
import UserIcon from '@mui/icons-material/Person';
import ProfileMenu from '@/components/ProfileMenu/profileMenu';
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import FiltryMenu from '@/components/HamburgerFiltry/Filtry';
import { useRouter } from 'next/navigation';
import { MdMarkEmailUnread } from "react-icons/md";
import { BsFillTelephoneForwardFill } from "react-icons/bs";


export default function Oferty() {
  const router = useRouter();
  const { data: session } = useSession();

  const [ofertyList, setOfertyList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);
  function toggleProfileMenu() {
    setIsShowProfileMenu(prev => !prev);
  }

  // GET — fetch offers from API
  useEffect(() => {
  async function fetchOfertyAndSamochody() {
    try {
      const [ofertaRes, samochodRes, bizuteriaRes] = await Promise.all([
        fetch('/api/oferta'),
        fetch('/api/samochod'),
        fetch('/api/bizuteria')
      ]);

      const [ofertaData, samochodData, bizuteriaData] = await Promise.all([
        ofertaRes.json(),
        samochodRes.json(),
        bizuteriaRes.json()
      ]);

      // Optionally, add a category field to distinguish them
      const ofertaWithCategory = ofertaData.map(item => ({ ...item, kategoria: 'nieruchomość' }));
      const samochodWithCategory = samochodData.map(item => ({ ...item, kategoria: 'samochód' }));
      const bizuteriaWithCategory = bizuteriaData.map(item => ({ ...item, kategoria: 'bizuteria' }));

      setOfertyList([...ofertaWithCategory, ...samochodWithCategory, ...bizuteriaWithCategory]);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  fetchOfertyAndSamochody();
}, []);


  return (
    <div className="OfertyPageContainer">
      
      <div className="headerOferty">
        {session && (
          <button className="UserProfileButton" onClick={toggleProfileMenu}>
            <img
              src={session.user.image}
              alt={session.user.name}
              className="UserProfileImage"
            />
          </button>
        )}
        <img src="default_logo.svg" className="header-logo" />
        {session?.user ? (
          <>
            
          </>
        ) : (
          <UserIcon style={{ fontSize: 50, color: 'Black' }} className="UserIcon" />
        )}
        {session ? (
        <button className="dodajOferte" onClick={() => router.push('/dodajOferte')}>
          + Dodaj Ofertę
        </button>
      ) : (
        <button className="dodajOferte" onClick={() => signIn()}>
          + Dodaj Ofertę
        </button>
      )}
      </div>
      <div className={`profileMenu ${isShowProfileMenu ? 'show' : ''}`}>
              <ProfileMenu />
      </div>

      

      <div className="Wyszukiwarka">
        <FiltryMenu setSelectedCategory={setSelectedCategory} />
      </div>

      <div className="OfertyList">
        {ofertyList
          .filter(oferta => !selectedCategory || oferta.kategoria === selectedCategory)
          .map(oferta => (
            <div key={oferta._id} className="OfertaItem">
              <div className='imageContainerOferty'>

              <img
                src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${oferta.imageKey}`}
                className="OfertaPhoto1"
              />
              </div>
              <div className='detailsContainer'>
                <h3 className="nazwa1">{oferta.tytul}</h3>
                <div className='detailsUnderNazwa'>
                  {oferta.kategoria === 'nieruchomość' && (
                  <>
                    <p>{oferta.metraz} m²</p>
                    <p>{oferta.liczbaPokoi} Pokoi</p>
                  </>
                )}
                {oferta.kategoria === 'samochód' && (
                  <>
                  
                  <p>{oferta.przebieg} km</p>
                  <p>{oferta.moc} KM</p>
                  <p>{oferta.rok} </p>
                  <p>{oferta.paliwo}</p>
                  </>
                )}
                {oferta.kategoria === 'bizuteria' && (
                  <>
                    <p>{oferta.material}</p>
                    <p>{oferta.waga} g</p>
                    <p>{oferta.proba}</p>
                  </>
                )}
                </div>
                
                <p className="cena1">{oferta.cena} Zł</p>
                <button className="kup">Dodaj do koszyka</button>
                <span
                  className="szczegolyOferty"
                  onClick={() => router.push(`/ofertadetails/${oferta._id}`)}
                >
                  Szczegóły &rsaquo;
                </span>
                <div className='lokalizacjaContainer'>

                  <h1>Lokalizacja</h1>
                  <p>Polska</p>
                  <p>Lublin, Lubelskie</p>
                  <p>Wojenna 1/14 20-424</p>
                </div>
                {/* <div className='detailsdetailsContainer'>
  {oferta.kategoria === 'nieruchomość' && (
    <>
      <p>Metraż: {oferta.metraz} m²</p>
      <p>Pokoje: {oferta.liczbaPokoi}</p>
    </>
  )}

  {oferta.kategoria === 'samochód' && (
    <>
      <p>Pojemność: {oferta.pojemnosc} cm³</p>
      <p>Moc: {oferta.moc} KM</p>
      <p>Przebieg: {oferta.przebieg} km</p>
    </>
  )}

  {oferta.kategoria === 'bizuteria' && (
    <>
      <p>Rodzaj: {oferta.rodzaj}</p>
      <p>Waga: {oferta.waga} g</p>
    </>
  )}
</div> */}

              </div>
              <div className='sellerContainer'>
                <div className='sellerIconContainer'>
                  <FaUserCircle style={{ color: '#1d1d1b' , fontSize : 50}} />
                </div>
                <div className='sellerDetails'>

                  <div className='sellerImie'>
                    <h1>{oferta.imie}</h1>
                  </div>
                  <div className='sellerInfo'>
                    <p>{oferta.dodanePrzez}</p>
                  </div>
                  <div className='sellerDane'>
                    <div className='sellerEmail'>
                      <MdMarkEmailUnread style={{color : '#1d1d1b', fontSize: 20}}/>
                      <p>{oferta.email}</p>
                      
                    

                    </div>
                    <div className='sellerTelefon'>
                      <BsFillTelephoneForwardFill style={{color : '#1d1d1b', fontSize: 18}}/>
                      <p>{oferta.numer}</p>
                      
                      

                    </div>
                    
                  </div>
                </div>
                <div className='kontaktSellerButton'>
                  <button className='sellerContactButton' type='button'>Skontaktuj się</button>
                </div>

              </div>
              
            </div>
          ))}
      </div>
    </div>
  );
}
