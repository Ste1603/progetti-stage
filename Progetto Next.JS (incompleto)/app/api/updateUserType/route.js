import { NextResponse } from "next/server";
import prisma from "@lib/prismadb";

export async function POST(req) {
  try {
    const { userId, userType, provincia } = await req.json();

    // Validazione degli input
    if (!userId || !userType) {
      console.error({
        error: "Missing user ID or user type",
      });
      return;
    }

    // Verifica se l'utente esiste e include gli account associati
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { accounts: true }, // Includi gli account associati
    });

    // Se l'utente non esiste o non ha account associati
    if (!user) {
      console.error({
        error: "Utente non trovato",
      })
    }

    if (user.accounts.length === 0) {
      console.error({
        error: "Nessun account è associato a questo utente",
      })
    }

    // Aggiorna il tipo di utente
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { userType, provincia },
    });

    // Aggiorna tutti gli account associati con lo stesso userType
    const updatedAccounts = await Promise.all(
      user.accounts.map((account) =>
        prisma.account.update({
          where: { id: account.id }, // Aggiorna l'account
          data: { userType, provincia },
        })
      )
    );

    // Restituisci l'utente aggiornato insieme agli account aggiornati
    return NextResponse.json({
      user: updatedUser,
      accounts: updatedAccounts,
    });
  } catch (err) {
    // Gestione degli errori generici
    console.error("Errore nel processo di aggiornamento:", err);
    return NextResponse.json({ error: "Internal server error" });
  }
}
