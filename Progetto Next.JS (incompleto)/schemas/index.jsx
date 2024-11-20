//zod è una libreria usata per la validazione di dati inseriti nei form
import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email è un campo obbligatorio" })  // Verifica che l'email non sia vuota
    .email({ message: "Email non valida" }),               // Verifica che il formato dell'email sia corretto
  password: z.string().min(1, { message: "Password è un campo obbligatorio" }),
});


export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email è un campo obbligatorio" })  
    .email({ message: "Email non valida" }),              
  password: z.string().min(6, { message: "La password deve essere composta da almeno 6 caratteri" }),
  name: z.string().min(1, { message: "Il nome è un campo obbligatorio" })
});
