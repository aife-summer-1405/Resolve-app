
import { z } from "zod";

export const requestResetCodeSchema = z.object({
  email: z.email("ایمیل معتبر وارد کنید"),
});

export type IRequestResetCodeForm = z.infer<
  typeof requestResetCodeSchema
>;
