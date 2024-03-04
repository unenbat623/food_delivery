import "./scss/globals.scss";
import { ThemeProvider } from "@/theme";
import Footer from "@/components/HeaderAndFooter/Footer/Footer";
import { UserProvider } from "@/context/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "@/components/HeaderAndFooter/Header";
import { FoodProvider } from "@/context/FoodProvider";

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
            <FoodProvider>
              <ToastContainer />
              <Header />
              {children}
              <Footer />
            </FoodProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
