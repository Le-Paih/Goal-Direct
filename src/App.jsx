import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "./context/cartContext";
import GlobalStyles from "./styles/GlobalStyles";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";

const Homepage = React.lazy(() => import("./pages/HomePage/Homepage"));
const Boots = React.lazy(() => import("./pages/Boots/Boots"));
const AdidasBoot = React.lazy(() => import("./pages/Boots/AdidasBoot"));
const NikeBoot = React.lazy(() => import("./pages/Boots/NikeBoot"));
const PumaBoot = React.lazy(() => import("./pages/Boots/PumaBoot"));
const NbBoot = React.lazy(() => import("./pages/Boots/NbBoot"));
const BootItem = React.lazy(() => import("./pages/Boots/BootItem"));
const Kits = React.lazy(() => import("./pages/Kits/Kits"));
const KitItem = React.lazy(() => import("./pages/Kits/KitItem"));
const Prem = React.lazy(() => import("./pages/Kits/Prem"));
const Bundes = React.lazy(() => import("./pages/Kits/Bundes"));
const MajLs = React.lazy(() => import("./pages/Kits/MajLs"));
const LaLiga = React.lazy(() => import("./pages/Kits/LaLiga"));
const Ligue1 = React.lazy(() => import("./pages/Kits/Ligue1"));
const SerieA = React.lazy(() => import("./pages/Kits/SerieA"));
const International = React.lazy(() => import("./pages/Kits/International"));

function App() {
  const [kitData, setKitData] = useState([]);
  const [bootData, setBootData] = useState([]);

  useEffect(() => {
    fetch("/src/data/kits.json")
      .then((response) => response.json())
      .then((data) => setKitData(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  useEffect(() => {
    fetch("/src/data/boots.json")
      .then((response) => response.json())
      .then((data) => setBootData(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <>
      <CartProvider>
        <GlobalStyles />
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route>
                <Route path="/" element={<Homepage />} />
                <Route path="boots" element={<Boots bootData={bootData} />} />
                <Route
                  path="boots/adidas"
                  element={<AdidasBoot bootData={bootData} />}
                />
                <Route
                  path="boots/nike"
                  element={<NikeBoot bootData={bootData} />}
                />
                <Route
                  path="boots/puma"
                  element={<PumaBoot bootData={bootData} />}
                />
                <Route
                  path="boots/newbalance"
                  element={<NbBoot bootData={bootData} />}
                />
                <Route
                  path="boots/:bootId"
                  element={<BootItem bootData={bootData} />}
                />
                <Route path="kits" element={<Kits kitData={kitData} />} />
                <Route
                  path="kits/premierleague"
                  element={<Prem kitData={kitData} />}
                />
                <Route
                  path="kits/ligue1"
                  element={<Ligue1 kitData={kitData} />}
                />
                <Route
                  path="kits/seriea"
                  element={<SerieA kitData={kitData} />}
                />
                <Route
                  path="kits/bundesliga"
                  element={<Bundes kitData={kitData} />}
                />
                <Route
                  path="kits/laliga"
                  element={<LaLiga kitData={kitData} />}
                />
                <Route path="kits/mls" element={<MajLs kitData={kitData} />} />
                <Route
                  path="kits/international"
                  element={<International kitData={kitData} />}
                />
                <Route
                  path="kits/:kitId"
                  element={<KitItem kitData={kitData} />}
                />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
