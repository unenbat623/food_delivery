import "./scss/globals.scss";
import { ThemeProvider } from "@/theme";
import Footer from "@/components/HeaderAndFooter/Footer/Footer";
import { UserProvider } from "@/context/UserProvider";
import { FoodProvider } from "@/context/FoodProvider";
import { BasketProvider } from "@/context/BasketProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "@/components/HeaderAndFooter/Header";
import ModalBox from "@/components/ModalBox/modalBox";

export const metadata = {
  title: "Pinecone Food Delivery — Амтат хоол таны үүдэнд",
  description: "Шилдэг ресторануудын шинэхэн, амтат хоолыг 30 минутын дотор халуунаар нь түргэн шуурхай хүргэнэ.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body>
        <ThemeProvider>
          <UserProvider>
            <FoodProvider>
              <BasketProvider>
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
                <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                  <Header />
                  <main style={{ flex: 1 }}>{children}</main>
                  <ModalBox />
                  <Footer />
                </div>
              </BasketProvider>
            </FoodProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
