import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./pages/Login";
import Payments from "./pages/Payments";
import Profile from "./pages/Profile";
import PrivateRoutes from "./components/PrivateRoutes";
import AdminRoutes from "./components/AdminRoutes";
// import Tiffins from "./pages/Admin/Tiffins";
import PaymentsManagement from "./pages/Admin/PaymentsManagement";
import AdminHome from "./pages/Admin/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <MainLayout> */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          />
          <Route
            path="/payments"
            element={
              <PrivateRoutes>
                <Payments />
              </PrivateRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoutes>
                <AdminHome />
              </AdminRoutes>
            }
          />
          {/* <Route
            path="/admin/tiffins"
            element={
              <AdminRoutes>
                <Tiffins />
              </AdminRoutes>
            }
          /> */}
          <Route
            path="/admin/payments"
            element={
              <AdminRoutes>
                <PaymentsManagement />
              </AdminRoutes>
            }
          />
        </Route>

        {/* </MainLayout> */}
      </Routes>
    </>
  );
}

export default App;
