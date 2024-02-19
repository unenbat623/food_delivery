import { Header } from "@/components";
import "./scss/globals.scss";
import { ThemeProvider } from "@/theme";
import Footer from "@/components/Footer/Footer";
import { UserProvider } from "@/context/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
