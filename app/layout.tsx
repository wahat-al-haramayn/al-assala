import HeaderAuth from "@/components/header-auth";
import {
  Alexandria,
  Alkalami,
  Almarai,
  Amiri,
  Cairo,
  Zain,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import Nav from "@/components/nav";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "واحة الحرمين",
  description: "منصة إدارة واحة الحرمين",
};

const geistSans = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      dir="rtl"
      lang="ar"
      className={geistSans.className}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col  items-center gap-4 sm:gap-8 ">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>
                      <Image
                        src={"/img/haramayn-logo_black.webp"}
                        className="my-2"
                        alt="logo"
                        width={60}
                        height={60}
                      />
                    </Link>
                  </div>

                  {<HeaderAuth />}
                </div>
              </nav>

              {children}

              <footer className="w-full flex-col flex items-center justify-center border-t mx-auto text-center text-xs gap-2 py-16">
                <Image
                  src={"/img/haramayn-logo_black.webp"}
                  className="my-2"
                  alt="logo"
                  width={40}
                  height={40}
                />
                <p>عشاق الأصالة</p>
                {/* <ThemeSwitcher /> */}
              </footer>
            </div>
          </main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
