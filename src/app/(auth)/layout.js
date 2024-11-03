import Header from "@/components/Admin/Header/Header";
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}

    </>
  );
}
