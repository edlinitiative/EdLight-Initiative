import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ZeffyInit from "@/components/ZeffyInit";
import Script from "next/script";
import { Inter } from "next/font/google";
import { getRoutes } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata = {
    title: "EdLight Initiative",
    description: "Empowering communities through education, technology, and light. Official website for EdLight Initiative.",
    keywords: "EdLight, Initiative, Education, Community, Technology, Light, Empowerment",
    author: "EdLight Initiative",
    metadataBase: new URL('https://www.edlinitiative.org'),
    openGraph: {
        title: "EdLight Initiative",
        description: "Empowering communities through education, technology, and light.",
        type: "website",
        locale: "en_US",
        siteName: 'EdLight Initiative',
        url: 'https://www.edlinitiative.org',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'EdLight Initiative',
        description: 'Empowering communities through education, technology, and light.',
    }
};

export const viewport = {
    width: "device-width",
    initialScale: 1.0,
    themeColor: "#006494",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): Promise<React.ReactNode> {
    const routes = await getRoutes();

    return (
        <html lang="en">
            <head>
                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

                {/* Theme color for mobile browsers */}
                <meta name="msapplication-TileColor" content="#006494" />
            </head>
                        <body
                            className={`flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased ${inter.className}`}
                        >
                            <LanguageProvider>
                                <ZeffyInit />
                                <a
                                    href="#main-content"
                                    className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-full focus:bg-sky-600 focus:px-5 focus:py-2 focus:text-white focus:outline-none"
                                >
                                    Skip to main content
                                </a>
                                                <Navbar navItems={routes.main} cta={routes.cta} />
                                <main id="main-content" className="flex-1 pt-24 md:pt-28">
                                    {children}
                                </main>
                                                <Footer footerSections={routes.footer} cta={routes.cta} />
                            </LanguageProvider>
                            <Script
                                src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"
                                strategy="afterInteractive"
                            />
                        </body>
        </html>
    );
}