import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("ایمیل معتبر وارد کنید"),
    password: z.string().min(5, "رمز عبور باید حداقل 5 کاراکتر باشد"),
});

export type ILoginForm = z.infer<typeof loginSchema>;