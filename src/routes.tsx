import {createBrowserRouter} from "react-router-dom";
import LoginSupervisor from './pages/supervisor/LoginSupervisor'
import SearchProblem from './pages/supervisor/SearchProblem/SearchProblem'
import Problem from './pages/supervisor/Problem'
import RegisterProblem from "./pages/administrador/RegisterProblems/RegisterProblem";
import ProblemsSolucions from "./pages/administrador/ProblemsSolucions/ProblemsSolucions";
import { DashboardLayout } from "./layout/sidebar";
import Home from "./pages/administrador/Home/Home.tsx"
import Users from './pages/administrador/Users/Users.tsx'
import Problems from "./pages/administrador/Problems/Problems.tsx"

export const router = createBrowserRouter([
  {
    path: "/adm",

    element: <DashboardLayout/>,
    children:[
      {
        path:"search",
        element:<SearchProblem/>
      },
      {
        path:"home",
        element:<Home/>
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