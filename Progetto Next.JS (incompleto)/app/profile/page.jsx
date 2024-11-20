"use client";
import useRegisterModal from "@hooks/useRegisterModal";
import { signOut } from "next-auth/react";
import User from "@components/ui/Icons/UserIcon";
import UserB from "@assets/user2.svg";
import Heart from "@assets/heart.svg";
import Receipt from "@assets/receipt.svg";
import Bell from "@assets/bell.svg";
import Lock from "@assets/lock.svg";
import Logout from "@assets/logout.svg";
import Arrow from "@assets/arrow.svg";
import cn from "clsx";
import { useCurrentUser } from "@app/contexts/UserContext";
import StarIcon from "@components/ui/StarFull";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useLoading } from "@app/contexts/LoadingContext";
import NotAutenticated from "@components/ui/NotAutenticated";

const ProfilePage = () => {
  const registerModal = useRegisterModal();
  const currentUser = useCurrentUser();
  const router = useRouter();
  const { loading, setLoading } = useLoading();
  // Inizializza a true

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.userType) {
        // Controlla se non sei già nella pagina choose-role
        router.push("/choose-role");
      } else {
        setLoading(false); // Imposta a false se l'utente è presente
      }
    } else {
      setLoading(false); // Ferma il caricamento se non c'è un utente
    }
  }, [currentUser, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {currentUser ? (
        <div
          className={cn(
            "flex h-[calc(100vh-10px)] w-full flex-col items-center justify-start space-y-2 rounded-2xl bg-blue-50 p-4 text-blue-150",
            "md:mt-[calc(6vh+10px)] md:h-[calc(100vh-6vh-30px)]",
            "md:items-start md:justify-normal md:rounded-2xl",
          )}
        >
          <div className="h-[50px] w-[50px] md:hidden">
            <User className="relative" filled />
          </div>
          <h1 className={cn("flex items-center gap-2 text-3xl", "md:hidden")}>
            {currentUser.name}
            {currentUser.userType === "detailer" && (
              <StarIcon color="#48cae4  " className="h-1/3" />
            )}
          </h1>
          <ul className={cn("mb-2 w-full space-y-2 text-xl")}>
            <hr className="w-full" />
            <li className="flex items-center justify-between md:justify-start">
              <div className="flex items-center gap-2">
                <UserB className="relative h-auto" />
                <a
                  href={
                    currentUser && currentUser.ready === false
                      ? "/profile/completa-profilo"
                      : "/profile/dettagli-profilo"
                  }
                  className="w-full"
                >
                  Dettagli profilo
                </a>
                {currentUser && currentUser.ready === false && (
                  <div className="relative h-[20px]">
                    <div className="absolute left-0 top-0 h-[10px] w-[10px] rounded-full bg-red-600"></div>
                  </div>
                )}
              </div>
              <Arrow className="relative h-auto md:ml-2" />
            </li>
            <hr className="w-full" />
            <li className="flex items-center justify-between md:justify-start">
              {currentUser.userType === "user" ? (
                <div className="flex items-center gap-2">
                  <Heart className="relative h-auto" />
                  <a href="">Detailer preferiti</a>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Receipt className="relative h-auto" />
                  <a>Storico clienti</a>
                </div>
              )}
              <Arrow className="relative h-auto md:ml-2" />
            </li>
            <hr className="w-full" />

            {currentUser.userType === "user" ? (
              <>
                <li className="flex items-center justify-between md:justify-start">
                  <div className="flex items-center gap-2">
                    <Receipt className="relative h-auto" />
                    <a href="">Storico ordini</a>
                  </div>
                  <Arrow className="relative h-auto md:ml-2" />
                </li>
                <hr className="w-full" />
              </>
            ) : null}
            <li className="flex items-center justify-between md:justify-start">
              <div className="flex items-center gap-2">
                <Bell className="relative h-auto" />
                <a href="">Notifiche</a>
              </div>
              <Arrow className="relative h-auto md:ml-2" />
            </li>
            <hr className="w-full" />
            <li className="flex items-center justify-between md:justify-start">
              <div className="flex items-center gap-2">
                <Lock className="relative h-auto" />
                <a href="">Privacy</a>
              </div>
              <Arrow className="relative h-auto md:ml-2" />
            </li>
          </ul>
          <hr className="mb-4 w-full" />
          <button
            onClick={() => signOut()}
            className="button mr-auto flex gap-2 rounded-2xl border-2 border-red-600 px-4 py-1 font-bold text-red-600"
          >
            <p>Log out</p>
            <Logout className="relative h-auto" />
          </button>
        </div>
      ) : (
        <NotAutenticated />
      )}
    </>
  );
};

export default ProfilePage;
