import "./App.css";
import { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import PublicRoute from "./helpers/PublicRoute";
import ProtectedRoute from "./helpers/ProtectedRoute";
import NewNavbar from "./components/NewNavbar";
import Loader from "./components/Loader.js";

const Login = lazy(() => import("./Pages/UserPages/Login.js"));
const SignUp = lazy(() => import("./Pages/UserPages/SignUp.js"));
const AddPost = lazy(() => import("./Pages/PostsPages/AddPost"));
const UserPost = lazy(() => import("./Pages/PostsPages/UserPost"));
const EditPost = lazy(() => import("./Pages/PostsPages/EditPost"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const PostPage = lazy(() => import("./Pages/PostsPages/PostPage"));
const ForgetPassword = lazy(() =>
  import("./components/ForgetPassword/ForgetPassword.js")
);
const ResetPassword = lazy(() =>
  import("./components/ForgetPassword/ResetPassword.js")
);
const SavedPost = lazy(() => import("./Pages/PostsPages/SavedPost.js"));

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
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Suspense fallback={<Loader />}>
                <SignUp />
              </Suspense>
            </PublicRoute>
          }
        />
        <Route
          path="/forgetPassword"
          element={
            <PublicRoute>
              <Suspense fallback={<Loader />}>
                <ForgetPassword />
              </Suspense>
            </PublicRoute>
          }
        />
        <Route
          path="/resetPassword/:token"
          element={
            <PublicRoute>
              <Suspense fallback={<Loader />}>
                <ResetPassword />
              </Suspense>
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
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="addpost"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <AddPost />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="userpost"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <UserPost />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="editpost"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <EditPost />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="postPage/:id"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <PostPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="savedPosts"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <SavedPost />
                </Suspense>
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
