import Login from "./components/Login";
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/state' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
