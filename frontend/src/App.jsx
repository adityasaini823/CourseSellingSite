import Signup from "./pages/Signup"
import Login from "./pages/Login"
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import InstructorDashBoard from "./pages/IntructorDashBoard";
function App() {


  return (

     <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/instructor" element={<InstructorDashBoard />} />
     </Routes>
 
  )
}

export default App
