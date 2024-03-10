import {createBrowserRouter} from "react-router-dom";
import { DashboardLayout } from "./layout/sidebar";

import Home from "./pages/administrador/Home/Home.tsx"
import Users from './pages/administrador/Users/Users.tsx'
import {Problems} from "./pages/administrador/Problems/ShowProblems/index.tsx"
import Orders from "./pages/administrador/Orders/Orders.tsx";
import {RegisterProblems} from "./pages/administrador/Problems/RegisterProblem/index.tsx";


import {SearchProblem} from "./pages/supervisor/SearchProblems/SearchProblem.tsx";
import {SupervisorHistoric} from "./pages/supervisor/Orders/SupervisorHistoric.tsx";
import {ProblemNotFound} from "./pages/supervisor/ProblemNotFound/ProblemNotFound.tsx";
import { ProblemDetails } from "./pages/supervisor/ProblemDetails/ProblemDetails.tsx";


export const router = createBrowserRouter([
  {
    path: "/adm",
    element: <DashboardLayout/>,
    children: [

      {
        path: "home",
        element: <Home/>
      },
      {
        path: "orders",
        element: <Orders/>
      },
      {
        path: "users",
        element: <Users/>
      },
      {
        path: "problems",
        element: <Problems/>,
      },
      {
        path: "problems-register",
        element: <RegisterProblems/>
      }
    ]

  },
  {
    path: "/supervisor",
    element: <DashboardLayout/>,
    children:[
      {
        path: "home",
        element: <SearchProblem/>
      },
      {
        path: "supervisor-historic",
        element: <SupervisorHistoric/>
      },
      {
        path: "problem-not-found",
        element: <ProblemNotFound/>
      },
      {
        path: "problem-details",
        element: <ProblemDetails/>
      }
    ]
  }
])