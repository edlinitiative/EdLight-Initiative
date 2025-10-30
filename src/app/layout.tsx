import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ZeffyInit from "@/components/ZeffyInit";

export const metadata = {
    title: "EdLight Initiative",
    description: "Empowering communities through education, technology, and light. Official website for EdLight Initiative.",
    keywords: "EdLight, Initiative, Education, Community, Technology, Light, Empowerment",
    author: "EdLight Initiative",
    openGraph: {
        title: "EdLight Initiative",
        description: "Empowering communities through education, technology, and light.",
        type: "website",
        locale: "en_US",
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1.0,
    themeColor: "#006494",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}): React.ReactNode {
    return (
        <html lang="en">
            <head>
                {/* Preload critical fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

                {/* Theme color for mobile browsers */}
                <meta name="msapplication-TileColor" content="#006494" />
                
                {/* Zeffy Donation Form Script (load without async to be ready earlier) */}
                <script src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"></script>
            </head>
            <body className="d-flex flex-column min-vh-100">
            <LanguageProvider>
                <ZeffyInit />
                {/* Skip to main content for accessibility */}
                <a href="#main-content" className="visually-hidden-focusable btn btn-primary position-absolute top-0 start-0 m-3" style={{ zIndex: 9999 }}>
                    Skip to main content
                </a>

                {/* Fixed Navbar */}
                <Navbar />

                {/* Main Content Area */}
                <main
                    id="main-content"
                    className="flex-grow-1 d-flex flex-column"
                    style={{
                        paddingTop: '80px', // Account for fixed navbar
                        minHeight: 'calc(100vh - 80px)' // Ensure full height minus navbar
                    }}
                >
                    <div className="flex-grow-1">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <Footer />
            </LanguageProvider>

            {/* Bootstrap JS Bundle (Optional - only if you need interactive components) */}
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
                crossOrigin="anonymous"
                async
            />
            </body>
        </html>
    );
}