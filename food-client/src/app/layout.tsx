import "./scss/globals.scss";
import { ThemeProvider } from "@/theme";
import Footer from "@/components/HeaderAndFooter/Footer/Footer";
import { UserProvider } from "@/context/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "@/components/HeaderAndFooter/Header";

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
            <ToastContainer />
            <Header />
            {children}
            <Footer />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
