import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("ایمیل معتبر وارد کنید"),
});

export type IRegisterForm = z.infer<typeof registerSchema>;