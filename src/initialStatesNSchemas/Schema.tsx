import { z } from "zod";

// TODO add roles: z.array(z.string())
export const ClientSchema = z.object({
  client: z.string().min(1, { message: "Vänligen ange uppdragsgivaren" }),
  scope: z.string().min(1, { message: "Vänligen fyll arbets omfattningen" }),
  roles: z.array(z.string().min(1, { message: "Vänligen ange din yrkesbeteckning" })).min(1),
  assignmentDescription: z
    .string()
    .min(20, { message: "En beskrivning ska vara minst 20 tecken lång" }),
});

export const ConsultantSchema = z.object({
  lastName: z.string().min(1, { message: "Efternamn får inte vara tomt" }),
  firstName: z.string().min(1, { message: "Förnamn får inte vara tomt" }),
  role: z.string().min(1, { message: "Vänligen ange din yrkesbeteckning" }),
  yearsOfExperience: z
    .number()
    .positive({ message: "Värde måste vara större än 0" }),
  skillLevel: z.string().min(1, { message: "Värde måste vara större än 0" }),
  salesDescription: z
    .string()
    .min(20, { message: "En beskrivning ska vara minst 20 tecken lång" }),
});
