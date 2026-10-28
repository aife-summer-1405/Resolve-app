
import { z } from "zod";

export const completeRegistrationSchema = z.object({
    phoneNumber: z
        .string()
        .trim()
        .min(1, "شماره تلفن را وارد کنید.")
        .regex(/^09\d{9}$/, "شماره تلفن معتبر نیست."),
    password: z
        .string()
        .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد."),
});

export type ICompleteRegistrationForm = z.infer<
    typeof completeRegistrationSchema
>;
