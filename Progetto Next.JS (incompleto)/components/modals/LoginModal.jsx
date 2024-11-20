"use client";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // Importa Zod
import useLoginModal from "@hooks/useLoginModal";
import useRegisterModal from "@hooks/useRegisterModal";
import Modal from "@components/modals/Modal";
import Heading from "@components/ui/Heading";
import Input from "@components/inputs/Input";
import toast from "react-hot-toast";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Button from "@components/ui/CustomButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Definisci lo schema Zod per la validazione
const LoginSchema = z.object({
  email: z.string().email("Inserisci un'email valida"),
  password: z.string().min(1, "Inserisci una password"),
});

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    registerModal.onOpen();
    loginModal.onClose();
  };

  // Integrazione di Zod con react-hook-form
  const {
    register,
    handleSubmit, //controlla che i dati inseriti rispettino lo schema
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema), // Usa Zod per la validazione
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Funzione per il submit
  const onSubmit = (data) => {
    console.log(data);
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Bentornato");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 p-6">
      <Heading text="Bentornato, effettua il login per continuare" />
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
          Non hai ancora un account? Creane uno
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)} // Usa la validazione prima del submit
      title="Bentornato su Detailr"
      body={bodyContent}
      actionLabel="Accedi"
      footer={footerContent}
    />
  );
};

export default LoginModal;
