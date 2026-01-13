import Bids from "./components/Bids";
import CreateGig from "./components/CreateGig";
import GigDetail from "./components/GigDetail";
import Login from "./components/Login";
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
          <Route path="gigs/:id" element={<GigDetail/>}/>
          <Route path="bids/:id" element={<Bids/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
