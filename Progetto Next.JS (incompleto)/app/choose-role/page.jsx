"use client";
import { set, useForm } from "react-hook-form";
import RadioInput from "@components/inputs/RadioInput";
import axios from "axios";
import StarIcon from "@components/ui/StarFull";
import { useCurrentUser } from "@app/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import cn from "clsx";
import { useLoading } from "@app/contexts/LoadingContext";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import ComboboxDemo from "@components/ui/Combobox/combobox";
import provinceItaliane from "@lib/province";

const chooseRoleForm = () => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      userType: "user",
      provincia: "",
    },
  });

  useEffect(() => {
    if (currentUser?.userType) {
      router.push("/");
    }
  }, [currentUser?.userType]);

  const onSubmit = async (data) => {
    setLoading(true);
    const userId = currentUser.id;

    console.log(data);
    const response = await axios.post(`/api/updateUserType`, {
      userId: userId,
      userType: data.userType,
      provincia: data.provincia,
    });

    if (response.status === 200) {
      setLoading(false);
      console.log("UserType presente");
      console.log("UserType aggiornato con successo");
    } else {
      console.error("Errore durante l'aggiornamento:", error);
    }

    router.refresh();
    toast.success("Account creato con successo");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={cn(
        "relative flex h-[calc(100vh-10px)] w-full items-center justify-center rounded-2xl bg-blue-50 px-4 text-blue-150",
        "md:mt-[calc(6vh+10px)] md:h-[calc(100vh-30px-6vh)] md:px-[700px]",
      )}
    >
      {/* Stelle con z-index più basso */}
      <StarIcon className={cn("absolute left-10 top-10 h-[7rem] opacity-15", "md:top-72 md:left-72 z-10")} color="rgba(64,93,114,1)" />
      <StarIcon className={cn("absolute bottom-10 right-10 h-[7rem] opacity-15", "md:bottom-72 md:right-72 z-10")} color="rgba(64,93,114,1)"/>
      <StarIcon className={cn("absolute right-24 top-28 h-[4rem] opacity-15", "md:right-[600px] z-10")} color="rgba(64,93,114,1)"/>
      <StarIcon className={cn("absolute bottom-28 left-24 h-[4rem] opacity-15","md:left-[600px] z-10")} color="rgba(64,93,114,1)"/>
      
      {/* Contenitore del form con z-index più alto */}
      <div className="relative z-20 flex h-auto w-full flex-col gap-7 rounded-2xl bg-white p-4 items-center">
        <h1 className="text-xl font-bold">Completa la registrazione</h1>
        <h1>
          Scegli come registrare questo account, una volta registrato per
          cambiare questo valore sarà necessario contattare l'assistenza
        </h1>
        <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center gap-20">
            <RadioInput
              id="user"
              label="Utente"
              register={register}
              errors={errors}
            />
            <RadioInput
              id="detailer"
              label="Detailer"
              register={register}
              errors={errors}
            />
          </div>
          <h1>Imposta la tua provincia per una ricerca migliore</h1>
          <ComboboxDemo register={register} errors={errors} id="provincia" array={provinceItaliane} setValue={setValue} />
          <button
            className="glass w-full rounded-xl bg-orange py-1"
            type="submit"
          >
            Conferma
          </button>
        </form>
      </div>
    </div>
  );
};

export default chooseRoleForm;
