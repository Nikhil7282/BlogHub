import "./App.css";
import Login from "./Pages/UserPages/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./Pages/UserPages/SignUp";
import Home from "./components/Home";
import PublicRoute from "./helpers/PublicRoute";
import ProtectedRoute from "./helpers/ProtectedRoute";
import AddPost from "./Pages/PostsPages/AddPost";
import UserPost from "./Pages/PostsPages/UserPost";
import EditPost from "./Pages/PostsPages/EditPost";
import Dashboard from "./components/Dashboard";
import PostPage from "./Pages/PostsPages/PostPage";
import NewNavbar from "./components/NewNavbar";
import ForgotPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ForgetPassword/ResetPassword";
import SavedPost from "./Pages/PostsPages/SavedPost";

// export const url = "http://localhost:8000";
export const url = "https://blohhub.onrender.com";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/forgetPassword"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/resetPassword/:token"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <NewNavbar state="Dashboard" />
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="addpost"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="userpost"
            element={
              <ProtectedRoute>
                <UserPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="editpost"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="postPage/:id"
            element={
              <ProtectedRoute>
                <PostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="savedPosts"
            element={
              <ProtectedRoute>
                <SavedPost />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
