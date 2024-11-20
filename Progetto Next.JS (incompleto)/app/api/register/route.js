import bcrypt from "bcrypt";
import prisma from "@lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { email, name, password, userType, provincia } = body;

    const userEmailAlreadyInUse = await prisma.user.findUnique({
      where: { email },
    });

    if (userEmailAlreadyInUse) {
      return NextResponse.json({
        error: "Email già in uso",
      });
    }

    // Password hash con bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        userType,
        provincia
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Errore del server" });
  }
}
