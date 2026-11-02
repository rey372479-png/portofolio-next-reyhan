import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: {
    default: "M Reyhan Purnomo Putra | Portofolio",
    template: "%s | M Reyhan Purnomo Putra",
  },
  description:
    "Portofolio M Reyhan Purnomo Putra, siswa SMKN 1 Kota Pasuruan yang belajar web development dan teknologi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[#f1f8ed] font-sans text-[#203b5d]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
