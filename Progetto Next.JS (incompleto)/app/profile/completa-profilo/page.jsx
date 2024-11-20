"use client";
import { useCurrentUser } from "@app/contexts/UserContext";
import { useEffect } from "react";
import { useLoading } from "@app/contexts/LoadingContext";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useForm } from "react-hook-form"; // Importa correttamente useForm
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // Importa Zod
import { PiSeat } from "react-icons/pi";
import { GiCarWheel } from "react-icons/gi";
import { AiOutlineSafety } from "react-icons/ai";
import "@styles/CheckStyle.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// Definisci gli schemi di validazione
const ServiceSchema = z.object({
  type: z.string().nonempty("Il nome è obbligatorio"),
  price: z.number().positive("Il prezzo deve essere maggiore di zero"),
});

const CompleteSchema = z.object({
  description: z
    .string()
    .min(30, "Sono necessari almeno 30 caratteri")
    .max(200, "È possibile inserire un massimo di 200 caratteri"),
  services: z.array(ServiceSchema).min(1, "Seleziona almeno un servizio"),
});

const CompletaProfilo = () => {
  const currentUser = useCurrentUser();
  const { loading, setLoading } = useLoading();
  const router = useRouter();
  useEffect(() => {
    return () => setLoading(false);
  }, [setLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors, // Aggiunto clearErrors per rimuovere l'errore quando si seleziona un checkbox
  } = useForm({
    resolver: zodResolver(CompleteSchema),
    mode: "onBlur",
    defaultValues: {
      description: "",
      services: [],
    },
  });

  const selectedServices = watch("services");

  const onSubmit = async (data) => {
    setLoading(true);
    const userId = currentUser.id;

    console.log(data);
    const response = await axios.post(`/api/completeAccount`, {
      userId: userId,
      description: data.description,
      services: data.services,
    });

    if (response.status === 200) {
      setLoading(false);
      console.log("Profilo completato");
    } else {
      console.error("Errore durante l'aggiornamento:", error);
    }
    router.refresh();
    router.push("/dashboard");
    router.refresh();
    toast.success("Profilo completato");  };

  const handleCheckboxChange = (e, serviceName) => {
    const value = serviceName;
    if (e.target.checked) {
      // Aggiungi un nuovo servizio con prezzo iniziale 0
      setValue("services", [...selectedServices, { type: value, price: 0 }]);
      clearErrors("services"); // Rimuovi l'errore se selezioni un servizio
    } else {
      // Rimuovi il servizio dall'array
      setValue(
        "services",
        selectedServices.filter((service) => service.type !== value),
      );
    }
  };

  const handlePriceChange = (type, price) => {
    const updatedServices = selectedServices.map((service) => {
      if (service.type === type) {
        return { ...service, price: parseFloat(price) || 0 };
      }
      return service;
    });
    setValue("services", updatedServices);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full p-2 text-base text-blue-150">
      <p className="text-lg font-bold">
        Completa il tuo profilo aggiungendo una tua breve descrizione, i servizi
        da te offerti e collega una carta.
      </p>
      <form
        className="mt-4 flex h-auto w-full flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="description">Descrizione</label>
        <textarea
          id="description"
          {...register("description")}
          placeholder="Inserisci una descrizione..."
          rows={5}
          className="mt-2 rounded-2xl bg-[#ecece7] p-2 text-black focus:outline-none"
        />

        {errors.description && (
          <p className="font-bold text-red-500">{errors.description.message}</p>
        )}

        <p className="mt-4">Seleziona i servizi che vuoi offrire</p>

        <label className="container flex">
          <input
            type="checkbox"
            value="completo"
            onChange={(e) => handleCheckboxChange(e, "completo")}
          />
          <div className="checkmark"></div>
          Completo (Lavaggio esterno + pulizia interna)
          <AiOutlineSafety size={25} />
        </label>

        {selectedServices.find((s) => s.type === "completo") && (
          <div className="relative mt-2 flex w-[150px] gap-2">
            <input
              type="number"
              placeholder="Prezzo"
              min="0"
              onChange={(e) => handlePriceChange("completo", e.target.value)}
              className="w-[150px] rounded-2xl bg-[#ecece7] p-2 text-black focus:outline-none"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2">€</span>
          </div>
        )}

        <label className="container mt-2 flex gap-2">
          <input
            type="checkbox"
            value="esterno"
            onChange={(e) => handleCheckboxChange(e, "esterno")}
          />
          <div className="checkmark"></div>
          Lavaggio esterno
          <GiCarWheel size={25} />
        </label>

        {selectedServices.find((s) => s.type === "esterno") && (
          <div className="relative mt-2 flex w-[150px] gap-2">
            <input
              type="number"
              placeholder="Prezzo"
              min="0"
              onChange={(e) => handlePriceChange("esterno", e.target.value)}
              className="w-[150px] rounded-2xl bg-[#ecece7] p-2 text-black focus:outline-none"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2">€</span>
          </div>
        )}

        <label className="container mt-2 flex gap-2">
          <input
            type="checkbox"
            value="interno"
            onChange={(e) => handleCheckboxChange(e, "interno")}
          />
          <div className="checkmark"></div>
          Pulizia interna
          <PiSeat className="relative h-full" size={25} />
        </label>

        {selectedServices.find((s) => s.type === "interno") && (
          <div className="relative mt-2 flex w-[150px] gap-2">
            <input
              type="number"
              placeholder="Prezzo"
              min="0"
              onChange={(e) => handlePriceChange("interno", e.target.value)}
              className="w-[150px] rounded-2xl bg-[#ecece7] p-2 text-black focus:outline-none"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2">€</span>
          </div>
        )}

        {errors.services && (
          <p className="font-bold text-red-500">{errors.services.message}</p>
        )}

        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-orange py-2 font-bold"
        >
          Invia
        </button>
      </form>
    </div>
  );
};

export default CompletaProfilo;
