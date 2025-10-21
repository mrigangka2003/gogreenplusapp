import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

/* Organization Pages*/
const OrganizationHome = lazy(
    () => import("./pages/organization/OrganizationHome")
);
const OrganizationSites = lazy(
    () => import("./pages/organization/OrganizationSites")
);

/* Employee Pages*/

const EmployeeHome = lazy(() => import("./pages/employee/Home"));
const EmployeeTasks = lazy(() => import("./pages/employee/Tasks"));
const EmployeeReviews = lazy(() => import("./pages/employee/Reviews"));

import Profile from "./pages/Profile";

import Flow from "./pages/Flow";

function App() {
    return (
        <Router basename="/gogreenplusapp">
            <Routes>
                <Route path="/" element={<Flow />} />

                <Route path="/org" element={<DashboardLayout />}>
                    <Route index element={<OrganizationHome />} />
                    <Route path="home" element={<OrganizationHome />} />
                    <Route path="our-sites" element={<OrganizationSites />} />
                    <Route path="profile" element={<Profile />} />
                </Route>

                <Route path="/emp" element={<DashboardLayout />}>
                    <Route index element={<EmployeeHome />} />
                    <Route path="home" element={<EmployeeHome />} />
                    <Route path="tasks" element={<EmployeeTasks />} />
                    <Route path="reviews" element={<EmployeeReviews />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
