import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import AuthLayouts from "../Layouts/AuthLayouts";
import Home from "../Pages/Home";
import Tuitions from "../Pages/Tuitions";
import Tutors from "../Pages/Tutors";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import LegalNotice from "../Pages/LegalNotice";
import TermsOfService from "../Pages/TermsOfService";
import PrivateRouter from "./PrivateRouter";
import ErrorPage from "../Components/ErrorPage";
import MyProfile from "../Components/MyProfile";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import PostNewTuition from "../Components/PostNewTution";
import TuitionDetails from "../Pages/TuitionDetails";
import MyTuitions from "../Components/MyTutions";
import UpdateTuitions from "../Components/UpdateTuions";
import Payment from "../Pages/Dashboard/Payment/Payment";
import AppliedTutors from "../Pages/Dashboard/AppliedTutors";
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import AdminRoute from "./AdminRoute";
import Payments from "../Pages/Dashboard/Payments";
import MyApplications from "../Pages/Dashboard/MyApplications";
import OngoingTuitions from "../Pages/Dashboard/OngoingTuitions";
import Revenue from "../Pages/Dashboard/Revenue";
import ManageTuitions from "../Pages/Dashboard/ManageTuitions";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import ManageApplications from "../Pages/Dashboard/ManageApplications";
import AdminHome from "../Pages/Dashboard/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "tuitions",
        element: <Tuitions />,
      },
      {
        path: "/tuition/:id",
        element: (
          <PrivateRouter>
            <TuitionDetails></TuitionDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "tutors",
        element: <Tutors />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "legal-notice",
        element: <LegalNotice />,
      },
      {
        path: "terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "profile-settings", // মেইন লেআউটের জন্য প্রোফাইল (ঐচ্ছিক)
        element: (
          <PrivateRouter>
            <MyProfile />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayouts />
      </PrivateRouter>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/my-profile" replace />, // সে অটো প্রোফাইলে চলে যাবে
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "post-tuition",
        element: (
          <StudentRoute>
            <PostNewTuition />
          </StudentRoute>
        ),
      },
      {
        path: "student-home",
        element: (
          <StudentRoute>
            <MyTuitions />
          </StudentRoute>
        ),
      },
      {
        path: "tutor-home",
        element: (
          <TutorRoute>
            <MyApplications />
          </TutorRoute>
        ),
      },
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "my-tuitions",
        element: (
          <StudentRoute>
            <MyTuitions />
          </StudentRoute>
        ),
      },
      {
        path: "update-tuition/:id",
        element: (
          <StudentRoute>
            <UpdateTuitions />
          </StudentRoute>
        ),
      },
      // Student Routes
      {
        path: "applied-tutors",
        element: (
          <StudentRoute>
            <AppliedTutors />
          </StudentRoute>
        ),
      },
      {
        path: "applied-tutors/:tuitionId",
        element: (
          <StudentRoute>
            <AppliedTutors />
          </StudentRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <StudentRoute>
            <Payments />
          </StudentRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <StudentRoute>
            <Payment />
          </StudentRoute>
        ),
      },
      // Tutor Routes
      {
        path: "my-applications",
        element: (
          <TutorRoute>
            <MyApplications />
          </TutorRoute>
        ),
      },
      {
        path: "ongoing-tuitions",
        element: (
          <TutorRoute>
            <OngoingTuitions />
          </TutorRoute>
        ),
      },
      {
        path: "revenue",
        element: (
          <TutorRoute>
            <Revenue />
          </TutorRoute>
        ),
      },
      // Admin Routes
      {
        path: "manage-applications",
        element: (
          <AdminRoute>
            <ManageApplications />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-tuitions",
        element: (
          <AdminRoute>
            <ManageTuitions />
          </AdminRoute>
        ),
      },
      {
        path: "stats",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
