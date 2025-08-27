import { use } from "react";
import "./profileMenu.css"
import { useSession,signOut } from "next-auth/react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { IoSettings } from "react-icons/io5";
import LogoutIcon from '@mui/icons-material/Logout';


export default function ProfileMenu({onClick}) {
    const {data: session} = useSession();
    console.log("SESSION:", session);
    const router = useRouter();
  return (
    <div className="ProfileMenu">
      <div className="greetingContainer">
        {session && (
          <>
            <div className="greetingImage">
              <img src={session.user.image} alt="User Image" />
            </div>
            <div className="greetingText">
              <p className="greetingP">Witaj,<br/>{session.user.name}</p>
              
            </div>
          </>
        )}
      </div>
      <div className="spacer"></div>
      <div className="goToDodajOgloszenie">
        <button onClick={() => router.push('/dodajOferte')} className="goToDodajOgloszenieButton"><AddCircleIcon sx={{color: "white", fontSize: 25,transition: "all 0.3s ease",
      ".goToDodajOgloszenieButton:hover &": {
        color: "black",
        
      },}} /> Dodaj Ogłoszenie</button>
      </div>
      <div className="spacer"></div>
      <div className="mojeOgloszenia">
        <a href='/oferty'><GiHamburgerMenu style={{color : "#1d1d1b", fontSize:15}}/>Moje Ogłoszenia</a>
        <a href='/oferty'><IoSettings style={{color : "#1d1d1b", fontSize:15}}/>Ustawienia</a>
        <a href='/oferty'><LocalPostOfficeIcon style={{color : "#1d1d1b", fontSize:15}}/>Wiadomości</a>
      </div>
      <div className="spacer"></div>
      <div className="logoutContainer">
        <button className="logoutButton" onClick={() => signOut({ callbackUrl: '/' })}><LogoutIcon sx={{color: "white", fontSize: 25,transition: "all 0.3s ease",
      ".logoutButton:hover &": {
        color: "black",

      },}} />Wyloguj się</button>
      </div>
      {/* <div className="profileButtons">
        <button onClick={() => router.push('/oferty')} className="goToKup">Zobacz Ogłoszenia</button>
        <button onClick={() => router.push('/dodajOferte')} className="goToSprzedaj">Dodaj Ofertę</button>
      </div>
      {session && (
        <>
        <div className="infoModal">
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
        </div>
          <button
            className="LogoutModalButton"
            type="button"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Wyloguj się
          </button>

        </>
      )} */}
    </div>
  );
}
