import { Outlet } from "react-router-dom";
import Footer from "../UserLayout/_footer/Footer";
import Header from "../UserLayout/_header/Header";

export default function AccountLayout() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="h-full w-full overflow-y-auto">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
