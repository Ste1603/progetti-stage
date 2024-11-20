import cn from "clsx";
import StarIcon from "@components/ui/StarFull";
import useRegisterModal from "@hooks/useRegisterModal";
import { useEffect } from "react";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useLoading } from "@app/contexts/LoadingContext";

const NotAutenticated = () => {
  const registerModal = useRegisterModal();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    // Ripristina lo stato quando il componente si smonta
    return () => setLoading(false);
  }, []);

  // Funzione che viene chiamata quando un giorno è cliccato

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div
      className={cn(
        "flex h-[calc(100vh-10px)] w-full flex-col items-center justify-center gap-10 rounded-2xl bg-blue-50 px-4 text-blue-150",
        "md:mt-[calc(6vh+10px)] md:h-[calc(100vh-6vh-30px)]",
      )}
    >
      <StarIcon
        className={cn(
          "absolute left-10 top-10 h-[10rem] opacity-15",
          "md:left-36 md:top-52",
        )}
        color="rgba(64,93,114,1)"
      />
      <StarIcon
        className={cn(
          "absolute bottom-10 right-10 h-[10rem] opacity-15",
          "md:bottom-52 md:right-36",
        )}
        color="rgba(64,93,114,1)"
      />
      <StarIcon
        className={cn("absolute right-24 top-52 h-[4rem] opacity-15")}
        color="rgba(64,93,114,1)"
      />
      <StarIcon
        className={cn("absolute bottom-52 left-24 h-[4rem] opacity-15")}
        color="rgba(64,93,114,1)"
      />
      <h1 className="text-center text-2xl">
        Non sei autenticato,
        <br /> effettua il login o registrati
      </h1>
      <button
        className={cn(
          "button glass rounded-2xl bg-orange px-8 py-1 text-black",
          "md:hidden",
        )}
        onClick={registerModal.onOpen}
      >
        Sign in
      </button>
    </div>
  );
};

export default NotAutenticated;
