import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
// import City from "./pages/City";
import Activities from "./pages/Activities";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import CityPage from "./pages/CityPage";
import PlacePage from "./pages/PlacePage";
import UserProfileView from "./pages/UserProfileView";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import { ParticipationProvider } from "./contexts/ParticipationContext";

function App() {
  return (
    <BrowserRouter>
      <ParticipationProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/city/:cityName" element={<CityPage />} />
          <Route path="/place/:placeId" element={<PlacePage />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:userId" element={<UserProfileView />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
      </ParticipationProvider>
    </BrowserRouter>
  );
}

export default App;
