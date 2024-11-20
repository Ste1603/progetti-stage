//permette di interagire con il db tramite le query
import { PrismaClient } from "@prisma/client";

//viene istanziata una nuova istanza di PrismaClient, con new PrismaClient(), oppure se ne esiste già una, (verificato con globalThis.prisma) viene utilizzata quella.
const client = globalThis.prisma || new PrismaClient();

//Se l'ambiente è quello di sviluppo l'istanza client di PrismaClient viene salvata nel contesto globale
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;