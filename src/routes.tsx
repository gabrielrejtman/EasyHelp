import {createBrowserRouter} from "react-router-dom";
import LoginSupervisor from './pages/supervisor/LoginSupervisor'
import SearchProblem from './pages/supervisor/SearchProblem/SearchProblem'
import Problem from './pages/supervisor/Problem'
import RegisterProblem from "./pages/administrador/RegisterProblems/RegisterProblem";

import { DashboardLayout } from "./layout/sidebar";
import Home from "./pages/administrador/Home/Home.tsx"
import Users from './pages/administrador/Users/Users.tsx'
import Problems from "./pages/administrador/Problems/Problems.tsx"
import Orders from "./pages/administrador/Orders/Orders.tsx";

export const router = createBrowserRouter([
  {
    path: "/adm",

    element: <DashboardLayout/>,
    children:[

      {
        path:"home",
        element:<Home/>
      },
      {
        path:"orders",
        element:<Orders/>
      },
      {
        path: "users",
        element: <Users/>
      },
      {
        path: "problems",
        element: <Problems/>
      }
    ]
  }
])