import type { Metadata } from "next";
import { Noto_Naskh_Arabic as Noto, Alegreya } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

// const noto = Noto({ subsets: ["arabic"] });
const alegreya = Alegreya({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Al Quran",
  icons: {
    icon: "logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={alegreya.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          // disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
