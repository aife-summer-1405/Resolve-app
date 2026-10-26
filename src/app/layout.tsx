
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "@/src/providers/QueryProvider";
import ThemeProvider from "@/src/providers/ThemeProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
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
            dir="rtl"
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="flex min-h-full flex-col bg-background ">
                <ThemeProvider>
                    <QueryProvider>
                        {children}

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
