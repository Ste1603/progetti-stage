import "@styles/globals.css";
import Nav from "@components/ui/Nav";
import RegisterModal from "@components/modals/RegisterModal";
import LoginModal from "@components/modals/LoginModal";
import ToasterProvider from "../app/providers/ToasterProvider";
import { getCurrentUser } from "@app/actions/getCurrentUser";
import { UserProvider } from "@app/contexts/UserContext.jsx";
import { LoadingProvider } from "@app/contexts/LoadingContext"; // Importa il LoadingProvider

const RootLayout = async ({ children }) => {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <UserProvider currentUser={currentUser}>
          <LoadingProvider> {/* Avvolge i componenti nel LoadingProvider */}
            <main className="flex min-h-screen w-full flex-col items-center bg-background p-[5px] font-urbanist md:p-[10px]">
              {children}
              <ToasterProvider />
              <LoginModal />
              <RegisterModal />
              {/* Condizione per nascondere Nav */}
              <Nav />
            </main>
          </LoadingProvider>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
