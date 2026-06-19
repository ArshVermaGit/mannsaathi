import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Providers } from "./providers";
import SkipLink from "@/components/ui/SkipLink";
import { LanguageModal } from "@/components/ui/LanguageModal";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&family=Noto+Sans:wght@400;500;600;700&family=Outfit:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-body antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers>
            <LanguageModal />
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
