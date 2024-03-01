import {createBrowserRouter} from "react-router-dom";
import LoginSupervisor from './pages/supervisor/LoginSupervisor'
import SearchProblem from './pages/supervisor/SearchProblem/SearchProblem'
import Problem from './pages/supervisor/Problem'
import RegisterProblem from "./pages/administrador/RegisterProblems/RegisterProblem";
import ProblemsSolucions from "./pages/administrador/ProblemsSolucions/ProblemsSolucions";
import { DashboardLayout } from "./layout/sidebar";
import Home from "./pages/administrador/Home";

export const router = createBrowserRouter([
  {
    path: "/dash",
    element: <DashboardLayout/>,
    children:[
      {
        path:"search",
        element:<SearchProblem/>
      },
      {
        path:"home",
        element:<Home/>
      }
    ]
  }
  /*
  ,
  {
    path: "login_supervisor",
    element: <LoginSupervisor/>
  },
  {
    path: "problem",
    element: <Problem/>
  },
  {
    path: "register_problem",
    element: <RegisterProblem/>
  },
  {
    path:"problems_solucions",
    element: <ProblemsSolucions/>
  }*/
]);