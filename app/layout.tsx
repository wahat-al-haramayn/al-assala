import HeaderAuth from '@/components/header-auth';
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Cairo } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'واحة الحرمين',
  description: 'منصة إدارة واحة الحرمين',
  openGraph: {
    locale: 'ar_SA',
    type: 'website',
    title: 'واحة الحرمين',
    description: 'منصة إدارة واحة الحرمين',
    url: process.env.APP_PATH,
    siteName: 'واحة الحرمين',
    images: [
      {
        width: 655,
        height: 336,
        url: `${process.env.APP_PATH}/img/thumbnail.jpg`,
      },
    ],
  },
};

const geistSans = Cairo({
  subsets: ['arabic'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="ar" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col  items-center gap-4 sm:gap-8 ">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={'/'}>
                      <Image src={'/img/haramayn-logo_black.webp'} className="my-2" alt="logo" width={60} height={60} />
                    </Link>
                  </div>

                  {<HeaderAuth />}
                </div>
              </nav>

              {children}

              <footer className="w-full flex-col flex items-center justify-center border-t mx-auto text-center text-xs gap-2 py-16">
                <Image src={'/img/haramayn-logo_black.webp'} className="my-2" alt="logo" width={40} height={40} />
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
