import { useNavigate, useRoutes } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Home from "./pages/home/Home";
import AuthProvider from "./context/authContext";
import Header from "./components/header/Header";
import Register from "./pages/auth/register/Register";
import { doSignOut } from "./firebase/auth";
import EmployeeHistory from "./pages/employeeHistory/EmployeeHistory";
import EmployeeRegistration from "./pages/employeeRegistration/EmployeeRegistration";

function App() {
  const navigate = useNavigate()
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "employeehistory",
      element: <EmployeeHistory />
    },
    {
      path: "employeeform",
      element: <EmployeeRegistration />
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header handleSignOut={() => { doSignOut().then(() => { navigate('/login'); window.location.reload(); }) }}/>
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App
