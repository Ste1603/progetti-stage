import { NextResponse } from "next/server";
import prisma from "@lib/prismadb";

export async function POST(req) {
  try {
    const { userId, description, services } = await req.json();

    // Validazione degli input
    if (!userId) {
      console.error({
        error: "Missing user ID or user type",
      });
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    // Crea i servizi e raccoglie le promesse
    const servicesPromises = services.map((service) => {
      return prisma.service.create({
        data: {
          type: service.type, // Mappa il tipo del servizio
          price: parseFloat(service.price), // Converte il prezzo in float
          userId: userId,
          bookings: {
            create: [], // Aggiungi qui eventuali prenotazioni se necessario
          },
        },
      });
    });

    // Attendi che tutte le promesse siano risolte
    const servicesDoc = await Promise.all(servicesPromises);

    console.log(servicesDoc);

    // Verifica se l'utente esiste
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Se l'utente non esiste
    if (!user) {
      console.error({
        error: "Utente non trovato",
      });
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Aggiorna l'utente e collega i nuovi servizi
    await prisma.user.update({
      where: { id: userId },
      data: {
        description: description,
        services: {
          connect: servicesDoc.map((service) => ({ id: service.id })),
        },
        ready: true
      },
    });

    // Ottieni l'utente aggiornato con i servizi
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { services: true }, // Includi i servizi aggiornati
    });
    console.log("updatedUser:", updatedUser);

    // Restituisci l'utente aggiornato
    return NextResponse.json({
      user: updatedUser,
    });
  } catch (err) {
    // Gestione degli errori generici
    console.error("Errore nel processo di aggiornamento:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
