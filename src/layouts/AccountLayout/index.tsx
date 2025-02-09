import { Outlet } from "react-router-dom";
import Footer from "../UserLayout/_footer/Footer";
import Header from "../UserLayout/_header/Header";

export default function AccountLayout() {
  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  );
}
