'use client';

import "./page.css";
import ProfileMenu from "@/components/ProfileMenu/profileMenu";
import UserIcon from '@mui/icons-material/Person';
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSession, signOut } from "next-auth/react";


export default function Home() {
  
  const router = useRouter();
  const { data: session } = useSession();
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);
  function toggleProfileMenu() {
    setIsShowProfileMenu(prev => !prev);
  }
  const goToOffers = () =>{
    router.push("/oferty");
  }
  const goToLogin = () =>{
    router.push("api/auth/signin");
  }
  return (
    <div className="PageContainer">
      <div className={`profileMenu ${isShowProfileMenu ? 'show' : ''}`}>
        <ProfileMenu />
      </div>
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
      <div className="WaveElement">
        <img src="/WaveElement2.svg" alt="Wave" className="waveElement" />
      </div>
      <div className="MainPageText">Get ready for<br/>new marketplace<br/>experience_</div>
      

      <div className="SafekoLogo">
      

       
      </div>
      
      <div className="ButtonsContainer">
        {/* <div className="LoginContainer">
          <KeyboardDoubleArrowRightIcon style={{fontSize:50,color:"white"}}/>
          
        </div> */}
        <button onClick ={goToOffers} className="OffersButton">Zobacz oferty</button>
        <button onClick = {goToLogin} className="LoginButton">Zaloguj się</button>
        {/* <button className="GroupsButton">Grupy</button> */}
        {/* <div className="OffersContainer">
          <KeyboardDoubleArrowRightIcon style={{fontSize:50,color:"white"}}/>
          
        </div> */}
        
        {/* <div className="GroupsContainer">
          <KeyboardDoubleArrowRightIcon style={{fontSize:50,color:"white"}}/>
          
        </div> */}
        
      </div>
      <div className="bottomImages">
        <div className="samochodyContainer">
          <div className="samochodyImageContainer">
          <img src="/carImage.png" alt="Samochody" className="carImage"/>
        </div>
        <button className="samochodyButton" onClick={goToOffers}>Samochody</button>
        </div>
        <div className="nieruchomosciContainer">
          <div className="nieruchomosciImageContainer">
            <img src="/houseImage.png" alt="Nieruchomości" className="houseImage"/>
          </div>
          <button className="nieruchomosciButton" onClick={goToOffers}>Nieruchomości</button>
        </div>
        <div className="bizuteriaContainer">
          <div className="bizuteriaImageContainer">
            <img src="/bizuteriaImage.png" alt="Biżuteria" className="bizuteriaImage"/>
          </div>
          <button className="bizuteriaButton" onClick={goToOffers}>Biżuteria</button>
        </div>
      </div>
    </div>
    
   
    

  );
}