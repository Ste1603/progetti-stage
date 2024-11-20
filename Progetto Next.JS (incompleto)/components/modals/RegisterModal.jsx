"use client";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // Importa Zod
import useRegisterModal from "@hooks/useRegisterModal";
import useLoginModal from "@hooks/useLoginModal";
import Modal from "@components/modals/Modal";
import Heading from "@components/ui/Heading";
import Input from "@components/inputs/Input";
import toast from "react-hot-toast";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Button from "@components/ui/CustomButton";
import RadioInput from "@components/inputs/RadioInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ComboboxDemo from "@components/ui/Combobox/combobox";
import provinceItaliane from "@lib/province";


// Definisci lo schema Zod per la validazione
const RegisterSchema = z.object({
  name: z.string().min(2, "Sono necessari almeno 2 caratteri"),
  email: z.string().email("Inserisci un'email valida"),
  password: z.string().min(6, "Sono necessari almeno 6 caratteri"),
  userType: z.enum(["user", "detailer"]).default("user"),
  provincia: z.string(),
});

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  // Integrazione di Zod con react-hook-form
  const {
    setValue,
    register,
    handleSubmit, //controlla che i dati inseriti rispettino lo schema
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema), // Usa Zod per la validazione
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      userType: "user",
      provincia:"",
    },
  });

  // Funzione per il submit
  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    // Prima invia i dati di registrazione
    const response = await axios.post("/api/register", data);

    if (response.data.error) {
      toast.error(response.data.error);
      setIsLoading(false);
      return;
    }

    toast.success("Account creato con successo");

    // Dopo la registrazione, prova a effettuare il login
    const signInResponse = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (signInResponse?.ok) {
      router.refresh(); // Aggiorna la pagina per mostrare l'interfaccia dell'utente registrato
      registerModal.onClose();
    } else {
      toast.error("Errore durante il login: " + signInResponse?.error);
    }

    setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 p-6">
      <Heading text="Crea il tuo account Dtailr" />
      {errors.name && (
        <p className="flex gap-2 text-red-600">
          <ExclamationTriangleIcon className="h-5 w-5" />
          {errors.name.message}
        </p>
      )}
      <Input
        id="name"
        label="Nome"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      {errors.email && (
        <p className="flex gap-2 text-red-600">
          <ExclamationTriangleIcon className="h-5 w-5" />
          {errors.email.message}
        </p>
      )}
      <Input
        id="email"
        label="Email"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      {errors.password && (
        <p className="flex gap-2 text-red-600">
          <ExclamationTriangleIcon className="h-5 w-5" />
          {errors.password.message}
        </p>
      )}
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <h1>Imposta la tua provincia per una ricerca migliore</h1>
      <ComboboxDemo register={register} errors={errors} id="provincia" array={provinceItaliane} setValue={setValue}/>
      
      <h1>
        Scegli come registrare questo account, una volta registrato per cambiare
        questo valore sarà necessario contattare l'assistenza
      </h1>
      <div className="mt-2 flex items-center justify-center gap-20">
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

      
    </div>
  );

  const footerContent = (
    <div className="flex w-full flex-col gap-6 p-6">
      <hr className="w-full" />
      <Button
        className="w-full"
        small={true}
        disabled={isLoading}
        label="Accedi con Google"
        onClick={() => signIn("google")}
        icon={FcGoogle}
      />
      <div className="w-full text-center hover:text-blue-600 hover:underline">
        <p className="cursor-pointer" onClick={handleClick}>
          Hai già un account?
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)} // Usa la validazione prima del submit
      title="Benvenuto su Detailr"
      body={bodyContent}
      actionLabel="Crea un account"
      footer={footerContent}
    />
  );
};

export default RegisterModal;
