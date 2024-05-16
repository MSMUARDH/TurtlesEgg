import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ShoppingCart from "./pages/ShoppingCart";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
// import TemporaryDrawer from "./components/TemporaryDrawer";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <ShoppingCartProvider>
      <Container maxWidth="lg" style={{ marginBottom: "50px" }}>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:idParam" element={<ProductDetail />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* <Route path="/cart" element={<ShoppingCart />} /> */}
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
