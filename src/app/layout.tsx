import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PT Pragata Makmur Persada — Kontraktor Infrastruktur Telekomunikasi",
    template: "%s | PT Pragata Makmur Persada",
  },
  description:
    "Kontraktor infrastruktur telekomunikasi: instalasi fiber optik, menara BTS, survey & design jaringan, dan managed services. Anggota GABPEKNAS dengan 5 subklasifikasi SBU.",
  keywords: [
    "kontraktor telekomunikasi",
    "instalasi fiber optik",
    "menara BTS",
    "jaringan telekomunikasi",
    "kontraktor Jakarta",
    "GABPEKNAS",
  ],
  authors: [{ name: "PT Pragata Makmur Persada" }],
  creator: "PT Pragata Makmur Persada",
  metadataBase: new URL("https://pragata.co.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://pragata.co.id",
    siteName: "PT Pragata Makmur Persada",
    title: "PT Pragata Makmur Persada — Kontraktor Infrastruktur Telekomunikasi",
    description:
      "Kontraktor infrastruktur telekomunikasi: instalasi fiber optik, menara BTS, survey & design jaringan, dan managed services. Anggota GABPEKNAS dengan 5 subklasifikasi SBU.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PT Pragata Makmur Persada — Kontraktor Infrastruktur Telekomunikasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Pragata Makmur Persada — Kontraktor Infrastruktur Telekomunikasi",
    description:
      "Kontraktor infrastruktur telekomunikasi: instalasi fiber optik, menara BTS, survey & design jaringan, dan managed services.",
    images: ["/images/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://pragata.co.id/#organization",
      name: "PT Pragata Makmur Persada",
      url: "https://pragata.co.id",
      logo: "https://pragata.co.id/images/Logo-pragata.jpg",
      description:
        "Kontraktor infrastruktur telekomunikasi: instalasi fiber optik, menara BTS, survey & design jaringan, dan managed services.",
      memberOf: {
        "@type": "Organization",
        name: "GABPEKNAS",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+62-21-0000-0000",
        contactType: "customer service",
        availableLanguage: ["Indonesian", "English"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://pragata.co.id/#localbusiness",
      name: "PT Pragata Makmur Persada",
      url: "https://pragata.co.id",
      image: "https://pragata.co.id/images/Logo-pragata.jpg",
      telephone: "+62-21-0000-0000",
      email: "info@pragata.co.id",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Epicentrum Walk Lt. 5, Suite South 529A, Jl. HR. Rasuna Said, Kuningan",
        addressLocality: "Jakarta Selatan",
        postalCode: "12940",
        addressCountry: "ID",
      },
      priceRange: "$$",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${sora.variable} ${plusJakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-navy font-sans antialiased selection:bg-cyan selection:text-white">
        {children}
      </body>
    </html>
  );
}
