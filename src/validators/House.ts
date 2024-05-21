import { z } from "zod";

export const createHouse = z.object({
  id: z.string().uuid(),
  adminId: z.string().uuid(),
  name: z
    .string()
    .min(2, { message: "minimum 2 characters are needed" })
    .max(30, { message: "max 30 characters" }),
  description: z
    .string()
    .min(12, { message: "minimum 12 characters are needed" })
    .max(255, { message: "max 30 characters" }),
});

export type houseType = z.infer<typeof createHouse>;
