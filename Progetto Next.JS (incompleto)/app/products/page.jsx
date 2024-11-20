"use client"
import React from "react";
import { useLoading } from "@app/contexts/LoadingContext";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useEffect } from "react";
const Prodotti = () => {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    // Ripristina lo stato quando il componente si smonta
    return () => setLoading(false);
  }, []);

  // Funzione che viene chiamata quando un giorno è cliccato

  if (loading) {
    return <LoadingSpinner />;
  }
  return <div>Prodotti</div>;
};

export default Prodotti;
