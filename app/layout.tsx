import type { Metadata } from "next";
import { Noto_Naskh_Arabic as Noto, Alegreya } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AudioPlayer from "@/components/audioPlayer";
import { Toaster } from "@/components/ui/toaster";

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
          <div>
            {children}
            <div className="fixed left-0 right-0 bottom-0 backdrop-blur var(-background/30) z-50">
              <AudioPlayer />
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
