import Signup from "./pages/Signup"
import Login from "./pages/Login"
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
function App() {


  return (

     <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<HomePage/>}/>
     </Routes>
 
  )
}

export default App
