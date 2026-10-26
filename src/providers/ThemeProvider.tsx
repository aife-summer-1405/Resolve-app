"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

interface IThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider = ({ children }: IThemeProviderProps) => {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
        >
            {children}
        </NextThemesProvider>
    );
};

export default ThemeProvider;