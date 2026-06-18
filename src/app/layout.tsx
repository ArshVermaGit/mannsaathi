import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Providers } from "./providers";
import SkipLink from "@/components/ui/SkipLink";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MannSaathi | Der Asli Bimari Hai. Hum Ilaaj Hai.",
  description: "A behavioral companion that understands human hesitation and transforms it into confident, timely health action.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "MannSaathi",
    description: "A behavioral companion that transforms hesitation into health action.",
    images: [{ url: "/logo.png", width: 800, height: 800, alt: "MannSaathi Logo" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MannSaathi",
    description: "A behavioral companion that transforms hesitation into health action.",
    images: ["/logo.png"],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${notoSans.variable} ${jetbrainsMono.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers>
            <SkipLink />
            <main id="main-content" className="flex-1 flex flex-col">
              {children}
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
