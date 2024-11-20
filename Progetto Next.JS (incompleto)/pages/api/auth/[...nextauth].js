//utilizzo di Prisma come adapter
import { PrismaAdapter } from "@next-auth/prisma-adapter";
//provider per account google
import GoogleProvider from "next-auth/providers/google";
//provider per account normale
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import NextAuth from "next-auth";
import prisma from "@lib/prismadb";

//authOptions è l'oggetto che contiene tutte le opzioni di configuraizone per NextAuth
const authOptions = {
  //imposta Prisma come adapter
  adapter: PrismaAdapter(prisma),
  //definizione dei provider di autenticazione
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    //autenticazione tramite email e password
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  //definizione della pagina di login
  pages: {
    signIn: "/",
  },
  //abilitazione del debug solo in ambiente di sviluppo
  debug: process.env.NODE_ENV === "development",
  //definizione delle sessioni tramite jwt => dopo il login next crea e aggiunge il token ai cookie del browser
  session: {
    strategy: "jwt",
  },
  //chiave per firmare i token
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
