import {createBrowserRouter} from "react-router-dom";
<<<<<<< Updated upstream
import LoginSupervisor from './pages/supervisor/LoginSupervisor'
=======
import LoginSupervisor from "./pages/supervisor/LoginSupervisor"
>>>>>>> Stashed changes
import SearchProblem from './pages/supervisor/SearchProblem/SearchProblem'
import Problem from './pages/supervisor/Problem'
import RegisterProblem from "./pages/administrador/RegisterProblems/RegisterProblem";
import ProblemsSolucions from "./pages/administrador/ProblemsSolucions/ProblemsSolucions";
import { DashboardLayout } from "./layout/sidebar";
<<<<<<< Updated upstream
import Home from "./pages/administrador/Home";

export const router = createBrowserRouter([
  {
    path: "/dash",
=======
import Home from "./pages/administrador/Home/Home.tsx"
import Users from './pages/administrador/Users/Users.tsx'
import Problems from "./pages/administrador/Problems/Problems.tsx"

export const router = createBrowserRouter([
  {
    path: "/adm",
>>>>>>> Stashed changes
    element: <DashboardLayout/>,
    children:[
      {
        path:"search",
        element:<SearchProblem/>
      },
      {
        path:"home",
        element:<Home/>
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
]);