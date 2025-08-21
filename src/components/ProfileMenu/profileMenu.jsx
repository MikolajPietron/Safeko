import { use } from "react";
import "./profileMenu.css"
import { useSession,signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function ProfileMenu({onClick}) {
    const {data: session} = useSession();
    const router = useRouter();
  return (
    <div className="ProfileMenu">
      <div className="profileButtons">
        <button onClick={() => router.push('/oferty')} className="goToKup">Kup</button>
        <button onClick={() => router.push('/dodajOferte')} className="goToSprzedaj">Sprzedaj</button>
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
      )}
    </div>
  );
}
