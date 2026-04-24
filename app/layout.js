import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "خزانة الكيمياء الرقمية - منصة تعليمية شاملة",
  description: "منصة تعليمية متكاملة للكيمياء الكهربائية والعضوية مع أدوات تفاعلية وقاعدة بيانات شاملة",
  keywords: "كيمياء، تعليم، أدوات تفاعلية، هيدروكربونات، كيمياء كهربائية",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-900 text-gray-300 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p>&copy; 2024 خزانة الكيمياء الرقمية | جميع الحقوق محفوظة</p>
            <p className="text-sm text-gray-400 mt-2">
              منصة تعليمية متخصصة في الكيمياء الكهربائية والعضوية
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
