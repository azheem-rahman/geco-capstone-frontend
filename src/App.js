import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/Dashboard/AdminDashboard.js";
import NPDashboard from "./components/Dashboard/NPDashboard.js";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp.js";
import NavBar from "./components/NavBar/AdminNavBar.js";
import SomeContext from "./context/some-context.js";
import CreateOrderForm from "./forms/CreateOrderForm.js";
import Profiles from "./components/Dashboard/Profiles.js";
import NewOrders from "./components/Dashboard/NewOrders.js";

function App() {
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  // check whether user is logged in
  useEffect(() => {
    if (localStorage.accessToken) {
      setUserLoggedIn(true);
      setAccountType(localStorage.accountType);
      setFirstName(localStorage.firstName);
      setLastName(localStorage.lastName);
    }
  }, []);

  return (
    <SomeContext.Provider
      value={{
        email,
        setEmail,
        accountType,
        setAccountType,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        userLoggedIn,
        setUserLoggedIn,
        accessToken,
        setAccessToken,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={
                localStorage.accessToken ? (
                  localStorage.accountType === "admin" ? (
                    <Navigate to="/admin-home" />
                  ) : (
                    <Navigate to="/np-home" />
                  )
                ) : (
                  <Navigate to="/login-signup" />
                )
              }
            />
            {/* Common Routes */}
            <Route path="/login-signup" element={<LoginSignUp />} />
            {/* Admin Routes */}
            <Route path="/admin-home" element={<AdminDashboard />} />
            <Route path="/profiles" element={<Profiles />} />
            {/* NP Routes */}
            <Route path="/np-home" element={<NPDashboard />} />
            <Route path="/new-orders" element={<NewOrders />} />
          </Routes>
        </BrowserRouter>
        {/* <NavBar /> */}
        {/* <LoginSignUp /> */}
        {/* <AdminDashboard /> */}
        {/* <NPDashboard /> */}
      </div>
    </SomeContext.Provider>
  );
}

export default App;
