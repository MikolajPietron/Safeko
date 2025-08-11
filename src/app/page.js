'use client';
import Image from "next/image";
import "./page.css";
import LightRays from '../components/Backgrounds/LightRays/LightRays';
import UserIcon from '@mui/icons-material/Person';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useRouter } from "next/navigation";
import Oferty from "./oferty/page";



export default function Home() {
  
  const router = useRouter();

  const goToOffers = () =>{
    router.push("/oferty");
  }
  return (
    <div className="PageContainer">
      <div className="MainPageText">Get ready for <br/> new marketplace <br/> experience_</div>
      <div className="header">
        <img src="Safeko-header-logo.png" className="header-logo"/>
        <UserIcon style = {{ fontSize : 50, color : "Black"}} className='UserIcon'/>
      </div>

      <div className="SafekoLogo">
      <img src= "/1.svg" className="LogoIcon"/>

       
      </div>
      <div style={{ width: '100%', height: '100%', position: 'relative'}}>
          <LightRays
            raysOrigin="bottom-center"
            raysColor="#ffffffff"
            raysSpeed={0.6}
            lightSpread={0.8}
            rayLength={0.6}
            followMouse={true}
            mouseInfluence={0.4}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
      />
      </div>
      <div className="ButtonsContainer">
        {/* <div className="LoginContainer">
          <KeyboardDoubleArrowRightIcon style={{fontSize:50,color:"white"}}/>
          
        </div> */}
        <button className="LoginButton">Zaloguj się</button>
        {/* <div className="OffersContainer">
          <KeyboardDoubleArrowRightIcon style={{fontSize:50,color:"white"}}/>
          
        </div> */}
        <button onClick ={goToOffers} className="OffersButton">Zobacz oferty</button>
        {/* <div className="GroupsContainer">
          <KeyboardDoubleArrowRightIcon style={{fontSize:50,color:"white"}}/>
          
        </div> */}
        <button className="GroupsButton">Grupy</button>
      </div>
    </div>
    
   
    

  );
}
