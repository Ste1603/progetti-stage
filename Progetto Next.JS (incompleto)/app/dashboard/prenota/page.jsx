"use client";
import React, { useEffect, useState } from "react";
import { useLoading } from "@app/contexts/LoadingContext";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@app/contexts/UserContext";
import DetailerBox from "@components/ui/DetailerBox";

const Prenota = () => {
  const { loading, setLoading } = useLoading();
  const currentUser = useCurrentUser();
  const router = useRouter();
  const [detailers, setDetailers] = useState(null);

  useEffect(() => {
    // Ripristina lo stato quando il componente si smonta
    return () => setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    const prov = currentUser?.provincia;

    if (!prov) {
      console.log("no prov");
      return;
    }

    const fetchDetailers = async () => {
      try {
        const response = await fetch(`/api/getDetailers?provincia=${prov}`);
        if (!response.ok) {
          throw new Error("Errore nel recuperare i detailer");
        }
        const data = await response.json();
        setDetailers(data); // Assicurati che 'data' sia un array

        console.log("data", data); // Salvi i detailers nello stato
      } catch (error) {
        console.error("Errore durante il fetch dei detailers:", error);
      }
    };

    fetchDetailers();
  }, [currentUser]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4">
      {detailers ? (
        detailers.map((detailer) => (
          <DetailerBox
            key={detailer.id} // Assicurati che 'detailer' abbia un ID unico
            name={detailer?.name}
            description={detailer?.description}
            services={detailer.services}
          />
        ))
      ) : (
        <p>No detailers found.</p> // Messaggio di fallback
      )}
    </div>
  );
};

export default Prenota;
