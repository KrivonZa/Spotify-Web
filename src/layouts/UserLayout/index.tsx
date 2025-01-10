import Header from "./_header/Header";
import Footer from "./_footer/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./_sidebar/Sidebar";
import PlayMusic from "../../modules/UserModule/playMusic/PlayMusic";
import { ModalProvider } from "../../globalContext/ModalContext";
import ListFriend from "../../modules/UserModule/listFriend/ListFriend";
import "./styles.css";
import BottomPlayer from "./_player/BottomPlayer";
import { useColor } from "../../globalContext/ColorContext";
import { motion } from "framer-motion";

export default function UserLayout() {
  const { primaryColor } = useColor();

  return (
    <div className="h-screen flex flex-col">
      <ModalProvider>
        <Header />
        <div className="flex flex-grow overflow-hidden">
          <Sidebar />
          <div className="flex-grow mr-4 h-full overflow-hidden rounded-xl bg-[#121212]">
            <motion.div
              className="h-full overflow-y-auto custom-scrollbar"
              animate={{
                background: `linear-gradient(to bottom, ${primaryColor} 0%, #121212 60%)`,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <div className="min-h-screen">
                <Outlet />
              </div>
              <Footer />
            </motion.div>
          </div>
        </div>
        <BottomPlayer />
      </ModalProvider>
    </div>
  );
}
