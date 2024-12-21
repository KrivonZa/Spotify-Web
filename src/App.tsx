import "./App.css";
import { GlobalProvider } from "./globalContext/GlobalContext";
import useRoutesElements from "./routes/useRoutesElements";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const routesElements = useRoutesElements();
  return (
    <GlobalProvider>
      <ScrollToTop />
      {routesElements}
    </GlobalProvider>
  );
}

export default App;
