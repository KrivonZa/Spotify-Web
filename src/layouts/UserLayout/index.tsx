import Header from "./_header/Header";
import Footer from "./_footer/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./_sidebar/Sidebar";
import PlayMusic from "../../modules/UserModule/playMusic/PlayMusic";
import { ModalProvider } from "../../globalContext/ModalContext";
import ListFriend from "../../modules/UserModule/listFriend/ListFriend";
import "./styles.css";
import BottomPlayer from "./_player/BottomPlayer";
export default function UserLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ModalProvider>
        <Header />
        <div className="flex flex-grow overflow-hidden">
          <Sidebar />
          <div className="flex-grow mr-4 h-full overflow-hidden bg-gradient-to-b from-[#1e1e1e] via-[#121212] to-[#121212] rounded-xl">
            <div className="h-full overflow-y-auto custom-scrollbar hover:custom-scrollbar-hover">
              <div className="min-h-screen">
                <Outlet />
                {/* <div>{PlayMusic()}</div> */}
              </div>
              <Footer />
            </div>
          </div>
        </div>
        <BottomPlayer />
      </ModalProvider>
    </div>
  );
}
