"use client";
import React, { useState, useEffect } from "react";
import cn from "clsx";
import { useLoading } from "@app/contexts/LoadingContext";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import Plus from "@assets/plus.svg";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@app/contexts/UserContext";
import NotAutenticated from "@components/ui/NotAutenticated";

const Dashboard = () => {
  const { loading, setLoading } = useLoading();
  const router = useRouter();
  const currentUser = useCurrentUser();

  useEffect(() => {
    // Ripristina lo stato quando il componente si smonta
    return () => setLoading(false);
  }, []);

  // Funzione che viene chiamata quando un giorno è cliccato

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {currentUser ? (
        <div className="grid place-items-center text-blue-150">
          <p className="mb-[10px] flex h-[10vh] items-center p-2">
            Questa è la tua dashboard, puoi vedere le true prenotazioni nel
            calendario e premere su una di esse per vederne i detagli.
          </p>

          <div className="grid h-[calc(85vh-55px-6vh)] w-full place-items-center border border-red-600">
            calendario
          </div>

          <button
            className="button glass mt-[10px] flex h-[5vh] w-full items-center justify-center gap-2 rounded-2xl bg-orange font-bold text-blue-150"
            onClick={() => {
              router.push("/dashboard/prenota");
            }}
          >
            <Plus className="grid h-2/3 w-auto place-items-center" />
            Prenota un detailer
          </button>
        </div>
      ) : (
        <NotAutenticated />
      )}
    </>
  );
};

export default Dashboard;
