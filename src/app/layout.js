import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeModeScript } from "flowbite-react";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/Header";
import ThemeToggle from "@/app/_components/ThemeToggle";
import FooterCom from "@/app/_components/FooterCom";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Sahar-Blog",
    template: "Sahar-Blog | %s",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  description: "Personal blog about web development and technology",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6366f1", 
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <ThemeModeScript />
        </head>
        <body
          className={`${inter.variable} ${merriweather.variable} font-sans`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ThemeToggle>
              <Header />
              {children}
              <FooterCom />
            </ThemeToggle>
          </ThemeProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              className: "dark:bg-gray-800 dark:text-gray-100",
              style: {
                maxWidth: "500px",
              },
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
