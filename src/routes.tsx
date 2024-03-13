import {createBrowserRouter} from "react-router-dom";
import { DashboardLayout } from "./layout/sidebar";

import Home from "./pages/administrador/Home/Home.tsx"
import Users from './pages/administrador/Users/Users.tsx'
import {Problems} from "./pages/administrador/Problems/ShowProblems/index.tsx"
import Orders from "./pages/administrador/Orders/Orders.tsx";
import {RegisterProblems} from "./pages/administrador/Problems/RegisterProblem/index.tsx";
import AddUsers from "./pages/administrador/AddUsers/AddUsers.tsx";
import AddSuperv from "./pages/administrador/AddSupervisor/Add_Supervisor.tsx"
import AddTecn from "./pages/administrador/AddTecnico/AddTecnico.tsx"
import EdtTecn from "./pages/administrador/EditarTécnico/EditarTecnico.tsx"
import EdtSuperv from "./pages/administrador/EditarSupervisor/EditarSupervisor.tsx"


import {SearchProblem} from "./pages/supervisor/Home/SearchProblems/SearchProblem.tsx";
import {SupervisorHistoric} from "./pages/supervisor/Orders/SupervisorHistoric.tsx";
import {ProblemNotFound} from "./pages/supervisor/Home/ProblemNotFound/ProblemNotFound.tsx";


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
      },
      {
        path: "/addusers",
        element: <AddUsers/>
      },
      {
        path: "/addsuperv",
        element: <AddSuperv/>
      },
      {
        path: "/addtecn",
        element: <AddTecn/>
      },
      {
        path: "/edttecn",
        element: <EdtTecn/>
      },
      {
        path: "/edtsuperv",
        element: <EdtSuperv/>
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
      }
    ]
  }
])
