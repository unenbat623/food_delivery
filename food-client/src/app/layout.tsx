import { Header } from "@/components";
import "./scss/globals.scss";
import { ThemeProvider } from "@/theme";
import Footer from "@/components/Footer/Footer";
import { UserProvider } from "@/context/UserProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <UserProvider>
            <Header />
            {children}
            <Footer />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
