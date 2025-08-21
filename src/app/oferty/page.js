'use client';
import './oferty.css';
import UserIcon from '@mui/icons-material/Person';
import ProfileMenu from '@/components/ProfileMenu/profileMenu';
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import FiltryMenu from '@/components/HamburgerFiltry/Filtry';
import { useRouter } from 'next/navigation';

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
      <div className={`profileMenu ${isShowProfileMenu ? 'show' : ''}`}>
              <ProfileMenu />
            </div>
      <div className="header">
        {session && (
          <button className="UserProfileButton" onClick={toggleProfileMenu}>
            <img
              src={session.user.image}
              alt={session.user.name}
              className="UserProfileImage"
            />
          </button>
        )}
        <img src="Safeko-header-logo.png" className="header-logo" />
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

      

      <div className="Wyszukiwarka">
        <FiltryMenu setSelectedCategory={setSelectedCategory} />
      </div>

      <div className="OfertyList">
        {ofertyList
          .filter(oferta => !selectedCategory || oferta.kategoria === selectedCategory)
          .map(oferta => (
            <div key={oferta._id} className="OfertaItem">
              <img
                src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${oferta.imageKey}`}
                className="OfertaPhoto1"
              />
              <div className="detailsContainer">
                <h3 className="nazwa1">{oferta.tytul}</h3>
                <p className="cena1">{oferta.cena} Zł</p>
                <button className="kup">Dodaj do koszyka</button>
                <span
                  className="szczegolyOferty"
                  onClick={() => router.push(`/ofertadetails/${oferta._id}`)}
                >
                  Szczegóły &rsaquo;
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
