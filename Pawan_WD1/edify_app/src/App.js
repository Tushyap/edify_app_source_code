import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CourseDetailPage from "./pages/CourseDetail";
import AllCourses from "./pages/Courses";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import RequireAuth from "./components/RequireAuth";

import Unauthorized from "./pages/Unauthorized";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NoMatch from "./pages/NoMatch";
import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";
import CardPaymentHome from "./pages/CardPaymentHome";
import CoursesOpted from "./pages/CoursesOpted";
import AddPaymentCard from "./pages/AddPaymentCard";

import UserManagement from "./pages/admin/UserManagement";
import EnrollmentManagement from "./pages/admin/EnrollmentManagement";
import CreateNewUser from "./pages/admin/CreateNewUser";
import AuthContextProvider, { ROLES } from "./contexts/AuthContextProvider";

import ManageAllUsers from "./pages/admin/ManageAllUsers";
import Checkout from "./pages/Checkout";

import UpdateUser from "./pages/admin/UpdateUser";
import CourseManagement from "./pages/admin/CourseManagement";
import ManageAllCourses from "./pages/admin/ManageAllCourses";
import CreateNewCourse from "./pages/admin/CreateNewCourse";
import UpdateCourse from "./pages/admin/UpdateCourse";
import ApproveUser from "./pages/admin/ApproveUser";

import ManageAllEnrollments from "./pages/admin/ManageAllEnrollments";
import OverallEnrollment from "./pages/admin/OverallEnrollment";
import RazorpaySettings from "./pages/admin/RazorpaySettings";

class App extends Component {
  render() {
    return (
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/course-detail/:slug" element={<CourseDetailPage />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="404" element={<NoMatch />} />

          {/* User Dashboard Routes; accessible after proper authentication */}
          <Route element={<RequireAuth allowedRole={ROLES.User} />}>
            <Route path="user-dashboard" element={<UserDashboard />}>
              <Route index element={<CoursesOpted />} />
              <Route path="payments/:slug" element={<Checkout />} />

              <Route path="cards-payments" element={<CardPaymentHome />} />
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="add-card" element={<AddPaymentCard />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Route>

          {/* Admin Dashboard Routes; accessible after proper authentication */}
          <Route element={<RequireAuth allowedRole={ROLES.Admin} />}>
            <Route path="admin-dashboard" element={<AdminDashboard />}>
              {/* <Route index element={<SelfService />} /> */}
              <Route index element={<EditProfile />} />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="course-management" element={<CourseManagement />} />
              <Route
                path="enrollment-management"
                element={<EnrollmentManagement />}
              />
              <Route
                path="manage-allenrollments"
                element={<ManageAllEnrollments />}
              />
              <Route
                path="overall-enrollment/"
                element={<OverallEnrollment />}
              />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="create-newuser" element={<CreateNewUser />} />
              <Route path="manage-alluser" element={<ManageAllUsers />} />
              <Route path="update-user/:id" element={<UpdateUser />} />
              <Route path="manage-allcourses" element={<ManageAllCourses />} />
              <Route path="create-newcourse" element={<CreateNewCourse />} />
              <Route path="update-course/:slug" element={<UpdateCourse />} />
              <Route path="manage-alluser" element={<ManageAllUsers />} />
              <Route path="approve-user" element={<ApproveUser />} />
              <Route path="razorpay-settings" element={<RazorpaySettings />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </AuthContextProvider>
    );
  }
}
export default App;