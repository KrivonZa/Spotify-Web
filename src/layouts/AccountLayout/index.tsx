import { Outlet } from "react-router-dom";
import Footer from "../UserLayout/_footer/Footer";
import Header from "../UserLayout/_header/Header";

export default function AccountLayout() {
  return (
    <div className="relative">
      <header className="fixed top-0 left-0 w-full z-50 bg-[#121212]">
        <Header />
      </header>
      <main className="pt-[20px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
