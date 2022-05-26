import "./App.css";

// Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Components
import { Container } from "@mui/material";
import { LoadBackDrop } from "./components/backDrop/LoadBackDrop";

// Pages
import { Home } from "./pages/Home/Home";
import { NavBar } from "./components/navBar/NavBar";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { Products } from "./pages/Products/Products";
import { Categories } from "./pages/Categories/Categories";
import { Purchase } from "./pages/Purchase/Purchase";
import { Profile } from "./pages/Profile/Profile";
import { AddNewCategory } from "./pages/Categories/AddNewCategory";
import { EditCategory } from "./pages/Categories/EditCategory";
import { ProductDetails } from "./pages/Products/ProductDetails";
import { AddNewProduct } from "./pages/Products/AddNewProduct";
import { EditProduct } from "./pages/Products/EditProduct";
import { Footer } from "./components/footer/Footer";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <LoadBackDrop show={true} />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/products"
              element={auth ? <Products /> : <Navigate to="/login" />}
            />
            <Route
              path="/products/:id"
              element={auth ? <EditProduct /> : <Navigate to="/login" />}
            />
            <Route
              path="/products/new"
              element={auth ? <AddNewProduct /> : <Navigate to="/login" />}
            />
            <Route
              path="/products/details/:id"
              element={auth ? <ProductDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/categories"
              element={auth ? <Categories /> : <Navigate to="/login" />}
            />
            <Route
              path="/categories/new"
              element={auth ? <AddNewCategory /> : <Navigate to="/login" />}
            />
            <Route
              path="/categories/:id"
              element={auth ? <EditCategory /> : <Navigate to="/login" />}
            />
            <Route
              path="/buy"
              element={auth ? <Purchase /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={auth ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
