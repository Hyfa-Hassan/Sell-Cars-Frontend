import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Card from "./components/Card";
import ViewCarDetails from "./components/ViewCarDetails";
import EditCarDetails from "./components/EditCarDetails"
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="car-details" element={<Card />} />
          <Route path="view-car-details" element={<ViewCarDetails/>}/>
          <Route path="edit-details" element={<EditCarDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
