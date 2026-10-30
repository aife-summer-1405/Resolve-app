import type { Metadata } from "next";
import localFont from "next/font/local";
import QueryProvider from "@/src/providers/QueryProvider";
import ThemeProvider from "@/src/providers/ThemeProvider";
import UserDataProvider from "@/src/providers/UserDataProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const vazirmatn = localFont({
    src: [
        { path: "../../public/fonts/Vazirmatn-Thin.ttf", weight: "100", style: "normal" },
        { path: "../../public/fonts/Vazirmatn-ExtraLight.ttf", weight: "200", style: "normal" },
        { path: "../../public/fonts/Vazirmatn-Light.ttf", weight: "300", style: "normal" },
        { path: "../../public/fonts/Vazirmatn-Regular.ttf", weight: "400", style: "normal" },
        { path: "../../public/fonts/Vazirmatn-Medium.ttf", weight: "500", style: "normal" },
        { path: "../../public/fonts/Vazirmatn-SemiBold.ttf", weight: "600", style: "normal" },
        { path: "../../public/fonts/Vazirmatn-Bold.ttf", weight: "700", style: "normal" },
        { path: "../../public/fonts/Vazirmatn-ExtraBold.ttf", weight: "800", style: "normal" },
        { path: "../../public/fonts/Vazirmatn-Black.ttf", weight: "900", style: "normal" },
    ],
    display: "swap",
    variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
    title: "سایت املاک",
    description: "رزرو و مشاهده اقامتگاه‌ها",
};

export default function RootLayout({
    children,
}: LayoutProps<"/">) {
    return (
        <html
            lang="fa"
            suppressHydrationWarning
            className={`${vazirmatn.variable} h-full antialiased`}
        >
            <body className="flex min-h-full flex-col bg-background">
                <ThemeProvider>
                    <QueryProvider>
                        <UserDataProvider>
                            {children}
                        </UserDataProvider>

                        <Toaster
                            position="top-center"
                            richColors
                            dir="rtl"
                            toastOptions={{
                                classNames: {
                                    toast: "text-right",
                                    title: "text-right",
                                    description: "text-right",
                                },
                            }}
                        />
                    </QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}