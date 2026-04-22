import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { defaultMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";
import { Providers } from "@/app/providers";
import { FloatingNav } from "@/components/nav/floating-nav";
import { Footer } from "@/components/nav/footer";
import { EasterEgg } from "@/components/blocks/easter-egg";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0e" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  sameAs: [siteConfig.socials.linkedin, siteConfig.socials.github],
  alumniOf: { "@type": "CollegeOrUniversity", name: "IIT Kanpur" },
  worksFor: { "@type": "Organization", name: "Atlassian" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <Providers>
          <FloatingNav />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
          <EasterEgg />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
