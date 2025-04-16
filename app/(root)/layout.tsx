import Footer from '@/components/Footer';
import Header from '@/components/header/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <div className="border-b container mx-auto">
        <Header />
      </div>

      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </div>
  );
}
