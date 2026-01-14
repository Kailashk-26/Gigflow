import { Route, Routes, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./components/Login";
import CreateGig from "./components/CreateGig";
import GigDetail from "./components/GigDetail";
import PlaceBid from "./components/PlaceBid";
import SpecificBid from "./components/SpecificBid";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useAuth";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return (
    <>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/state" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/state" />
          }
        >
          <Route path="gigs/create" element={<CreateGig />} />
          <Route path="gigs/:gigId" element={<GigDetail />} />
          <Route path="bids/:gigId/place" element={<PlaceBid />} />
          <Route path="bids/:gigId" element={<SpecificBid />} />
        </Route>
      </Routes>
    </>
    
  );
}

export default App;
