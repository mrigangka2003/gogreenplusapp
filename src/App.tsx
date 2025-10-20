import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";


import EmployeeHome from "./pages/employee/Home"; 
import { EmployeeReviews } from "./pages/employee/Reviews";
import { EmployeeTasks } from "./pages/employee/Tasks";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeHome />} />
        
        <Route path="/emp" element={<DashboardLayout/>} >
          <Route index element ={<EmployeeHome/>}/>
          <Route path="home" element={<EmployeeHome/>}/>
          <Route path="tasks" element ={<EmployeeTasks/>}/>
          <Route path="reviews" element ={<EmployeeReviews/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
