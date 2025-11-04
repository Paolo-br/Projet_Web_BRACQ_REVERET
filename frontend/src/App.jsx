import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
// import City from "./pages/City";
import Activities from "./pages/Activities";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import CityPage from "./pages/CityPage";
import PlacePage from "./pages/PlacePage";
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
          <Route path="/login" element={<Login />} />
        </Routes>
      </ParticipationProvider>
    </BrowserRouter>
  );
}

export default App;
