import Bids from "./components/Bids";
import CreateGig from "./components/CreateGig";
import GigDetail from "./components/GigDetail";
import Login from "./components/Login";
import PlaceBid from "./components/PlaceBid";
import SpecificBid from "./components/SpecificBid";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/state' element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="gigs/create" element={<CreateGig/>}/>
          <Route path="gigs/:gigId" element={<GigDetail currentUserId='u1'/>}/>
          <Route path="gigs/:gigId/place-bid" element={<PlaceBid/>}/>
          <Route path="bids/:gigId" element={<SpecificBid/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
