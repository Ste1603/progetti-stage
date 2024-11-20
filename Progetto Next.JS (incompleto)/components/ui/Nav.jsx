"use client";
import cn from "clsx";
import { useState, useEffect } from "react";
import Star from "@components/ui/Icons/StarIcon";
import User from "@components/ui/Icons/UserIcon";
import LogoDesktop from "@assets/logoFull1.svg";
import Home from "@components/ui/Icons/HomeIcon.jsx";
import Bottle from "@components/ui/Icons/BottleIcon.jsx";
import useRegisterModal from "@hooks/useRegisterModal";
import { useCurrentUser } from "@app/contexts/UserContext";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useLoading } from "@app/contexts/LoadingContext";

const Nav = () => {
  const registerModal = useRegisterModal();
  const currentUser = useCurrentUser();
  const { loading } = useLoading();
  const [selectedIcon, setSelectedIcon] = useState("");

  useEffect(() => {
    // Carica l'icona selezionata da localStorage al montaggio del componente
    const storedIcon = localStorage.getItem("selectedIcon");
    if (storedIcon) {
      setSelectedIcon(storedIcon);
    }
  }, []);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    localStorage.setItem("selectedIcon", icon);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <nav
      className={cn(
        "flex_center fixed bottom-[20px] z-10 h-[50px] w-[calc(100%-10px)] max-w-lg rounded-2xl bg-blue-150",
        "md:top-[10px] md:h-[6vh] md:max-w-[calc(100%-20px)]",
      )}
    >
      {/*---- mobile icons ----*/}
      <div className={cn("flex_around h-full w-full p-1.5", "md:hidden")}>
        <a
          href="/"
          className="flex h-full w-auto flex-col items-center text-[0.6rem] text-white"
          onClick={() => {
            // Evita la navigazione predefinita
            handleIconClick("home");
          }}
        >
          <Home
            className={cn("h-full w-auto")}
            filled={selectedIcon === "home"}
          />
          Home
        </a>

        <a
          href="/dashboard"
          className="flex h-full w-auto flex-col items-center text-[0.6rem] text-white"
          onClick={() => {
            handleIconClick("dashboard");
          }}
        >
          <Star
            className={cn("h-full w-auto")}
            filled={selectedIcon === "dashboard"}
          />
          Dashboard
        </a>

        <a
          href="/products"
          className="flex h-full w-auto flex-col items-center text-[0.6rem] text-white"
          onClick={() => {
            handleIconClick("products");
          }}
        >
          <Bottle
            className={cn("h-full w-auto")}
            filled={selectedIcon === "products"}
          />
          Prodotti
        </a>

        <a
          href="/profile"
          className="relative flex h-full w-auto flex-col items-center text-[0.6rem] text-white"
          onClick={() => {
            handleIconClick("profile");
          }}
        >
          {currentUser && currentUser.ready === false && (
              <div className="absolute right-1/4 top-0 h-[10px] w-[10px] rounded-full bg-red-600"></div>
          )}
          <User
            className={cn("h-full w-auto")}
            filled={selectedIcon === "profile"}
          />
          {currentUser ? currentUser.name : "Accedi"}
        </a>
      </div>

      {/*---- desktop icons ----*/}
      <div
        className={cn(
          "relative hidden h-full w-full justify-center p-4 text-white",
          "md:flex_between md:text-[1.1rem]",
          "lg:p-3 lg:text-[1rem]",
        )}
      >
        <a
          href="/"
          onClick={() => {
            handleIconClick("home");
          }}
        >
          <LogoDesktop
            className={cn("h-full min-h-[20px] w-auto", "lg:h-[30px]")}
          />
        </a>
        <a
          href="/dashboard"
          className={selectedIcon === "dashboard" ? "border-b" : ""}
          onClick={() => {
            handleIconClick("dashboard");
          }}
        >
          Dashboard
        </a>
        <a
          href="/products"
          className={selectedIcon === "products" ? "border-b" : ""}
          onClick={() => {
            handleIconClick("products");
          }}
        >
          Prodotti
        </a>

        {currentUser ? (
          <a
            className={cn(
              "flex h-full w-auto items-center justify-center gap-2 text-nowrap rounded-2xl bg-[#6096ba] px-2 py-1 text-[0.8rem] text-white",
              {
                border: selectedIcon === "profile",
              },
            )}
            href="/profile"
            onClick={() => {
              handleIconClick("profile");
            }}
          >
            <User className="h-full w-auto" id="fixedElement" />
            {currentUser.name}
          </a>
        ) : (
          <button
            onClick={registerModal.onOpen}
            type="button"
            className="glass h-full min-h-[30px] rounded bg-orange px-4 font-bold text-black"
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
