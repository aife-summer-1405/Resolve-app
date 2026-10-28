"use client";

import { useState } from "react";
import RequestResetCode from "@/src/components/organisms/auth/RequestResetCode";
import VerifyResetCode from "@/src/components/organisms/auth/VerifyResetCode";
import ResetPassword from "@/src/components/organisms/auth/ResetPassword";

type IResetPasswordStep =
    | "request-resetcode"
    | "verifyreset-code"
    | "reset-password";

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<IResetPasswordStep>(
        "request-resetcode"
    );

    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <>
            {step === "request-resetcode" && (
                <RequestResetCode
                    onSuccess={(submittedEmail) => {
                        setEmail(submittedEmail);
                        setStep("verifyreset-code");
                    }}
                />
            )}


            {step === "verifyreset-code" && (
                <VerifyResetCode
                    email={email}
                    onBack={() => setStep("request-resetcode")}
                    onSuccess={(code) => {
                        setVerificationCode(code);
                        setStep("reset-password");
                    }
                    }
                />
            )}


            {step === "reset-password" && (
                <ResetPassword
                    email={email}
                    code={verificationCode}
                    onBack={() => setStep("verifyreset-code")}
                />
            )}
        </>
    );
}