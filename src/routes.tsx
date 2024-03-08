import {createBrowserRouter} from "react-router-dom";
import { DashboardLayout } from "./layout/sidebar";
import Home from "./pages/administrador/Home/Home.tsx"
import Users from './pages/administrador/Users/Users.tsx'
import Problems from "./pages/administrador/Problems/Problems.tsx"
import Orders from "./pages/administrador/Orders/Orders.tsx";
import path from "path";
import RegisterProblems from "./pages/administrador/RegisterProblems/RegisterProblem.tsx";


export const router = createBrowserRouter([
  {
    element: <DashboardLayout/>,
    children:[

      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/orders",
        element:<Orders/>
      },
      {
        path: "/users",
        element: <Users/>
      },
      {
        path: "/problems",
        element: <Problems/>,
      },
      {
        path: "/problems-register",
        element: <RegisterProblems/>
      }
    ]
  }
])