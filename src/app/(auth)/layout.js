import Header from "@/components/Admin/Header/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}

    </>
  );
}
