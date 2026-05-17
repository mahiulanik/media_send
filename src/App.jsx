import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen text-white w-full bg-gray-900 flex flex-col">
      <NavBar />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </div>

      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;
