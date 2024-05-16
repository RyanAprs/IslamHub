import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../../pages/Login/login";
import Register from "../../pages/Register/register";
import Header from "../../components/molecules/Header/header";
import Home from "../../pages/Home/home";
import Blogs from "../../pages/Blogs/blogs";
import Contact from "../../pages/Contact/contact";
import DetailBlog from "../../pages/Blogs/detailBlog";
import Profile from "../../pages/Profile/profile";
import UpdateProfile from "../../pages/Profile/updateProfile";
import BlogUser from "../../pages/Profile/blogUser";
import CreateBlog from "../../pages/Blogs/createBlog";
import UpdateBlog from "../../pages/Blogs/updateBlog";
import ResetPassword from "../../pages/ResetPassword/resetPassword";
import Footer from "../../components/molecules/Footer/footer";
import { useAuthContext } from "../context/useAuthContext";

const RouteData = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blog",
    element: <Blogs />,
  },
  {
    path: "/blog/detail/:id",
    element: <DetailBlog />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/profile/:id/blog/:id",
    element: <BlogUser />,
  },
];

const Routing = () => {
  const {token} = useAuthContext();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/blog/update/:id"
          element={
            token ? (
              <>
                <Header />
                <UpdateBlog />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile/update/:id"
          element={
            token ? (
              <>
                <Header />
                <UpdateProfile />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/blog/create"
          element={
            token ? (
              <>
                <Header />
                <CreateBlog />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {RouteData.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  <Header />
                  {route.element}
                  <Footer />
                </>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default Routing;
