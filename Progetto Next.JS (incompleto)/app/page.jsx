"use client";
import cn from "clsx";
import Stat from "@components/ui/Stat";
import HomeSection from "@components/ui/HomeSection";

import StarIcon from "@components/ui/StarFull";
import keysImage from "@/public/images/keys.jpg";
import carImage from "@/public/images/car.jpg";
import productsImage from "@/public/images/products.webp";
import SeparationLine from "@components/ui/SeparationLine";
import LogoDesktop from "@assets/logoFull1.svg";
import Spray from "@assets/spray.svg";
import BucketWhite from "@assets/bucketWhite.svg";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useCurrentUser } from "@app/contexts/UserContext";
import { useEffect } from "react";
import { useLoading } from "@app/contexts/LoadingContext";

const Home = () => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const { loading, setLoading } = useLoading();

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
    <div className="flex max-w-[1500px] flex-col items-center">
      {/*----hero section----*/}
      <section
        className={cn(
          "relative mb-[10px] flex h-[55vh] w-full flex-col justify-between overflow-hidden rounded-2xl bg-grey p-5",
          "sm:h-[50vh] sm:p-10", // sm breakpoint
          "md:mt-[calc(6vh+10px)] md:h-[65vh] md:max-h-[504px]", // md breakpoint
        )}
      >
        <h1
          className={cn(
            "text-[2rem] font-extrabold leading-tight text-blue-150",
            "sm:text-[2.4rem]", // sm breakpoint
            "md:text-[3rem]", // md breakpoint
          )}
        >
          La tua auto come nuova con un click
        </h1>

        <div
          className={cn(
            "flex h-[30%] w-auto items-center gap-20",
            "md:text-base lg:gap-60 lg:text-xl", // md and lg breakpoints
          )}
        >
          <ul
            className={cn(
              "text-md relative list-none font-bold leading-loose text-blue-100",
              "sm:text-lg sm:leading-loose", // sm breakpoint
              "md:text-base md:leading-10", // md breakpoint
              "lg:text-xl lg:leading-loose", // lg breakpoint
            )}
          >
            <li>1. Scegli il tuo detailer</li>
            <li>2. Consegnagli le chiavi</li>
            <li>3. Ritira la tua auto pulita e profumata</li>
          </ul>

          <Stat />
        </div>

        <LogoDesktop
          className={cn(
            "absolute left-[100%] top-[75%] hidden w-[60%] translate-x-[-100%] opacity-40",
            "md:block", // md breakpoint
            "lg:w-[50%]", // lg breakpoint
          )}
        />

        <button
          className={cn(
            "btn glass w-[55%] bg-orange text-sm font-bold text-black",
            "sm:w-[50%] sm:text-lg", // sm breakpoint
            "md:w-[25%]", // md breakpoint
          )}
        >
          Scopri di più
        </button>
      </section>

      {/*----Sezione assumi----*/}
      {currentUser && currentUser.userType === "user" && (
        <>
          <SeparationLine color="bg-brown-75" />
          <HomeSection
            display="md:flex"
            text1="Vorresti dare una pulita alla tua auto ma non hai tempo per farlo?"
            text2="Trova un car detailer che lo faccia al posto tuo"
            colorText2="text-black"
            bgImage={keysImage}
            bgColor="bg-blue-50"
            btntext="Assumi un dtailr"
            btnColor="bg-orange"
            txtBtnColor="text-black"
            margin="mt-[10px] mb-[10px]"
            Icon={StarIcon}
            iconProps={cn(
              "absolute w-[60%] left-[-5%] top-[-10%] opacity-60",
              "md:w-[80%] md:top-[-15%] md:left-[-15%]", // md breakpoint
              "lg:w-[70%] lg:left-[-10%]", // lg breakpoint
            )}
          />
        </>
      )}

      {/*---Sezione diventa detailer---*/}
      {currentUser && currentUser.userType === "detailer" && (
        <>
          <SeparationLine color="bg-brown-75" />

          <HomeSection
            display="md:flex md:flex-row-reverse"
            text1="Ti piace riportare le auto a nuovo e vorresti guadagnare?"
            text2=" Registrati come dtailr e trova clienti"
            colorText2="text-blue-700"
            bgImage={carImage}
            btntext="Diventa un dtailr"
            btnColor="bg-blue-150"
            txtBtnColor="text-white"
            bgColor="bg-brown-75"
            margin="my-[10px]"
            Icon={BucketWhite}
            iconProps="right-0 -rotate-12"
          />
        </>
      )}

      {/*----Sezione assumi----*/}
      {!currentUser && (
        <>
          <HomeSection
            display="md:flex"
            text1="Vorresti dare una pulita alla tua auto ma non hai tempo per farlo?"
            text2="Trova un car detailer che lo faccia al posto tuo"
            colorText2="text-black"
            bgImage={keysImage}
            bgColor="bg-blue-50"
            btntext="Assumi un dtailr"
            btnColor="bg-orange"
            txtBtnColor="text-black"
            margin="mt-[10px] mb-[10px]"
            Icon={StarIcon}
            iconProps={cn(
              "absolute w-[60%] left-[-5%] top-[-10%] opacity-60",
              "md:w-[80%] md:top-[-15%] md:left-[-15%]", // md breakpoint
              "lg:w-[70%] lg:left-[-10%]", // lg breakpoint
            )}
          />

          <SeparationLine color="bg-brown-75" />

          {/*---Sezione diventa detailer---*/}
          <HomeSection
            display="md:flex md:flex-row-reverse"
            text1="Ti piace riportare le auto a nuovo e vorresti guadagnare?"
            text2=" Registrati come dtailr e trova clienti"
            colorText2="text-blue-700"
            bgImage={carImage}
            btntext="Diventa un dtailr"
            btnColor="bg-blue-150"
            txtBtnColor="text-white"
            bgColor="bg-brown-75"
            margin="my-[10px]"
            Icon={BucketWhite}
            iconProps="right-0 -rotate-12"
          />
        </>
      )}

      <SeparationLine color="bg-blue-50" />

      {/*---Sezione prodotti---*/}
      <HomeSection
        display="md:flex"
        text1="Sei un dtailr e cerchi i migliori prodotti per la tua passione?"
        text2="Dai un'occhiata alla sezione prodotti"
        colorText2="text-green-200"
        bgImage={productsImage}
        btntext="Prodotti"
        btnColor="bg-background"
        txtBtnColor="text-green-200"
        bgColor="bg-blue-75"
        margin="mt-[10px]"
        Icon={Spray}
        iconProps={cn(
          "absolute left-0 -rotate-12 opacity-60",
          "md:left-[60%]", // md breakpoint
        )}
      />
    </div>
  );
};

export default Home;
